---
title: "[express] 파라미터 사용하기"
subtitle: "req.param 받아서 res로 반환해본다."
tags:
  - express
layout: layouts/post.njk
date: 2025-04-28
---
지난 번 hello-world 프로젝트는 정해진 대답만 해서 조금 밋밋하다.

이번에는 요청(request)를 받아서 응답(response) 하는 걸 조금 써보려고 한다.

## parameter 디렉토리 만들기
디렉토리 이름, 즉, 프로젝트 이름을 짓는 것은 항상 고민된다.

나는 그 약어가 어떤 단어를 축약한건지 궁금해하는 성격이라서, 학습을 하는 동안에는 항상 가능한 원본 단어 그대로 사용하는 것을 선호한다. 팀프로젝트를 할 때엔 어떨지 모르겠다.

parameter 디렉토리를 만들고, express 소환 3콤보를 터미널에 순차적으로 입력한다.

> npm init -y  
> npm pkg set type="module"  
> npm i --save express  

정상적으로 express 설치가 완료되었다면, parameter디렉토리는 아래와 같이 된다.

```text

parameter
├ node_modules   
├ package-lock.json  
├ package.json


```

이번에는 신상 npm 명령어로 스크립트 추가하는 법을 알아보자.

> npm pkg set scripts.start="node index.js"

javascript의 객체 문법을 그대로 사용해서 추가할 수 있다. scripts의 start에 "node index.js"를 추가한다는 뜻이다. npm 명령어만 적절히 사용하면, package.json을 아예 열어보지 않아도 된다!

## index.js 파일 만들기
이제 **index.js** 를 만들, 기본적인 express 프로젝트의 구조는 완성된다.

```text

parameter  
├ node_modules   
├ index.js  
├ package-lock.json  
├ package.json


```

## hello-world 코드에서 시작하기
지난 번에 완성했던 hello-world 코드를 복사-붙여넣기로 가져온다.

```javascript

import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('hello,world.');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


```

코드 복사 후 정상적으로 동작하는지 express를 실행해서 확인해보자.

> npm run start

기본 주소는 **localhost:3000** 이다.

![1](/resources/express/2025-04-28-parameter/1.png)

hello,world.가 잘 동작하고 있다.

> ctrl+c 두 번

이제 express를 종료하고 코드를 약간 추가해보자.

## 예제 코드 추가하기
기존의 app.get 코드에서 조금만 수정한 새로운 app.get 코드를 아래에 추가한다.

```javascript

app.get('/', (req, res) => {
    res.send(`hello,world.`);
});

// 추가된 코드
app.get('/:name', (req, res) => {
    const name = req.params.name;
    res.send(`hello,${name}.`);
});


```

정확하게 뭐가 어떻게 되는지는 몰라도, **:name** 이 경로에 추가된 것과 **req** 라는 함수 인자를 사용하고 있는 것은 알 수 있다.

참고로 두번째 res.send 코드는 따옴표(\')가 아니라 백틱(\`)으로 변경되어있다. 나는 귀찮아서 (거의) 모든 문자열을 백틱(\`)으로 처리한다.

## 예제 실행하기
express를 실행하면 놀랍게도.

![1](/resources/express/2025-04-28-parameter/1.png)

똑같이 나온다.

코드를 분명 수정했는데, 변한 것이 없어 보인다. 하지만 여기서 주소창에 약간의 수정을 더해보자.

> localhost:3000/cat

![2](/resources/express/2025-04-28-parameter/2.png)

cat 말고 다른 것들을 넣어보자. 한국어를 넣어도 문제없이 동작한다!

이게 얼마나 놀라운 거냐면, 지구 어딘가에 있을 밥이라는 사람에게 인사를 보낼 때 **www.hello.com\/bob** 이라는 간단한 링크만 보내주면 된다. 밥이 이 경로가 기억하고 있다면, 언제라도 이 사이트에서 동일한 인사를 볼 수 있다!

## 추가한 코드 톺아보기
다행히도 이번에 살펴볼 부분은 많지 않다.

```javascript

app.get('/:name', (req, res) => {
    const name = req.params.name;
    res.send(`hello,${name}.`);
});


```

req 객체에는 많은 주요 속성과 메서드들이 내장되어있다. 다르게 말하면 서버가 요청(request)받을 때 쓰이는 것들은 모두 들어가 있다는 뜻이라서, 요청(request)에 한해서 올인원 객체라는 뜻이다.

이번에 사용한 주요 속성은 매개변수(parameter) 다.

> req.params

사실 복잡하게 생각할 필요없다.

특정한 형태로 express 에 **이런 이름의 매개 변수에 이런 값이 들어왔다**고 전달하는게 전부다. 

**'\/:name'** 에서 **\/:** 이 기호가 매개 변수의 이름을 지정한다.

**req.params.name** 의 **name** 은 위에서 정한 매개 변수의 이름을 사용한다.

그래서 정리하면, **'\/:'** 뒤에 있는 **name** 이 **req.prams.** 뒤에 있는 **name** 이다. 만약 \/:food 였다면 아래의 코드처럼 될 것이다.

```javascript

app.get('/:food', (req, res) => {
    const food = req.params.food;
    res.send(`hello,${food}.`);
});


```

## 짝수인지 홀수인지 답해주는 웹서버
이제 간단한 javascript 로직을 넣어서 매개 인자로 들어온 숫자가 짝수인지 홀수인지 답해주는 웹 서버로 발전시켜보자.

hello.com 의 성공으로 우리는 좀 더 고급진(?) 서비스를 개발하기로 했다.

이름하야 홀짝 확인기!  

이 세상 어딘가 있을 단순한 url 만으로 홀짝을 구분하고 싶어하는 사람에게 *www.hello.com\/** 에 숫자만 넣으면 홀짝인지 알려주는 정말 엄청난 서비스다!

```javascript

import express from 'express'

const app = express();
const port = 3000;

app.get('/:number', (req, res) => {
    const number = req.params.number;
    let response = '';

    if (isNaN(number)) {
        response = `숫자만 입력해주세요.`;
    } else {
        const integer = parseInt(number, 10);
        const type = integer % 2 === 0 ? `짝수` : `홀수`;
        response = `${integer}는 ${type}입니다.`;
    }

    res.send(response);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


```
간단한 예외처리 코드까지 넣어보았다.

예외처리 코드를 넣게 된 이유는 의도했던 대로 입력이 안 될 수도 있다는 것을 깨달았기 때문이다. 웹 서버를 다시 시작하고 \/cat이 되어 있는 상태에서 웹페이지를 새로고침 했더니 짝수가 나왔다. 내가 아무 생각 없이 실수했던 것처럼 다른 사용자들도 그럴 가능성이 매우 높기 때문에, 입력된 값이 숫자가 아닌지 체크하는 코드를 추가했다. 

## 마무리
생각보다 훨씬 재밌는 예제였다.

response에 html 태그와 css 코드가 들어가면 더 예쁜 결과물이 나왔겠지만, express 의 기본적인 동작을 확인하는 게 목적이었으므로 만족한다.