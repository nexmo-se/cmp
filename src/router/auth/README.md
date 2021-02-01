# Auth Router
This router is used for registration and login purposes.


### Login
```
POST /auth/login

{
  "username": STRING,
  "password": STRING
}
```

#### Response
```
{
  "token": STRING (JWT)
}
```

### Register
```
POST /auth/register

{
  "username": STRING,
  "password": STRING, (minimum 1 character)
  "passwordConfirm": STRING, (have to be the same as password)
  "firstName": STRING,
  "lastName": STRING
}
```
