# Tweet Filing API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `GET /email`
- `POST /login`
- `GET /users`
- `GET /users/:id`
- `POST /folders`
- `GET /folders`
- `GET /folders/:id`
- `PUT /folders/:id`
- `DELETE /folders/:id`
- `POST /tweets/:id`
- `GET /tweets/:id`
- `GET /tweets/one/:id`
- `PUT /tweets/:tweetId`
- `DELETE /tweets/:tweetId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. GET /email

Request:

- query:

```json
{
  "email": "string"
}
```

_Response (200 - OK)_

```json
{
  "status": "safe"
}
OR
{
  "status": "warning"
}
OR
{
  "status": "danger"
}
```

## 3. POST /otp

Request:

- body:

```json
{
  "email": "string"
}
```

_Response (201 - Created)_

```json
{
  "password": "integer"
}
```

_Response (502 - Bad Gateway)_

```json
{
  "message": "Failed sent email!"
}
```

&nbsp;

## 4. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 5. GET /users

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "password": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

&nbsp;

## 6. GET /users/:email

Request:

- params:

```json
{
  "email": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "password": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found!"
}
```

&nbsp;

## 7. POST /folders

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Folder with id 1 created"
}
```

&nbsp;

## 8. GET /folders

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- queries:

```json
{
  "size": "integer",
  "page": "integer"
}
```

_Response (200 - OK)_

```json
{
  "totalPages": 1,
  "data": [
    {
      "id": 5,
      "name": "Gambar",
      "userId": 1,
      "createdAt": "2022-01-26T12:05:08.869Z",
      "updatedAt": "2022-01-26T12:05:08.869Z"
    },
    {
      "id": 1,
      "name": "Kucing",
      "userId": 1,
      "createdAt": "2022-01-26T08:56:53.504Z",
      "updatedAt": "2022-01-26T18:10:22.012Z"
    },
    ...
  ]
}
```

&nbsp;

## 9. GET /folders/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "userId": "inteer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

&nbsp;

## 10. PUT /folders/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Folder with id 1 updated"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;

## 11. DELETE /folders/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Folder with id 1 deleted"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;

## 12. POST /tweets/:id

Request:

- headers:

```json
{
  "access_token": "string"
}

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "description": "string",
  "theme": "string",
  "tweetId": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Tweet with id 1 created"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found!"
}
```

&nbsp;

## 13. GET /folders

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

- queries:

```json
{
  "size": "integer",
  "page": "integer"
}
```

_Response (200 - OK)_

```json
{
  "totalPages": 1,
  "data": [
    {
      "id": 1,
      "description": "Pinote",
      "theme": "dark",
      "tweetId": "1486308156582023169",
      "folderId": 5,
      "createdAt": "2022-01-26T12:07:37.213Z",
      "updatedAt": "2022-01-26T12:10:19.949Z"
    },
    {
      "id": 2,
      "description": "Pinote",
      "theme": "dark",
      "tweetId": "1486308156582023169",
      "folderId": 5,
      "createdAt": "2022-01-26T12:07:37.213Z",
      "updatedAt": "2022-01-26T12:10:19.949Z"
    },
    ...
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found!"
}
```

&nbsp;

## 14. GET /tweets/one/:tweetId

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "tweetId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "description": "string",
  "theme": "string",
  "tweetId": "string",
  "folderId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found!"
}
```

&nbsp;

## 15. PUT /tweets/:tweetId

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "tweetId": "integer"
}
```

- body:

```json
{
  "description": "string",
  "theme": "string",
  "tweetId": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Tweet with id 1 updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found!"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;

## 16. DELETE /tweets/:tweetId

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "tweetId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Tweet with id 1 deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found!"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Access"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```