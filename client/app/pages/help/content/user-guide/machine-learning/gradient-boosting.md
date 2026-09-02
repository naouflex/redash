---
title: Gradient Boosting
summary: "Sequential boosting that minimises a loss function step by step."
path: /user-guide/machine-learning/gradient-boosting
group: ml
order: 5
---

Gradient Boosting builds a series of weak learners (typically decision trees) sequentially, with each new model correcting the errors of the previous ones. Rewatch supports both regression and classification.

![Gradient boosting architecture](/content/help/assets/ml-gb/ml-gb-00-the-architecture-of-gradient-boosting-decision-tree.png)

## How it works

1.  **Initialisation**: start with a simple model, often the mean of the target. Pick the number of trees.
2.  **Iteration**: compute residuals between current predictions and actuals; fit a new weak learner to those residuals; pick a step size (learning rate); update the model.
3.  **Loss function**: minimise mean squared error for regression, log-loss for classification, etc. The gradient of the loss guides each step.
4.  **Regularisation**: shallow trees, subsampling and a small learning rate (shrinkage) keep overfitting in check.
5.  **Prediction**: for new inputs, every weak learner predicts; outputs are summed.

## Initialisation

```python
if self.regressor == 'GradientBoosting':
    base_estimator_class = GradientBoostingClassifier if is_classification else GradientBoostingRegressor
    param_dist = {
        'n_estimators': [50, 100, 200, 300, 500],
        'learning_rate': [0.01, 0.1, 0.5, 1.0],
        'max_depth': [3, 5, 10, None],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4],
        'subsample': [0.8, 0.9, 1.0],
        'max_features': ['sqrt', 'log2', None],
    }
    if is_classification:
        param_dist['loss'] = ['log_loss', 'exponential']
    else:
        param_dist['loss'] = ['squared_error', 'absolute_error', 'huber', 'quantile']
```

## Key components

-   `GradientBoostingRegressor` / `GradientBoostingClassifier`.
-   `MultiOutputRegressor` / `MultiOutputClassifier` for multi-output.
-   `RandomizedSearchCV` for hyperparameter tuning when `auto_mode` is on.

## Hyperparameters

-   `n_estimators`, `learning_rate`: the classic boosting trade-off.
-   `max_depth`, `min_samples_split`, `min_samples_leaf`: tree complexity.
-   `subsample`: fraction of samples used per learner; introduces stochasticity.
-   `max_features`: features considered at each split.
-   `loss`: regression or classification loss to minimise.

## When to reach for it

**Pros**: usually outperforms random forests on accuracy, captures complex non-linear relationships, exposes feature importances.

**Cons**: easier to overfit (especially with high learning rates), slower to train than random forest, less interpretable than a single tree, sensitive to outliers.

## Tips

1.  Start with `learning_rate ~ 0.01-0.1` and a moderate `n_estimators`.
2.  Use cross-validation or early stopping to pick `n_estimators`.
3.  Lower learning rates need more estimators.
4.  Experiment with subsample fractions for stochastic gradient boosting.
5.  For high-dimensional data, set `max_features` to `sqrt` or `log2`.
6.  Track training and validation loss to detect overfitting.
