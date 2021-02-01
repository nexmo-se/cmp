# Template Router
This router is used for managing Channel.

A Template in the Campaign Management Portal means a predefined body with parameters ('{{1}}' for first parameter and then '{{2}}' and so on) to fill before sending the message. A template with mediaType may contain media such as Text, Image, Audio, Video, File, Location and Viber Template. 

Viber Template consists of an Image and a Button.

A template with mediaType null or 'none' will be treated as plain text in the body (whatsapp message template without header). Otherwise, whatsapp template with mediaType will expect a Text Media header. 

**Therefore, ALL templates that does not use a Text Media header and NOT using any other media types, specify null or 'none' as the mediaType.**



### List Templates
```
GET /templates
Role Required: admin (all templates) / user (only templates belonged to user)

Query:
limit: NUMBER
offset: NUMBER
name: STRING (exact)
cmpChannelId: STRING - CMP Channel Id generated when creating Channel
whatsappTemplateNamespace: STRING - WABA namespace
whastappTemplateName: STRING - WABA template name,
viberTtl: NUMBER - viber ttl
facebookTag: STRING - facebook tag,
category: STRING - facebook category
mediaType: STRING - [none, text, image, audio, video, file, location, viber_template],
body: STRING
```

### Search Templates
```
POST /templates/search
Role Required: admin (all templates) / user (only templates belonged to user)

Body:
{
  limit: NUMBER,
  offset: NUMBER,
  name: STRING / List<STRING>,
  cmpChannelId: STRING / List<STRING> - CMP Channel ID generated when creating Channel
  whatsappTemplateNamespace: STRING / List<STRING> - WABA namespace,
  whatsappTemplateName: STRING / List<String> - WABA template name,
  viberTtl: NUMBER - viber ttl
  facebookTag: STRING / List<STRING> - facebook tag
  category: STRING / List<String> - facebook category,
  mediaType: STRING / List<String> - [none, text, image, audio, video, file, location, viber_template],
  body: STRING / List<String>
}
```

### Create Templates
```
POST /templates
Role Required: admin

Body:
{
  "name": STRING,
  "cmpChannelId": STRING - CMP Channel ID generated when creating Channel,
  "whatsappTemplateNamespace: STRING - WABA namespace,
  "whatsappTemplateName: STRING - WABA template name,
  "viberTtl": NUMBER - viber ttl,
  "facebookTag": STRING - facebook tag,
  "category": STRING - facebook category,
  "mediaType": STRING (optional) - [none, text, image, audio, video, file, location, viber_template],
  "body": STRING
}
```

### Read Template
```
GET /templates/:cmpTemplateId
Role Required: admin (any template) / user (only template belonged to user)

Params:
cmpTemplateId: STRING - CMP Template ID generated when creating Template
```

### Update Template
```
PUT /templates/:cmpTemplateId
Role Required: admin

Params:
cmpTemplateId: STRING - CMP Template ID generated when creating Template

Body:
{
  "name": STRING,
  "mediaType": STRING (optional) - [none text, image, audio, video, file, location, viber_template],
  "body": STRING
}
```

### Delete Template
```
DELETE /templates/:cmpTemplateId
Role Required: admin

Params:
cmpTemplateId: STRING - CMP Template ID generated when creating Template
```

### Delete All Templates
```
DELETE /templates
Role Required: admin
```
