---
title: EVM Chain Logs
summary: "Pull events and function calls from any EVM-compatible chain."
path: /data-sources/evm-chain-logs
group: data-sources
order: 4
---

The **EVMLogs** query runner is the workhorse for reading raw on-chain events. It speaks JSON-RPC to any EVM-compatible chain and exposes a small YAML query shape for fetching event logs and (optionally) function call traces.

## 1. Add the data source

1.  Open _Settings → Data Sources_ and click _New Data Source_.
2.  Pick `EVMLogs` from the list.
3.  Provide:
    -   **Ethereum RPC URL**: the JSON-RPC endpoint of an Ethereum node. For self-hosted nodes this is usually `http://localhost:8545`. For hosted providers (Infura, Alchemy, QuickNode, Ankr…) the provider gives you the URL.
    -   **Etherscan API Key**: needed to fetch contract ABIs by address. Sign up on [Etherscan](https://etherscan.io/) for a free key.
4.  Click _Add_.

The same data source type works against other chains by pointing it at the right RPC + block explorer pair (Optimism, Arbitrum, Polygon, Fantom, BSC, Avalanche, etc.).

## 2. Write a query

Queries are YAML documents:

```yaml
contract_address: 0xYourContractAddressHere
event_name: YourEventNameHere
start_block: YourStartBlockHere
end_block: YourEndBlockHere
```

-   `contract_address`: the smart contract whose logs you want to fetch.
-   `event_name`: the event emitted by the contract (e.g. `Transfer`, `Borrow`, `Repay`).
-   `start_block` / `end_block`: the block range to scan.

To pull function call traces instead, use `function_name`:

```yaml
contract_address: 0xYourContractAddressHere
function_name: YourFunctionNameHere
start_block: YourStartBlockHere
end_block: YourEndBlockHere
```

## 3. Block ranges

Block ranges accept three forms:

-   **Absolute numbers**: `start_block: 17_000_000` and `end_block: 17_500_000`.
-   **Relative `start_block`**: a negative number counts back from `end_block`. `start_block: -1000` and `end_block: 18_000_000` fetches the last 1,000 blocks before `end_block`.
-   **`latest` keyword**: `end_block: latest` always points at the most recently mined block.

### Be mindful of range size

Querying a wide block range eats RPC capacity, your database resources, and (with most hosted RPC providers) money. Rule of thumb: start narrow, broaden only when you know the query produces a sensible amount of data.

## 4. Execute

Click _Execute_ in the query editor. Results land in the table below; from there you can save the query, attach a [visualization](/help/user-guide/visualizations/visualizations-how-to), or pin it to a dashboard.

## 5. Combine with other sources

Pair `EVMLogs` queries with the [Query Results data source](/help/user-guide/querying/query-results-data-source) to join on-chain events with off-chain data (subgraphs, prices from the Dune API, internal CSVs…). Use [parameters](/help/user-guide/querying/query-parameters) to make the contract address and block range editable from a dashboard.
