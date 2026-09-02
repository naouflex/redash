---
title: Amazon Athena
summary: Connect to Amazon Athena via an IAM user and S3 staging bucket.
path: /data-sources/amazon-athena-setup
group: data-sources
order: 1
---

Connecting to Amazon Athena requires an IAM user with permission to run Athena queries and to read / write the S3 buckets that hold your data and Athena's staging output.

## 1\. Create an IAM policy

Create a policy that grants access to the bucket(s) holding your data:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::my-bucket/*"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetBucketLocation",
        "s3:ListBucket"
      ],
      "Resource": ["arn:aws:s3:::my-bucket"]
    }
  ]
}
```

Replace `my-bucket` with your actual bucket name. Note that bucket-level and object-level permissions are listed separately.

## 2\. Create an IAM user

-   In the IAM console, choose _Users → Add User_.
-   Pick a username and tick _Programmatic Access_.
-   Attach the `AWSQuicksightAthenaAccess` managed policy _and_ the bucket policy you created above.
-   Review and create. Note down the access key ID and secret access key.

## 3\. Create the data source

Pick _Athena_ from the data source catalogue and provide:

-   **AWS Access Key** and **AWS Secret Key** - from step 2.
-   **AWS Region** - the region you query Athena in.
-   **S3 Staging Path** - the bucket Athena uses for query results (the same one you use from the AWS console works fine).

If your schema is governed by AWS Glue, toggle _Use Glue Data Catalog_ under _Additional Settings_ to make schema refresh work.

## Troubleshooting

**"Insufficient permissions to execute the query."** The IAM user is missing access to the source S3 bucket.

**Custom staging bucket.** The `AWSQuicksightAthenaAccess` managed policy only grants write permission on buckets named `aws-athena-query-results-*`. If you use a differently-named staging bucket, attach a custom policy with these actions:

```
"s3:GetBucketLocation",
"s3:GetObject",
"s3:ListBucket",
"s3:ListBucketMultipartUploads",
"s3:ListMultipartUploadParts",
"s3:AbortMultipartUpload",
"s3:CreateBucket",
"s3:PutObject"
```
