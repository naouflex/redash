---
title: Dune API
summary: "Pull results from Dune queries by ID, with optional parameters."
path: /data-sources/dune-api
group: data-sources
order: 7
---

The Dune API data source pulls results from a query you've already authored on [Dune](https://dune.com). It's a great fit for highly-aggregated data sets (DEX prices, large LP balances, MEV-style trade analyses) where Dune's curated tables are still the easiest source.

![Dune API data source](/content/help/assets/ds-dune/ds-dune-00-dune_api.gif)

## 1. Author the query on Dune

Create the query on dune.com first, run it once to confirm it works, then grab the numeric `query_id` from the URL. For `https://dune.com/queries/1234567` the ID is `1234567`.

## 2. Configure the data source

Add the Dune API data source from _Settings → Data Sources_ and provide your Dune API key. Once it's connected, every Dune query becomes addressable by ID.

## 3. Write a query

Queries are YAML. The minimal form passes only the query ID:

```yaml
query_id: 1234567
```

Optionally pass query parameters and an execution tier:

```yaml
query_id: 1234567
query_parameters:
  param1: value1
  param2: value2
performance: medium  # default; "large" is also available
```

For a parameterised query, supply each parameter under `query_parameters`:

```yaml
query_id: 1234567
query_parameters:
  token_name: "Ether"
```

## 4. Performance tiers

Dune currently exposes two API performance tiers: `medium` and `large`. The free tier you may see in the Dune UI is not available via API. Pick `large` only when you genuinely need the extra capacity.

## 5. Errors and troubleshooting

-   Invalid YAML: the editor will surface a parser error; check spelling and indentation.
-   Missing `query_id`: the API returns an error.
-   Dune-side errors (auth, quota, query syntax) are surfaced verbatim so you can debug on Dune itself.

## 6. Cost discipline

The Dune API is metered. Always aggregate or filter your Dune queries on the Dune side rather than pulling raw transaction tables into Rewatch. The more specific and concise the query, the faster and cheaper it is to run.
