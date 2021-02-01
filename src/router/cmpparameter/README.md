# Parameter Router
This router is used for managing Parameter.

A Parameter in the Campaign Management Portal means a value to be inserted into a Template according to the order.


### List Parameters
```
GET /parameters
Role Required: admin (all parameters) / user (only parameters belonged to user)
```

### Create Parameter
```
POST /channels
Role Required: admin

Body:
{
  "parameter": STRING,
  "order": NUMBER,
}
```

### Read Parameter
```
GET /channels/:cmpParameterId
Role Required: admin (any parameter) / user (only parameter belonged to user)

Params:
cmpParameterId: STRING - CMP Parameter ID generated when creating Parameter
```


### Delete Parameter
```
DELETE /channels/:cmpParameterId
Role Required: admin

Params:
cmpParameterId: STRING - CMP Parameter ID generated when creating Parameter
```

### Delete All Parameters
```
DELETE /channels
Role Required: admin
```
