---
title: Google Sheets
summary: Treat a Google Sheet as a data source via a service account.
path: /data-sources/querying-a-google-spreadsheet
group: data-sources
order: 5
---

## Setup

Connecting to Google Sheets requires a Google [service account](https://cloud.google.com/iam/docs/understanding-service-accounts) so the app can read sheets without any human signing in. Service accounts come with a JSON key file you upload during data source setup.

### Creating a service account

1.  Open the [API credentials page](https://console.cloud.google.com/apis/credentials); pick or create a project.
2.  Click _Create credentials → Service account key_.
3.  Pick the project and assign _Project > Viewer_ as the role.
4.  Pick `JSON` as the key type and click _Create_.

A `.json` file downloads. In _Settings → Data Sources_, add a _GoogleSpreadsheet_ data source, name it, and upload the file.

## Querying

To load a sheet you need to **share it with the service account's email address**. The email is in the JSON key file under `"client_email"`, or on the [Google Sheets API credentials page](https://console.cloud.google.com/apis/api/sheets.googleapis.com/credentials). Share like you would with any user.

Then create a new query against your Google Sheets data source. The query body is just the spreadsheet's ID, optionally followed by `|<tab-index>` (zero-based) to pick a specific tab:

```
1DFuuOMFzNoFQ5EJ2JE2zB79-0uR5zVKvc0EikmvnDgk|0
```

That loads the first tab. Use `|1` for the second tab, and so on.

The spreadsheet ID is the long random-looking string in the spreadsheet URL:

```
https://docs.google.com/spreadsheets/d/<ID>/edit#gid=0
```

If your organization restricts external sharing, create the service account inside the same organization to sidestep the restriction.

## Filtering data

Sheets are loaded in full - there is no built-in server-side filter. To filter or aggregate beyond a pivot table, use the [Query Results data source](/help/user-guide/querying/query-results-data-source) to query the result of the Sheets query with SQL.

## Date parsing

Date strings are parsed with [python-dateutil](https://dateutil.readthedocs.io/en/stable/). When dates come back wrong, switch the column to ISO-8601 in your sheet (or to one of the other formats listed in [dateutil's parse examples](https://dateutil.readthedocs.io/en/stable/examples.html#parse-examples)).
