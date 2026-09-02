---
title: Random Forest
summary: "Ensemble of decision trees for both regression and classification."
path: /user-guide/machine-learning/random-forest
group: ml
order: 3
---

Random Forest constructs many decision trees during training and outputs the mean prediction (regression) or the modal prediction (classification) of those trees. Rewatch supports both Random Forest regression and classification.

![Random Forest schematic](/content/help/assets/ml-rf/ml-rf-00-a-schematic-diagram-of-the-random-forest-algorithm.png)

## How it works

1.  **Bootstrap aggregating (bagging)**: random sampling with replacement creates many subsets of the original dataset.
2.  **Decision tree creation**: a tree is built per subset; at each split, only a random subset of features is considered.
3.  **Voting / averaging**: the forest's prediction is the mode of the individual classifiers (classification) or the mean of the regressors (regression).

## Initialisation

```python
if self.regressor == 'RandomForest':
    base_estimator_class = RandomForestClassifier if is_classification else RandomForestRegressor
    param_dist = {
        'n_estimators': [50, 100, 200, 300, 500],
        'max_depth': [None, 5, 10, 15, 20, 25],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4],
        'max_features': ['sqrt', 'log2', None],
        'bootstrap': [True, False],
        'ccp_alpha': uniform(0, 0.01)
    }
    if is_classification:
        param_dist['criterion'] = ['gini', 'entropy']
        param_dist['class_weight'] = ['balanced', 'balanced_subsample', None]
    else:
        param_dist['criterion'] = ['squared_error', 'absolute_error', 'friedman_mse', 'poisson']
```

## Key components

-   `RandomForestRegressor` for continuous targets, `RandomForestClassifier` for categorical.
-   `MultiOutputRegressor` / `MultiOutputClassifier` for multi-output cases.
-   `RandomizedSearchCV` for hyperparameter tuning when `auto_mode` is on.

## Hyperparameters

-   `n_estimators`: trees in the forest.
-   `max_depth`: per-tree depth cap.
-   `min_samples_split` / `min_samples_leaf`: control tree complexity.
-   `max_features`: features considered at each split.
-   `bootstrap`: whether bootstrap samples are used.
-   `criterion`: split quality function (different for classification vs regression).
-   `class_weight` (classification only): weights for handling class imbalance.

## Training and auto mode

`fit_regressor` performs the usual sequence: detect multi-output, reshape `y`, call `fit`. With `auto_mode` enabled, a randomised search selects the best parameter combination before the final model is trained.

## Multi-output

For multiple targets the model is wrapped with `MultiOutputRegressor` / `MultiOutputClassifier`, so predictions for each target are emitted simultaneously.

## When to reach for it

**Pros**: handles linear and non-linear relationships, reduces overfitting via averaging, scales well, exposes feature importances.

**Cons**: less interpretable than a single tree, can be slow for very large datasets, requires careful tuning to avoid overfitting.

## Tips

1.  Start with `n_estimators = 100` and grow as needed.
2.  Use cross-validation to find the right `max_depth`.
3.  Tune `min_samples_split` and `min_samples_leaf` to control complexity.
4.  For high-dimensional data, set `max_features` to `sqrt` or `log2`.
5.  For imbalanced classes, experiment with `class_weight`.
