---
title: Query Snippets
summary: "Reusable SQL fragments that auto-complete from the query editor."
path: /user-guide/querying/query-snippets
group: queries
order: 4
---

Copy and paste are a big part of writing database queries. Frequent `JOIN`s and complex `CASE` expressions show up over and over again, and they're easier to keep consistent when they live in one place. **Query Snippets** are named SQL fragments that the whole team can share and trigger via auto-complete.

## Create a snippet

Create snippets at _Settings → Query Snippets_. A snippet has a trigger word, an optional description, and a body. Here's an example:

```
JOIN organizations org ON org.id = ${1:table}.org_id
```

![Creating a snippet](/content/help/assets/query-snippets/query-snippets-00-create_snippets.gif)

## Insert a snippet

With Live Auto Complete enabled (the default), start typing the trigger word inside the query editor. Auto-complete will suggest the snippet alongside ordinary database identifiers.

![Inserting a snippet](/content/help/assets/query-snippets/query-snippets-01-insert_snippets.gif)

When the snippet is rendered, the dollar sign `$` and curly braces `{}` are stripped away, and the placeholder text (e.g. `table`) is highlighted so the user can replace it.

![Snippet replacement](/content/help/assets/query-snippets/query-snippets-02-create_snippets.gif)

Other ideas worth turning into snippets:

-   Frequently-used `JOIN` statements.
-   Complicated clauses such as `WITH` or `CASE`.
-   Conditional formatting boilerplate, e.g. anything you'd otherwise paste from a docs page.

## Insertion points

In `${1:table}`, `${1}` is an _insertion point_ and `table` is its placeholder text. You designate insertion points by wrapping a tab order integer in `${...}`. A text placeholder preceded by a colon `:` is optional but useful for users unfamiliar with your snippet.

![Snippet insertion points](/content/help/assets/query-snippets/query-snippets-03-snippets_insertion_points.gif)

When the snippet below is rendered:

```
AND (invoices.complete IS NULL OR invoices.complete <> '${2}')
AND (invoices.canceled IS NULL OR invoices.canceled <> '${1}')
AND (invoices.modified IS NULL OR invoices.modified_date <> '${0: this_date}')
```

The cursor jumps to the second line between the quote marks. Pressing `Tab` moves it backwards to the first line, then forwards to the third line where `this_date` is highlighted.

An insertion point of zero `${0}` is always the last point in the tab order.

If Live Auto Complete is disabled (because your schema exceeds 5,000 tokens, for example), trigger snippets manually with `Ctrl` + `Space`.
