---
title: Chart Visualizations
summary: "Line, bar, area, pie, scatter, bubble, heatmap and box plots."
path: /user-guide/visualizations/chart-visualizations
group: visualizations
order: 4
---

Rewatch bundles every chart type that uses X & Y axes into the **Chart** visualization type, which can take eight different forms. Because the forms are so similar, you can switch between them seamlessly to find the one that conveys your meaning best.

![Chart visualization types](/content/help/assets/chart-viz/chart-viz-00-visualization_charts.gif)

## 1. Setup

Start from the table view and pick _Add Visualization_. Your query should return at least two columns: one for the X axis and one for the Y axis. It can also return values for [grouping](#Grouping), [error bars](#Error-Bars) and bubble sizes.

![Table visualization settings](/content/help/assets/chart-viz/chart-viz-01-table_charts.gif)
![Table editing](/content/help/assets/chart-viz/chart-viz-02-table_visualization_settings.gif)

Once your query returns the right columns, set X and Y values and the visualization preview updates instantly. The tabs on the visualization editor let you control:

-   **X Axis / Y Axis**: ranges and labels.
-   **Series**: aliases, z-index, axis assignment (left vs right Y), and per-series form (lets you mix bars and lines on a single chart).
-   **Colors**: per-trace colour pickers.
-   **Data Labels**: hover tooltips and inline labels.

![Series tab](/content/help/assets/chart-viz/chart-viz-03-series.gif)
![Visualization settings](/content/help/assets/chart-viz/chart-viz-04-visualization_settings.gif)

## 2. Grouping {#Grouping}

The _Group By_ setting can generate multiple traces from a single set of X / Y columns. It's how almost every multi-coloured chart is produced.

![Group by example](/content/help/assets/chart-viz/chart-viz-05-group-by-ex.png)

Use _Group By_ for melted data sets and multiple Y columns for pivoted data sets:

![Grouped vs pivoted](/content/help/assets/chart-viz/chart-viz-06-grouped-vs-pivot.png)

## 3. Stacking

Stack Y axis values on top of one another. Each Y value is the sum of itself and the values "beneath" it.

![Stacked vs unstacked](/content/help/assets/chart-viz/chart-viz-07-stacked_vs_not_stacked.png)

Stacking and grouping go together. You won't stack data unless you've also grouped it. The order of the stack follows the order in which group names first appear in your result; control it via the _Series_ tab or with `ORDER BY`. Stacking is available for line, bar and area charts.

## 4. Error bars {#Error-Bars}

For certain forms, Rewatch can draw error bars from a column in your result.

-   Errors are always **symmetrical** around their `(x, y)` point.
-   Errors share the colour of the trace they belong to.
-   Errors are shown for all traces or none.
-   Error values are charted on the same axis as their trace, so they must be **absolute** (don't mix percentages and raw values).

Errors are not aggregated when stacking. To draw a single error bar at a specific location, set non-zero error values only on the row you care about.

![Area chart with grouping, stacking and errors](/content/help/assets/chart-viz/chart-viz-08-area_grouped_stacked_errors.png)

## 5. Picking a chart form

-   **Line**: change in one or more metrics over time.
-   **Bar**: time-series or proportionality (combine with stacking for cumulative views). Horizontal bar charts are also supported.
-   **Area**: funnel-style change over time, often combined with stacking.
-   **Pie**: proportionality only - not suitable for time-series.
-   **Scatter**: many groups of data points; like a line chart minus the connecting lines.
-   **Bubble**: scatter where marker size is a third metric.
-   **Heatmap**: cell-based grid blending bar, stack and bubble cues. Several built-in colour scales. Cannot be grouped (the whole chart is a single trace).
-   **Box plot**: distribution across grouped categories. Horizontal box plots are also supported.

Scatter is necessary for visualizations where some groups appear just once. The line chart hides singleton values; you can selectively render those traces as scatter from the _Series_ tab while keeping others as lines.

## 6. Common mistakes

### Multiple records per X value

Two rows with the same X value (often from a one-to-many JOIN) produce a vertical line where the chart "snaps back" to a second value at the same X.

![Doubled X-axis records](/content/help/assets/chart-viz/chart-viz-09-error_double_entries.png)

Filter out duplicates or add a [grouping](#Grouping) column.

![After grouping](/content/help/assets/chart-viz/chart-viz-10-error_double_entries__solved.png)

### Unordered X axis

Rewatch can usually figure out timestamps, linear and logarithmic X axes. If it can't, it falls back to treating each value as a category, which sometimes draws odd shapes.

![Unsorted X values](/content/help/assets/chart-viz/chart-viz-11-charted_redash_logo__broken.png)

Toggle _Sort Values_ on the X Axis tab to fix:

![Sorted X values](/content/help/assets/chart-viz/chart-viz-12-charted_redash_logo__working.png)
