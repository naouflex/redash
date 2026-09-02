---
title: AdaBoost
summary: "Adaptive boosting that turns weak learners into a strong one."
path: /user-guide/machine-learning/ada-boosting
group: ml
order: 4
---

AdaBoost (Adaptive Boosting) iteratively trains weak learners (typically shallow decision trees) and adjusts the weights of misclassified samples to focus the next learner on the hard cases. The Rewatch ML workflow supports AdaBoost for both regression and classification.

![Boosting intuition](/content/help/assets/ml-ada/ml-ada-00-boosting.png)

## How it works

1.  **Initialisation**: equal weights on all training samples; pick the number of weak learners (estimators) to use.
2.  **Iteration**: train a weak learner; compute its error rate; weight the learner by its accuracy; bump the weights of misclassified samples (and shrink those of correctly classified samples); renormalise.
3.  **Final model**: combine every weak learner into a strong learner. Each prediction is weighted by the learner's importance.
4.  **Prediction**: for classification, the final prediction is the class with the highest weighted sum of weak learner predictions; for regression, it's the weighted sum.

## Initialisation

```python
if self.regressor == 'AdaBoost':
    base_estimator_class = AdaBoostClassifier if is_classification else AdaBoostRegressor
    param_dist = {
        'n_estimators': [50, 100, 200, 300, 500],
        'learning_rate': [0.01, 0.1, 0.5, 1.0],
    }
    if is_classification:
        param_dist['algorithm'] = ['SAMME', 'SAMME.R']
```

## Key components

-   `AdaBoostRegressor` (continuous) or `AdaBoostClassifier` (categorical).
-   `MultiOutputRegressor` / `MultiOutputClassifier` for multi-output.
-   `RandomizedSearchCV` for hyperparameter tuning under `auto_mode`.

## Hyperparameters

-   `n_estimators`: maximum number of weak learners.
-   `learning_rate`: weight applied to each learner's contribution.
-   `algorithm` (classification only): `SAMME` or `SAMME.R`.

## Training and auto mode

`fit_regressor` calls `fit` directly. With `auto_mode`, a randomised search picks the best parameters first.

## When to reach for it

**Pros**: less prone to overfitting than other boosting methods, can hit high accuracy, automatically prioritises hard examples, plays well with weak base learners.

**Cons**: sensitive to noisy data and outliers, can be computationally expensive, can overfit if `n_estimators` is too large.

## Tips

1.  Start with 50-100 estimators and adjust.
2.  Tune `learning_rate` with cross-validation.
3.  For classification, try both `SAMME` and `SAMME.R`.
4.  Watch the training error vs estimator count to spot overfitting.
5.  Pair AdaBoost with shallow decision trees for interpretable weak learners.
