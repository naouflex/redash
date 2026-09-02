---
title: Integrations & API
summary: User and query API keys, Python toolbelt, and the most common endpoints.
path: /open-source/integrations-api
group: admin
order: 4
---

Rewatch ships a JSON API that powers everything in the UI plus a handful of useful integrations. Most automation can be done with two pieces: an API key and the right endpoint.

## API authentication {#API-Authentication}

Every API call accepts an API key. There are two flavours:

-   **User API key**: inherits the permissions of the user who owns it. Find it on the user's profile page.
-   **Query API key**: scoped only to a single query and its results. Find it on the query page (the horizontal ellipsis menu → _Show API Key_).

Whenever possible, prefer a query API key. It's the principle of least privilege: a leaked query API key only exposes a single result set, not your entire user permissions.

## Accessing from Python

A lightweight wrapper called `redash-toolbelt` is published on PyPI. The source lives on [GitHub](https://github.com/getredash/redash-toolbelt) and the `examples` folder contains useful demos:

-   [Poll for fresh query results (with parameters)](https://github.com/getredash/redash-toolbelt/blob/master/redash_toolbelt/examples/refresh_query.py)
-   [Refresh an entire dashboard](https://github.com/getredash/redash-toolbelt/blob/master/redash_toolbelt/examples/refresh_dashboard.py)
-   [Export every query as a file](https://github.com/getredash/redash-toolbelt/blob/master/redash_toolbelt/examples/query_export.py)

## Common endpoints {#Common-Endpoints}

The list below is not exhaustive. Endpoints are appended to your instance's base URL, e.g. `https://rewatch.naoufel.io` or your self-hosted host.

### Queries

`/api/queries`

-   `GET`: paginated array of query objects. Includes the most recent `query_result_id` for non-parameterised queries.
-   `POST`: create a new query.

`/api/queries/<id>`

-   `GET`: a single query object.
-   `POST`: edit an existing query.
-   `DELETE`: archive the query.

`/api/queries/<id>/results`

-   `GET`: returns a cached result. Only works for non-parameterised queries; parameterised queries return `no cached result found for this query`.
-   `POST`: starts a new execution or returns a cached result. To bypass the cache, set `max_age` to `0`. To allow stale-but-recent caching, set it to a positive integer (seconds). Pass parameters in the `parameters` object:

```json
{
  "parameters": {
    "number_param": 100,
    "date_param": "2024-01-01",
    "date_range_param": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    }
  },
  "max_age": 1800
}
```

### Jobs

`/api/jobs/<id>`

-   `GET`: query execution status. Possible values:

    1.  Pending (waiting to be executed)
    2.  Started (executing)
    3.  Success
    4.  Failure
    5.  Cancelled

    On success, the response includes a `query_result_id`.

### Query results

`/api/query_results/<id>`

-   `GET`: returns the result. Append `.csv` or `.json` (or `.xlsx`) for a downloadable file. If you append `?api_key=<key>` to the URL, the link works for users who aren't signed in (perfect for embedding in a Sheet or another dashboard tool).

### Dashboards

`/api/dashboards`

-   `GET`: paginated array of dashboards.
-   `POST`: create a new dashboard.

`/api/dashboards/<id-or-slug>`

-   `GET`: single dashboard.
-   `POST`: edit an existing dashboard.
-   `DELETE`: archive the dashboard.

These endpoints can change between versions, so build with conservative error handling and pin to a specific Rewatch release in production scripts.
