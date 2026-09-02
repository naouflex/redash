---
title: Google BigQuery
summary: Use a service account to connect to BigQuery.
path: /data-sources/bigquery-setup
group: data-sources
order: 2
---

## Data source setup

The _Project ID_ and _JSON Key File_ fields are always required. The JSON key comes from creating a Google service account (see below).

If your schema is very large (more than ~5,000 tables / columns), untick _Load Schema_ to keep the editor responsive - many browsers slow down or crash on huge schemas.

BigQuery supports both Legacy and Standard SQL. Standard SQL is the default; toggle _Use Standard SQL_ off if you want Legacy. Need both? Create two data sources, one for each dialect.

Read about Processing Location in the [BigQuery docs](https://cloud.google.com/bigquery/docs/locations). A "job not found" error usually means the processing location is wrong.

The optional _Scanned Data Limit_ performs a dry-run on every execution and rejects queries that would scan more than the configured limit - useful for keeping cost predictable. The optional _Maximum Billing Tier_ is forwarded to BigQuery; see their [job configuration reference](https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#jobconfigurationquery) for details.

## Creating a Google service account

1.  Open the [API credentials page](https://console.cloud.google.com/apis/credentials); if prompted, pick or create a project.
2.  Click _Create credentials → Service account key_.
3.  Pick the project and assign the `BigQuery Admin` role from the tree.
4.  Pick `JSON` as the key type and hit _Create_; a `.json` file downloads to your machine. Upload it when configuring the data source.

## Permissions and roles

Among the predefined BigQuery roles, only the admin role has every permission needed (creating queries and listing tables). To craft a custom role, grant:

-   `bigquery.jobs.create`
-   `bigquery.jobs.get`
-   `bigquery.jobs.update`
-   `bigquery.datasets.get`
-   `bigquery.tables.list`
-   `bigquery.tables.get`
-   `bigquery.tables.getData`
