---
title: CSV & Excel Files
summary: "Load CSV / xlsx files from any URL via a small YAML query."
path: /data-sources/csv-and-excel
group: data-sources
order: 1
---

Rewatch can read CSV files and Excel spreadsheets directly from any URL the host can reach. It's the lightweight option for one-off datasets, public reports and scratch work.

If the target Excel workbook contains multiple sheets, only the first sheet is used. To load a specific tab, export it to its own URL or load the workbook into Google Sheets and use the [Google Sheets data source](/help/data-sources/querying-a-google-spreadsheet) instead.

## Querying

Both the CSV and Excel query runners accept a small YAML document. At minimum, supply a `url` key. Optionally, pass a `user-agent` header.

```yaml
url: "https://www.example.com/path/to/file.xlsx"
user-agent: "Mozilla/5.0"
```

That's the entire query. Rewatch fetches the file, parses it and returns rows.

## Combining CSV with SQL

The CSV / Excel data source has no SQL layer of its own. To `JOIN` a CSV result with another dataset, or to filter / aggregate beyond a pivot table, use the [Query Results data source](/help/user-guide/querying/query-results-data-source) and reference your CSV-backed query as a regular table.
