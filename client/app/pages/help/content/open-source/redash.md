---
title: Redash Heritage
summary: Rewatch extends Redash. Useful upstream developer references.
path: /open-source/redash
group: admin
order: 3
---

Rewatch is a forked and upgraded version of [Redash](https://redash.io). It runs on:

-   **Backend**: Python 3, Flask, RQ, SQLAlchemy.
-   **Frontend**: ES6, React, Webpack.
-   **Storage**: PostgreSQL 9.6+ for metadata, Redis 3+ for queues and caching.

Most upstream Redash documentation applies directly. The links below are the ones I reach for most often:

## Setup guides

-   [Docker-based developer installation](https://redash.io/help/open-source/dev-guide/docker) - the recommended path for first-time contributors.
-   [Debugging on Docker with VS Code](https://redash.io/help/open-source/dev-guide/debugging).
-   [Bare-metal developer installation](https://redash.io/help/open-source/dev-guide/setup) - for experienced devs who want to run everything natively.
-   [Frontend dev against a remote backend](https://redash.io/help/open-source/dev-guide/remote-server).
-   [Frontend end-to-end tests](https://redash.io/help/open-source/dev-guide/end-to-end-tests).

## Extending Rewatch

-   [How to create a new visualization type](https://discuss.redash.io/t/how-to-create-new-visualization-types-in-redash/86) (see the [local guide](/help/open-source/visualizations-dev) for our React conventions).
-   [How to create a new query runner](https://redash.io/help/open-source/dev-guide/write-a-query-runner) (and the [step-by-step in this docs site](/help/open-source/query-runners)).

## Getting help

-   [Redash discussion forum](https://github.com/getredash/redash/discussions/categories/q-a) for upstream questions.
-   Open an issue on the Rewatch repo for everything Rewatch-specific.

## A note on Windows

Running the full stack on Windows is theoretically possible but not a path I actively support. Use WSL2 or a Linux VM for the smoothest experience.
