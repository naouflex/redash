---
title: Setting Up an Alert
summary: Step-by-step walkthrough of creating your first alert.
path: /user-guide/alerts/setting-up-an-alert
group: alerts
order: 2
---

Alerts notify you when a field returned by a [scheduled query](/help/user-guide/querying/scheduling) meets a threshold. They're great for monitoring the health of any system you can query (lending markets, on-chain activity, product KPIs, infra metrics) and for kicking off downstream workflows in tools like Zapier, IFTTT or n8n.

A query schedule is not strictly required, but it is strongly recommended. If you attach an alert to a non-scheduled query, you'll only be notified when someone runs that query manually. Alerts _do not_ work for queries that take parameters.

## The alerts list

Click _Alerts_ in the navbar to see every alert, by default sorted reverse-chronologically by creation date. Re-sort by clicking any column header.

![Alerts list](/content/help/assets/alert-setup/alert-setup-00-alerts_page.gif)

-   **Name**: the alert's display name. You can rename it any time.
-   **Created By**: the user who created it.
-   **State**: `UNKNOWN`, `TRIGGERED` or `OK`.

## Creating an alert

1.  Click _Create_ in the navbar, then _New Alert_.
2.  Search for a target query. If you don't see it, make sure it's published and uses no parameters.
3.  Configure the trigger:
    -   **Value column**: which field of the result is evaluated.
    -   **Condition**: the comparison operator.
    -   **Threshold**: the value the column is compared against.

    If the query returns multiple rows, only the first one is used. The current value of the chosen column shows up beneath the dropdown.
4.  Pick how often to be notified while the alert remains `TRIGGERED`:
    -   _Just once until back to normal_: notify once when the status flips from `OK` to `TRIGGERED`.
    -   _Each time alert is evaluated until back to normal_: notify on every evaluation while triggered.
    -   _Each time alert is evaluated for each row in the result_: notify for every row currently in `TRIGGERED` state. Useful when the same query represents many independent series.
    -   _At most every…_: set a minimum interval between notifications.

    Regardless of which option you pick, you'll always get a notification when the status crosses from `OK` to `TRIGGERED` or back.
5.  Pick a **template**. The default template links to the alert and query screens; for richer messages see [Customising alert notifications](/help/user-guide/alerts/custom-alert-notifications).
6.  Click _Create Alert_ and then choose at least one [destination](/help/user-guide/alerts/alert-destinations). Without a destination you won't receive anything.

![Create an alert](/content/help/assets/alert-setup/alert-setup-01-create_alert.gif)

![Choose an alert destination](/content/help/assets/alert-setup/alert-setup-02-alert_destination.png)

## Muting alerts

To temporarily silence an alert without deleting it, open its kebab menu (`⋮`) and pick _Mute Notifications_. Use the same menu to unmute.

## Alert statuses {#Alert-Status-&-Frequency}

-   **`TRIGGERED`**: the value column matched the configured condition on the most recent run.
-   **`OK`**: the most recent run did not match the condition. (The alert may have been triggered before; this only describes the latest run.)
-   **`UNKNOWN`**: there isn't enough data to evaluate the alert. Shown immediately after creation, or when the query result is empty / missing the value column.

## Notification frequency in practice {#Configuration-settings}

Notifications fire whenever the alert status changes from `OK` to `TRIGGERED` or vice versa. Consider an alert on a query that runs daily; suppose its status across the week is:

| Day | Status |
| --- | --- |
| Monday | `OK` |
| Tuesday | `OK` |
| Wednesday | `TRIGGERED` |
| Thursday | `TRIGGERED` |
| Friday | `TRIGGERED` |
| Saturday | `TRIGGERED` |
| Sunday | `OK` |

With the frequency set to _Just once_, you'd be notified on Wednesday (status flipped to triggered) and on Sunday (back to OK). Choose _Each time alert is evaluated_ to also be notified on Thursday, Friday and Saturday.
