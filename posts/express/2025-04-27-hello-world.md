---
title: "[express] hello,world."
subtitle: "express 개발환경 설정 및 hello,world. 을 보내주는 웹서버를 만들어 본다."
tags:
  - express
layout: layouts/post.njk
date: 2025-04-27
---
## hello-world 디렉토리 만들기
디렉토리 이름은 목적에 따라서 직관적으로 짓는 것이 좋다.

이번에는 "hello,world."가 적힌 웹페이지를 보내주는 웹서버를 만드는게 목표기 때문에, 디렉토리 이름을 **hello-world** 라고 짓는다.

## node.js 프로젝트 초기화하기
express는 node.js 기반으로 동작한다.

hello-world 디렉토리에 들어가서, npm 초기화 명령어를 입력한다. 

> npm init

이 명령어를 입력하면, 터미널에 무언가 많이 뜰 것이다. 보통 다 엔터를 쳐서 프로젝트를 만들고 나중에 수정하는 경우가 많다. 이 과정이 매우 귀찮기 때문에, node.js에서는 **-y** 를 입력하면 그냥 넘어가는 기능을 제공한다. 

> npm init -y

y는 yes 의 약자다. node.js에게 뭘 묻던 다 yes 로 답할 테니 넘어가 달라고 미리 말하는 것이다.

명령어가 정상적으로 동작했다면, hello-world 디렉토리 안에 **package.json** 이 생성된다.
```text

hello-world  
├ package.json


````

## 기본적으로 esm을 사용하게 수정하기 
기본적으로 node.js는 commonjs 방식으로 동작한다. 하지만 es6 이후로 esm 을 사용한 패키지들이 늘어나고 있고, express도 esm을 사용하는 것을 권장하고 있다.

node.js에서 기본값으로 esm을 사용하도록 설정하는 방법은 두 가지다.

하나는 명령어를 사용하는 방법이 있다.
> npm pkg set type="module"

나머지 하나는 직접 package.json에 **"type": "module"** 을 추가하는 방법이다.

```json

"type": "module",


```

둘 중 어느것을 사용해도 상관없다. 

## express 패키지 설치하기
이제 npm(node package manager)를 사용해서 express 패키지를 설치한다.

> npm install --save express  
> npm i --save express

둘 중 어느 명령어를 사용해도 상관없다. 애초에 i 가 install 의 약자다.

설치가 완료되고 나면 hello-world 디렉토리의 구조는 아래와 같다.

```text

hello-world  
├ node_modules   
├ package-lock.json  
├ package.json


```

## index.js 파일 만들기
이제 express 가 실행할 파일을 만들어야 한다.

그래서 **index.js** 를 만들어 준다. 프로젝트 구조는 아래와 같이 변한다.

```text

hello-world   
├ node_modules   
├ index.js  
├ package-lock.json  
├ package.json


```

## package.json에 script 추가하기
이제 간단한 npm 명령어로 express를 실행하기 위해서 package.json에 script를 추가한다.

```json

"start": "node index.js",  


```
저장 한 후에 터미널에 아래와 같이 입력해서 정상적으로 동작하는지 확인한다.

> npm run start

그러면 터미널에 아래와 같이 뜰 것이다.

```text

hello-world@1.0.0 start  
node index.js  


```

뭔가 뜨긴 했지만, 자세히 보니 그냥 우리가 package.json에서 설정했던 명령어를 실행했다는 걸 알 수 있다. 그리고는 아무것도 동작하지 않는다. 

뭔가 잘못한건가?하고 걱정할 필요없다. 왜냐면 우리가 index.js 를 만들기만 했을 뿐 아무것도 적지 않았으니까.

## index.js 에 코드 작성
이제 index.js에 간단한 코드를 작성해보자. 지금 index.js는 아무것도 적혀있지 않은 빈 문서다.

```javascript
```

물론, 아무것도 하지 않는다는 목적이 있다면, 이 프로그램은 이미 완전한 프로그램이긴 하다. 하지만 우리의 목적은 hello,world.를 출력하는 것이기 때문에 목적에 맞는 코드를 작성해야 한다.

index.js에 아래의 코드를 그대로 복사-붙여넣기 한다.

```javascript

import express from 'express'

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('hello,world.');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


```

이 코드는 express의 공식 예제 코드 중 하나다.

지금은 코드 한줄 한줄이 무엇을 의미하는 지 이해하지 않아도 된다. 그냥 복사-붙여넣기 하고 저장만 하면 된다.

## express 실행하기
터미널에 아까 package.json에 만들었던 **start** 스크립트를 실행한다.

> npm run start

그러면 터미널에 아래와 같이 뜰 것이다.

```text

> hello-world@1.0.0 start  
> node index.js run
Example app listening on port 3000


```

뭐라뭐라 적혀있지만 중요한 것은 마지막에 적혀있는 **3000** 이라는 숫자. 이건 포트(port) 번호라고 하는데, 항구에서 배가 정착하는 주선 구역 번호와 동일하다. 즉, 3000번 구역에서 hello-world가 있습니다. 하고 알려준 것이다.

인터넷 브라우저의 주소창에 아래의 주소를 입력해보자.

> localhost:3000  

![1](/resources/express/2025-04-27-hello-world/1.png)

이제 hello,world. 가 적힌 웹페이지가 뜨는 것을 볼 수 있다.

## 코드 분석
단순히 복사-붙여넣기 만으로 우리는 hello,world.가 적힌 웹페이지를 보내주는 웹서버를 만들었다. 상기했던 목표를 이루었기 때문에, 이제 마음 편하게 코드를 살펴보자.

```javascript

import express from 'express';


```
1.express 모듈을 가져온다.

```javascript

const app = express();


```
2.express 객체를 만든다.
꼭 이름이 app 일 필요는 없다. 직관적이게 server로 해도 상관없다. 

지금은 이 express 객체가 뭘하는지 이해할 필요는 없다. 그냥 서버라는 것을 만들었다. 정도만 이해하고 넘어가면 된다.

```javascript

const port = 3000;


```
3.port 번호를 지정한다.
port는 항구를 뜻한다. 항국에서 배가 몇 번 구역에 정박할지 정하는 것처럼, 서버도 몇 번에 정박할지 지정해줘야 한다. 지금은 지정하지는 않고, 번호만 받아둔 상태다.

```javascript

app.get('/', (req, res) => {  
    res.send('hello,world.');  
}


```
4.app으로 오는 요청에 따라 응답을 지정한다.
처음 보는 코드가 뭐하는지 파악하려면, 몇몇 키워드만 분석해도 된다. 굳이 이 코드를 문장으로 풀어서 표현하면 아래와 같다.

1. app에 get 요청이 왔을 때 어떻게 할 지 정합니다.
2. 이 요청이 '/' 주소에 오면,
3. 요청(request), 응답(response)을 받아서
4. 응답(response)로 'hello,world.'라는 문자열을 보낸다.

여기서 중요한 것은 '/' 주소에 요청이 오면 'hello,world'를 응답으로 보낸다는 것이다.

```javascript

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


```
5.app을 3000 포트에서 실행


## 아주 약간 꾸미기
인터넷 브라우저에 가서 localhost:3000을 계속 새로고침 해보자.

우리가 만든 hello-world 웹서버는 정말 잘 동작하고 있다. 다만, 한가지 불만이 있다면 hello,world. 글자가 너무 안 예쁘다는 점이다.

기존의 코드를 조금만 수정해보자.

```javascript

app.get('/', (req, res) => {  
    res.send('<h1>hello,world.</h1>');  
}


```

res.send에 \<h1\>,\<\/h1\> 태그가 들어갔다. 이 문법은 html 에서 사용한다. 즉, 우리가 res.send(); 로 보내는 내부의 문자열은 html 코드라는 뜻이다!

이제 다시 웹브라우저에 가서 새로고침을 해보자. 분명 코드는 수정되었는데, 별로 바뀐 점이 보이지 않을 것이다.

이것은 express가 실행 중일 때는 이전의 index.js 코드를 기반으로 동작하기 때문이다. 새로 바뀐 점을 적용하려면, 서버를 껐다가 다시 켜야 한다.

실행 중인 node.js를 종료하는 방법은 아래와 같다.

> ctrl+c 두 번

그리고 다시 지정했던 스크립트를 실행하여 웹서버를 실행한다.

> npm run start

![2](/resources/express/2025-04-27-hello-world/2.png)

다시 localhost:3000으로 들어가면 hello,world. 글자가 더 두껍고 더 커진 것을 알 수 있다. 기회가 된다면 색상도 바꿔보자.

### 마무리
express는 굉장히 쉽고 빠르게 웹서버를 구축할 수 있게 도와준다. 비록 hello,world. 라는 한 문장만 보이는 단순한 웹서버지만, 5분도 안 되는 시간에 만들 수 있는 것은 대단한 일이다.

이 예제를 진행하면서, res.send 로 html 코드를 보낼 수 알게 되었으니, 뭔가 연습 해 볼 만한 소재가 많이 떠올랐다.

1. 요청(request)를 받아서 응답(response)해보기(req -> res)
2. 리소스(이미지) 불러오기
3. javascript로 동적으로 html 코드를 만들어서, 요청받은 층 수 많큼 별로 삼각형 그리기