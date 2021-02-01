# Channel Router
This router is used for managing Channel.

A Channel in the Campaign Management Portal means a channel which can be used to send out messages, e.g. SMS, Whatsapp, Facebook Messenger or Viber. Each channel is tied to an API Key or Application. This means that if the CMP is used with multiple Whatsapp (WABA) channel through different Nexmo Application or Nexmo API Key, multiple CMP Channel will be needed for each of the combination.


### List Channels
```
GET /channels
Role Required: admin (all channels) / user (only channels belonged to user)

Query:
limit: NUMBER
offset: NUMBER
name: STRING (exact)
channel: STRING - [whatsapp, viber, facebook, sms],
senderId: STRING,
tps: NUMBER,
cmpApiKeyId: STRING - CMP API Key ID generated when creating Api Key
cmpApplicationId: STRING - CMP Application ID generated when creating application,
smsUseSignature: BOOLEAN

```

### Search Channels
```
POST /channels/search
Role Required: admin (all channels) / user (only channels belonged to user)

Body:
{
  limit: NUMBER,
  offset: NUMBER,
  name: STRING / List<STRING>,
  channel: STRING / List<STRING> - [whatsapp, viber, facebook, sms]
  senderId: STRING / List<STRING>,
  tps: NUMBER,
  cmpApiKeyId: STRING / List<STRING> - CMP API Key ID generated when creating API Key,
  cmpApplicationId: STRING / List<STRING> - CMP Application ID generated when creating Application,
  smsUseSignature: BOOLEAN
}
```

### Create Channel
```
POST /channels
Role Required: admin

Body:
{
  "name": STRING,
  "channel": STRING - [whatsapp, viber, facebook, sms],
  "senderId": STRING - AlphaNumeric Sender ID (if applicable) or LVN,
  "tps": NUMBER,
  "cmpApiKeyId": STRING - CMP API Key ID generated when creating API Key,
  "cmpApplicationId": STRING (only required for whatsapp, facebook and viber) - CMP Application ID generated when creating Application KEY,
  "smsUseSignature: BOOLEAN - whether SMS should use Signature (only for sms)
}
```

### Read Channel
```
GET /channels/:cmpChannelId
Role Required: admin (any channel) / user (only channel belonged to user)

Params:
cmpChannelId: STRING - CMP Channel ID generated when creating channel
```

### Update Channel
```
PUT /channels/:cmpChannelId
Role Required: admin

Params:
cmpChannelId: STRING - CMP Channel ID generated when creating channel

Body:
{
  "name": STRING,
  "channel": STRING - [whatsapp, viber, facebook, sms],
  "senderId": STRING - AlphaNumeric Sender ID (if applicable) or LVN,
  "tps": NUMBER,
  "smsUseSignature": BOOLEAN - whether SMS should use Signature (only for sms)
}
```

### Delete Channel
```
DELETE /channels/:cmpChannelId
Role Required: admin

Params:
cmpChannelId: STRING - CMP Channel ID generated when creating channel
```

### Delete All Channels
```
DELETE /channels
Role Required: admin
```
