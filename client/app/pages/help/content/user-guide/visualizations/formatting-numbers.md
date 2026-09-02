---
title: Formatting Numbers in Visualizations
summary: Use numeral.js format strings to control how numbers are displayed.
path: /user-guide/visualizations/formatting-numbers
group: visualizations
order: 1
---

Several visualizations let you control how numbers are formatted via a format string (the same format strings used by [numeral.js](http://numeraljs.com/)). Below is a quick reference for the most common cases.

## Numbers

| Number | Format | Output |
| --- | --- | --- |
| 10000 | `0,0.0000` | 10,000.0000 |
| 10000.23 | `0,0` | 10,000 |
| 10000.23 | `+0,0` | +10,000 |
| \-10000 | `0,0.0` | \-10,000.0 |
| 10000.1234 | `0.000` | 10000.123 |
| 100.1234 | `00000` | 00100 |
| 10 | `000.00` | 010.00 |
| 10000.1234 | `0[.]00000` | 10000.12340 |
| \-10000 | `(0,0.0000)` | (10,000.0000) |
| 1230974 | `0.0a` | 1.2m |
| 1460 | `0 a` | 1 k |
| 1 | `0o` | 1st |
| 100 | `0o` | 100th |

## Currency

| Number | Format | Output |
| --- | --- | --- |
| 1000.234 | `$0,0.00` | $1,000.23 |
| 1000.2 | `0,0[.]00 $` | 1,000.20 $ |
| 1001 | `$ 0,0[.]00` | $ 1,001 |
| \-1000.234 | `($0,0)` | ($1,000) |
| 1230974 | `($ 0.00 a)` | $ 1.23 m |

## Bytes

| Number | Format | Output |
| --- | --- | --- |
| 100 | `0b` | 100B |
| 1024 | `0b` | 1KB |
| 2048 | `0 ib` | 2 KiB |
| 3072 | `0.0 b` | 3.1 KB |
| 7884486213 | `0.00b` | 7.88GB |

## Percentages

| Number | Format | Output |
| --- | --- | --- |
| 100 | `0%` | 100% |
| 97.4878234 | `0.000%` | 97.488% |
| \-4.3 | `0 %` | \-4 % |
| 65.43 | `(0.000 %)` | 65.430 % |

## Exponential

| Number | Format | Output |
| --- | --- | --- |
| 1123456789 | `0,0e+0` | 1e+9 |
| 12398734.202 | `0.00e+0` | 1.24e+7 |
| 0.000123987 | `0.000e+0` | 1.240e-4 |
