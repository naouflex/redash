---
title: Multiple Column Alerts
summary: "Combine multiple columns into a single boolean trigger value."
path: /user-guide/alerts/multiple-column-alert
group: alerts
order: 5
---

Rewatch alerts watch a single column of a single query, but you can monitor several columns at once by writing a query that performs the comparison itself and returns a boolean (or an integer 0 / 1).

```sql
SELECT
  CASE WHEN drafts_count > 10000
        AND archived_count > 5000
       THEN 1
       ELSE 0
  END AS triggered
FROM (
  SELECT sum(CASE WHEN is_archived THEN 1 ELSE 0 END) AS archived_count,
         sum(CASE WHEN is_draft    THEN 1 ELSE 0 END) AS drafts_count
  FROM   queries
) data
```

Configure the alert to fire when `triggered` equals `1`. The same pattern works for any number of conditions and is also a clean way to express compound thresholds (e.g. utilisation > 80% _and_ borrows > N _and_ price below floor).
