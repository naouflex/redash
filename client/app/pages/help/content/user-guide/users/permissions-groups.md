---
title: "Permissions & Groups"
summary: "How group membership and data-source ACLs control what each user can see."
path: /user-guide/users/permissions-groups
group: users
order: 2
---

The Rewatch permissions model is built around **groups** and the data sources each group is allowed to talk to. Group membership defines the actions a user can take and which data sources they can run queries against.

## How it works

Every user belongs to one or more groups. By default each new user joins the `Default` group. Common-access data sources (e.g. a public-read PostgreSQL replica) should be associated with the `Default` group.

Each data source is associated with one or more groups. The association sets one of two access levels:

-   **Full access**: view existing queries _and_ run new ones.
-   **View only**: see existing queries and their cached results, but cannot execute or edit them.

Any dashboard can include visualizations from any data source the dashboard's owner has access to. When someone without access to a particular data source opens a dashboard, the affected widgets render as empty placeholders. The user can still see the rest of the dashboard.

If a user has access to at least one widget on a dashboard, the dashboard appears in their list of all dashboards.

## Limiting access to specific tables

Rewatch doesn't try to act as a database firewall: it leans on the underlying database's own permission model. The pattern is:

1.  In the database, create a user with permissions on exactly the tables / columns you want to expose to a given audience.
2.  In Rewatch, create a data source that connects with that user.
3.  Associate that data source with the group that should have the limited view.

This keeps the source of truth (and the audit trail) where it belongs, in the database.
