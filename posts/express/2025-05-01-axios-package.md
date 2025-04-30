---
title: "[express] axios 패키지"
subtitle: "더 편한 fetch 를 위한 패키지"
tags:
  - express
layout: layouts/post.njk
date: 2025-05-01
---
강의에서 배웠던 axios 패키지를 사용해보려고 한다.

웹서비스를 개발 할 때 다른 외부의 api 를 가져와서 사용하는 것은 굉장히 흔하다고 한다. 그래서 이번에는 나도 외부의 api를 가져와서 사용해보기로 했다.

## nasascii
발음에 유의해야 한다. nasa + ascii 를 합쳐봤는데, 나사스끼 로 되더라.

이번에 만들어볼 건 별 거 없다. 그냥 외부 api 잘 불러오고, 그걸로 뭔가 하기만 하면 될 것 같았다.

그래서 nasa open api 로 행성 이미지를 받은 뒤에, 아스키코드 아트로 변환해서 png 로 반환하는 아주 간단한 웹서버를 만들어보기로 한다. 절차 상으로는 간단하다! 해봐야 알겠지만.

### nasa open api
한 마디로 정리가 가능하다. 무료다!!

물론 api key 를 신청해서 받아야 하는데, 이메일 주소와 이름만 적으면 묻지도 따지지도 않고 발급해준다.


외부 api 를 사용할 때 반드시 key 가 필요한 것은 아니다. 몇몇 api 는 key 없이도 가져와서 쓸 수 있다. 

엄청난 재력을 가진 대기업의 외부 공개 api 거나, 커뮤니티의 기부로 운용되는 api 거나, 그냥 우리 집 고양이 tmi 같은 개인이 만들어둔 api 같은 것들이 있다.

다만 많은 경우 key 를 발급해서, key 가 있는 경우만 api 가 정상적으로 반환해주는데, 무분별한 사용을 막기 위해서다.

이 api 라는 것도 결국, url 로 온 요청을 데이터베이스에서 검색해서 서버가 어떤 특정한 로직을 실행한 후에 json 으로 응답해주는 것이다. 즉, 서버가 뭔가 일을 해야 하고, 주고 받는 데 데이터를 전송하는 품이 든다.

우주 정복을 노리는 외계인이 1초에 1억번씩 nasa api 를 호출해서 nasa 를 공격할 수 있다는 뜻이다! 그래서 나처럼 단순히 무료로 사용하는 사람은 하루 1,000번 호출이 한계로 지정되어 있다. 1,000번도 많은 거 아닌가 싶지만.

다른 api 는 어떨 지 모르겠는데, nasa open api key 는 이메일로 날라온다. 그리고 그걸 잃어버리면 안된다! 아예 새로 발급 받거나 해야한다.

api key를 받고 나서 코드를 작성할 때 알게 된 건데, 이번에 사용한 images-api 는 완전 무료 공개라서 api key 가 따로 필요없었다.

### axios
axios 는 node.js와 웹브라우저를 위해 만들어진 promise 기반 http 클라이언트 다. 우리는 서버를 개발하고 있는데 왜 클라이언트를 쓰냐 할 수 있는데, 애초에 서버도 컴퓨터에서 실행하는 어떤 의미로는 클라이언트다. 그저 역활이 
serve 하는 아이일 뿐.

아무튼 axios 는 데이터를 보내주는 쪽(서버) 와 데이터를 받아서 사용하는 쪽(웹브라우저) 둘 다 쓸 수 있다는 건데, 무려 동일한 코드 베이스로 실행 할 수 있다. 약간의 차이, node.js 는 http 모듈을, 웹브라우저 에서는 XMLHttpRequest 를 사용할 뿐이다.

## nasascii 프로젝트 생성하기
최신화 된 npm 프로젝트 생성 4콤보를 실행한다.  

> npm init -y  

> npm i --save express axios

> npm pkg set type="module"

> npm pkg set scripts.dev="nodemon index.js"

여기서 신경 쓸 부분은 **npm i --save express axios** 다. node.js 에서는 띄어쓰기로 한번에 여러 패키지를 받을 수 있다!

```text

nasascii
├ node_modules
├ index.js
├ package-lock.json
├ package.json


```

## express 기본 코드 작성
이제 기본 코드는 따로 어떤 요소가 있었지 생각하지 않고도 작성할 수 있다. 이것이 성장이라는 것인가!

```javascript

import express from 'express'

const PORT = 3000

const app = express()

app.get('/', (req, res) => {
  res.send(`yes!!`)
})

app.listen(
  port,
  () => {
    console.log(`server running on port ${port}`)
  }
)


```

## images-api
nasa api의 공식 문서 [https://api.nasa.gov/](https://api.nasa.gov/) 의 nasa image and video library 항목을 참고하며 간단한 코드를 작성한다.

```javascript

import express from 'express'
import axios from 'axios'

const PORT = 3000

const app = express()

app.get('/', async (req, res) => {
  const planet = req.query.planet

  const url = 'https://images-api.nasa.gov/search'
  const parameter = {
    q: planet,
    media_type: 'image',
    keywords: planet
  }
  const response = await axios.get(url, {
    params: parameter
  })

  const items = response.data.collection.items

  res.send(items.length)
})

app.listen(
  PORT,
  () => {
    console.log(`server running on port ${PORT}`)
  }
)


```
localhost:8080/?planet=moon 과 같이 planet 쿼리를 넣으면 nasa 가 공개 한 이미지들 중 moon 이란 글자가 들어가고, keywords가 moon 인 사진 목록을 전달해준다. 

q 는 query string의 약자다. 아니 쿼리 안에 쿼리가 또 들어간다고? 생각할 수 있는데, query 는 그냥 찾다 라는 단어일 뿐이다. 즉, 검색어로도 사용될 수 있는 것! 물론, 구글 검색 창 처럼 나름의 검색어 문법을 사용할 수 있다고 한다. 자세한 것은 다음에 쓸 일 있을 때 알아본다.

keywords 설정을 해주는 게 좋은데, 이걸 안 하면 행성과 관계없는 사진도 나온다. 처음에 api 테스트를 화성(mars)로 했는데, 웬 음악 페스티벌이 나왔었다. 그후로 부랴부랴 찾아서 keywords 를 추가했다.

근데 공식 사이트에는 아주 간단한 것만 적혀있어서, 공식 api 문서를 보고 작업해야 했다.

![1](/resources/express/2025-05-01-axios-package/1.png)

api 문서가 굉장히 긴데, 다 볼 필요없고 내가 필요한 부분만 **찾아서** 보면 된다. 다행히 nasa 는 큰 단체라서 그런지 문서마다 hyper link 가 잘 되어있어서 쉽게 찾았다.

웹서버를 실행해서 확인하면, 2025년 5월 1일 기준으로 64 라는 결과 값이 나온다. 현재 nasa 에서 제공하고 있는 moon 이라는 글자가 들어가고 keywords가 planet 인 사진이 64개 있다는 의미다. 

물론, 실제로는 당연히 더 많은 사진들이 nasa 에 있다. 다만, 우리는 nasa 에서 images-api 로 제공하는 사진들 중에서 우리가 원하는 조건들을 맞춰서 저만큼 줄어든 것이다. 달 사진이지만, 사진 제목은 moon 이 아닐 수도 있으니까. 그런 것까지 고려하면 훨씬 적어지는게 맞다.

의외로 고생한 부분은 items 를 받아오는 부분이었다.

```javascript

const items = response.data.collection.items


```

fetch 를 썼을 때처럼 response.json() 을 하려니까 안 되는 것이 아닌가! 한참을 이리저리 시도하다가 저런 형태로 받아와야 한다는 것을 알게 되었다. 

## 이미지 표시
이때까지는 텍스트로만 결과값을 내면 됐었기 때문에 신경 안 쓰고 있었지만, 이번에는 이미지를 출력해야하는 관계로 res.send() 에 들어갈 html 코드도 동적으로 만든다.

일단은 검색된 모든 사진을 표시해본다.

```javascript

let html = ''
html += `<h1>${planet}</h1>`
for (const item of items) {
  const links = item.links

  for (const link of links) {
    const href = link.href
    html += `<img src='${href}'></img>`
  }
}

res.send(html)


```

이야, 이번에도 역시나 고생했다.

처음에는 아무 생각없이 검색 결과 당 사진 하나씩 있는 줄 알고 아래와 같이 코드를 만들었었다.

```javascript

for (const item of items) {
    const href = item.links
    html += `<img src='${href}'/>`
}


```

그런데 실제로 웹브라우저에서 확인해보니 이미지가 안 나오는 문제가 있었다.

뭔가 이상하네 하고 이 links 자체를 출력해서 확인해보니..

```json

[
  {
    href: 'https://images-assets.nasa.gov/image/as17-134-20473/as17-134-20473~medium.jpg',
    rel: 'alternate',
    render: 'image',
    width: 1280,
    size: 101000,
    height: 1280
  },
  {
    href: 'https://images-assets.nasa.gov/image/as17-134-20473/as17-134-20473~small.jpg',
    rel: 'alternate',
    render: 'image',
    width: 640,
    size: 32000,
    height: 640
  },
  {
    href: 'https://images-assets.nasa.gov/image/as17-134-20473/as17-134-20473~thumb.jpg',
    rel: 'preview',
    render: 'image',
    width: 640,
    size: 32000,
    height: 640
  },
  {
    href: 'https://images-assets.nasa.gov/image/as17-134-20473/as17-134-20473~large.jpg',
    rel: 'alternate',
    render: 'image',
    width: 1920,
    size: 234000,
    height: 1920
  },
  {
    href: 'https://images-assets.nasa.gov/image/as17-134-20473/as17-134-20473~orig.jpg',
    rel: 'canonical',
    render: 'image'
  }
]
//...

```

아뿔싸! 나만 해도 이 글을 쓸 때 여러 사진을 넣는데, nasa 라고 안 그럴까! 하나의 글 또는 앨범에 여러 사진이 있을 수 있다는 것을 깨달았다.

그래서 내부적으로 한번 더 돌아서 출력하는 방법으로 해결했다.

이미지 링크를 href 라고 하는데, hypertext reference 의 약자로, 말그대로 html(hyper text markup language) 에서 특정 리소스를 참조해서 가져올 때 사용하는 것이다. 보통 우리는 이미지 주소라고 말하는 부분이다.

## 하나만 랜덤으로 받기
사진이 많이 표시되는 것도 멋진 일이긴 한데, 나의 최종 목표는 랜덤한 한장을 ascii art 로 만드는 것이기 때문에, 이 목록을 하나의 배열에 넣고 그중에 하나만 랜덤으로 뽑아서 표시하는 것으로 바꾼다.

```javascript

const items = response.data.collection.items
const hrefs = items.map(item => item.links[0].href)
const length = hrefs.length
const random = Math.floor(Math.random() * length)
const href = hrefs[random]

let html = `<img src='${href}'/>`


```

map 기능을 사용해서 items 내부의 href 들을 hrefs 에 넣는다. 원래는 습관적으로 for 반복문으로 만들었다가, 아, 맞다 map 이 있었지.. 하고 후다닥 수정했다.

혹시나 nasa 에 api 로 요청할 때 관련된 쿼리나 파라미터가 있는지 찾아봤지만, 없었다.

그냥 목록 받아서 내부에서 필터링 하세요~ 라고 되어있길레 그렇게 했다.

```javascript

 items.map(item => item.links[0].href)


```

이 코드에서 특이점이 있는데, links[0] 으로 첫번째 요소만 가져온다. 반환되는 json 을 유심히 살펴보니, 대부분의 한 앨범(?)에 여러 사진들이 있을 때, 이미지 크기별로 들어있는 경우가 많았다. 즉, 같은 사진인데 크기만 다르게 여러 개가 있는 것! 물론, 아닌 경우도 있지만, 그 경우는 애초에 전혀 관계 없는 사진인 경우가 많았다.

nasa 기준으로 첫번째 [0] 요소가 제일 큰 크기의 사진이었기 때문에 그냥 [0] 을 가져오는 것으로 고정했다.

![2](/resources/express/2025-05-01-axios-package/2.png)  

실행해보면 랜덤한 moon 사진이 잘 나타난다.

## 중간 리팩토링
랜덤하게 받은 사진을 ascii 코드로 바꾸는 코드를 만들기 전에 중간 코드 리팩토링을 한다.

뭔가 정해진 개발 흐름이 있는 건 아니고, 중간에 블로그에 기록을 남기다 보니 2가지 정도 아쉬운 부분이 있었다.

1. try catch 없음
async await 를 쓸 때엔 반드시 try catch 를 써야지! 하고 생각하고 있었는데, 또 깜빡했다. 손가는 데로 코드 짜다보니 큰 틀 정하는게 아직 약하다. 이제는 try catch 를 먼저 적어두고 내부에 로직을 쓰는 습관을 들여야겠다.

2. ?planet= 처럼 비어있을 때는?
물론 지금도 잘 동작한다. 왜냐면 애초에 내가 planet 쿼리를 안 넣어도 nasa api 에서 이미지들을 받아오기 때문이다. 검색어가 없을 때엔 그냥 최근에 추가된 이미지들을 보내주는 것 같다.(확실치 않음)

그래도 기왕 나오는 거 하다못해 행성과 관련된 게 나왔으면 해서 태양계 행성 키워드들을 미리 정의해두고 그 중에서 하나를 랜덤으로 넣기로 한다.

```javascript

// index.js
import express from 'express'
import axios from 'axios'

const PORT = 3000
const SOLAR_SYSTEM_PLANETS = [
  'sun', 'mercury', 'venus',
  'earth', 'mars', 'jupiter',
  'saturn', 'uranus', 'neptune'
]

const app = express()

app.get('/', async (req, res) => {
  try {
    let planet = req.query.planet

    if (!planet) {
      const length = SOLAR_SYSTEM_PLANETS.length;
      const random = Math.floor(Math.random() * length)
      planet = SOLAR_SYSTEM_PLANETS[random];
    }

    const url = 'https://images-api.nasa.gov/search'

    const parameter = {
      q: planet,
      media_type: 'image',
      keywords: planet,
      description: planet,
      title: planet,
    }
    const response = await axios.get(url, {
      params: parameter
    })

    const items = response.data.collection.items
    const hrefs = items.map(item => item.links[0].href)
    const length = hrefs.length
    const random = Math.floor(Math.random() * length)

    const href = hrefs[random]
    let html = `<img src='${href}'/>`

    res.send(html)

  } catch (e) {
    res.send(e);
  }

})

app.listen(
  PORT,
  () => {
    console.log(`server running on port ${PORT}`)
  }
)


```
try catch 추가는 거의 복붙만 하면 해결되는거라 순식간에 완료.

그리고 nasa imaga-api에 보내는 파라미터 값에 description 과 title 도 해당 planet 을 가지는 경우로 더 좁혔다. 테스트 삼아 태양계에 있는 위성들의 이름을 넣었는데, miranda 처럼 사람 이름이랑 똑같은 행성은 사람이 나오는 문제가 있었다.

그래서 에라, 모르겠다 하고 이미지 설명도 planet, 제목도 planet 으로 죄다 넣으니까 그 문제가 현저히 줄어들었다. 이게 말로만 듣던 검색 최적화인가!

쿼리로 planet 이 없을 때에는 태양계 행성들 중에 하나를 키워드로 넣도록 했다. 그러고 보니 정말 듣도보도 못한 행성도 결과값이 나오는걸까?

![3](/resources/express/2025-05-01-axios-package/3.png)

잘 나온다.

## 이미지를 ascii 코드로 변환하기
이미지를 처리하기 위해서 jimp(javascript image manipulation program) 를 설치한다.

> npm i --save jimp

물론, 이미지의 색상 버퍼를 읽어서 직접 처리하는 방법도 있지만, 귀찮다. 

원리는 간단한데, .png 라는 확장자의 규칙에 따라서 들어가있는 데이터를 분류해서 처리하면 된다. 색상은 rgba(255,255,255,255) 가 width * height 개수 만큼 저장되어있다. 그래서 그냥 반복문으로 돌려서 처리하면 된다.

하지만 이번에는 nasa의 api 를 써보는 게 목표였기 때문에 그냥 jimp 를 쓴다.

먼저, ascii art 를 만들기 위해서는 밝기에 따라 표시할 ascii 문자를 정해줘야 한다.

```javascript

const ASCII_BRIGHTNESS = '@%#*+=-:. '


```

사람마다 다를 수 있지만, 인터넷에 검색해보면 사람들이 많이 쓰는 패턴이 있다. 그냥 왼쪽일수록 글자가 형태가 가능한 꽉꽉 차있고, 오른쪽으로 갈수록 비어보이면 된다.

```javascript

const image = await Jimp.read(href);
console.log(image.bitmap.data);


```

이제 아까 하나로 정했던 href 를 Jimp.read()로 가져오면 된다.

image.bitmap.data 로 출력해보면, 아래와 같이 아주 긴 문자열이 출력된다.

> Buffer 98 98 98 ff 99 99 99 ff 9b 9b 9b ff a3 a3 a3 ff...

여기서 보면 특정한 주기로 반복되는 걸 알 수 있다.

98 98 98 ff 처럼 4개 단어가 하나의 묶음 처럼 반복되는데, 이게 아까 위에서 말했던 rgba 색상값이다. 이 4개 단어 1 묶음이 해상도 수 만큼 존재한다!

내 블로그에 사용된 favicon(웹페이지 이름 옆에 조그마한 아이콘)이 32x32 해상도인데 이 작은 크기의 그림만 해도 1024개의 묶음이 적혀있다!

그리고 컴퓨터는 이러한 묶음 말그대로 찰나의 순간에 읽어서 우리에게 보여주는 것이다.

아무튼 이런 데이터를 사용해서 우리는 이 rgba 라는 정보를 ascii 코드로 바꾸기만 하면 된다. 말은 언제나 쉽다.

```javascript

const image = await Jimp.read(href)
const buffer = Array.from(image.bitmap.data)
const width = image.bitmap.width
const height = image.bitmap.height

let html = ''

html += '<pre>'

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const index = (width * y + x) * 4
    const red = buffer[index]
    const green = buffer[index + 1]
    const blue = buffer[index + 2]

    const char = '#'
    html += `<span style="color: rgb(${red},${green},${blue})">${char}</span>`;
  }
  html += '<br>';
}

html += '</pre>';

res.send(html)


```
픽셀 하나당 rgba 4개의 값이 한 묶음으로 있는 걸 이용해서 한 픽셀 한 픽셀을 \'#\' 으로 표시한다.

> const buffer = Array.from(image.bitmap.data)

image.bitmap.data 는 javascript Buffer 객체로 전달하기 때문에 Array.from() 을 사용해서 순수한 색상값만 받아온다. Array.from() 이 없으면 **<Buffer ... >** 와 같은 형태로 오기 때문에 처리가 귀찮아진다. 실제로 내가 그랬다.

문자를 shift 하고 띄어쓰기를 trim 하고 해야하나..? 하는데, 그냥 Buffer 는 javascript 에서 쓰는 객체니까 Array.from 으로 하라는 github discussion 을 보고 적용했다.

![4](/resources/express/2025-05-01-axios-package/4.png)

실행하면 일단..은 잘 동작하는 것처럼 보인다. 기본 글자 크기가 있기 때문에 사진의 전체가 한 화면에 들어오지 않는다. 원래라면 모니터의 한 픽셀이 무려 16배 이상이나 커진 상황이기 때문에 엄청난 크기의 결과물로 바뀐다. 

궁금하면 웹브라우저의 화면 비율을 줄여서 전체 결과물을 볼 수 있지만 가능하면 하지 말자. 사진에 따라서는 엄청난 메모리와 작업 시간을 소모한다.

## 이미지 비율을 줄이기
이 문제를 해결하기 위해서는 크게 2가지 방법이 있다.

### 1. 글자 크기를 줄이기
기본 글자 크기가 16px 니까 이걸 2px 정도로 줄이면 되지 않을까 싶었다.

```javascript

html += '<pre style="font-size:2px; line-height:1px;">'


```
이렇게 수정하기만 하면 된다.

![5](/resources/express/2025-05-01-axios-package/5.png)

나쁘..지 않다!

다만, 웹 글꼴이 대게 가로보다 세로가 더 긴 경우가 많기 때문에 글꼴과 글꼴의 높이도 조금 조정하면 좋다.

```javascript

html += '<pre style="font-family: monospace; font-size:2px; line-height:1.2px; letter-spacing:0px;">'


```

![6](/resources/express/2025-05-01-axios-package/6.png)

이제 비율도 적절하고 결과도 거의 똑같이 나온다.

그런데 거의 똑같이 나온다는게 문제다! 나는 ascii art 감성을 원했던 건데, 이건 그냥 조금 희뿌연 이미지나 똑같아 보인다.

이걸 해결하기 위해서 이미지를 받아와서 처리할 때, 이미지 비율을 애초에 줄여서 처리하기로 한다. 비율을 조절하기 때문에 픽셀이 상대적으로 저해상도로 변할 테지만, 애초에 ascii art 는 저해상도일수록 감성이 산다!

### 2. 비율 줄이기
비율 줄이기를 하기 위해서 [Jimp 공식문서](https://jimp-dev.github.io/jimp/api/jimp/classes/jimp/#resize) 를 보면서 작업하는데, 아무리 해도 resize 가 적용되지 않았다.

아니, 엄밀히 말하면 동작은 하는데 에러가 발생했을 뿐이지만.

한 시간 가량 이리저리 resize 를 시도해보았지만 동작하지 않았다. 결국 봉인해두었던 chatGPT 까지 썼는데, chatGPT도 이걸로 되야하는뎅? 이러고 있는게 아닌가.

그러다 우연히 문서에 pixelate 가 있는 걸 봤다.

```javascript

const image = await Jimp.read(href)

    const pixelSize = 8
    image.pixelate(pixelSize)

    const buffer = Array.from(image.bitmap.data)
    const width = image.bitmap.width
    const height = image.bitmap.height

    let html = ''

    html += `<img src=${href}>`;
    html += `<br>`;

    html += '<pre style="font-family: monospace; font-size:16px; line-height:60%; letter-spacing:0px;">'

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        const index = (width * y + x) * 4
        const red = buffer[index]
        const green = buffer[index + 1]
        const blue = buffer[index + 2]

        const char = '#'
        html += `<span style="color: rgb(${red},${green},${blue})">${char}</span>`;
      }
      html += '<br>';
    }

    html += '</pre>';


```

pixelate 라고? 검색해보니 pixel의 단위 만큼 이미지를 뭉게준다고 한다! 내가 원하던게 바로 이거였는데!

![7](/resources/express/2025-05-01-axios-package/7.png)

이제 거의 완전하게 동작하고 있다! 이제 # 으로만 표시하던 부분을 명암에 비례해서 ascii 문자만 바꿔주면 된다.

## 명암에 따라 ascii 바꾸기
먼저 rgb 를 명도(brightness) 로 바꾸는 방법을 찾아야 했다.

제일 편한 방법은 image.greyscale() 로 흑백으로 만들어버리면, 그 픽셀당 값으로 구분할 수 있다고 한다. 

근데 그렇게 하면 image 자체가 바뀌어 버리기 때문에 기각. 우회 방법으로 컬러 데이터만 복사해서 하는 방법이 있는데, 가뜩이나 느린 처리가 더 느려질까봐 기각.

이미 ascii 코드를 출력하기 위해서 모든 픽셀을 반복문으로 접근하고 있기 때문에 현재 픽셀 값을 바탕으로 처리하는 방법이 없는지 찾아보았다.

```javascript

const brightness = (0.2126 * red) + (0.7152 * green) + (0.0722 * blue)
const charIndex = Math.floor((brightness / 255) * (ASCII_BRIGHTNESS.length - 1))
const char = ASCII_BRIGHTNESS[charIndex]


```

찾아보니 **Luma 공식** 이라는 게 있었다.

어디서 많이 들어봤는데, 그 루마썬팅 할 때..? 했는데 진짜 단어의 의미는 연관있는 거였다. 

명도가 brightness 라고도 하지만, luminance 라는 전문 용어도 있었다!

이미지 처리에서는 이게 표준 공식처럼 쓰인다고 해서 바로 줏어와서 적용했다.

> l = (0.2126 * r) + (0.7152 * g) + (0.0722 * b)

명도만 구하고 나니 그 다음은 쉬웠다.

\(명도값\/255\)에 한참 전에 미리 정의해둔 \(ascii_brightness 상수의 길이 - 1 \) 만큼 곱해준다.

명도값을 255로 나누는 이유는 (가장 어두움)0 ~ 1(가장 밝음) 로 정규화 하기 위해서다. 밝기가 제일 밝은 255로 온다고 가정해도 1이 된다.

ascii_brightness 상수의 길이에서 1 빼주는 이유는 간단하다. .length 는 길이를 반환하지만, 배열 index 는 0부터 시작이니까.

그래서 만약 가장 밝은 255가 오면 정규화가 되면서 1이 되고, 거기에 ascii_brightness 의 마지막 인덱스 9를 곱해서 ' ' 가 되는 것이다.

```javascript

const ASCII_BRIGHTNESS = '@%#*+=-:. '


```

![8](/resources/express/2025-05-01-axios-package/8.png)

이제 진짜 완벽하다!

## 전체 코드
```javascript

import express from 'express'
import axios from 'axios'
import { Jimp } from 'jimp'

const PORT = 3000
const SOLAR_SYSTEM_PLANETS = [
  'sun', 'mercury', 'venus',
  'earth', 'mars', 'jupiter',
  'saturn', 'uranus', 'neptune'
]
const ASCII_BRIGHTNESS = '@%#*+=-:. '

const app = express()
const axiosInstance = axios.create({
  baseURL: 'https://images-api.nasa.gov/',
  timeout: 5000,
  headers: {
    'content-type': 'application/json',
  }
})

app.get('/', async (req, res) => {
  try {
    let planet = req.query.planet

    if (!planet) {
      const length = SOLAR_SYSTEM_PLANETS.length
      const random = Math.floor(Math.random() * length)
      planet = SOLAR_SYSTEM_PLANETS[random]
    }

    const parameter = {
      q: planet,
      media_type: 'image',
      keywords: planet,
      description: planet,
      title: planet,
    }
    const response = await axiosInstance.get('search', { params: parameter })

    const items = response.data.collection.items
    const hrefs = items.map(item => item.links[0].href)
    const length = hrefs.length
    const random = Math.floor(Math.random() * length)

    const href = hrefs[random]

    const image = await Jimp.read(href)

    const pixelSize = 8
    image.pixelate(pixelSize)

    const buffer = Array.from(image.bitmap.data)
    const width = image.bitmap.width
    const height = image.bitmap.height

    let html = ''

    html += `<img src=${href}>`
    html += `<br>`

    html += '<pre style="font-family: monospace; font-size:16px; line-height:60%; letter-spacing:0px;">'

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        const index = (width * y + x) * 4
        const red = buffer[index]
        const green = buffer[index + 1]
        const blue = buffer[index + 2]

        const brightness = (0.2126 * red) + (0.7152 * green) + (0.0722 * blue)
        const charIndex = Math.floor((brightness / 255) * (ASCII_BRIGHTNESS.length - 1))
        const char = ASCII_BRIGHTNESS[charIndex]

        html += `<span style="color: rgb(${red},${green},${blue})">${char}</span>`
      }
      html += '<br>'
    }

    html += '</pre>'

    res.send(html)

  } catch (e) {
    res.send(`${e.message}`)
  }

})

app.listen(
  PORT,
  () => {
    console.log(`server running on port ${PORT}`)
  }
)


```

## 마무리
맨날 일을 벌리고 수습하느라 정신이 없다. 

그냥 하루하루 강의에서 들었던거 복습해야지! 하고 시작하는 건데, 뭔가 조물조물 만들지 않으면 맘이 편하지 않다.

그만큼 배우는 건 많아서 좋지만!

이번에는 만들고 나니 뿌듯해서 따로 github repository 를 만들었다.

**[https://github.com/gyunam-bark/nasascii](https://github.com/gyunam-bark/nasascii)** 인데, 올리고 나니 README.md 는 적기 귀찮아서 대충 적었다..

api 통신에 대해서 조금 감이 잡혀가는 것 같다.

기왕 하는거 막더라도 제대로 api 서버를 만들어 보고 싶은데, 우리 스프린터 내부에서 만들어 볼만한 소재를 찾아봐야겠다.
