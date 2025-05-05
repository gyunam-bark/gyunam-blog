---
title: "[hex] 0.hello,people."
subtitle: "hyperscript-express-htmx stack study note"
tags:
  - hex
layout: layouts/post.njk
date: 2025-05-05
---

## hex stack 이 뭔가요?
hex stack 은 아래의 3 가지 라이브러리를 사용하는 웹개발 stack 이다.

> hyperscript + express + htmx  

hex stack은 jam stack 이나 mern stack 처럼 사람들이 흔히 쓰는 단어는 아니다. 

그냥 내가 마음대로 이름을 지었는데, 입에 착착 감겨서 계속 쓰고 있다. 

무엇보다 이 stack 을 써서 얻는 이득도 hex 답다.

우리가 hex 코드를 어떨 때 사용하는지 생각해보자. 특정 색상값을 보낼 때 r,g,b,a 로 따로 보내기 보다는 hex 값으로 보내지 않는가?

그것과 비슷한 노력으로 백엔드 개발자가 프론트엔드를 만들어서 배포할 수 있다.

## 개발환경 설정

### node.js 프로젝트 초기화
> npm init -y

> npm pkg set type="module"

### express 설치하기
> npm install --save express

### server.mjs 만들기
server.js 로 해도 된다.

하지만 나는 server.mjs 로 만드는 것을 더 선호한다.

그냥 나 스스로 '이 코드들은 es6 이후의 기능들을 듬뿍 사용하는 코드 파일입니다.' 라고 티내는 습관이랄까.

### 프로젝트 디렉토리 구조
```text

0-hello-peaple
├ node_module
├ package-lock.json
├ package.json
├ server.mjs


```

## express 기본 코드로 시작
```javascript

/* server.mjs */
import express from 'express'

const server = express()
const PORT = 3000

server.get('/', (req, res) => {
  res.send('<h1>hello,world.</h1>')
})

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})


```

### 실행하기
터미널에서 아래와 같이 입력해보자.

> node server.mjs


### localhost:3000
![1](/resources/hex/2025-05-05-0-hello-people/1.png)

잘 동작한다!

## name 으로 바꾸기
```javascript

/* server.mjs */
import express from 'express'

const server = express()
const PORT = 3000

const name = 'gyunam' // add line

server.get('/', (req, res) => {
  res.send(`<h1>hello,${name}.</h1>`)
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
});


```

### 
![2](/resources/hex/2025-05-05-0-hello-people/2.png)

## 

