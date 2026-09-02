---
title: Scheduling Queries
summary: "Run queries automatically to keep dashboards and alerts current."
path: /user-guide/querying/scheduling
group: queries
order: 5
---

Scheduled query executions keep dashboards fresh and power any [alert](/help/user-guide/alerts) you wire up. By default, queries don't have a schedule. Setting one is a click in the bottom-left of the query editor.

Click _Never_ to open the picker with the allowed schedule intervals.

![Schedule a query](/content/help/assets/scheduling/scheduling-00-schedule-a-query.gif)

The query then runs automatically.

## Time-of-day scheduling and UTC

When you schedule a query to run at a specific time of day, Rewatch converts your selection to UTC using your computer's local timezone. So if you want a query to fire at `00:00` UTC each day but you're in CDT (UTC-5), enter `19:00` in the picker. The picker shows the resulting UTC time next to your selection so you can sanity-check.

## Scheduled query failure reports {#Scheduled-Query-Failure-Reports}

Rewatch can email query owners once an hour if one or more scheduled queries failed. The emails continue until the queries succeed again. Failure reports run on an independent process from the actual query schedule, so it can take up to an hour after a failed run for the report email to arrive.

To toggle failure reports, open _Settings → Organization → Feature Flags_ and tick _Email query owners when scheduled queries fail_.

![Failure reports flag](/content/help/assets/scheduling/scheduling-01-failure-report.png)

For alerts that depend on a scheduled query, see [Setting up an alert](/help/user-guide/alerts/setting-up-an-alert) for the recommended schedule pattern.
