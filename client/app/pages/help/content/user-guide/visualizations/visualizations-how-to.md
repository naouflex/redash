---
title: Visualizations How-To
summary: "Create, edit, embed and download chart visualizations."
path: /user-guide/visualizations/visualizations-how-to
group: visualizations
order: 2
---

This page is the workhorse reference for working with visualizations: how to add one to a query, how to edit it, and how to send it elsewhere.

## 1. Create a visualization

Once your query has run at least once, click the _New Visualization_ button above the results table.

![Create a visualization](/content/help/assets/viz-howto/viz-howto-00-create_new_visualization.gif)

## 2. Edit a visualization

Open a query and click the visualization tab. The _Edit Visualization_ button beneath each visualization opens a settings panel where you can change the type, axes, groupings and formatting. Hit _Save_ to apply, _Cancel_ to discard.

![Edit a visualization](/content/help/assets/viz-howto/viz-howto-01-edit_a_visualization.gif)

## 3. Embedding visualizations

Click the ellipsis button beneath any visualization and pick _Embed Elsewhere_ to copy an `<iframe>` snippet you can drop into HTML pages, Notion, an internal portal, etc.

![Embedding visualizations](/content/help/assets/viz-howto/viz-howto-02-embedding_visualizations.gif)

Queries with text-typed parameters cannot be embedded (text parameters are not safe from SQL injection).

### Query string options for embeds

You can append a few query string variables to the embed URL:

-   `?hide_parameters` hides any parameter selection widgets.
-   `?hide_timestamp` hides the timestamp.

For PNG embeds (useful in environments where iframes don't work, like GitHub issues), append `?no-cache` to skip the CDN cache.

## 4. Downloading a chart as an image

For chart visualizations, hover the top-right of the visualization and click the camera icon. A PNG file downloads to your machine.

![Download visualization as image](/content/help/assets/viz-howto/viz-howto-03-downloading-a-visualization-as-an-image-file.gif)
