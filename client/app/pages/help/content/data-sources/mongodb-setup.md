---
title: MongoDB
summary: Connect to MongoDB and run find / aggregate queries as JSON.
path: /data-sources/mongodb-setup
group: data-sources
order: 4
---

## Setup

To connect to MongoDB you need at minimum a _Connection String_ and a _DB Name_:

-   Plain: `mongodb://username:password@hostname:port/dbname`
-   SSL: `mongodb://...:port/dbname?ssl=true`
-   SSL + self-signed certificate: `mongodb://...:port/dbname?ssl=true&ssl_cert_reqs=CERT_NONE`

Additional options can be appended as query string parameters; see the [MongoDB connection string docs](https://docs.mongodb.com/manual/reference/connection-string/) for the full list.

Yes - DB Name appears both as a separate field and inside the connection string. This duplication is required by some shared hosting providers (such as MLab).

Newer versions also expose dedicated _Username_ and _Password_ fields. When set, they take precedence over the credentials embedded in the connection string, which lets you keep secrets out of plaintext config / API responses.

### MongoDB Atlas

For Atlas free-tier clusters use the SRV connection format:

```
mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true
```

### Troubleshooting SSL

"SSL handshake failed: certificate verify failed" usually means the server uses a self-signed certificate. Either install a properly signed certificate or append `ssl_cert_reqs=CERT_NONE` to the connection string.

## Writing queries

Each query is a JSON object. The runtime translates it into either a `db.collection.find()` or a `db.collection.aggregate()` call. The mapping is:

| Mongo | Where to set it |
| --- | --- |
| `db` | Data source setup screen |
| `collection` | `collection` key |
| `query` | `query` key |
| `projection` | `fields` key |
| `.sort()` | `sort` key |
| `.skip()` | `skip` key |
| `.limit()` | `limit` key |
| `db.collection.count()` | `count` key (any value) |

### Simple query example

```
{
  "collection": "my_collection",
  "query":      { "type": 1 },
  "fields":     { "_id": 1, "name": 2 },
  "sort":       [{ "name": "date", "direction": -1 }]
}
```

### Count example

```
{
  "collection": "my_collection",
  "count": true
}
```

### Aggregation example

Aggregation uses a syntax close to PyMongo. To preserve sort order, use a regular array for `$sort` (converted to a SON object before execution):

```
{
  "collection": "things",
  "aggregate": [
    { "$unwind": "$tags" },
    { "$group":  { "_id": "$tags", "count": { "$sum": 1 } } },
    { "$sort":   [
      { "name": "count", "direction": -1 },
      { "name": "_id",   "direction": -1 }
    ]}
  ]
}
```

### Extended JSON and `$humanTime`

[MongoDB Extended JSON](https://docs.mongodb.com/manual/reference/mongodb-extended-json/) is supported, plus a custom `$humanTime` operator:

```
{
  "collection": "date_test",
  "query": {
    "lastModified": {
      "$gt": { "$humanTime": "3 years ago" }
    }
  },
  "limit": 100
}
```

`$humanTime` accepts human-readable strings ("3 years ago", "yesterday"…) or timestamps. It's also needed when using Date / Date Time [parameters](/help/user-guide/querying/query-parameters) with MongoDB: `{"$humanTime": "{{param}} 00:00"}` for Date parameters (the `00:00` suffix can be dropped for Date Time).

### Filtering visualizations

Project a column with a `::filter` suffix to add a dashboard-style filter on it:

```
{
  "collection": "zipcodes",
  "aggregate": [{
    "$project": {
      "_id":  "$_id",
      "city": "$city",
      "loc":  "$loc",
      "pop":  "$pop",
      "state::filter": "$state"
    }
  }]
}
```

## Troubleshooting: _"Sort exceeded memory limit"_

MongoDB's in-memory sort caps at 100MB. To sort a larger result set you need to opt in to disk-based sorting:

```
{ ..., "allowDiskUse": true }
```
