---
title: Alert Destinations
summary: "Wire alerts to email, Discord, Twitter, Twitter Private and Telegram."
path: /user-guide/alerts/alert-destinations
group: alerts
order: 3
---

Whenever an alert triggers, Rewatch sends the rendered alert template to one or more **destinations**. Destinations include email, Discord, Twitter (public), Twitter Private (DM) and Telegram.

Only Admins can add new alert destinations. Once configured, every user can pick from them when wiring up an alert.

![Available destinations](/content/help/assets/alert-destinations/alert-destinations-00-new_alert.gif)

## Add a destination

Open _Settings → Alert Destinations_ and click _New Alert Destination_. Pick the destination type and follow its prompts.

![Create a new destination](/content/help/assets/alert-destinations/alert-destinations-01-create_new_alert_destination.gif)

The default destination for any alert is the email address of the user who created it. If you only need to be notified by email, you don't have to add a destination, just toggle the switch beside your email on the alert setup screen.

## Discord

A Discord webhook is one of the most useful destinations for chat-room style monitoring.

1.  In Discord, open _Server Settings → Integrations_ and click _New Webhook_. Pick a name and the channel that should receive alerts. Copy the generated webhook URL.
2.  Back in Rewatch's _New Alert Destination_ dialog, choose _Discord_, paste the webhook URL, and save. Use _Test_ to send a sample message.

![Discord destination setup](/content/help/assets/alert-destinations/alert-destinations-02-new_alert_discord.gif)

When the alert fires, the rendered template lands in the configured channel. Pair this with the JSON variant of [custom templates](/help/user-guide/alerts/custom-alert-notifications) to produce rich Discord embeds.

## Twitter

Twitter destinations broadcast alerts as public tweets.

1.  Apply for a [Twitter Developer account](https://developer.twitter.com/) if you don't have one. Inside it, create an App and grab the API Key, API Secret Key, Access Token and Access Token Secret.
2.  In Rewatch's _New Alert Destination_ dialog, choose _Twitter_, fill in the four credentials, and save. Use _Test_ to verify a tweet can be posted.

By default, alerts published through this destination appear as public tweets.

## Twitter Private

Same as Twitter, but the rendered template is sent to the configured Twitter account as a Direct Message rather than a public tweet. Particularly useful for testing alert templates without spamming subscribers, or for high-frequency alerts you only want a small group to see.

## Telegram

Telegram destinations push alerts into a Telegram bot conversation or channel. Useful for internal monitoring that doesn't belong on public channels.

Set up a bot via [@BotFather](https://t.me/botfather) to obtain the bot token, and copy the chat ID for the destination you want to post to. Then enter both in the Telegram destination dialog.

## Email

For one-off email destinations, just toggle the switch next to your email address on the alert setup screen. To send to a different address, follow the email destination prompts.
