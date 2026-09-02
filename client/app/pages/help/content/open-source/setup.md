---
title: "Self-hosting Setup & Mail Configuration"
summary: "Provisioning a fresh instance with Docker Compose, plus mail / SSO / HTTPS basics."
path: /open-source/setup
group: admin
order: 1
---

For a basic deployment, plan for a host with at least 4GB of RAM and a moderate amount of CPU. Heavier usage means more background workers and API processes, which translates into more RAM and CPU.

## Choosing a deployment shape

You have a few options when standing up a new instance:

1.  Pre-baked AWS EC2 AMI
2.  Pre-baked Google Compute Engine image
3.  A bootstrap setup script on a clean Linux VM
4.  Docker (or Docker Compose) directly

The setup script - the one that powers the AMI / GCE images - installs Docker and Docker Compose, downloads a recommended `compose.yaml`, and starts every service. It assumes a clean machine; tweak it if you're running on a host that already does other things.

## Docker

Every release is also published as a Docker image and can run on any container orchestration platform (Kubernetes, ECS, plain Docker Compose…).

If you're not using one of the cloud images, you must set your own secret keys before starting:

1.  Create a `.env` in the same folder as `compose.yaml`.
2.  Put sensitive variables in bash syntax inside it:

    ```
    REDASH_SECRET_KEY=...
    REDASH_COOKIE_SECRET=...
    GOOGLE_CLIENT_ID=...
    ```

3.  Do _not_ commit this file to source control.

A full instance is several services: API server, one or more background workers (for query execution), Redis and PostgreSQL.

## First-run setup

Once the stack is up, browse to your server's IP / hostname. The first screen prompts you to create an admin account - finish that wizard before doing any CLI work, otherwise the database isn't yet seeded.

## Mail configuration {#Mail-Configuration}

Outgoing mail (invites, password resets, alert notifications) is configured via environment variables:

-   `REDASH_MAIL_SERVER` (default: `localhost`)
-   `REDASH_MAIL_PORT` (default: `25`)
-   `REDASH_MAIL_USE_TLS` (default: `false`)
-   `REDASH_MAIL_USE_SSL` (default: `false`)
-   `REDASH_MAIL_USERNAME`
-   `REDASH_MAIL_PASSWORD`
-   `REDASH_MAIL_DEFAULT_SENDER`

You also need `REDASH_HOST`, the public base URL of the instance (with the protocol), e.g. `https://analytics.example.com`.

After updating the env file, restart all services with `docker-compose up -d` - a plain `docker-compose restart` does _not_ re-read the env file. To verify, run `docker-compose run --rm server manage send_test_mail`.

For deliverability, route outgoing mail through a real mail provider (Amazon SES, Mailgun, SendGrid…).

## Google OAuth

To enable Google sign-in, follow [Authentication Options](/help/user-guide/users/authentication-options) and set:

-   `REDASH_GOOGLE_CLIENT_ID`
-   `REDASH_GOOGLE_CLIENT_SECRET`

Then restart the server (`docker-compose up -d server`). To auto-create accounts for users from a given domain, list the domain under _Settings → General → Allowed Google Apps Domains_.

## HTTPS

For any production deployment, terminate TLS at a reverse proxy (nginx, Traefik, a cloud load balancer…) and set the cookie secret. The exact recipe depends on your environment.

## Health check

The `/ping` endpoint returns `PONG.` when the server is healthy - useful for liveness / readiness probes.

## Upgrades

Plan to upgrade regularly to pick up bug fixes and new features. The general flow is: pull the new images, run any new database migrations, restart the stack.
