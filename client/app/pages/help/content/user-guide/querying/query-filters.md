---
title: Query Filters
summary: "In-browser filters powered by ::filter and ::multi-filter column aliases."
path: /user-guide/querying/query-filters
group: queries
order: 6
---

Query Filters let you reduce the data shown in a visualization without re-running the query. Unlike [parameters](/help/user-guide/querying/query-parameters), filters apply after results are loaded into the browser, so they're ideal for smaller result sets and for environments where re-executing a query is slow, expensive or rate-limited.

## Usage

There's no _Add Filter_ button. Instead, alias a column to `::filter` and a single-value filter widget appears above the visualization:

```sql
SELECT action AS "action::filter", COUNT(0) AS "actions count"
FROM events
GROUP BY action
```

![Query filter example](/content/help/assets/query-filters/query-filters-00-filter_example_action_create.png)

For databases that don't allow `::` in column names (notably BigQuery), use double underscores: `action__filter`.

For multi-value filters, alias the column to `::multi-filter` (or `__multiFilter`):

```sql
SELECT action AS "action::multi-filter", COUNT(0) AS "actions count"
FROM events
GROUP BY action
```

![Multi-filter example](/content/help/assets/query-filters/query-filters-01-multifilter_example.png)

Query filters work on dashboards too. By default each widget gets its own filter widget. To link them together at the dashboard level, use the dashboard editor.

## Limitations

Query filters aren't suitable for very large result sets or for queries that return tens of thousands of distinct field values. Browser performance degrades quickly past that point. If you need to filter that much data, prefer [parameters](/help/user-guide/querying/query-parameters) so the work happens server-side, or use the [Query Results data source](/help/user-guide/querying/query-results-data-source) to pre-aggregate.
