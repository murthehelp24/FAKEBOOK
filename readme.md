Facebook-API
===
### env Guide
PORT=8899   
DATABASE_URL=DATABASE_URL="mysql://root:Attachai201041@localhost:3306/fakebook"
JYW_SECRET=HOLLY_SHOOT

---

### Service

|path |method |auth |params |query |body |
|:- |:- |:- |:- |:- |:-
|/api/auth/login |post |- |- |- |{identity, password}
|/api/auth/register |post |- |- |- |{identity, firstName, lastName, password, confirmPassword}
|/api/auth/me |get |y |- |- |-
|/api/me |get |y |- |- |-
|/api/post |post |y |- |- |{message, image(file)}
|/api/post |put |y |:id |- |{message, image(file)}
|/api/post |delete |y |:id |- |-
|/api/comment |post |y |- |- |{message, postId}
|/api/like |post |y |- |- |{postId}
|/api/like |delete |y |:id |- |