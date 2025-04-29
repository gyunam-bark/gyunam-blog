---
title: "[express] 파라미터 활용하기"
subtitle: "parameter를 사용한 todo 서버를 개발해본다."
tags:
  - express
layout: layouts/post.njk
date: 2025-04-29
---
지난 번 **\[express\] 파라미터 사용하기**에 서버에 온 요청(request)의 파라미터를 받아서 간단한 처리 후 응답(response)하는 예제를 진행했었다.

이번엔 이걸 좀 더 깊게 다뤄보려고 한다.


## parameter-todo 프로젝트 생성
이제는 눈감고..까지는 아니고 눈 뜬 채로는 쉽게 express 프로젝트를 만들 수 있다.

> npm init -y  

> npm i --save express

> npm pkg set type="module"

> npm pkg set sacripts.start="node index.js"

물론, 나중에 가면 더 고차원적인 프레임워크를 사용해서 거의 자동으로 만들어 줄 것 같지만, express 기본 상태의 작고 깔끔한 디렉토리도 내 취향에 맞다.

```text

parameter-todo
├ node_modules
├ index.js
├ package-lock.json
├ package.json


```

index.js에 기본 코드를 넣고 시작한다.

```javascript

import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`hello.`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


```

npm run start로 잘 동작하는 것까지 확인한다.

## task 클래스 만들기
index.js 와 동일한 경로에 task.mjs 를 만든다.  

원래라면 별도의 디렉토리를 만들어서 그 안에서 관리하는 게 좋다고 한다. 그러나 이번에는 task.mjs 하나의 파일만 생성할 것이기 때문에 index.js 옆에 생성한다.

```text

parameter-todo
├ node_modules
├ index.js
├ package-lock.json
├ package.json
├ task.mjs


```
단순하게 id와 title 정보만 가지는 클래스를 하나 만들 것이다. 

사실 이 정도 구조면 그냥 객체를 써도 되는데, 클래스와 모듈화를 좀 더 익숙해지려고 노력하고 있다.

```javascript

// task.mjs
export default class Task {
  #id;
  #title;

  constructor(id, title) {
    this.#id = id;
    this.#title = title;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    this.#title = value;
  }

}


```

코드의 구조랄 것도 없을 정도로 단순한 클래스다.

id 는 고유한 식별 번호고, title 은 할 일의 이름이다. 굳이 id가 없고 title 만 있어도 되긴 하지만, 우리가 동일한 할 일을 적지 않는다는 보장이 없다. 

아침 먹기 한 번, 점심 먹기 한 번 이라고 적을 수 있지만, 밥 먹기 이렇게 뭉뚱그려서 여러 번 적을 수도 있기 때문이다.

특이점은 id는 외부에서 받아볼 수는 있지만, 수정할 수는 없도록 했다. 이 id 라는 것은 할 일이 생성될 때 서버에서 할당한다. 그래서 실제로 task 가 생성되고 나면 id 는 삭제 될 때 까지 변하지 않는다.

## index.js에서 task 사용하기
이제 이 task 를 사용해노다.

지금 당장은 단순하게 /:task 파라미터가 입력되면 task 를 새로 생성해서 taskList 에 넣어보도록 하자.

```javascript

import express from 'express';
import Task from './task.mjs';

const app = express();
const port = 3000;

const task_list = [];

app.get('/:task', (req, res) => {
  const param = req.params.task;
  const id = task_list.length + 1;
  const task = new Task(id, param);

  task_list.push(task);

  res.send(`${task.id} : ${task.title}`)

  console.log(`현재 task 의 총 갯수는 ${task_list.length} 입니다.`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


```

이제 웹 브라우저 주소창에 아래의 주소를 입력 해서 간단한 테스트를 할 수 있다.

```text

localhost:3000/hello

```
그러면 웹 페이지와 터미널에 아래와 같은 결과가 나타난다.

![1](/resources/express/2025-04-29-parameter-todo/1.png)

새로고침을 하거나, 다른 값을 넣으면 값이 계속 변하는 것을 알 수 있다.

## 파라미터를 나눠서 사용하기
지금 우리가 만든 서비스의 task 파라미터에 넣으면 새로운 task 생성 기능이 잘 동작하고 있다.

단순히 추가만 하는 거라면 상관없지만, 보통 우리가 할 일 목록을 만들면 지우는 것도 고려하게 된다. 다이어트를 일정표에 넣었다가 지금은 때가 아니다 라는 느낌으로 지워야 하는 것처럼!

이때 고려해볼 수 있는 방법이 파라미터를 늘려보는 것이다.

```javascript

app.get('/:command/:title', (req, res) => {
  const command = req.params.command;
  const title = req.params.title;

  console.log(`${command} 명령어 확인!`);

  const id = task_list.length + 1;
  const task = new Task(id, title);

  task_list.push(task);

  res.send(`${task.id} : ${task.title}`)

  console.log(`현재 task 의 총 갯수는 ${task_list.length} 입니다.`);
});


```

이렇게 해서 실행하면 원래의 방법으로는 동작하지 않는다.

우리가 새로운 파라미터를 만들었기 때문에 아래와 같이 웹 브라우저 주소창에 입력해야 한다.

> localhost:3000/hello/bob

파라미터의 규칙이 워낙 간단하기 때문에, **'/:'** 이 붙은 이름 그대로 가져서 쓸 수 있다.

node.js 콘솔을 확인해봐도 hello 를 command 로 제대로 인식하고 있다.

이제 무엇을 어떻게 하면 될지 가닥이 잡힌다.

우리는 이 command 파라미터에 들어오는 명령어에 따라서 처리할 코드를 작성하면 된다!

간단하게 명령어들은 아래와 같이 정의한다.

1. add
2. remove

할 일을 완료했다는 체크까지는 하지 않는다. 할 일을 완료하면, 그냥 remove 하는 자유성을 보장한다. 절대 귀찮아서 그런게 아니다! 우리도 다이어트를 하기로 해놓고는, 그냥 없었던 일로 만드는 자유를 가지고 있지 않은가.

우선 위의 명령어 목록에 따라 미리 명령어를 상수를 선언한다.

원래 나는 상수는 COMMAND_ADD 처럼 쓰는 것을 선호하지만, express 공식 예제가 상수를 소문자로만 기입하길레 따라써봤다.

```javascript

const command_add = 'add';
const command_remove = 'remove';


```

이제 이 명령어 상수를 사용해서 app.get 내부에 switch 조건문을 작성한다.

```javascript

app.get('/:command/:title', (req, res) => {
  const command = req.params.command;
  const title = req.params.title;

  switch (command) {
    case command_add: {
      // task 추가
      break;
    }
    case command_remove: {
      // task 삭제
      break;
    }
    default: {
      break;
    }
  }

  const id = task_list.length + 1;
  const task = new Task(id, title);

  task_list.push(task);

  res.send(`${task.id} : ${task.title}`)

  console.log(`현재 task 의 총 갯수는 ${task_list.length} 입니다.`);
});


```

조건문을 작성하고 나니까 두번째 파라미터 title 이 눈에 띈다. 그냥 생성만 있을 때는 title 이 있는 게 적절했지만, 다른 명령어들도 이 파라미터 값을 써야하는 상황에서는 어색해진다.

왜냐면 remove 는 고유한 id 값으로 동작하기 때문이다. 그렇기 때문에 이 title 을 좀 더 범용적인 value 로 바꾼다.

그리고 command_add 안으로 기존에 만들어 두었던 task 생성 코드를 옮긴다.

```javascript

app.get('/:command/:value', (req, res) => {
  const command = req.params.command;
  const value = req.params.value;

  switch (command) {
    case command_add: {
      const id = task_list.length + 1;
      const task = new Task(id, value);

      task_list.push(task);

      res.send(`${task.id} : ${task.title}`)
      break;
    }
    case command_remove: {
      break;
    }
    default: {
      res.send(`명령어는 add, remove 가 있습니다.`);
      break;
    }
  }

  console.log(`현재 task 의 총 갯수는 ${task_list.length} 입니다.`);
});


```
기존 코드의 위치만 옮기는 것이기 때문에 어렵지 않다.

> http://localhost:3000/add/hello

add 파라미터와 hello 파라미터가 잘 적용된다. 명령어를 일부러 틀리면 **명령어는 add, remove 가 있습니다.** 라는 문구도 잘 뜬다.

이제 remove 명령어도 쭉쭉 작성한다.

```javascript

app.get('/:command/:value', (req, res) => {
  const command = req.params.command;
  const value = req.params.value;

  switch (command) {
    case command_add: {
      const id = task_list.length;
      const task = new Task(id, value);

      task_list.push(task);

      res.send(`${task.id} : ${task.title}`)
      break;
    }
    case command_remove: {
      const id = Number(value);

      if (id = NaN) {
        res.send(`숫자 값만 입력할 수 있습니다.`);
        break;
      }

      const index = task_list.findIndex((task) => task.id === id);
      if (index === -1) {
        res.send(`${id} 고유번호를 가진 task가 없습니다.`);
        break;
      }

      const temp = task_list[index];
      task_list.splice(index, 1);

      res.send(`${temp.id} : ${temp.title} 가 삭제되었습니다.`)
      break;
    }
    default: {
      res.send(`명령어는 add, remove 가 있습니다.`);
      break;
    }
  }

  console.log(`현재 task 의 총 갯수는 ${task_list.length} 입니다.`);
  for (const task of task_list) {
    console.log(`${task.id} : ${task.title}`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


```

remove 명령어는 조금 길어졌다.

코드 하나하나를 보면 그렇게 어렵지는 않다. 그저 테스트 하다보니 예외처리를 해야 할 부분이 있었을 뿐이다.

```javascript

 const id = Number(value);


```

value 파라미터 값을 id로 넘길 때는 Number()로 감싸서 처리해야 한다. 혹은 Task 클래스가 id를 문자열로 받거나 해야한다. 클라이언트에서 어떻게 값을 던질지 모르기 때문에 이런 경우를 반드시 고려해야한다. 

이걸 몰라서 한참을 고생했다. 

```javascript

const index = task_list.findIndex((task) => task.id === id);
if (index === -1) {
  res.send(`${id} 고유번호를 가진 task가 없습니다.`);
  break;
}


```

바로 이 findIndex 에서 계속해서 -1 이 반환 되었던 것!

겪어보면 진짜 미치고 팔짝 뛸 노릇이다. 왜냐면 내가 생각하기에는 1과 1은 같은데 어째서 없다고 뜨는지 이해가 안 되기 때문이다. 실제로는 '1' 과 1 을 비교하고 있었던 것이었다.

그래서 따로 Number 로 '1'을 1로 형변환을 해서 사용했다. 근데 다 하고 생각해보니 Task를 문자열로 통일해서 문자열로 관리하는 게 더 맞는거 같기도 하고..

웹서버를 실행하면 잘 동작한다.

## 전체 코드

```javascript

import express from 'express';
import Task from './task.mjs';

const app = express();
const port = 3000;

const task_list = [];

const command_add = 'add';
const command_remove = 'remove';

app.get('/:command/:value', (req, res) => {
  const command = req.params.command;
  const value = req.params.value;

  switch (command) {
    case command_add: {
      const id = task_list.length;
      const task = new Task(id, value);

      task_list.push(task);

      res.send(`${task.id} : ${task.title}`)
      break;
    }
    case command_remove: {
      const id = Number(value);

      if (id = NaN) {
        res.send(`숫자 값만 입력할 수 있습니다.`);
        break;
      }

      const index = task_list.findIndex((task) => task.id === id);
      if (index === -1) {
        res.send(`${id} 고유번호를 가진 task가 없습니다.`);
        break;
      }

      const temp = task_list[index];
      task_list.splice(index, 1);

      res.send(`${temp.id} : ${temp.title} 가 삭제되었습니다.`)
      break;
    }
    default: {
      res.send(`명령어는 add, remove 가 있습니다.`);
      break;
    }
  }

  console.log(`현재 task 의 총 갯수는 ${task_list.length} 입니다.`);
  for (const task of task_list) {
    console.log(`${task.id} : ${task.title}`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


```

지금 현재 task_list 는 node.js 콘솔에서 보이고 있다.

이유는 아래 마무리에서 기재한다.

## 마무리
처음에는 그냥 이전에 썼던 파라미터를 좀 더 써보자는 생각으로 진행했는데, 그보다 더 많은 것들을 얻을 수 있었다.

이제와서 말하는 거지만 원래는 list 명령어도 만들려고 했었다.

근데 그 과정에 이 파라미터의 단점을 알아버리는 엄청난 이득을 얻어버렸다. 결국 list 명령어를 추가하지 못했지만..


### 파라미터의 단점
파라미터의 단점은 /:command/:value 의 구조가 **반드시** 지켜져야 한다.

그게 무슨 말이냐면 list 명령어는 그냥 단순히 목록만 보이면 되는데, list/all 이나 list/tasks 처럼 뭔가를 무조건 덫붙여야만 하는 것이다.

그래서 **쿼리** 가 필요하구나! 를 깨달아버렸다.

### 쿼리가 상위호환이다 개념은 아니다
하지만 그럼에도 파라미터는 굉장히 유용하다.

가령 내가 www.tool.com 이라는 계산기 웹서비스를 만든다고 가정하자. 무려 세상에 존재하는 모든 도구 프로그램을 제공하는 엄청난 웹서비스다!

그중에서도 우리가 계산기를 제공하려고 한다면, 그때 파라미터와 쿼리는 각자 아래의 형태로 사용 될 수 있다.

> www.tool.com/calculator?formula="1+1"

**calculator** 는 파라미터로 처리했다. 왜냐면 www.tool.com 의 수많은 도구 중 어떤 도구를 사용할 지는 고정적으로 사용하기 때문이다. calculator 말고도 speaker 나 game 이 될 수도 있다!

**?formula="1+1"** 는 쿼리로 처리한다. 계산기에 있는 수많은 기능(더하기, 빼기, 곱하기, 나누기..)을 넣을 수 있을 뿐 아니라, 경우에 따라서는 생략(!)도 가능하다. 왜냐면 계산기에 아무것도 입력을 안 하고 reset 으로 0을 넣을 수 있기 때문이다.

근데 적고 보니까 파라미터 없이 localhost/ 에 list 를 보여도 됐었네..?

### 휘발성 데이터
눈치 챈 사람도 있을 텐데, 우리의 서비스는 웹서버가 꺼졌다 켜지면 이때까지의 모든 데이터가 날라간다.

물론, 긍정적으로 보면 언제나 새 마음 새 뜻으로 한다는 얘기고, 평범하게 생각하면 피해보상금액을 계산기로 두드리고 있어야 한다.

그래서 **데이터베이스** 가 필요한 것이다.

데이터베이스는 서버와 연동해서 쓰지만 서버가 꺼져도 데이터베이스는 유지된다.

내가 다이어트를 하기로 마음만 먹었어도, 그 하려고 했던 마음 만큼은 지켜주는 것이 데이터베이스란 것이다.