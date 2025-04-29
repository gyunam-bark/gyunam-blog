---
title: "[toy] 엉?박싱"
subtitle: "엉? 소리가 나는 엉뚱한 언박싱 미니 게임"
tags:
  - toy
layout: layouts/post.njk
date: 2025-04-28
---
javascript 클래스를 학습하는데 뭔가 팟! 하고 와닿는게 없었다.

수업이 마치고 멘토님과 팀 멘토링을 1시간 정도 진행했는데, 원리를 이해하는 것이 중요하다고 말하셨다. 원리를 이해하기 위해서는 무엇을 해야할까 고민하다가, 이걸로 뭔가 만들어보자! 하고 결심했다. 

javascript 클래스랑 연관된 주된 개념인 상속(succession), 다형성(polymorphism), 그리고 캡슐화(encapsulation)를 사용한 미니 게임을 만드는 것이다.

## 게임의 규칙
1. index.js를 실행하면 랜덤한 item을 받는다.
2. item 별로 상세 정보가 나온다.
3. item 을 사용하고 item 별로 결과가 나온다.

## 깃허브 레포지토리 생성
토이 프로젝트니까 평소 예제 학습하는 것과 다르게 github 레포지토리를 만들었다. 근데 아무도 이런 엉뚱한 언어 유희를 생각하지 못했나 보다. ung-boxing 이.. 겹치지 않는다고??

> [https://github.com/gyunam-bark/ung-boxing](https://github.com/gyunam-bark/ung-boxing)

완성된 게임의 전체 코드가 이곳으로 올라갈 것이다.

## 프로젝트 기본 설정
프로젝트 디렉토리에 index.js 를 만들고 node.js 최초 셋팅 명령어 3종 세트를 사용한다.

> npm init -y  
> npm pkg set type="module"  
> npm pkg set scripts.start="node index.js"

이제 손에 익어서 필기 노트를 안 봐도 초기화 할 수 있게 되었다. 얏호!

```text

ung-boxing 
├ package.json
├ README.md


```

> npm run start  

실행 스크립트도 문제없이 에러를 내 뱉지 않는다.

index.js 에 아무것도 작성하지 않았지만, 혹시나 **npm pkg set** 명령어에 오타를 냈을 수 있어서 꼭 한번 확인한다.

## item 클래스 만들기
일단 item 클래스를 먼저 만들기로 한다.

미니 게임이지만 item을 상속하는 클래스가 많아질 예정이기 때문에 별도로 담아둘 디렉토리도 함께 만든다.

```text

ung-boxing 
├ items
  ├ item.mjs
├ index.js
├ package.json
├ README.md


```

이제 간단하게 item.mjs 를 작성해보자.

```javascript

// item.mjs
export default class Item {
  // private
  #name;

  constructor(name) {
    this.#checkName(name);
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#checkName(value);
    this.#name = value;
  }

  look() {
    console.log(`=================`);
    console.log(`name:${this.name}`);
    console.log(`-----------------`);
  }

  use() {
    console.log(`nothing happens!`);
  }

  // private
  #checkName(name) {
    if (typeof name !== 'string') {
      throw new Error(`[error] item.mjs : name must be string!`);
    }
  }
}


```

가능한 영어로 적었는데, 별 이유없고 그냥 영어 공부도 같이 할 겸 했다. 고3 이후로 영어 작문을 안 해봤더니, 영어로 쓰는게 굉장히 어색하게 느껴졌다. 읽는 건 되는데 말하는 것과 쓰는 것은 좀 사소한 거라도 자주 해보려고 노력해야겠다는 생각이 들었다. 

아무튼 item.mjs 로 돌아가서 워낙 구조가 간단해서 주석을 쓸만한 것도 없었다.

제일 신경 쓴 건 **'#(private)', 획득자(getter) 그리고 설정자(setter)** 부분인데, **캡슐화(encapsulation)** 라는 걸 좀 체감해보고 싶어서 최대한 적용해보았다. 근데 너무 item 구조가 간단해서 확 체감은 안 되는거 같기도 하고..

그 다음에 신경쓴 건 입력값을 예외처리하는 부분이었다. 이걸 하다가 엥? 이게 되네 했던 부분이 **#(private)** 가 메서드에도 적용이 된다는 점이었다. 입력값이 문자열인지 아닌지 체크하는 부분을 check 로 따로 빼내니까 훨 코드가 깔끔해졌다.

그 밖에 신경쓴 건 메서드 이름 지을 때였다. showDetail 같이 좀 더 길게 하는게 좋을까 싶기도 한데, 지금은 그냥 직관적으로 생각나는 데로 지었다.

지금 중요한 건 클래스 개념을 파악하는 거니까.

## index.js 에서 item 사용하기
이제 index.js 에서 item 을 가져와서 사용해보는 코드를 만든다.

```javascript

// index.js
import Item from './items/item.mjs';

const item = new Item('hey');
item.look();
item.use();


```

이제 Item을 만들어서 이름을 보고 사용할 수 있는 코드가 완성되었다. npm run start 로 실행해보면, 내가 예상했던 결과가 잘 나왔다. 

```text

=================
name:hey
-----------------
nothing happens!


```

예외처리 부분도 확인하기 위해서 Item(1) 처럼 일부러 틀리게 코드를 수정해서 실행했다.

```text

Error: [error] item.mjs : name must be string!


```

에러도 잘 표시 된다!

## potion 클래스 만들기
이제 item 클래스를 상속(succession)해서 potion을 만들기로 했다.

items 디렉토리에 potion.mjs 를 만들었다.

```text

ung-boxing 
├ items
  ├ item.mjs
  ├ potion.mjs
├ index.js
├ package.json
├ README.md


```

potion은 용량(liter)와 효과(effect)를 가지도록 클래스를 작성했다.

작업하다보니까 이 미니 게임이 다형성(polymorphism)을 연습하기에 적절한 아이디어였다고 생각되었다.

```javascript

// potion.mjs
import Item from './item.mjs';

export default class Potion extends Item {
  #liter;
  #effect;

  constructor(name, liter, effect) {
    super(name);
    this.#checkLiter(liter);
    this.#checkEffect(effect);
    this.#liter = liter;
    this.#effect = effect;
  }

  get liter() {
    return this.#liter;
  }

  set liter(value) {
    this.#checkLiter(value);
    this.#liter = value;
  }

  get effect() {
    return this.#effect;
  }

  set effect(value) {
    this.#checkEffect(value);
    this.#effect = value;
  }

  look() {
    super.look();
    console.log(`liter: ${this.liter}`);
    console.log(`effect: ${this.effect}`);
  }

  use() {
    console.log(`i drank a ${this.liter}L ${this.name} potion and it had a '${this.effect}' effect.`);
  }

  #checkLiter(liter) {
    if (typeof liter !== 'number') {
      throw new Error(`[error] potion.mjs : liter must be number!`);
    }
  }

  #checkEffect(effect) {
    if (typeof effect !== 'string') {
      throw new Error(`[error] potion.mjs : effect must be string!`);
    }
  }

}


```

글로 옮기니까 길어보이는 데, 실제로는 별로 어려운 부분은 없다. 그냥 item 에 비해서 추가적인 값이 있을 뿐이라, 큰 구조적 형태는 item 과 동일하기 때문이다.

코드를 작성 할 때 최대한 필기 했던 것을 참고하지 않고 스스로 해보는 과정을 먼저 하는데, **super** 에서 실수했다. super(name) 으로 하면 되는데, super.constructor(name); 으로 해두고 어.. 이게 아닌가 했던 것. 이게 헷갈린 만했던 게, 또 look() 에서는 super.look(); 으로 쓰니까!

## index.js에서 potion 사용하기
이제 index.js 에서 potion 을 가져와서 사용하는 코드를 추가한다.

``` javascript

// index.js
import Item from './items/item.mjs';
import Potion from './items/potion.mjs';

const item = new Item('hey');
item.look();
item.use();

console.log();

const potion = new Potion('hp', 1, 'heal');
potion.look();
potion.use();


```

기존의 item 을 상속해서 만들었기 때문에 선언해서 사용하는 것은 크게 차이나지 않는다.

```text

=================
name:hey
-----------------
nothing happens!
=================
name:hp
-----------------
liter: 1
effect: heal
i drank a 1L hp potion and it had a 'heal' effect.


```

무려 1L 용량의 물약을 마셔서 '회복' 효과를 가질 수 있게 되었다!!

## scroll 클래스 만들기
potion 과 마찬가지로 그냥 반복 연습 개념으로 작업한다. 이제 큰 구조는 거의 차이가 없으므로 디렉토리 구조와 코드만 적는다.

```text

ung-boxing 
├ items
  ├ item.mjs
  ├ potion.mjs
  ├ scroll.mjs
├ index.js
├ package.json
├ README.md


```

디렉토리를 만들다 보니까 깨달았다. 귀찮으니까 scroll 까지만 만들어도 될 듯.

```javascript

// scroll.mjs
import Item from './item.mjs';

export default class Scroll extends Item {
  #skill;

  constructor(name, skill) {
    super(name);
    this.#checkSkill(skill);
    this.#skill = skill;
  }

  get skill() {
    return this.#skill;
  }

  set skill(value) {
    this.#checkSkill(value);
    this.#skill = value;
  }

  look() {
    super.look();
    console.log(`skill: ${this.skill}`);
  }

  use() {
    console.log(`i use a ${this.name} scroll enchanted with '${this.skill}' skill.`);
  }

  #checkSkill(skill) {
    if (typeof skill !== 'string') {
      throw new Error(`[error] potion.mjs : effect must be string!`);
    }
  }

}


```

절대 귀찮아서 skill 하나만 있는 클래스를 만든 게 아니다. 절대.(사실은 맞다.)

potion 처럼 index.js 에 테스트 코드를 작성하고 실행하면 결과값이 잘 나온다. 당연히 입력 예외처리도 잘 된다.

## 랜덤한 아이템을 만들기 위한 로직 작성
테스트는 완료되었으니까 index.js 에 진짜 게임 코드를 만들어 본다. import 부분만 제외하고 모든 테스트 코드를 지운다.

고양이를 쓰다듬으며 털 뿜뿜하며 생각해보니, 랜덤한 아이템을 만드는 흐름은 크게 3 가지로 나뉜다.

1. potion 이냐 scroll 이냐.
2. potion 내에서 name, liter, effect 정보
3. scroll 내에서 name, skill 정보

먼저 potion 과 scroll 을 랜덤으로 받기 위한 기준을 만든다.

```javascript

const TYPE_POTION = 0;
const TYPE_SCROLL = 1;

const typeList = [TYPE_POTION, TYPE_SCROLL];


```

사실 문자열로 해도 되는데, 나는 분류할 때 쓰이는 상수는 저렇게 숫자로 바꿔서 쓰는게 편하다. 특히 저 대문자로만 표시하면 기분이가 좋다. 이유는 모른다.

```javascript

const TYPE_POTION = 0;
const TYPE_SCROLL = 1;

const typeList = [TYPE_POTION, TYPE_SCROLL];

// ===================================
let item = null;

function getRandomItem(){
  let random = Math.floor(Math.random() * 2);
  const type = typeList[random];
}
// ===================================


```

이어서 현재 item 을 저장할 변수와 랜덤한 아이템을 받아올 getRandomItem() 함수를 만든다.

```javascript

let random = Math.floor(Math.random() * 2); 


```

Math.floor(Math.random() * 2) 로 0 과 1 사이의 숫자를 랜덤으로 받아온다. 2 를 곱해주는 이유는 Math.random()은 0 이상 1 미만의 소숫점을 만들기 때문에 2를 곱해서 0 이상 2 미만의 소숫점을 나오게 만든다. 그리고 나서 Math.floor()를 사용해서 소숫점을 처리하면 0 과 1 정수를 받을 수 있다.

뭐가 나오던 50% 확률이겠지만. item 종류 더 만들기 귀찮다고.

```javascript

const TYPE_POTION = 0;
const TYPE_SCROLL = 1;

const typeList = [TYPE_POTION, TYPE_SCROLL];

let item = null;

function getRandomItem() {
  let random = Math.floor(Math.random() * 2);
  const type = typeList[random];
  // ===================================
  switch (type) {
    case TYPE_POTION:
      item = new Potion('coke', 1, 'sweet');
      break;
    case TYPE_SCROLL:
      item = new Scroll('heal', 'poison');
      break;
  }
  // ===================================
}

// ===================================
getRandomItem();

item.look();
item.use();
// ===================================


```

item 종류가 두개 밖에 없기 때문에 if 문을 써도 되지만, 사람 일은 모르기 때문에 switch 문으로 작성했다. 

아까 위에서 상수를 미리 대문자로 이루어진 단어로 바꿔뒀기 때문에 한눈에 뭐가 뭔지 알아볼 수 있다.

실행을 해보면 실행할 때 마다, 랜덤하게 potion(coke, 1, sweat) 와 scroll(heal, poison) 중에서 나온다! 이제 이 potion 과 scroll 에 들어갈 값들의 다양한 데이터를 만들어 보자.

```javascript

const TYPE_POTION = 0;
const TYPE_SCROLL = 1;

const typeList = [TYPE_POTION, TYPE_SCROLL];

// ===================================
const potionData = {
  names: ['cat', 'dog', 'bear'],
  liter: 10,
  effects: ['health restoration', 'mana regeneration', 'strength boost']
};

const scrollData = {
  names: ['rose', 'sunflower', 'rotus'],
  skills: ['torch', 'ice spike', 'lightning strike']
};
// ===================================

let item = null;
// ...


```

기왕 하는 거 모든 요소가 다 랜덤으로 동작하도록 만든다. potion의 용량은 숫자값을 넣을 수 있기 때문에 아까처럼 Math.random() 으로 처리하기 때문에 가장 큰 값만 적어둔다.

근데 곰곰히 생각해보니, **let random = Math.floor(Math.random() * 2);** 가 반복적으로 쓰일꺼라 적기 귀찮아졌다. 함수로 따로 빼내기로 한다.

```javascript

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}


```

이 함수를 만들어서 사용하기로 한다. 아까 적었던 코드도 이 함수를 쓰도록 수정한다. 이제 각각의 아이템에 맞춰서 랜덤 함수를 적용한다.

```javascript

// index.js
const TYPE_POTION = 0;
const TYPE_SCROLL = 1;

const typeList = [TYPE_POTION, TYPE_SCROLL];

const potionData = {
  names: ['cat', 'dog', 'bear'],
  liter: 10,
  effects: ['health restoration', 'mana regeneration', 'strength boost']
};

const scrollData = {
  names: ['rose', 'sunflower', 'rotus'],
  skills: ['torch', 'ice spike', 'lightning strike']
};

let item = null;

function getRandomData(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomItem() {
  const type = getRandomData(typeList);

  switch (type) {
    case TYPE_POTION:
      {
        const name = getRandomData(potionData.names);
        const liter = parseFloat((Math.random() * potionData.liter).toFixed(1));
        const effect = getRandomData(potionData.effects);
        item = new Potion(name, liter, effect);
        break;
      }
    case TYPE_SCROLL:
      {
        const name = getRandomData(scrollData.names);
        const skill = getRandomData(scrollData.skills);
        item = new Scroll('heal', 'poison');
        break;
      }
  }
}

getRandomItem();

item.look();
item.use();


```

실행하면 정말 랜덤한 엉뚱한 아이템들이 계속 나온다. 근데 거진 다 만들고 나서 보니 좀 더 깔끔하게 만들 수 있는 부분이 있어서 코드 정리를 진행했다.

```javascript


import Potion from './items/potion.mjs';
import Scroll from './items/scroll.mjs';

const TYPE_POTION = 0;
const TYPE_SCROLL = 1;

const typeList = [TYPE_POTION, TYPE_SCROLL];

const potionData = {
  names: ['cat', 'dog', 'bear'],
  liter: 10,
  effects: ['health restoration', 'mana regeneration', 'strength boost']
};

const scrollData = {
  names: ['rose', 'sunflower', 'rotus'],
  skills: ['torch', 'ice spike', 'lightning strike']
};

function getRandomData(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomItem() {
  const type = getRandomData(typeList);

  switch (type) {
    case TYPE_POTION:
      {
        const name = getRandomData(potionData.names);
        const liter = parseFloat((Math.random() * potionData.liter).toFixed(1));
        const effect = getRandomData(potionData.effects);
        return new Potion(name, liter, effect);
      }
    case TYPE_SCROLL:
      {
        const name = getRandomData(scrollData.names);
        const skill = getRandomData(scrollData.skills);
        return new Scroll(name, skill);
      }
  }
}

const item = getRandomItem();

item.look();
item.use();

console.log(``);

```

생각해보니 item 을 return 으로 던질 수 있었다! 덕분에 실제로 item 과 관련된 부분은 단 3줄로 줄었다.

마지막의 console.log(``); 는 출력하니, 너무 터미널이 딱 붙어있어서 여백으로 추가했다.

## 상호작용 추가하기
npm run start 를 사용하면 잘 동작하고 있지만, 뭔가 많이 허전하다.

좀 더 게임 같이 특정 명령어를 입력하면 동작하도록 하고 싶다.

1. open : 새로운 item 생성 및 상세 정보  보이기
2. use : 해당 item 사용
3. quit : 종료 

찾아보니 **readline** 이란 패키지가 있었다. 그것도 node.js 에서 공식적으로 제공하는 패키지다! 근데 이 친구는 esm 기반이 아니라 commonjs 기반이라고 한다. 그래서 esm 으로 사용할 때엔 조금 번거스럽게 가져와야 한다.

```javascript

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
// ...


```

**node:readline/promises** 을 보고 생소한 단어가 있어서 잠시 멈췄다. 일단 node:readline 은 node.js 에서 제공하는 readline 이라는 것은 확실히 알 수 있다. 근데 뒤에 promise 가 있네? 이건 대체 뭔가 싶어서 찾아봤더니 javascript 의 비동기 처리 방법 중 하나였다. 

오래 전(이라 해봐도 그렇게 안 오래 전임) node.js가 만들어 질 때에는 콜백 함수를 사용해서 비동기 작업을 했다고 한다.

이때 웹 브라우저 밖에서 자바스크립의 모듈을 만들고 사용하기 위한 규칙을 정리한 프로젝트인 commonjs 를 가져와서 만들었기 때문에 기본적으로 commonjs를 사용하고 있다고 한다.

차후에 readline 을 es6 이후로 자주 쓰이는 promise 방식으로 만들어 둔 것이 node:readline/promises 라고 볼 수 있다.

**stdin as input, stdout as output** 은 생각보다 쉽게 이해되었다. 그냥 입력 받고 출력 하는 기능을 가져오는 것이다. 지금 내가 원하던 바로 그 기능!

근데 이거 아무것도 안 보고 사용해야 했으면 절대 못했다. 이름 모를 지구 어딘가에 있을 node.js 커뮤니티 개발자 여러분 감사합니다.

이제 상호작용을 적용하기 위해서 끝 부분에 작성했던, item 을 생성하고 내장 메서드(look, use)들을 사용하던 코드를 삭제한다.

```javascript

const item = null; // set null

// item.look();
// item.use();

// console.log('');


```

자, 이제 우리는 무시무시한 무한 루프를 만들어야 한다.

```javascript

// hororable infinite loop
for (;true;){

}


```

분명 강의에서 무한 루프에 빠지면 안 된다고 했는데! 물론, 무한 루프에 빠지는 것은 조심해야 한다. 그것이 우리가 의도한 게 아니라면.

이번에는 의도적으로 무한 루프에 빠져야 한다.

왜냐면 우리가 이 게임을 종료하기 전까지는 이 게임은 영원히 계속 되어야 하기 때문이다. 그래야 계속해서 새로운 상자를 받아서 열어 새 item 을 얻을 테니까.

while(true) 가 아니라 for(;true;) 로 한 게 생소할 수 있다. 이건 취향 차이일텐데, 나는 가능한 while 을 쓰지 않으려고 애쓴다. 큰 이유가 있는 건 아니고 가능한 선택지를 줄이는 코딩 스타일을 유지하고 싶기 때문이다. 내가 \=\= 를 없는 연산자 취급하는 것과 동일한 이유다.

아무튼 이제 이 readline 을 실제로 사용해본다.

```javascript

const readlineInterface = readline.createInterface({ input, output });

const TYPE_POTION = 0;
const TYPE_SCROLL = 1;

```

import 부분 바로 아래에 **const rl = createInterface({ input, output });** 을 적는다. rl은 readline의 약자인데, 변수명을 readline 으로 하려고 하니까 아차차 내가 readline 으로 패키지를 가져왔다는 것을 깨달았다.

그리고 오랜만에 등장한 용어 인터페이스(interface)! 

다시 한번 복습하자면 중간에(inter) + 맞대다(face) 합성어로 중간에서 양 쪽을 중계하는 역활을 하는 녀석들을 말한다. 지금은 우리와 게임 사이를 중계해주는 역활을 할 것이다.

이 인터페이스의 기능을 사용해본다.

```javascript

for (; true;) {
  const command = await readlineInterface.question('>');
  console.log(command);
}


```

readline 인터페이스에는 **question** 이라는 기능이 있다. 말 그대로 무언가 물을테니, 사용자가 답할 때 까지 기다리는 역활을 한다.

실행하고 **>** 옆에 hi 를 입력하고 엔터를 치면 바로 아래에 hi 라고 뜬다!

```text

>hi
hi


```

바로, 이거다! 이 기능을 사용하면 우리가 생각한 명령어로 무한히 item 을 만들 수 있다. 

다시 위로 올라가서 명령어를 위한 상수들을 정리한다.

```javascript

const TYPE_POTION = 0;
const TYPE_SCROLL = 1;

// ===================================
const COMMAND_OPEN = 'open';
const COMMAND_USE = 'use';
const COMMAND_QUIT = 'quit';
// ===================================

const typeList = [TYPE_POTION, TYPE_SCROLL];


```
캬, 저 대문자와 _로만 이루어진 아름다운 자태를 보라.

이제 다시 무한 반복문 안에 이 상수들을 이용해서 분기점을 만든다.

```javascript

for (; true;) {
  const command = await readlineInterface.question('>');

  switch (command) {
    case COMMAND_OPEN:
      {
        item = getRandomItem();
        item.look();
        console.log(`-----------------------------------------------------`);
        console.log(``);
        break;
      }
    case COMMAND_USE:
      {
        if (item !== null) {
          item.use();
          item = null;
          console.log(``);
        } else {
          console.log(`no item to use. please open new box.`);
          console.log(``);
        }
        break;
      }
    case COMMAND_QUIT:
      {
        readlineInterface.close();
        break;
      }

    default:
      {
        console.log(`unkonown command. use 'open', 'use', 'quit'.`);
      }
  }
}


```

이제 실행해보면 내가 원하는 대로 동작을 한다. 문제는 게임을 하는 동안은 문제가 없는데 게임을 끄고 나면 문제가 발생했다. 에러 코드를 보고 나니 원인은 크게 두가지로 나뉘었다.

1. await 는 가능한 async 함수 안에 써야 한다.
단순히 절차적으로 진행하면 되겠거니 하고 쭉 썼는데, 가능한 별도의 async 함수 내부에서 써야 하는 게 좋다고 한다. 원래는 async로 감싸진 함수 안에서만 된다고 하는데, 아마도 하위호환 때문에 가능하게 해둔 것 같아 보인다. 

2. 위의 이유로 비동기가 정상적으로 동작하지 않아서 COMMAND_QUIT 의 break; 후에 다시 question 을 물었다.
이미 차떠나고 없는데, 차를 찾고 있는 상황이었다.

이러한 이유로 어차피 함수로 빼내어야 한다면 game 이라는 클래스를 만들어서 빼내기로 한다. 되게 간단하게 되겠지라고 시작한 프로젝트가 산으로 올라가다 못해 우주로 향하고 있는 기분이지만 어쨋든 여기서 마무리하면 잠을 못 잘 것이다.

## game 클래스 만들기
이미 만들어진 코드를 밖으로 빼내는 것이기 때문에 어렵진 않다. 거의 대부분의 코드가 이동하게 되지만.

```text

ung-boxing 
├ items
  ├ item.mjs
  ├ potion.mjs
  ├ scroll.mjs
├ game.mjs
├ index.js
├ package.json
├ README.md


```

game.mjs 하나만 있으면 되기 때문에 별도의 디렉토리 없이 추가한다.

기본적인 원리는 무한 루프와 item 을 클래스로 감싸는 것이다.

```javascript

export default class Game {
  #item;

  constructor() {
    this.#item = null;
  }

  async run() {
    for (; true;) {
      const command = await readlineInterface.question('>');

      switch (command) {
        case COMMAND_OPEN:
          {
            item = getRandomItem();
            item.look();
            console.log(`-----------------------------------------------------`);
            console.log(``);
            break;
          }
        case COMMAND_USE:
          {
            if (item !== null) {
              item.use();
              item = null;
              console.log(``);
            } else {
              console.log(`no item to use. please open new box.`);
              console.log(``);
            }
            break;
          }
        case COMMAND_QUIT:
          {
            readlineInterface.close();
            return;
          }

        default:
          {
            console.log(`unkonown command. use 'open', 'use', 'quit'.`);
          }
      }
    }
  }
}


```

game 클래스로 옮기면서 두가지의 변경점이 생겼다.

첫번째는 run 메소드를 자세히 보자. **async** 가 앞에 붙어있다. 이제 확실하게 비동기로 동작할 수 있도록 변경되었다.

두번째는 COMMAND_QUIT 에서 return; 으로 끝난다. return 으로 아예 함수 자체를 완전 끝내기 때문에 만일의 경우에도 다시 반복문이 돌아갈 일이 없다.

## index.js 정리하기
이렇게 빼낸 game 클래스 index.js 를 정리한다.

```javascript

import Game from './game.mjs';

const game = new Game();
game.run();


```

내가 만든 게임을 실행하기 위해서는 단 3줄의 javascript 코드가 필요할 뿐이다.

![1](/resources/toy/2025-04-28-ung-boxing/1.png)

실행하면 잘 동작한다.

## 배포용 빌드 만들기
게임을 만들고 나니까 이 게임을 플레이 하려면 node.js 개발 환경이 설정된 사람만 할 수 있다는 것이 불편해졌다. 

찾아보니 node.js 에 각 os 별로 단독으로 실행할 수 있는 패키징을 해주는 패키지인 pkg 가 있었다. 

> npm install -g pkg

**패키징 패키지 pkg** 라니 역시 글로벌한 개발자들은 다르구만.

> npm pkg set scripts.build="pkg . --out-path build\/"
> npm pkg set scripts.bin="index.js"

package.json 에 build 스크립트를 추가한다. **pkg .** 처럼 pkg 뒤에 . 꼭 찍어야 한다! 경로를 안 넣으면 빌드가 실패한다.

**/-/-out-path build\/** 는 사실 없어도 된다. 빌드한 결과물을 레포지토리에 올리기 싫어서 나중에 디렉토리 째로 .gitignore 에 추가하려고 해둔 것이다.

> npm run build

이론 상 이렇게 하면 빌드가 되어야 한다. 그런데 나는 node.js 버전 차이 때문에 빌드가 계속 실패했다. 이제야 왜 일반 node.js 설치가 아니라 nvm 으로 설치하라고 했는지 이해했다. 이놈의 패키지 때문에 node.js 버전을 바꿀 일이 생기는구나.

nvm 으로 node.js 를 lts(long time support) 버전인 18으로 낮추니 잘 동작한다. 아니, 도대체 얼마나 패키지 업데이트를 안 하는거야 얘네는.

build 에 생성된 3개의 실행파일(리눅스, 맥, 윈도우)를 실행하면 잘 된다!..라고 하고 싶지만 아니었다.

실행파일을 실행하니 시작과 동시에 꺼지는 문제가 있었다.

이건 대체 뭐가 원인일까 하고 한참을 찾아다녔는데, 알고보니 pkg 는 commonjs 만 제대로 지원하고, esm 은 아직 제대로 지원하지 않는다는 것이다!

그래서 포기해야하나.. 하고 고민하다가 문득 module이 문제면 하나의 파일로 합치면 되지 않을까? 란 생각이 들었다.

## esbuild 로 하나의 파일로 합치기
놀랍게도 해당 기능을 제공하는 패키지가 있었다!

> npm install --save esbuild  

> npm pkg set scripts.bundle="esbuild index.js --bundle --platform=node --outfile=dist/ung-boxing.js"  

> npm run bundle

새로운 패키지 설치 실행 명령어 3종 세트를 진행하면 정상적으로 bundle 디렉토리에 ung-boxing.js 가 생성된다. 코드를 열어보면 해괴망측하게 적혀있는데, 내가 굳이 분석할 필요는 없어보인다.

이제 이 bundle.js 로 pkg로 패키징해야 하기 때문에 명령어로 스크립트를 수정한다.

> npm pkg set scripts.build="pkg dist\/ung-boxing.js --out-path build\/"  


## 마무리
빌드까지 하니 할 건 다했다는 생각이 든다.

![2](/resources/toy/2025-04-28-ung-boxing/2.png)

실제로 맥에서도 잘 돌아가서 기분이 좋았다. 깃허브 액션을 또 만들어서 깃허브의 release 에 자동으로 배포하도록 만들었다. 아무도 안 할 게임일 테지만, 프로그램이란 건 배포가 되어야 비로소 의미가 있으니까!

블로그 만들 때 깃허브 액션을 써봐서 수월하게 할 줄 알았는데 또 한참을 해맸다. 깃허브 페이지랑 달리 빌드 배포는 버전 tag 로만 동작한다!

> git tag v1.0.0  

> git push origin v1.0.0  

버전을 태그해줌으로써 정상적으로 빌드 및 배포가 이루어졌다.

이렇게 모듈화와 클래스를 사용하는 미니 게임을 만들고 나니, express 도 몇 줄 안 되는 코드로 웹서버를 만들 수 있는 원리가 이해되었다.

더 다양한 아이템이 있으면 좋았을 것이란 생각이 들었는데, 이래서 데이터베이스를 사용하나 보다라고 엄청나게 체감했다. 이 정보들이 코드에 내장되어있다면, 매번 정보가 추가되거나 수정될 때 마다 새로이 코드를 작성하고 빌드해야한다.