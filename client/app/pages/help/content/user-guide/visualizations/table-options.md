---
title: Table Visualization Options
summary: "Reorder, hide and format columns; render JSON, images and links."
path: /user-guide/visualizations/table-options
group: visualizations
order: 8
---

The default Table visualization is more powerful than it looks. For databases that support a native query syntax (SQL or NOSQL), you can pick which columns to return and in which order from the query itself. For sources that don't (CSV files, Google Sheets, JSON), Rewatch lets you reorder, hide and format columns directly in the visualization editor.

If you absolutely depend on a SQL feature for post-processing, route the result through the [Query Results data source](/help/user-guide/querying/query-results-data-source).

## Visualization settings

Open the table view and click _Edit Visualization_ to see the table editor:

![Table visualization options](/content/help/assets/table-viz/table-viz-00-table_visualization_options_1_bis2.gif)

You can:

-   **Reorder columns** by dragging them.
-   **Hide columns** by toggling the checkbox.
-   **Format columns** using the per-column format settings (number / date format strings, JSON, image, link…).

## Formatting columns

Rewatch is sensitive to common database types: text, numbers, dates and booleans. It also has special support for non-standard column types like JSON documents, images and links.

The renderer sanitises HTML in query results, but if any HTML tags remain they are not escaped by default. Toggle _Allow HTML content_ in the table editor if you want HTML characters escaped (useful when a query pulls strings from a web scraper).

### Common data types

When the underlying source doesn't provide type information, the renderer treats each column as text. You can force any column to be parsed as a number, date or boolean from the table editor. This is especially useful for SQLite, Google Sheets or CSV sources. From there you can:

-   Display all floats out to three decimal places.
-   Show only the month and year of a date column.
-   Zero-pad all integers.
-   Prepend or append text to a number column.

For number formatting reference, see [Formatting Numbers in Visualizations](/help/user-guide/visualizations/formatting-numbers). For date formatting, see [moment.js display formats](https://momentjs.com/docs/#/displaying/format/).

### Special data types

#### JSON documents

If a field returns JSON-formatted text, instruct the table to render it as such. The cell becomes collapsible / expandable, which is especially useful when querying RESTful APIs with the [JSON data source](/help/data-sources/querying-urls).

#### Images

If a column contains image URLs, set the column type to _Image_ and the URLs render in-place. Useful for product thumbnails, user avatars, token icons and any other inline visual reference.

![Table with images](/content/help/assets/table-viz/table-viz-01-table_visualization_image.gif)

#### HTML links

The same goes for URLs: switch the column to _Link_ and clicks open the URL in a new tab. Use this for any reference URL, including block-explorer links to addresses, transactions and proposals.

![Table with links](/content/help/assets/table-viz/table-viz-02-link.gif)
