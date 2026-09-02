---
title: Writing a Query Runner
summary: Add a new data source by implementing a Python query runner class.
path: /open-source/query-runners
group: admin
order: 5
---

Rewatch ships with [a long list](https://redash.io/help/data-sources/querying/supported-data-sources) of data sources out of the box. Adding support for a new database or service means writing a Python class called a **query runner**. This page walks through the bare minimum (using the upstream Firebolt example) and the optional extras.

## 1. Minimal query runner

Create `redash/query_runner/firebolt.py` and implement `BaseQueryRunner`:

```python
from redash.query_runner import BaseQueryRunner, register

class Firebolt(BaseQueryRunner):
    def run_query(self, query, user):
        pass
```

Only `run_query` is mandatory. It receives the query string and the calling `user` object (the latter is irrelevant for most runners).

## 2. Configuration

Define connection settings via `configuration_schema`. Rewatch renders this JSON schema as a form on the data source setup page:

```python
@classmethod
def configuration_schema(cls):
    return {
        "type": "object",
        "properties": {
            "api_endpoint": {"type": "string", "default": DEFAULT_API_URL},
            "engine_name": {"type": "string"},
            "DB": {"type": "string"},
            "user": {"type": "string"},
            "password": {"type": "string"},
        },
        "order": ["user", "password", "api_endpoint", "engine_name", "DB"],
        "required": ["user", "password", "engine_name", "DB"],
        "secret": ["password"],
    }
```

-   Property types: `string`, `number`, `boolean`. (For file uploads, see below.)
-   `default`: optional starter value.
-   `title`: optional display name (defaults to the property key).
-   `required`: list of required properties.
-   `secret`: list of properties that are encrypted at rest and never re-sent to the UI.

Configured values are accessible via `self.configuration` inside the class.

### File uploads

For data sources that need to accept a file (TLS cert, key file, JSON service account…), define a property of type `string` whose name ends in `File`. The frontend renders it as an upload widget. The bytes are encrypted and stored in the database; you can read them via `self.configuration['someFile']` and pipe them through `tempfile` for use in the underlying client.

## 3. Executing queries

Now implement `run_query`:

```python
def run_query(self, query, user):
    connection = connect(
        api_endpoint=(self.configuration.get("api_endpoint") or DEFAULT_API_URL),
        engine_name=(self.configuration.get("engine_name") or None),
        username=(self.configuration.get("user") or None),
        password=(self.configuration.get("password") or None),
        database=(self.configuration.get("DB") or None),
    )

    cursor = connection.cursor()

    try:
        cursor.execute(query)
        columns = self.fetch_columns(
            [(i[0], TYPES_MAP.get(i[1], None)) for i in cursor.description]
        )
        rows = [
            dict(zip((column["name"] for column in columns), row)) for row in cursor
        ]

        data = {"columns": columns, "rows": rows}
        error = None
        json_data = json_dumps(data)
    finally:
        connection.close()

    return json_data, error
```

The minimum behaviour is:

1.  Open a connection to the configured backend.
2.  Run the query.
3.  Convert results to the [shape Rewatch expects](/help/data-sources/querying-urls).

`run_query` returns a `(json_data, error)` tuple. The error string is for custom messages; let exceptions bubble up otherwise.

## 4. Mapping column types

```python
columns = self.fetch_columns(
    [(i[0], TYPES_MAP.get(i[1], None)) for i in cursor.description]
)
```

`fetch_columns` is a helper on `BaseQueryRunner` that de-duplicates names and assigns types. If no type is provided, the default is string. `TYPES_MAP` is a per-runner dictionary mapping the backend's native type codes to Rewatch's type strings.

## 5. Schema browsing

To populate the schema browser and auto-complete, implement `get_schema`:

```python
def get_schema(self, get_stats=False):
    query = """
    SELECT TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA <> 'INFORMATION_SCHEMA'
    """

    results, error = self.run_query(query, None)
    if error is not None:
        raise Exception("Failed getting schema.")

    schema = {}
    for row in json_loads(results)["rows"]:
        table_name = "{}.{}".format(row["table_schema"], row["table_name"])
        if table_name not in schema:
            schema[table_name] = {"name": table_name, "columns": []}
        schema[table_name]["columns"].append(row["column_name"])

    return list(schema.values())
```

To include column types, return objects (`{"name": ..., "type": ...}`) instead of plain strings inside `columns`.

## 6. Test connection support

Add a `noop_query` constant or override `test_connection`:

```python
class Firebolt(BaseQueryRunner):
    noop_query = "SELECT 1"
```

## 7. Auto-limit

For SQL-style backends, inherit `BaseSQLQueryRunner` instead of `BaseQueryRunner`. It uses `sqlparse` to append `LIMIT 1000` when the editor's auto-limit checkbox is on. For NoSQL or non-standard SQL backends, override `apply_auto_limit` and set `supports_auto_limit` to `True`.

## 8. Optional dependencies

Wrap third-party imports in a `try` / `except` to avoid crashing deployments where the package isn't installed:

```python
try:
    from firebolt.db import connect
    from firebolt.client import DEFAULT_API_URL
    enabled = True
except ImportError:
    enabled = False
```

Then expose `enabled` from a class method:

```python
@classmethod
def enabled(cls):
    return enabled
```

## 9. Wiring it up

At the bottom of the file:

```python
register(Firebolt)
```

If your query runner needs Python packages that aren't already installed, add them to `requirements_all_ds.txt`. To enable it in default deployments, add the runner to `default_query_runners` in `redash/settings/__init__.py`, or set the `ADDITIONAL_QUERY_RUNNERS` environment variable.

## 10. Recap

A query runner is a Python class that, at minimum, implements `run_query` and returns results in the expected shape. Optional methods give you connection testing, schema browsing, auto-limit support and dependency-aware loading. Looking for a complete reference? Check the upstream [Firebolt PR](https://github.com/getredash/redash/pull/5689) for end-to-end context.
