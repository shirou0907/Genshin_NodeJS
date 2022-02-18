# genshin-project API

### Send Token with Header when call API
`````````
Authorization : Bearer <Token>
`````````

## Authentication

`Check login and return Token`
```
POST /api/login {email, password}
```
`Create new account`
```
POST /api/register {email, password, name, photo}
```
`Get all info user`
```
GET /api/ 
```


## User
`Get name, email & photo`
```
GET /user/ 
```
`Change info user`
```
PUT /user/info {id, name, photo}
```
`Change password`
```
POST /user/change-password {id, oldPassword, password}
```

## Post
`Get all posts`
```
GET /user/post 
```
`Get post by id`
```
GET /user/post/:id 
```
`Create new post`
```
POST /user/post:id {userID, title, description, img, video}
```
`Update post by id`
```
PUT /user/post:id {userID, title, description, img, video}
```
`Delete post by id`
```
DELETE /user/post:id
```
`Get post by userID`
```
POST /user/post-by-user {userID}
```

## Comment
`Create new comment`
```
POST /user/comment {userID, postID, username, userimg, comment}
```
`Delete comment by id`
```
DELETE /user/comment {id, postID}
```


