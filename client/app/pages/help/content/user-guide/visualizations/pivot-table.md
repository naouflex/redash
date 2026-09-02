---
title: How to Make a Pivot Table
summary: "Aggregate query results with drag-and-drop instead of SQL."
path: /user-guide/visualizations/pivot-table
group: visualizations
order: 7
---

The pivot table visualization aggregates rows into a tabular display similar to a SQL `PIVOT` or `GROUP BY`, but the configuration happens in a drag-and-drop UI instead of in code. It's the right tool when your team needs to slice the same dataset many ways without rewriting the query.

## Step 1: Write a query

The query should return at least three columns. The source query is usually non-aggregated (also known as "melted") and not necessarily sorted in your final shape.

![Pivot table source query](/content/help/assets/pivot-viz/pivot-viz-00-pivot_table_write_a_query.gif)

## Step 2: Add a Pivot Table visualization

Click _Add Visualization_, pick _Pivot Table_ as the type, and the preview on the right updates immediately. Every column from your query becomes a draggable field at the top of the pivot control surface. Drag fields onto the row side or column side; nest them as needed.

![Pivot table configured](/content/help/assets/pivot-viz/pivot-viz-01-pivot_table_bis.gif)

Pivot table performance degrades if your query result is too big. The exact threshold depends on your computer and browser, but in general, performance is best below 50,000 fields (e.g. 10,000 rows × 5 columns, or 1,000 rows × 50 columns).
