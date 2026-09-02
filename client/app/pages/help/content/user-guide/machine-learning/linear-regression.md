---
title: Linear / Logistic Regression
summary: "Simple, interpretable models for continuous and categorical targets."
path: /user-guide/machine-learning/linear-regression
group: ml
order: 2
---

Linear regression is the foundation of most predictive modelling. The Rewatch ML workflow ships with both linear regression (continuous targets) and logistic regression (categorical targets).

![Linear regression intuition](/content/help/assets/ml-linear/ml-linear-00-1_lnwfrrvr8qkanhombhqmtq.png)

## How it works

Linear regression finds the best-fitting straight line (or hyperplane in higher dimensions) through the data, minimising the sum of squared differences between predicted and actual values.

The general form is:

\[ y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_n x_n + \epsilon \]

Where `y` is the target, `x_i` are the features, `β_i` are the coefficients, and `ε` is the error term.

## Initialisation

The model is initialised in `initialize_regressor`:

```python
if self.regressor == 'Regression':
    if is_classification:
        base_estimator_class = LogisticRegression
        base_param_dist = {
            'estimator__C': loguniform(1e-3, 1e3),
            'estimator__penalty': ['l1', 'l2', 'elasticnet'],
            'estimator__solver': ['lbfgs', 'newton-cg', 'saga'],
            'estimator__max_iter': randint(1000, 5000),
            'estimator__tol': loguniform(1e-6, 1e-3),
            'estimator__class_weight': [None, 'balanced'],
            'estimator__l1_ratio': uniform(0, 1)
        }
    else:
        base_estimator_class = LinearRegression
        base_param_dist = {
            'estimator__fit_intercept': [True, False],
        }
```

## Key components

1.  **Model selection**: `LinearRegression` (continuous targets) or `LogisticRegression` (categorical), both from scikit-learn.
2.  **Multi-output support**: `MultiOutputRegressor` for regression, `OneVsRestClassifier` for classification.
3.  **Hyperparameter tuning**: `RandomizedSearchCV` when `auto_mode` is enabled.

## Training process

`fit_regressor` handles training:

1.  Detects whether we're in a multi-output scenario.
2.  Reshapes `y` for consistency.
3.  For models that support `partial_fit`, runs a custom training loop that allows mid-training stop. Otherwise calls `fit` once.

After training, the model is serialised and stored.

## Auto mode

When `auto_mode` is enabled, a `RandomizedSearchCV` object is created with the appropriate base estimator and the parameter distributions above. The search picks the best parameters and the final model is trained with those.

## Multi-output

For multiple targets:

1.  Regression: `MultiOutputRegressor(LinearRegression())`.
2.  Classification: `OneVsRestClassifier(LogisticRegression())`.

This lets the model predict several targets at once.

## When to reach for it

**Pros**: simple, interpretable, fast to train and predict, works well when relationships are roughly linear.

**Cons**: assumes linear relationships, sensitive to outliers, may underfit complex datasets.

Use it as the first model you try. If the metrics are reasonable, you've got an interpretable baseline; if not, switch to [Random Forest](/help/user-guide/machine-learning/random-forest) or [Gradient Boosting](/help/user-guide/machine-learning/gradient-boosting).
