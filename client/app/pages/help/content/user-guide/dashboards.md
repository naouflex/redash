---
title: Creating and Editing Dashboards
summary: Combine visualizations and text into a single shareable view.
path: /user-guide/dashboards
group: dashboards
order: 1
---

A dashboard combines visualizations and free-form text boxes into a single shareable view. The Rewatch dashboards page is the top-level entry point for the curated dashboards and your own.

## Creating a dashboard

Click _Create_ in the navbar and pick _Dashboard_. After naming it, click _Add Widget_ to drop in an existing visualization or a text block. The widget picker lets you search published queries or pick from a recents list.

![Creating a dashboard](/content/help/assets/dashboards/dashboards-00-creating_dashboard.gif)

### Dashboard URLs

Each dashboard gets an `id` and a `slug` derived from its name. For example, a dashboard called "Account Overview" might live at:

```
https://rewatch.naoufel.io/dashboards/251-account-overview
```

If you rename the dashboard, the slug updates automatically. The singular `/dashboard/<id-or-slug>` endpoint also works:

```
https://rewatch.naoufel.io/dashboards/251
https://rewatch.naoufel.io/dashboards/account-overview
```

IDs are unique. If multiple dashboards share the same slug, visiting the slug URL redirects to the earliest-created one.

## Picking visualizations

Widgets pick from existing query visualizations. You can't create a brand-new visualization from inside the _Add Widget_ dialog, open the underlying query and add the visualization there first ([instructions](/help/user-guide/visualizations/visualizations-how-to)).

## Adding text boxes

The _Text Box_ tab in the _Add Widget_ dialog accepts [Markdown](https://daringfireball.net/projects/markdown/syntax), including inline images via the standard `![alt](url)` syntax. Use text boxes liberally to explain what each section of the dashboard represents.

## Dashboard filters

If your queries use [filters](/help/user-guide/querying/query-filters), enable _Use Dashboard Level Filters_ from _Dashboard Settings_ to apply the same filter across every widget at once.

![Dashboard filters](/content/help/assets/dashboards/dashboards-01-filters_1.gif)
![Dashboard filters in action](/content/help/assets/dashboards/dashboards-02-filters_2.gif)

## Managing dashboard permissions

By default, only the dashboard owner and admins can edit a dashboard. Experimental multi-owner support lets you share edit access. An admin needs to flip _Settings → Organization → Enable experimental multiple owners support_ first.

![Multi-owner support](/content/help/assets/dashboards/dashboards-03-experimental-owners-support.png)

Once enabled, the dashboard's options menu gains a _Manage Permissions_ entry where you can add other editors. As with queries, no notification is sent automatically.

![Manage permissions](/content/help/assets/dashboards/dashboards-04-manage_permissions_second_part.gif)

## Refreshing

Even large dashboards load quickly because every widget reads from a query result cache. To force a manual refresh, click the _Refresh_ button at the top right; this re-runs every query on the dashboard.

![Refreshing a dashboard](/content/help/assets/dashboards/dashboards-05-refresh.gif)

To refresh on a schedule, open the refresh dropdown and pick an interval. Allowed intervals (in seconds): 60, 300, 600, 1800, 3600, 43200, 86400. You can also pass `?refresh=<seconds>` in the URL.

Automatic refresh runs in the browser, so it only ticks while a logged-in user has the dashboard open. To guarantee fresh data for alerts and embeds, [schedule the underlying queries](/help/user-guide/querying/scheduling) instead.

On public dashboards there is no Refresh button, but `?refresh=<seconds>` still works:

![Public dashboard refresh](/content/help/assets/dashboards/dashboards-06-public-dashboard-refresh.png)

For dashboards with parameters, you can also force a refresh by changing a parameter value and clicking _Apply Changes_.
