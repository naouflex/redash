---
title: JSON / URL Data Sources
summary: Query JSON over HTTP using the JSON data source type.
path: /data-sources/querying-urls
group: data-sources
order: 2
---

Sometimes the data you need lives behind an HTTP API rather than in a database. The _JSON_ data source lets you query any RESTful endpoint that returns JSON.

All values returned through this data source are treated as text. Use [number formatting](/help/user-guide/visualizations/formatting-numbers) to render them nicely in tables and charts.

## Setting up the JSON data source

No authentication is required up front: any auth needed by the target API goes in HTTP headers inside each query. Create a data source of type _JSON_ and pick a name (something obvious like "JSON" works fine).

Native JSON types (numbers, strings, booleans) are preserved. Date / timestamp strings are treated as strings unless they're already in ISO-8601 format.

## Writing queries

Each query is a small YAML document. Examples below use the GitHub API.

### Return a list of objects

```yaml
url: https://api.github.com/repos/octocat/hello-world/issues
```

![JSON list query](/content/help/assets/ds-json/ds-json-00-json_list.gif)

### Return a single object

```yaml
url: https://api.github.com/repos/octocat/hello-world/issues/1
```

![JSON single object query](/content/help/assets/ds-json/ds-json-01-json_single_object.gif)

### Return only specific fields

```yaml
url: https://api.github.com/repos/octocat/hello-world/issues
fields: [number, title]
```

![JSON specific fields query](/content/help/assets/ds-json/ds-json-02-json_specific_field.gif)

### Drill into a nested object

```yaml
url: https://api.github.com/repos/octocat/hello-world/issues/1
path: assignees
```

### Pass query-string parameters

```yaml
url: https://api.github.com/search/issues
params:
  q: is:open type:pr repo:octocat/hello-world
  sort: created
  order: desc
```

### Other supported HTTP options

-   `method`: HTTP method (default: `get`).
-   `headers`: request headers as a dict.
-   `auth`: basic auth as `[username, password]`.
-   `params`: query-string params as a dict.
-   `data`: request body as a dict.
-   `json`: request body as a dict, JSON-encoded.

## The legacy URL data source

The older `URL` data source type is deprecated. Existing data sources keep working, but new ones can no longer be created. Migrate to the JSON type instead.

If you do need to keep a legacy URL data source running, your endpoint must return JSON shaped like:

```
{
  "columns": [
    { "name": "date", "type": "date", "friendly_name": "date" },
    { "name": "value", "type": "integer", "friendly_name": "value" }
  ],
  "rows": [
    { "date": "2024-01-30", "value": 40832 }
  ]
}
```

Supported column types are `text`, `integer`, `float`, `boolean`, `string`, `datetime`, `date`.
