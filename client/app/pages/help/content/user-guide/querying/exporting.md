---
title: Downloading & Exporting Results
summary: "Get query results as CSV, TSV, Excel or JSON, manually or via the API."
path: /user-guide/querying/exporting
group: queries
order: 7
---

Rewatch makes it easy to take a query result out of the browser, either as a one-off file or as a live API endpoint that always returns the latest cached result.

## Manual download

Open any query, click the vertical ellipsis (`⋮`) below the results pane, and pick CSV, TSV or Excel. The file downloads immediately and contains exactly the rows shown above the button.

![Manual download menu](/content/help/assets/exporting/exporting-00-download_query.gif)

## Latest results via the API

Open any query and click the horizontal ellipsis (`…`) above the editor, then pick _Show API Key_. The modal that appears includes ready-to-share links to the latest cached result in CSV and JSON.

![Show API key modal](/content/help/assets/exporting/exporting-01-show_api.gif)

The Excel format isn't shown in the dialog, but you can grab it by changing the file-type suffix in the URL from `.csv` / `.json` to `.xlsx`.

The "latest results" API does **not** support queries with parameters: parameter values would have to be specified in every request. For parameterised queries, call `/api/queries/<id>/results` via POST and pass the parameters in the JSON body. See [Integrations & API](/help/open-source/integrations-api) for the request shape.
