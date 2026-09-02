---
title: Cohort Visualizations
summary: "Track grouped behaviour over time using cohort charts."
path: /user-guide/visualizations/cohort-visualizations
group: visualizations
order: 5
---

A cohort analysis tracks the outcome of predetermined groups (cohorts) as they progress through a sequence of stages. The signature characteristic is a comparison of one variable across two related time series. Common examples:

-   Monthly user activity by sign-up month.
-   Weekly supplier delivery performance by week.
-   Monthly hard drive failure statistics by manufacture month.

Rewatch supports cohort visualizations with **daily**, **weekly** or **monthly** stages. Each cohort's measurements are compared against that cohort's initial population size.

## Required data shape

The cohort visualization expects four columns:

-   **Cohort Date**: the date that uniquely identifies a cohort. For monthly user activity by sign-up date, all users that signed up in January 2025 share `2025-01-01` as their cohort date.
-   **Period**: the count of periods elapsed since the cohort date for this row. A measurement in July for January's cohort would have a period of 7.
-   **Count Satisfying Target**: the actual measurement, e.g. how many users from January's cohort were active in July.
-   **Total Cohort Size**: the denominator. If 72 users signed up in January and 30 of them were active in July, the visualization shows 41.67% (30 ÷ 72).

Once your query returns the four columns, pick _Cohort_ as the visualization type and map each column to the matching field in the editor.
