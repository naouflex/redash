---
title: Getting Started
summary: "Connect a data source, write your first query, build a dashboard, and invite your team."
path: /user-guide/getting-started
group: intro
order: 1
---

If you only have ten minutes, the [Quickstart](/help/user-guide/quickstart) gives you the shortest path to your first dashboard. This page covers the same workflow at one level of detail higher: provisioning data sources, publishing queries, and inviting collaborators.

## 1. Add a data source

Open the data source management page from _Settings_ in the sidebar, then pick a database or service from the catalogue. Rewatch ships with first-class support for traditional databases (PostgreSQL, MySQL, BigQuery, MongoDB and dozens more) plus blockchain-aware connectors:

-   [EVM Chain Logs](/help/data-sources/evm-chain-logs) and [EVM Chain State](/help/data-sources/evm-chain-state) for raw on-chain data
-   [GraphQL](/help/data-sources/graphql) for The Graph and other GraphQL endpoints
-   [Dune API](/help/data-sources/dune-api) for re-using Dune queries
-   [JSON / URL](/help/data-sources/querying-urls), [CSV / Excel](/help/data-sources/csv-and-excel) and [Python](/help/data-sources/python) for everything else

If your data source lives behind a firewall, allow inbound access from the host running Rewatch. Use a dedicated read-only user wherever possible.

## 2. Write a query

Once a data source is connected, click _Create_ in the navbar and pick _Query_. The editor speaks the query language native to the underlying data source: SQL for relational stores, JSON / Mongo aggregation for document stores, YAML for HTTP / EVM / Dune sources. See [Creating and Editing Queries](/help/user-guide/querying/writing-queries) for shortcuts and the schema browser.

## 3. Add visualizations

By default, query results appear as a table. Add a visualization above the results pane to see patterns at a glance. The [Visualizations overview](/help/user-guide/visualizations) lists every chart type and links to detailed configuration guides.

## 4. Create a dashboard

Combine visualizations and free-form text into thematic dashboards. Click _Create_ in the navbar and choose _Dashboard_. Dashboards are visible to everyone in your organization and can be shared via secret link with people outside it. See the [Dashboards section](/help/user-guide/dashboards) for the full walkthrough.

## 5. Invite colleagues

Analytics is better as a team sport. To add a new user, follow [Inviting Users](/help/user-guide/users/inviting-users). To control who can see what, read [Permissions & Groups](/help/user-guide/users/permissions-groups).
