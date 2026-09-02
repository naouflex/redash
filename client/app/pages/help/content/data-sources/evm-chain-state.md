---
title: EVM Chain State
summary: "Read smart contract state across blocks with the EVMState query runner."
path: /data-sources/evm-chain-state
group: data-sources
order: 5
---

The **EVMState** query runner reads smart contract state on demand: balances, configuration, oracle prices, anything exposed by a `view` or `pure` function. It complements the [EVMLogs](/help/data-sources/evm-chain-logs) data source, which reads emitted events.

## 1. Add the data source

1.  Open _Settings → Data Sources → New Data Source_.
2.  Pick `EVMState`.
3.  Provide:
    -   **Ethereum RPC URL**: the JSON-RPC endpoint (self-hosted or via Infura / Alchemy / QuickNode / Ankr).
    -   **Etherscan API Key**: used to look up contract ABIs.

## 2. Write a query

Queries are YAML. Required fields are `contract_address` and `function_name`:

```yaml
contract_address: "0x1234567890abcdef1234567890abcdef123456789"
function_name: "balanceOf"
args: ["0xabcdef1234567890abcdef1234567890abcdef12"]
start_block: 0
end_block: "latest"
lag: 1000
```

Field reference:

1.  `contract_address`: a single address or an array.
2.  `function_name`: a single function or an array.
3.  `args`: optional list of arguments. Omit when the function takes none.
4.  `start_block`: optional first block to read at.
5.  `end_block`: optional last block to read at.
6.  `lag`: optional number of blocks to skip between successive reads (controls sample rate).

## 3. Lag and block range

Combine `lag` with a `start_block` / `end_block` range to keep result sizes manageable. For example, with `start_block: 17_000_000`, `end_block: 18_000_000` and `lag: 1_000`, you get 1,000 samples (every 1,000th block) instead of one million.

## 4. Multiple contracts

For event-style queries, you can scan multiple contracts in one go by passing an array of addresses, as long as they share the same function signature:

```yaml
contract_address:
  - "0x1234567890abcdef1234567890abcdef123456789"
  - "0xabcdef1234567890abcdef1234567890abcdef12"
function_name: "totalSupply"
```

The result includes a column identifying which contract each row came from.

## 5. Multiple functions

You can call several functions sharing the same arguments:

```yaml
contract_address:
  - "0x1234567890abcdef1234567890abcdef123456789"
  - "0xabcdef1234567890abcdef1234567890abcdef12"
function_name: ["function1", "function2"]
args: ["arg1", "arg2"]
```

## When to use it

-   Treasury composition snapshots over time.
-   Oracle price history from a `latestAnswer()` call.
-   Market parameter drift on lending markets (e.g. `collateralFactorMantissa`, `borrowCap`).
-   Any "what was X equal to at block Y" question.

Pair the result with the [Query Results data source](/help/user-guide/querying/query-results-data-source) to join state snapshots with event data.
