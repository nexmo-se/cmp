# Campaign Router
This router is used for managing Campaigns.


### List Campaigns
```
GET /campaigns
Role Required: admin (all campaigns) / user (only campaigns belonged to user)

Query:
limit: NUMBER
offset: NUMBER
name: STRING (exact)
campaignStartDate: DATE
campaignEndDate: DATE
activeStartHour: NUMBER [0 - 23]
activeStartMinute: NUMBER [0 - 59]
activeEndHour: NUMBER [0 - 23]
activeEndMinute: NUMBER [0 - 59]
activeOnWeekends: BOOLEAN
timezone: STRING - e.g. Asia/Singapore
status: STRING - [pending, draft, started, paused, completed]
```

### Search Campaigns
```
POST /campaigns/search
Role Required: admin (all campaign) / user (only campaigns belonged to user)

Body:
{
  limit: NUMBER,
  offset: NUMBER,
  name: STRING / List<STRING>,
  campaignStartDate: DATE,
  campaignEndDate: DATE,
  activeStartHour: NUMBER [0 - 23],
  activeStartMinute: NUMBER [0 - 59],
  activeEndHour: NUMBER [0 - 23],
  activeEndMinute": NUMBER [0 - 59],
  activeOnWeekends: BOOLEAN,
  timezone: STRING - e.g. Asia/Singapore,
  status: STRING / List<STRING> - [pending, draft, started, paused, completed]
}
```

### Create Campaign
```
POST /campaigns
Role Required: admin

Body:
{
  "name": STRING,
  "campaignStartDate": DATE - campaign will only start running after this,
  "campaignEndDate": DATE - campaign will not run after this,
  "activeStartHour": NUMBER [0 - 23] - start of active period of the day,
  "activeStartMinute": NUMBER [0 - 59] - start of active period of the day,
  "activeEndHour": NUMBER [0 - 23] - end of active period of the day,
  "activeEndMinute": NUMBER [0 - 59] - end of active period of the day,
  "activeOnWeekends": BOOLEAN - whether the campaign is allowed to run on weekends,
  "timezone": STRING - e.g. Asia/Singapore
}
```

### Read Campaign
```
GET /campaigns/:cmpCampaignId
Role Required: admin (any campaign) / user (only campaign belonged to user)

Params:
cmpCampaignId: STRING - CMP Campaign ID generated when creating campaign
```

### Update Campaign
```
PUT /campaigns/:cmpCampaignId
Role Required: admin

Params:
cmpCampaignId: STRING - CMP Campaign ID generated when creating campaign

Body:
{
  "name": STRING,
  "campaignStartDate": DATE - campaign will only start running after this,
  "campaignEndDate": DATE - campaign will not run after this,
  "activeStartHour": NUMBER [0 - 23] - start of active period of the day,
  "activeStartMinute": NUMBER [0 - 59] - start of active period of the day,
  "activeEndHour": NUMBER [0 - 23] - end of active period of the day,
  "activeEndMinute": NUMBER [0 - 59] - end of active period of the day,
  "activeOnWeekends": BOOLEAN - whether the campaign is allowed to run on weekends,
  "timezone": STRING - e.g. Asia/Singapore,
  "status": STRING - [pending, draft, started, paused, completed],

  "actualStartDate": DATE - the date which the campaign actually started (dev only),
  "actualEndDate": DATE - the date which the campaign actually completed (dev only),
  "actualDuration": NUMBER - number of seconds elapsed from start of campaign till completion of campaign (dev only),
  "statusTime": DATE - the datetime which the latest status is set (dev only)
}
```

### Delete Campaign
```
DELETE /campaigns/:cmpCampaignId
Role Required: admin

Params:
cmpCampaignId: STRING - CMP Campaign ID generated when creating campaign
```

### Delete All Campaign
```
DELETE /campaigns
Role Required: admin
```

### Update Campaign Status
Change the state of the Campaign. This is an alternate but more restricted API to Update Campaign
```
PUT /campaigns/:cmpCampaignId/status
Role Required: admin

Params:
cmpCampaignId: STRING - CMP Campaign ID generated when creating campaign

Body:
{
  "status": STRING - [pending, draft, started, paused, completed],
}
```