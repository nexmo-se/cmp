# Media Router
This router is used for managing Media.

A Media in the Campaign Management Portal means a media content to be used with a Template. A media may be Text, Image, Audio, Video, File, Location and Viber Template.

### List Media
```
GET /media
Role Required: admin (all media) / user (only media belonged to user)
```

### Create Media
```
POST /media
Role Required: admin

Body:
{
  "type": STRING - [none, text, image, audio, video, file, location, viber_template]
  "text": STRING - header text in Whatsapp Template,
  "url": STRING - URL for image, audio, video or file,
  "caption": STRING - caption for viber template (button text)
  "fileName": STRING - file name to download file as when user clicked on the attached file,
  "name": STRING - name of the location,
  "latitude": NUMBER - latitude of the location,
  "longitude": NUMBER - longitude of the location,
  "address": STRING - address of the location,
  "actionUrl": STIRNG - action URL of the viber template, which user will be directed to when clicked on the button
}
```

### Read Media
```
GET /media/:cmpMediaId
Role Required: admin (any media) / user (only media belonged to user)

Params:
cmpMediaId: STRING - CMP Media ID generated when creating Media
```

### Delete Media
```
DELETE /media/:cmpMediaId
Role Required: admin

Params:
cmpMediaId: STRING - CMP Media ID generated when creating Media
```

### Delete All Media
```
DELETE /media
Role Required: admin
```
