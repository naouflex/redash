---
title: Adding a Visualization
summary: How to write and register a new visualization type.
path: /open-source/visualizations-dev
group: admin
order: 6
---

This page is the developer-facing companion to the [Visualization types](/help/user-guide/visualizations/visualizations-types) reference. It explains how to extend Rewatch with a brand new chart type. Examples below use React, which is the modern stack.

## 1. Anatomy of a visualization

Every visualization is composed of two React components:

-   **Renderer**: takes the query result and the user's settings, then draws the chart.
-   **Editor**: presents form controls so the user can configure the renderer.

These components are registered together as a single _visualization type_ that shows up in the visualization picker.

## 2. Component blueprint

Below is a stripped-down skeleton. The original blueprint in the Redash source uses Angular for historical reasons; the principles map cleanly onto React:

```javascript
// example.js
(function () {
  'use strict';

  var module = angular.module('redash.visualization');

  module.directive('exampleRenderer', function () {
    return {
      restrict: 'E',
      templateUrl: '/views/visualizations/example.html',
      link: function ($scope) {
        var refreshData = function () {
          var queryData = $scope.queryResult.getData();
          if (queryData) {
            // perform the render logic.
          }
        };
        $scope.$watch('visualization.options', refreshData, true);
        $scope.$watch('queryResult && queryResult.getData()', refreshData);
      },
    };
  });

  module.directive('exampleEditor', function () {
    return {
      restrict: 'E',
      templateUrl: '/views/visualizations/example_editor.html',
    };
  });

  module.config([
    'VisualizationProvider',
    function (VisualizationProvider) {
      var renderTemplate =
        '<example-renderer options="visualization.options" query-result="queryResult"></example-renderer>';
      var editTemplate = '<example-editor></example-editor>';
      var defaultOptions = {};

      VisualizationProvider.registerVisualization({
        type: 'EXAMPLE',
        name: 'Example',
        renderTemplate: renderTemplate,
        editorTemplate: editTemplate,
        defaultOptions: defaultOptions,
      });
    },
  ]);
})();
```

## 3. Register the visualization

After writing the renderer and editor, register the pair with the visualization registry. A registration carries:

-   `type`: a unique identifier used to persist the visualization choice.
-   `name`: the display name in the picker.
-   The renderer and editor templates / components.
-   `defaultOptions`: the starting configuration for new visualizations of this type.

## 4. Test it

Cover at least these cases before merging:

-   Empty result set: the renderer should not throw.
-   Mixed types: ensure numeric and text columns render as expected.
-   Many rows: pick a sensible upper bound and consider warning the user above it.
-   Mobile-width container: the responsive layout matters in the help drawer and on dashboards.

## 5. Integrate

Once happy, merge the change. Follow the [contribution guidelines](https://github.com/getredash/redash/blob/master/CONTRIBUTING.md) and the existing code style.

## 6. Heatmap-style time formats

When a heatmap consumes a timestamp column, pre-process the values into a normalised format the visualization can interpret directly. If the layout looks wrong, try a plain integer hour column (0, 1, 2…) as a sanity check, then convert to friendlier labels via the formatter.
