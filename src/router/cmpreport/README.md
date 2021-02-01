# Report Router
This router is used for managing Reports.

Overall Summary shows an overall summary report for all the campaigns together.

Campaign Summary shows a summary report for a single campaign

Campaign Detail shows a detailed record-by-record report for a single campaign

### List Reports
```
GET /reports
Role Required: admin (all reports) / user (only reports belonged to user)

Query:
limit: NUMBER
offset: NUMBER
type: STRING - [overall_summary, campaign_summary, campaign_detail]
status: STRING - [pending, processing, completed, rejected]
```


### Create CSV Report (returns report Id for background CSV generation, for export use)
```
GET /reports/csv
Role Required: admin / user

Body:
{
  "type": STRING - [overall_summary, campaign_summary, campaign_detail],
  "name": STRING - name of report,
  "content": {
    "from": DATE,
    "to": DATE,
    "cmpCampaignId": STRING - CMP Campaign ID generated when creating campaign (only for campaign_summary and campaign_detail)
  }
}
```

### Create JSON Report (returns data directly, for Web Dashboard UI use)
```
PUT /reports/json
Role Required: admin / user

Body:
{
  "type": STRING - [overall_summary, campaign_summary, campaign_detail],
  "content": {
    "from": DATE,
    "to": DATE,
    "cmpCampaignId": STRING - CMP Campaign ID generated when creating campaign (only for campaign_summary and campaign_detail)
  }
}
```

### Get Report Archive (CSV download for completed report)
```
POST /reports/archive/:fileName
Role Required: admin (all records) / user (only records belonged to user)

Params:
fileName: STRING
```

### Read Report
```
GET /reports/:cmpReportId
Role Required: admin (all reports) / user (reports belonged to user only)

Params:
cmpReportId: STRING - CMP Report ID generated when creating report
```
