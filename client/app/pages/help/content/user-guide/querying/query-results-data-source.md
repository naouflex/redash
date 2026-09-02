---
title: Querying Existing Query Results
summary: Join data from multiple databases by treating other queries as tables.
path: /user-guide/querying/query-results-data-source
group: queries
order: 9
---

The Query Results data source (QRDS) lets you run SQL against the cached results of any other query. It's powered by an in-memory SQLite database, so very large result sets can run out of memory. Keep input queries reasonably sized.

![QRDS overview](/content/help/assets/qrds/qrds-00-qrds.gif)

## Setup

Create a new data source under _Settings → Data Sources_, pick _Query Results_ as the type and give it a name (most teams only need one). That name appears as a regular entry in the data source dropdown of the query editor.

## Querying

Use SQLite syntax. Each upstream query is exposed as a table named `query_<id>`, where `id` is the numeric ID from the URL of the source query (e.g. `/queries/49588` → `query_49588`):

```
SELECT
  a.name,
  b.count
FROM query_123 AS a
JOIN query_456 AS b
  ON a.id = b.id
```

The `query_<id>` alias must appear on the same line as its associated `FROM` / `JOIN` keyword.

## Cached query results

By default, executing a QRDS query also re-runs the source queries to get fresh data. To re-use the cached result of a source query (faster but possibly stale), prefix the alias with `cached_`:

```
FROM cached_query_123 AS a
JOIN query_456 AS b
  ON a.id = b.id
```

The two prefixes can be mixed in a single query.

## Permissions

Access to the QRDS data source is governed by group membership like any other data source. But a user also needs permission on the original data source backing each referenced query, or they will only see the most recently cached result and won't be able to re-execute.

## Querying parameterised query results

If the source query uses [parameters](/help/user-guide/querying/query-parameters), pass values via the `param_query_<id>_{key=value&key2=value2}` syntax:

![Parameterised QRDS](/content/help/assets/qrds/qrds-01-param_query_461.gif)

For example, given source query `461` that takes `contract_address`, `event_name`, `start_block` and `end_block`:

```sql
SELECT *
FROM param_query_461_{contract_address="0x865377367054516e17014ccded1e7d814edc9ce4"&end_block=17838912&event_name="Transfer"&start_block=17838000}
```

| Parameter | Value |
| --- | --- |
| `contract_address` | `0x865377367054516e17014ccded1e7d814edc9ce4` (DOLA) |
| `end_block` | `17838912` |
| `event_name` | `Transfer` |
| `start_block` | `17838000` |

Notes:

-   Text-typed parameters must be wrapped in double quotes inside the curly braces, number-typed parameters must not.
-   The order of parameters inside the braces doesn't matter, but parameter names must match the source query exactly.
-   When a value contains spaces or special characters, URL-encode it (space → `%20`). [Reference table of URL-encoded characters](https://www.w3schools.com/tags/ref_urlencode.asp).

![Parameter substitution result](/content/help/assets/qrds/qrds-02-qrds_param.gif)
