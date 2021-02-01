# Application Router
This router is used for managing Application (Nexmo Application) associated with the Campaign Management Portal.


### List Applications
```
GET /applications
Role Required: admin (all applications) / user (only applications belonged to user)

Query:
limit: NUMBER
offset: NUMBER
name: STRING (exact)
cmpApiKeyId: STRING - CMP API Key ID generated when creating key
```

### Search Applications
```
POST /applications/search
Role Required: admin (all applications) / user (only applications belonged to user)

Body:
{
  limit: NUMBER,
  offset: NUMBER,
  name: STRING / List<STRING>,
  cmpApiKeyId: STRING / List<STRING> - CMP API Key ID generated when creating key
}
```

### Create Application
```
POST /applications
Role Required: admin

Body:
{
  "name": STRING,
  "cmpApiKeyId": STRING - CMP API Key ID generated when creating key,
  "applicationId": STRING (Nexmo Application ID),
  "privateKey": STRING (Nexmo Application Private Key),
}
```

### Read Application
```
GET /applications/:cmpApplicationId
Role Required: admin (any application) / user (only application belonged to user)

Params:
cmpApplicationId: STRING - CMP Application ID generated when creating application
```

### Update Application
```
PUT /applications/:cmpApplicationId
Role Required: admin

Params:
cmpApplicationId: STRING - CMP Application ID generated when creating application

Body:
{
  "name": STRING
}
```

### Delete Application
```
DELETE /applications/:cmpApplicationId
Role Required: admin

Params:
cmpApplicationId: STRING - CMP Application ID generated when creating application
```

### Delete All Applications
```
DELETE /applications
Role Required: admin
```



### Set Application Webhook
Set the Nexmo Application webhooks to this Campaign Management Portal
```
POST /applications/:cmpApplicationId
Role Required: admin

Params:
cmpApplicationId: STRING - CMP Application ID generated when creating application
```