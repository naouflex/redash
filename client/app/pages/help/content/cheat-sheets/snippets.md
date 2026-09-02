---
title: Snippets Reference
summary: "Catalogue of named snippets for chain state, events, formatting and Discord."
path: /cheat-sheets/snippets
group: cheat-sheets
order: 1
---

Rewatch keeps a shared library of reusable [query snippets](/help/user-guide/querying/query-snippets). This page is the high-level catalogue. For each snippet, you'll find the trigger word and the broad shape of the substitution; the actual snippet body lives in _Settings → Query Snippets_ inside Rewatch where it stays editable.

## Data source helpers

| Trigger | Purpose |
| --- | --- |
| `WEB3_STATE` | Boilerplate YAML for an [EVMState](/help/data-sources/evm-chain-state) query, with placeholders for contract address, function name, args and block range. |
| `WEB3_EVENT` | Boilerplate YAML for an [EVMLogs](/help/data-sources/evm-chain-logs) event query, with placeholders for contract address, event name and block range. |
| `WEB3_FUNCTION_CALL` | Like `WEB3_EVENT`, but for function-call traces using `function_name`. |

## Formatting helpers

| Trigger | Purpose |
| --- | --- |
| `TIME_DIFF` | Pretty-print a SQL interval as relative time ("3 days ago"). |
| `ADDRESS_LINK` | Wrap an address column in a Markdown link to the right block explorer for the chain. |
| `TX_HASH_LINK` | Same idea for a transaction hash. |
| `BLOCK_LINK` | Same idea for a block number. |

These pair particularly well with the [Table visualization options](/help/user-guide/visualizations/table-options) (set the column to _Link_) and with [custom alert templates](/help/user-guide/alerts/custom-alert-notifications) where you'd otherwise hand-build long Markdown URLs.

## Discord helpers

| Trigger | Purpose |
| --- | --- |
| `ROLE_QUERY` | Drop-in subquery that resolves a Discord role to its ID for tagging. |
| `ROLE_MERGE` | Helper for merging role tags into a custom alert template. |
| `COLOR_QUERY` | Lookup table for canonical Discord embed colour codes. |
| `COLOR_MERGE` | Helper for merging colour values into a Discord embed JSON template. |

To add a snippet to the shared library on your instance, an admin can promote it via _Settings → Query Snippets_.
