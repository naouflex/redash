---
title: Customising Alert Notifications
summary: Override the default subject and body templates with built-in template variables.
path: /user-guide/alerts/custom-alert-notifications
group: alerts
order: 4
---

The default alert templates link to the alert and query screens, which is fine for simple monitoring. To send richer messages, including the actual value that triggered the alert, the query name, or fully-formatted Discord embeds, open the alert and click _Edit_.

![Editing the alert template](/content/help/assets/alert-template/alert-template-00-alert_template.gif)

Next to _Template_, change the dropdown from _Default template_ to _Custom template_. Subject and body input fields appear.

## Template variables

Both static text and the following variables are supported:

-   `{{ALERT_STATUS}}` - the evaluated alert status.
-   `{{ALERT_CONDITION}}` - the alert condition operator.
-   `{{ALERT_THRESHOLD}}` - the alert threshold value.
-   `{{ALERT_NAME}}` - the alert name.
-   `{{ALERT_URL}}` - direct URL to the alert page.
-   `{{QUERY_NAME}}` - the underlying query name.
-   `{{QUERY_URL}}` - direct URL to the query page.
-   `{{QUERY_RESULT_VALUE}}` - the value that triggered the alert.
-   `{{QUERY_RESULT_ROWS}}` - every row of the result, as an array.
-   `{{QUERY_RESULT_COLS}}` - every column of the result, as an array.
-   `{{QUERY_RESULT_TABLE}}` - the entire result as a 2D array.

## Text-based templates

Use placeholders inside any string. To pull a single cell out of the result, use dot notation: `{{symbol.0}}` for the first row of the `symbol` column. Use Python-style format specifiers (e.g. `:,.2f`, `.2%`) to format numbers inline.

A subject line that conveys what changed:

```
Alert "{{ALERT_NAME}}" changed status to {{ALERT_STATUS}}
```

A Slack-friendly body:

```
:rotating_light: {{ALERT_NAME}}
{{QUERY_NAME}} returned {{QUERY_RESULT_VALUE}}
<{{QUERY_URL}}|Open the query>
```

When the alert frequency is set to _Each time alert is evaluated for each row in the result_, you don't need the row index in the template (e.g. `{{symbol}}` already refers to the current row).

## JSON templates for Discord embeds

The Discord destination accepts JSON templates that map directly to Discord's embed structure. Each embed object can have a `title`, `color` (decimal RGB), `image`, and a `fields` array. Each field has `name`, `value` and an `inline` boolean.

The query below produces three relevant columns; the example template that follows turns each row into a richly-formatted Discord embed:

![Custom JSON template - source query](/content/help/assets/alert-template/alert-template-01-query_related_to_custom_template_example.gif)

![Custom JSON template - the template](/content/help/assets/alert-template/alert-template-02-custom_template_example.gif)

```json
{
   "content": "",
   "embeds": [
      {
         "title": "Large transfer detected",
         "color": 78368,
         "image": { "url": "" },
         "fields": [
            { "name": "Block",       "value": "{{block_link.2}}",            "inline": false },
            { "name": "Timestamp",   "value": "{{timestamp.2}}",             "inline": false },
            { "name": "Amount",      "value": "{{amount.1:,.2f}} USDC",      "inline": false },
            { "name": "Transaction", "value": "{{transaction_hash_link.0}}", "inline": false }
         ]
      }
   ]
}
```

Notes on this example:

-   `block_link.2` references the third row of the `block_link` column (zero-indexed).
-   `amount.1:,.2f` formats the second row of `amount` with a thousand separator and two decimal places, suffixed with `USDC`.
-   `transaction_hash_link.0` references the first row of `transaction_hash_link`.

## Preview and save

Click the _Preview_ toggle to see the rendered template against the latest query result. The preview is purely a sanity check on variable substitution. Each destination renders the message slightly differently, so formatting in the preview will not exactly match what arrives in your inbox / Slack channel / Discord webhook.

To revert to the default templates, change the dropdown back to _Default template_ at any time.

![Editing an existing alert](/content/help/assets/alert-template/alert-template-03-edit_alert.gif)
