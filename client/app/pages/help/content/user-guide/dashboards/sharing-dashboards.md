---
title: Sharing and Embedding Dashboards
summary: "Publish, share via secret link, and embed dashboards in other tools."
path: /user-guide/dashboards/sharing-dashboards
group: dashboards
order: 2
---

Click the _Publish_ button in the top right of a dashboard to make it visible to other signed-in members of the organization who have the right data source permissions.

To share with people outside the organization, click the share icon next to _Publish_. The dialog generates a secret URL anyone with the link can open. External viewers see the dashboard widgets but cannot navigate the rest of the app or open the underlying queries.

![Publish & share](/content/help/assets/dashboard-share/dashboard-share-00-publish-share.gif)

To revoke access, toggle _Allow public access_ off. That breaks any previously-shared link; toggling it back on generates a fresh secret URL.

Admins can globally disable all public URLs by setting the environment variable `REDASH_DISABLE_PUBLIC_URLS` to `"true"` on the server.

## Permissions on shared dashboards

A signed-in viewer can only see widgets backed by data sources they have access to. Anyone who can see a widget can also open the underlying query. To share a dashboard while restricting query access, you have two options:

1.  Use the secret-link option (external viewers can't navigate to the underlying queries).
2.  Create a dedicated, narrowly-scoped data source for the restricted users and rely on database-level permissions.

For more on the underlying permissions model, see [Permissions & Groups](/help/user-guide/users/permissions-groups).

## Embedding dashboards

Some teams embed dashboards inside other tools (Notion, internal portals, wikis…) using `<iframe>` tags. To make embedding nicer, use the _Full Screen_ button next to _Refresh_: it strips the chrome and gives you a clean URL to drop in your iframe.

![Full screen button](/content/help/assets/dashboard-share/dashboard-share-01-full_screen_button.png)

Embedding a private dashboard requires the viewer to be signed in. For external viewers, generate a secret link instead, secret links are full-screen by default.

Embedded dashboards may use parameters, but any viewer can modify them. That makes Rewatch a poor fit for fully external embedded analytics. Only share dashboards with stakeholders you trust.
