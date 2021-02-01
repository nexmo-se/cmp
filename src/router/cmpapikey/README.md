# Api Key Router
This router is used for managing API Key associated with the Campaign Management Portal.


### List API Keys
```
GET /apikeys
Role Required: admin (all keys) / user (only keys belonged to user)

Query:
limit: NUMBER
offset: NUMBER
name: STRING (exact)
signatureMethod: STRING [md5hash, md5, sha1, sha256, sha512]
```

### Search API Keys
```
POST /apikeys/search
Role Required: admin (all keys) / user (only keys belonged to user)

Body:
{
  limit: NUMBER,
  offset: NUMBER,
  name: STRING / List<STRING>,
  signatureMethod: STRING / List<STRING> - [md5hash, md5, sha1, sha256, sha512]
}
```

### Create API Key
```
POST /apikeys
Role Required: admin

Body:
{
  "name": STRING,
  "apiKey": STRING (Nexmo API Key),
  "apiSecret": STRING (Nexmo API Secret),
  "signatureSecret": STRING,
  "signatureMethod": STRING [md5hash, md5, sha1, sha256, sha512]
}
```

### Read API Key
```
GET /apikeys/:cmpApiKeyId
Role Required: admin (any key) / user (only key belonged to user)

Params:
cmpApiKeyId: STRING - CMP Api Key ID generated when creating key
```

### Update API Key
```
PUT /apikeys/:cmpApiKeyId
Role Required: admin (any key) / user (only key belonged to user)

Params:
cmpApiKeyId: STRING - CMP Api Key ID generated when creating key

Body:
{
  "name": STRING
}
```

### Delete API Key
```
DELETE /apikeys/:cmpApiKeyId
Role Required: admin

Params:
cmpApiKeyId: STRING - CMP Api Key ID generated when creating key
```

### Delete All API Key
```
DELETE /apikeys
Role Required: admin
```



### Set API Key Webhook
Set the API Key webhooks to this Campaign Management Portal
```
POST /apikeys/:cmpApiKeyId
Role Required: admin

Params:
cmpApiKeyId: STRING - CMP Api Key ID generated when creating key
```