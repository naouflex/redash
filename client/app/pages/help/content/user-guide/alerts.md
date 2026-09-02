---
title: Alerts
summary: Get notified when a query result crosses a threshold you care about.
path: /user-guide/alerts
group: alerts
order: 1
---

Alerts watch a single column of a single (parameter-free) query and fire a notification when its value crosses a threshold. They're a great fit for any scheduled query whose result needs to wake somebody up: SLA dashboards, on-chain monitoring, billing or quota watchdogs, and any custom pipeline you want to keep an eye on.

The pages in this group cover alerts end-to-end:

-   [Setting up an alert](/help/user-guide/alerts/setting-up-an-alert) - pick a query, a value column, a condition and a threshold.
-   [Alert destinations](/help/user-guide/alerts/alert-destinations) - wire alerts into email, Discord, Twitter, Twitter Private and Telegram.
-   [Customising alert notifications](/help/user-guide/alerts/custom-alert-notifications) - write your own subject, body and JSON templates with built-in variables.
-   [Multiple column alerts](/help/user-guide/alerts/multiple-column-alert) - combine several columns into a single boolean trigger value.

Alerts are evaluated after every execution of the underlying query, so you'll typically pair them with a [schedule](/help/user-guide/querying/scheduling). Alerts cannot be attached to parameterised queries.
