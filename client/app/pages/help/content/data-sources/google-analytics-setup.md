---
title: Google Analytics
summary: Connect to Google Analytics via a service account.
path: /data-sources/google-analytics-setup
group: data-sources
order: 6
---

## Create a service account

1.  Open the [service accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts); pick a project if prompted.
2.  Click _Create service account_.
3.  Give it a name and tick _Furnish a new private key_; pick `JSON` as the key type.
4.  Click _Create_ - the JSON key downloads to your machine. Store it securely; this is your only copy.

## Enable the Analytics API

Enable the "Analytics API" for the same Google Cloud project from the API library.

## Grant access to your GA view

The new service account has an email address that looks like `quickstart@PROJECT-ID.iam.gserviceaccount.com`. Add it as a user with [Read & Analyze](https://support.google.com/analytics/answer/2884495) permission on whatever view you want to query (see [how to add a user](https://support.google.com/analytics/answer/1009702)).

## Create the data source

In _Settings → Data Sources_, add a _Google Analytics_ data source and upload the JSON key.

## Writing queries

Queries are JSON documents. Use Google's [Query Explorer](https://ga-dev-tools.appspot.com/query-explorer/) to discover available metrics and dimensions. Once results are in, you can post-process them with the [Query Results data source](/help/user-guide/querying/query-results-data-source).

### Top countries by new users (last 30 days)

```
{
  "ids": "ga:97038718",
  "start_date": "30daysAgo",
  "end_date": "yesterday",
  "metrics": "ga:newUsers",
  "dimensions": "ga:country",
  "max_results": 10,
  "sort": "-ga:newUsers"
}
```

### New users per day (last 30 days)

```
{
  "ids": "ga:97038718",
  "start_date": "30daysAgo",
  "end_date": "yesterday",
  "metrics": "ga:newUsers",
  "dimensions": "ga:date",
  "sort": "-ga:newUsers"
}
```
