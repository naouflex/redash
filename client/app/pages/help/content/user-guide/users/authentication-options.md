---
title: "Authentication Options (SSO, Google OAuth, SAML)"
summary: "Built-in password auth, Google OAuth and SAML 2.0 sign-in."
path: /user-guide/users/authentication-options
group: users
order: 1
---

Authentication is configured through a mix of UI settings and environment variables. UI changes live under _Settings → General_, and they're only visible to admins. Some auth methods only appear in the UI once their corresponding environment variables are set on the server.

## Password login

By default, Rewatch authenticates users with an email address and a password. The setting is called _Password Login_ on _Settings → General_. Once an alternative auth method is enabled (Google OAuth, SAML), you can disable password login.

Rewatch stores password hashes for accounts created through password login. The first time a user signs in via Google OAuth or SAML, an account is created on the fly (Just-in-Time provisioning) and **no** password hash is stored. Such users can only sign in through the SSO provider.

If you switch from password login to Google OAuth or SAML midway through the lifetime of an instance, it's possible for a single user to end up with both a password and an SSO identity. To avoid confusion, disable password login once everyone has migrated.

## Google OAuth {#Google-OAuth}

Configure these environment variables on the server:

-   `REDASH_GOOGLE_CLIENT_ID`
-   `REDASH_GOOGLE_CLIENT_SECRET`

Then restart the server. The Google sign-in button appears on the login page automatically.

To allow users from a given Google Workspace domain to sign in without explicit invitations, list the domain under _Settings → General → Allowed Google Apps Domains_.

## SAML 2.0

For SAML 2.0, set:

-   `REDASH_SAML_METADATA_URL` _or_ `REDASH_SAML_SSO_URL`
-   `REDASH_SAML_ENTITY_ID`
-   `REDASH_SAML_X509_CERT`

Then restart the server. The SAML option appears on the login page. SAML also relies on JIT provisioning, so users authenticated via your IdP get an account created on first sign-in.

## SSO and groups

Newly-provisioned SSO users land in the `Default` group automatically. From there, follow [Permissions & Groups](/help/user-guide/users/permissions-groups) and [Group Management](/help/user-guide/users/group-management) to assign them additional groups.
