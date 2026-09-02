---
title: GraphQL
summary: "Query subgraphs and any GraphQL endpoint, with time-travel support."
path: /data-sources/graphql
group: data-sources
order: 6
---

The GraphQL data source connects Rewatch to subgraphs and any other GraphQL endpoint. It's the recommended way to query subgraphs hosted on [The Graph](https://thegraph.com), and works equally well against any custom GraphQL backend.

## 1. Add the data source

Open _Settings → Data Sources → New Data Source_, pick `GraphQL`, and enter the GraphQL endpoint URL.

## 2. Authentication

The GraphQL data source supports both API key and OAuth2 authentication. Configure them in the data source dialog if your endpoint requires them. If the endpoint is public, leave the auth fields empty. Use the _Test_ button to verify connectivity.

## 3. Write a query

Use standard GraphQL syntax in the editor. Nested fields map to the relations in the schema. Here's a sample query against a lending-protocol subgraph:

```graphql
query borrowEvents {
  borrows(
    first: $first,
    skip: $skip,
    orderBy: timestamp,
    orderDirection: desc
  ) {
    timestamp
    id
    account { id }
    emitter { id }
    market  { id }
    transaction { id }
    amount
  }
}
```

Click _Run Query_ when you're ready. The result table shows one column per top-level field; nested objects render as JSON cells.

## 4. Time-travel queries

The Graph supports querying entity state at any past block. You can pin a query to a specific block, or iterate over a range with a fixed step. Useful for charting state changes over time without indexing every single block.

```graphql
{
  challenges(block: { number: 8000000-1000 }) {
    challenger
    outcome
    application { id }
  }
}
```

The above iterates the query every 1000 blocks back from block `8,000,000`. Pair the result with a Pivot Table or Chart visualization for an instant time series.

## 5. Combine with other sources

GraphQL results play nicely with the [Query Results data source](/help/user-guide/querying/query-results-data-source) for joining subgraph data with off-chain prices, treasury snapshots, or anything indexed elsewhere.

For deeper context on GraphQL, the Graph protocol or specific subgraph schemas, refer to The Graph's [official documentation](https://thegraph.com/docs/).
