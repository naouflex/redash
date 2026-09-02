---
title: Creating and Editing Queries
summary: "Editor shortcuts, schema browser, auto-complete, publishing, archiving and forking."
path: /user-guide/querying/writing-queries
group: queries
order: 2
---

To create a new query, click _Create_ in the navbar and choose _Query_.

![Writing a query](/content/help/assets/writing-queries/writing-queries-00-writing_a_query.gif)

## The query editor

### Query syntax

In most cases the query language is the one native to the data source. Where Rewatch layers something on top (its YAML syntax for HTTP / JSON / EVM / Dune sources, or its extended MongoDB JSON), the per-source pages document it.

### Keyboard shortcuts

-   Execute query: `Ctrl`/`Cmd` + `Enter`
-   Save query: `Ctrl`/`Cmd` + `S`
-   Toggle auto-complete: `Ctrl` + `Space`
-   Toggle schema browser: `Alt`/`Option` + `D`

### Schema browser

The pane on the left lists every table the connected data source exposes. Click a table to expand its columns; click the double-arrow icon to insert the identifier into your query. The search box filters the schema, and the refresh button forces a re-fetch (otherwise it refreshes periodically in the background).

![Schema browser](/content/help/assets/writing-queries/writing-queries-01-schema-browser.gif)

Not every data source can introspect its schema, that's fine, the schema browser will simply stay empty.

### Auto-complete

Live auto-complete is on by default and suggests tables, columns and SQL keywords as you type. Disable it with the lightning-bolt icon below the editor; you can still trigger a single completion with `Ctrl` + `Space`.

For schemas larger than five thousand identifiers, live auto-complete is automatically off to keep the editor snappy. Auto-complete also recognises any saved [query snippets](/help/user-guide/querying/query-snippets).

## Query settings

### Published vs unpublished queries

Each query starts as an unpublished draft and is invisible to dashboards and alerts. Renaming the query or clicking _Publish_ publishes it; clicking _Unpublish_ reverses the action (existing dashboards and alerts that already reference the query keep working, only new ones are blocked).

Publishing does not change visibility: every signed-in user in the organization can see every query.

### Archiving a query

You can't delete queries, but you can archive them. Archiving hides the query from the lists while keeping permalinks alive. Open the kebab menu (`⋮`) at the top right and pick _Archive_.

![Archiving a query](/content/help/assets/writing-queries/writing-queries-02-archiving-queries.gif)

### Duplicating (forking) a query

Need a copy of an existing query, whether yours or someone else's? Hit the _Fork_ button. You become the owner of the new copy.

![Forking a query](/content/help/assets/writing-queries/writing-queries-03-fork_a_query.gif)

## Managing query permissions {#Managing-Query-Permissions}

By default, only the query owner and members of the _Admin_ group can edit a saved query. Experimental multi-owner support lets you share edit access with anyone else: an admin needs to enable _Settings → Organization → Enable experimental multiple owners support_ first.

![Enable experimental multi-owner support](/content/help/assets/writing-queries/writing-queries-04-experimental-owners-support.png)

Once enabled, the kebab menu on every query gains a _Manage Permissions_ entry. Use the dialog that opens to add other users as editors. Note that they will _not_ receive an automatic notification, so you'll want to ping them yourself.

![Manage permissions](/content/help/assets/writing-queries/writing-queries-05-experimental-permissions-button.png)
