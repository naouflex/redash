---
title: Neural Network (LSTM)
summary: "LSTM-based deep learning for blockchain time-series."
path: /user-guide/machine-learning/neural-network
group: ml
order: 6
---

Neural networks, and particularly LSTMs, are well-suited to financial and on-chain time series. They handle sequential data and long-term dependencies more gracefully than vanilla RNNs.

![LSTM vs RNN](/content/help/assets/ml-nn/ml-nn-00-simple_recurrent_neural_network.avif)

## How LSTMs work

LSTMs are a type of recurrent neural network with explicit memory cells and gates that control what to remember, forget and output at each step. That makes them effective for:

-   **Temporal dependencies**: today's value depends on previous values, e.g. on-chain prices, gas usage, borrow rates.
-   **Non-linear patterns**: market dynamics rarely follow a straight line, and LSTMs capture non-linear interactions cleanly.
-   **Long-term dependencies**: when context from many steps ago matters (e.g. governance cycles, week-of-month effects), the LSTM gates preserve it.

### Key components of an LSTM model

1.  **Input layer**: receives the initial features (prices, volume, moving averages, on-chain stats).
2.  **Hidden LSTM layers**: process the sequence through memory cells that maintain state across time steps.
3.  **Output layer**: produces the final prediction (next-day price, regime label, action signal, etc.).

## Initialisation

```python
if self.regressor == 'NeuralNetwork':
    input_shape = (n_row, n_features)
    logging.info(f"Initializing NeuralNetwork with input_shape: {input_shape}")

    target_types = json.loads(self.options.get('target_types', '{}'))
    target_encoders = json.loads(self.options.get('target_encoders', '{}'))

    output_shapes = []
    for target, target_type in target_types.items():
        if target_type == 'numeric':
            output_shapes.append(1)
        elif target_type == 'categorical':
            n_classes = len(target_encoders[target]['categories'])
            output_shapes.append(n_classes)
```

## Key components

-   A custom `create_nn_model` function defines the architecture.
-   Multi-output is native: the output layer adapts to the number and type of targets.
-   `TuneableNNRegressor` provides hyperparameter tuning when `auto_mode` is enabled.

## Hyperparameters

-   `epochs`: number of training epochs.
-   `batch_size`: samples per gradient update.
-   `units1`, `units2`: hidden layer sizes.
-   `dropout_rate`: regularisation via dropout.
-   `l2_reg`: L2 regularisation factor.
-   `optimizer`: `adam` or `rmsprop`.
-   `learning_rate`: optimiser learning rate.

## Training process

`fit_regressor` prepares targets according to their types (numeric vs categorical), wires up appropriate loss functions and metrics per output, then either runs hyperparameter search via `TuneableNNRegressor` or trains a single model with the configured parameters. The trained model is then serialised.

## Auto mode

`TuneableNNRegressor` performs a randomised search over hyperparameters with early stopping. Training can be interrupted mid-run.

## Multi-output scenarios

Output shape is dynamic: numeric targets get one neuron each, categorical targets get N neurons (one per class). Loss functions are picked per output: MSE for numeric, categorical cross-entropy for categorical.

## When to reach for it

**Pros**: captures complex temporal patterns, robust to non-linearities, handles multi-output cleanly, flexible across data types.

**Cons**: computationally expensive, sensitive to hyperparameter choices, harder to interpret than tree models.

## Tips

1.  Normalise input features (LSTMs assume scaled inputs).
2.  Pick a sequence length that captures the patterns you care about.
3.  Tune `units`, `dropout_rate` and `learning_rate` carefully.
4.  Make sure you have enough compute: LSTMs are heavier than the tree-based models above.
