---
title: "Anonymous Usage Data Sharing (Optional)"
summary: "What gets shared when usage stats are enabled, and how to opt out."
path: /open-source/admin-guide/usage-data
group: admin
order: 2
---

Recent versions can optionally share aggregated, anonymous usage statistics with the upstream maintainers as part of the version check. This is opt-in.

If enabled, the payload looks like the example below - only counts and types, never user data, query content or PII:

```
{
  "current_version": "8-beta.2",
  "usage": {
    "users_count": 1,
    "queries_count": 4,
    "dashboards_count": 1,
    "widgets_count": 1,
    "textbox_count": 0,
    "alerts_count": 0,
    "data_sources":  { "pg": 1, "redshift": 1 },
    "visualization_types": { "TABLE": 4, "COUNTER": 5 },
    "destination_types":   { "slack": 1, "webhook": 2 }
  }
}
```

To never share anything, leave the option disabled in the admin settings (it's off by default) - or set the corresponding environment variable on the server.
