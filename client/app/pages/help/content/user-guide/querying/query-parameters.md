---
title: Query Parameters
summary: "Make queries reusable with text, number, date, dropdown and query-based parameters."
path: /user-guide/querying/query-parameters
group: queries
order: 3
---

Parameters let you substitute values into a query at run time without touching the source. Wrap any identifier in double curly braces (`{{ }}`) and a widget will appear above the results pane to set its value.

![Search term parameter](/content/help/assets/query-parameters/query-parameters-00-search_term.gif)

While editing, click the gear icon next to a parameter widget to adjust its settings. The gear icons disappear in read-only mode so non-owners can't change the parameter configuration.

![Parameter gear icon](/content/help/assets/query-parameters/query-parameters-01-search_term_gear_icon.gif)

## Adding a parameter from the UI

The _Add Parameter_ button (and its keyboard shortcut, shown when you hover the button) inserts a parameter at the cursor position and immediately opens its settings panel.

![Parameter settings modal](/content/help/assets/query-parameters/query-parameters-02-parameter-modal-v9.png)

### Parameter settings

-   **Title**: the display name above the input. Defaults to the keyword inside `{{ }}`.
-   **Type**: Text, Number, Date, Date and Time, Date and Time (with seconds), Date Range, or Dropdown List.

For security reasons, only users with _Full Access_ on the data source can use Text-typed parameters (they are not safe from SQL injection). Date, Number and Dropdown parameters can be used by anyone who can see the query.

### Date and date-range parameters

Date pickers can default to the current date / time and come in three precisions: Date, Date and Time, and Date and Time with seconds.

A date-range parameter exposes two markers, `.start` and `.end`, that you reference in the query:

```
SELECT a, b, c
FROM table1
WHERE
  relevant_date >= '{{ myDate.start }}'
  AND relevant_date <= '{{ myDate.end }}'
```

Date parameters are passed as strings, so wrap them in single quotes (or whatever your database uses for string literals).

![Date range parameters](/content/help/assets/query-parameters/query-parameters-03-date-range_parameters.gif)

#### Quick date and date-range options

The lightning-bolt glyph next to a date widget exposes dynamic shortcuts such as "Today", "Yesterday" or "Last 30 days". The full set of dynamic ranges is:

-   This week / month / year
-   Last week / month / year
-   Last 7 / 14 / 30 / 60 / 90 days
-   Last 12 months

Because dynamic dates are computed in the browser, they can't be used inside scheduled queries.

### Dropdown lists

Use the Dropdown List type to restrict the values a user can pass to a query. Enter the allowed values one per line in the settings panel. Under the hood they're plain text parameters, so date / datetime values must already be in the format your data source expects.

![Dropdown list parameter](/content/help/assets/query-parameters/query-parameters-04-dropdown-lists.gif)

#### Query-based dropdown lists

Dropdowns can also be populated from the result of another saved query. Pick _Query Based Dropdown List_, then choose the source query.

If the source query returns just one column, that column drives both the displayed label and the substituted value. When it returns `name` and `value` columns, the widget shows `name` values and substitutes `value`:

```
SELECT user_uuid AS value, username AS name
FROM users
```

![Dropdown list with name / value](/content/help/assets/query-parameters/query-parameters-05-dropdown-list-name-value.png)

Performance degrades for very large result sets. Keep dropdown queries under a few thousand rows.

#### Multi-select dropdowns

Toggle _Allow multiple values_ to let users pick several options. Choose whether to wrap values in single or double quotes, then write your query with `IN`:

```
SELECT ...
FROM   ...
WHERE field IN ( {{ Multi Select Parameter }} )
```

![Multi-select dropdown](/content/help/assets/query-parameters/query-parameters-06-dropdown_list_multi.gif)

### FAQ

**Can I reuse the same parameter multiple times in a single query?** Yes, just use the same identifier in each `{{ }}` instance.

**Can I use multiple parameters in a single query?** Yes; give each one a unique name.

**Can parameters be used in embedded visualizations and shared dashboards?** All parameter types _except Text_ can be used safely in public embeds. Text parameters are blocked because they are not safe from SQL injection.

**Can I change a parameter value via the URL?** Yes. Each parameter is exposed in the query string prefixed with `p_`, e.g. `/queries/1234?p_param=100`. Useful for cross-linking between queries and dashboards.

## Parameter mapping on dashboards {#Value-Source-Options}

When a dashboard widget depends on a parameterised query, the parameter mapping dialog (under the widget's kebab menu) lets you decide where each parameter's value comes from:

![Parameter mapping on dashboards](/content/help/assets/query-parameters/query-parameters-07-parameter-mapping-on-dashboards.gif)

-   **New dashboard parameter**: create a single value selector at the top of the dashboard and reuse it across multiple widgets.
-   **Existing dashboard parameter**: bind this widget's parameter to a previously-created dashboard parameter.
-   **Widget parameter**: show a value selector inside this single widget; useful for one-off filters.
-   **Static value**: hard-code a value for this widget. The selector is hidden, which keeps the dashboard tidy when a value is rarely going to change.

The mapping dialog also exposes the keyword (the literal string between the curly braces) and the default value, useful for debugging when a dashboard returns unexpected results.
