---
title: Python
summary: "Run arbitrary Python 3 scripts and surface the result variable."
path: /data-sources/python
group: data-sources
order: 3
---

The Python query runner lets you run arbitrary Python 3 scripts inside Rewatch and visualise whatever ends up in a `result` variable. It's the ultimate escape hatch when SQL or YAML can't reach the data you need: scrape a website, hit an unusual API, run a small ML inference, post-process the output of another data source.

For obvious security reasons, the Python data source is **disabled by default**. Only an admin can enable it, and it's wise to think carefully about which groups have access.

## Setup

Create the data source from _Settings → Data Sources_.

-   **Modules to import prior to running the script**: which `pip`-installed modules can be imported in queries.
-   **AdditionalModulesPaths**: comma-separated absolute paths on the server to extra Python modules (useful for private packages not on `pip`).
-   **AdditionalBuiltins**: extra built-in functions on top of the safe defaults.

The default whitelisted built-ins are:

`abs`, `all`, `any`, `bool`, `complex`, `dict`, `divmod`, `enumerate`, `filter`, `float`, `int`, `len`, `list`, `map`, `max`, `min`, `next`, `reversed`, `round`, `set`, `slice`, `sorted`, `str`, `sum`, `tuple`

Several modules are pre-loaded for convenience: `json`, `web3`, `pandas`, `requests` and `logging`.

## Writing queries

Rewatch builds the result table by inspecting the final state of your script for a variable named `result`. It must follow this shape:

```python
result = {
  "columns": [
    {"name": "date",       "type": "date",    "friendly_name": "date"},
    {"name": "day_number", "type": "integer", "friendly_name": "day_number"},
    {"name": "value",      "type": "integer", "friendly_name": "value"},
    {"name": "total",      "type": "integer", "friendly_name": "total"}
  ],
  "rows": [
    {"value": 40832, "total": 53141, "day_number": 0, "date": "2014-01-30"},
    {"value": 27296, "total": 53141, "day_number": 1, "date": "2014-01-30"},
    {"value": 22982, "total": 53141, "day_number": 2, "date": "2014-01-30"}
  ]
}
```

The snippet above renders as:

| date | day_number | value | total |
| --- | --- | --- | --- |
| 2014-01-30 | 0 | 40832 | 53141 |
| 2014-01-30 | 1 | 27296 | 53141 |
| 2014-01-30 | 2 | 22982 | 53141 |

## When to use Python

Use Python when:

-   You need a one-off scrape or HTTP call that the [JSON data source](/help/data-sources/querying-urls) can't quite express.
-   You need to combine results from two heterogeneous APIs in code that's clearer than SQL.
-   You want to call a custom utility module that lives outside the platform.
-   You need to run lightweight ML inference and surface the predictions to a dashboard.

For repeatable / heavier ML workflows, prefer the [Machine Learning](/help/user-guide/machine-learning) tooling, which is purpose-built for that case.
