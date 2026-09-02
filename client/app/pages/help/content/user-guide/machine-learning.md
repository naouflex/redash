---
title: Machine Learning Overview
summary: "End-to-end ML workflow that runs on top of Rewatch query results."
path: /user-guide/machine-learning
group: ml
order: 1
---

Rewatch ships with a flexible machine learning workflow that consumes query results, trains models, and writes predictions back into the platform for visualization and alerting. The workflow supports regression and classification, single- and multi-output, and several model families.

![Machine learning overview](/content/help/assets/ml/ml-00-file.excalidraw.svg)

## Why ML inside Rewatch

Because the rest of the platform already gathers, joins and persists data from on-chain logs, subgraphs, APIs and CSV files, the analytics gap that ML normally faces (clean data, in one place, with a deterministic schema) is largely solved. The ML layer can focus on feature engineering and model selection.

## Workflow components

1.  **Data preparation**: run a query to fetch raw data, clean and structure it, infer feature types (numeric, categorical, timestamp), encode categoricals, scale numerics, derive cyclical features from timestamps, optionally reduce dimensionality with autoencoders.
2.  **Feature engineering**: automatic detection and transformation of feature types; cyclical encoding for time-based features.
3.  **Model initialisation**: pick a regressor based on configuration; init with default or user-specified hyperparameters.
4.  **Model training**: split into training and validation sets; train the model; tune hyperparameters when `auto_mode` is enabled.
5.  **Model evaluation and tuning**: evaluate on validation data; pick the best hyperparameter combination; persist the best model.
6.  **Prediction**: load the trained model, preprocess new data, predict, decode predictions back into human-readable form.

## Supported regressors

Each regressor type has its own initialisation and training process:

-   [Linear / Logistic Regression](/help/user-guide/machine-learning/linear-regression): simple and interpretable for both continuous and categorical targets.
-   [Random Forest](/help/user-guide/machine-learning/random-forest): ensemble of decision trees, robust to overfitting.
-   [AdaBoost](/help/user-guide/machine-learning/ada-boosting): combine weak learners into a strong classifier or regressor.
-   [Gradient Boosting](/help/user-guide/machine-learning/gradient-boosting): sequential boosting that captures complex patterns.
-   [Neural Network (LSTM)](/help/user-guide/machine-learning/neural-network): deep learning for non-linear relationships, especially time series.

## Key classes

-   **`MLModel`**: orchestrates the entire workflow (data prep, feature engineering, training, prediction).
-   **`TunedMultiOutputEstimator`**: custom estimator supporting multi-output scenarios and hyperparameter tuning for traditional ML models.
-   **`TuneableNNRegressor`**: equivalent for neural network models, with hyperparameter tuning and multi-output support.

## Auto mode

Each regressor type can run in **auto mode**, which performs a randomised hyperparameter search and persists the best parameters. Useful for first-pass exploration when you don't know which configuration will work best.

## Multi-output support

The whole workflow supports both single-output and multi-output cases. For traditional ML models, this is implemented via `MultiOutputRegressor` / `MultiOutputClassifier` wrappers. For neural networks, the output layer is shaped according to the configured target types.

## Serialization and storage

Trained models are serialised and stored in the database. Loading and running a stored model from a query is what brings predictions back to dashboards and alerts.
