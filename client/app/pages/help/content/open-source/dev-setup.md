---
title: Developer Setup
summary: Local Docker dev environment, hot reload and tests.
path: /open-source/dev-setup
group: admin
order: 2
---

This guide is for contributors hacking on Rewatch itself: backend code, frontend code, query runners or visualizations. For day-to-day operation of an existing instance, see [Self-hosting setup & mail configuration](/help/open-source/setup).

## 1. Install prerequisites

Rewatch (and its parent project Redash) is built on Python 3 + Node.js. The recommended local stack uses Docker for the heavy services and Node for the frontend dev server.

1.  Install [Docker and Docker Compose](https://docs.docker.com/engine/installation/).
2.  Install [Node.js](https://nodejs.org/en/download/) (14.16.1 or newer).
3.  Install Yarn 1.22.10 or newer:

```bash
npm install --global yarn@1.22.10
```

## 2. Set up the project

### Clone the repo

```bash
git clone https://github.com/getredash/redash.git
cd redash/
```

### Set up environment variables

```bash
touch .env
```

Set at least `REDASH_COOKIE_SECRET`. Also drop in any other [environment variables](https://redash.io/help/open-source/admin-guide/env-vars-settings) you need.

### Start the Docker services

```bash
docker-compose up -d
```

This builds the Docker images, fetches prebuilt ones, and starts the web server, worker, PostgreSQL and Redis. If you hit `errno 137` or `errno 134` during `RUN yarn build`, give the Docker VM more memory (4 GB minimum, 8 GB recommended).

### Install Node packages

```bash
yarn --frozen-lockfile
```

### Create the database

```bash
docker-compose run --rm server create_db
docker-compose run --rm postgres psql -h postgres -U postgres -c "create database tests"
```

### Health check

After installation, hit `/ping` on the web server. The expected response is:

```
PONG.
```

## 3. Day-to-day development

### Run the webpack dev server

Once the Docker services are up (`docker-compose up` or `docker-compose start`), the API is available at `http://localhost:5000/`.

You still need to build the frontend at least once for the static pages (login etc.):

```bash
yarn build
```

For active frontend development, use the dev server on port 8080 instead:

```bash
yarn start
```

It rebuilds on change and proxies API calls to `localhost:5000`.

### Installing new Python packages

If you add to `requirements.txt`, rebuild the worker and server images:

```bash
docker-compose build worker
docker-compose build server
```

### Running tests

```bash
docker-compose run --rm server tests
```

The test suite uses its own database. Create it once before running tests for the first time:

```bash
docker-compose run --rm postgres psql -h postgres -U postgres -c "create database tests;"
```

### Debugging

For step-through debugging from VS Code, see the [Redash debugging guide](https://redash.io/help/open-source/dev-guide/debugging).
