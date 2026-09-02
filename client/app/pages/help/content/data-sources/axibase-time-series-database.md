---
title: Axibase Time Series Database
summary: "Connect to Axibase Time Series Database (ATSD)."
path: /data-sources/axibase-time-series-database
group: data-sources
order: 7
---

## 1\. Create a read-only user group in ATSD

1.  Sign in to the ATSD web interface (`https://<atsd-host>:8443`).
2.  Open _Admin → User groups_ and click _Create_.
3.  Pick a name (and optional description) for the group.
4.  Grant the group _Read_ permission on _All entities_.
5.  Save.

## 2\. Create a user

1.  Open _Admin → Users_, click _Create_.
2.  Pick a username and password.
3.  Add the user to the group you created above (under _Entity Permissions_).
4.  Save.

## 3\. Create the data source

In _Settings → Data Sources_, add a new data source of type _Axibase Time Series Database_ and fill in:

| Field | Default | Required |
| --- | --- | --- |
| Username | - | Yes |
| Password | - | Yes |
| Metric Limit | 5000 | No - caps how many ATSD metrics show up in the schema browser. |
| Metric Filter | - | No - limit metrics to those matching an expression. |
| Metric Minimum Insert Date | - | No - drop metrics whose latest insert is older than the date (ISO format / endtime syntax). |
| Protocol | http | Yes - `http` or `https`. |
| Trust SSL Certificate | false | No - required for self-signed certs. |
| Host | localhost | No - the ATSD hostname or IP. |
| Port | 8088 | No - typically 8088 (http) or 8443 (https). |
| Connection Timeout | 600 | No - in seconds. |

Click _Save_, then _Test_ to verify the connection. Once the test succeeds you can write queries against any data stored in ATSD.
