# Record Router
This router is used for managing Records.
For normal usage, please use CSV approach (Create Metadata and Upload CSV).

Creating Record (single/batch) is only for development and debugging purposes.


### List Records
```
GET /records
Role Required: admin (all records) / user (only records belonged to user)

Query:
limit: NUMBER
offset: NUMBER
recipient: STRING
cmpCampaignId: STRING - CMP Campaign ID generated when creating campaign
cmpTemplateId: STRING - CMP Template ID generated when creating template
cmpMediaId: STRING - CMP Media ID generated when creating media
activeStartHour: NUMBER [0 - 23]
activeStartMinute: NUMBER [0 - 59]
activeEndHour: NUMBER [0 - 23]
activeEndMinute: NUMBER [0 - 59]
activeOnWeekends: BOOLEAN
timezone: STRING
status: STRING - [pending, draft, started, paused, completed]
```

### List Active Records
```
GET /records/active
Role Required: admin

Query:
limit: NUMBER
time: DATE
```

### Search Records
```
POST /records/search
Role Required: admin (all records) / user (only records belonged to user)

Body:
{
  limit: NUMBER,
  offset: NUMBER,
  recipient: STRING / List<STRING>,
  cmpCampaignId: STRING / List<STRING> - CMP Campaign ID generated when creating campaign,
  cmpTemplateId: STRING / List<STRING> - CMP Template ID generated when creating template,
  cmpMediaId: STRING / List<STRING> - CMP Media ID generated when creating media,
  activeStartHour: NUMBER [0 - 23],
  activeStartMinute: NUMBER [0 - 59],
  activeEndHour: NUMBER [0 - 23],
  activeEndMinute: NUMBER [0 - 59],
  activeOnWeekends: BOOLEAN,
  timezone: STRING / List<STRING>,
  status: STRING / List<STRING> - [pending, draft, started, paused, completed]
}
```

### Create Record Single
```
POST /records
Role Required: admin

Body:
{
  "recipient": STRING,
  "cmpCampaignId": STRING - CMP Campaign ID generated when creating campaign,
  "cmpTemplateId": STRING - CMP Template ID generated when creating template,
  "cmpMediaId": STRING - CMP Media ID generated when creating media,
  "cmpMedia": {
    "type": STRING - [none, text, image, audio, video, file, location, viber_template],
    "text": STRING,
    "url": STRING,
    "caption": STRING,
    "fileName": STRING,
    "latitude": NUMBER,
    "longitude": NUMBER,
    "name": STRING,
    "address": STRING,
    "actionUrl": STRING,
  },
  "cmpParameters": List<String> - parameter values, sorted in order,
  "activeStartHour": NUMBER [0 - 23],
  "activeStartMinute": NUMBER [0 - 59],
  "activeEndHour": NUMBER [0 - 23],
  "activeEndMinute": NUMBER [0 - 59],
  "activeOnWeekends": BOOLEAN,
  "timezone": STRING - e.g. Asia/Singapore
}
```

### Create Record Batch
```
POST /records/batch
Role Required: admin

Body:
[
  {
    "recipient": STRING,
    "cmpCampaignId": STRING - CMP Campaign ID generated when creating campaign,
    "cmpTemplateId": STRING - CMP Template ID generated when creating template,
    "cmpMediaId": STRING - CMP Media ID generated when creating media,
    "cmpMedia": {
      "type": STRING - [none, text, image, audio, video, file, location, viber_template],
      "text": STRING,
      "url": STRING,
      "caption": STRING,
      "fileName": STRING,
      "latitude": NUMBER,
      "longitude": NUMBER,
      "name": STRING,
      "address": STRING,
      "actionUrl": STRING,
    },
    "cmpParameters": List<String> - parameter values, sorted in order,
    "activeStartHour": NUMBER [0 - 23],
    "activeStartMinute": NUMBER [0 - 59],
    "activeEndHour": NUMBER [0 - 23],
    "activeEndMinute": NUMBER [0 - 59],
    "activeOnWeekends": BOOLEAN,
    "timezone": STRING - e.g. Asia/Singapore
  }
]
```

### Create CSV Metadata
This is used for setting the CSV columns and structure.
Each of the column data type can be specified (in order) as needed.

There can be more than 1 parameter columns (all of them should have value of 'parameter') and actual data in the CSV will be used as the list of parameters for the record (in the order from the left)

```
POST /records/csv/:cmpCampaignId/:cmpTemplateId/metadata
Role Required: admin / user

Params:
cmpCampaignId: STRING - CMP Campaign ID generated when creating campaign
cmpTemplateId: STRING - CMP Template ID generated when creating template

Body:
{
  "mediaType": STRING - [none, text, image, audio, video, file, location, viber_template],
  "columns": List<STRING> - column data types [recipient, text, url, caption, fileName, latitude, longitude, name, address, actionUrl, parameter]
}
```

### Upload CSV
```
POST /records/csv/:cmpCampaignId/:cmpTemplateId
Role Required: admin / user

Params:
cmpCampaignId: STRING - CMP Campaign ID generated when creating campaign
cmpTemplateId: STRING - CMP Template ID generated when creating template
```

### Read Campaign
```
GET /records/:cmpRecordId
Role Required: admin (any record) / user (only record belonged to user)

Params:
cmpRecordId: STRING - CMP Record ID generated when creating record
```


### Delete Record
```
DELETE /records/:cmpRecordId
Role Required: admin

Params:
cmpRecordId: STRING - CMP Record ID generated when creating record
```

### Delete All Records
```
DELETE /records
Role Required: admin
```
