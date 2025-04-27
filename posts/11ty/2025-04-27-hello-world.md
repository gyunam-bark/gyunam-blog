---
title: "[11ty] hello,world."
subtitle: "11ty 개발환경 설정 및 hello,world. 웹페이지 만들기."
tags:
  - 11ty
layout: layouts/post.njk
date: 2025-04-27
---
11ty는 zach leatherman 이 개발한 정적 웹사이트 생성기다. 굉장히 빠르고 가벼운 장점이 있음에도 한국어로 된 참고자료가 잘 없어서, 한국 한정으로 jekyll 과 hugo에 비해서 인지도는 상대적으로 낮은 편이다.

## hello-world 디렉토리 만들기
디렉토리 이름은 목적에 따라서 직관적으로 짓는 것이 좋다.

이번에는 "hello,world."를 표시하는 정적 웹페이지를 만드는 것이 목표기 때문에, 디렉토리 이름을 **hello-world** 라고 짓는다.

## node.js 프로젝트 초기화하기
11ty는 node.js 기반으로 동작한다.

hello-world 디렉토리에 들어가서, npm 초기화 명령어를 입력한다. 

> npm init -y

명령어가 정상적으로 동작했다면, hello-world 디렉토리 안에 **package.json** 이 생성된다.

```text

hello-world  
├ package.json


```

## 기본적으로 esm을 사용하게 수정하기 
기본적으로 node.js는 commonjs 방식으로 동작한다. 하지만 es6 이후로 esm 을 사용한 패키지들이 늘어나고 있고, 11ty도 esm을 사용하는 것을 권장하고 있다.

node.js에서 기본값으로 esm을 사용하도록 설정하는 방법은 두 가지다.

하나는 명령어를 사용하는 방법이 있다.
> npm pkg set type="module"

나머지 하나는 직접 package.json에 **"type": "module"** 을 추가하는 방법이다.

```json

"type": "module",


```

둘 중 어느 것을 사용해도 상관없다. 

다만, module 철자를 잘 적고 꼭 확인하자. node.js가 11ty를 계속 commonjs로 인식해서 한참을 삽질했는데, modlue 로 적혀 있었던 사소한 실수가 문제였다.

## 11ty 패키지 설치하기
이제 npm(node package manager)를 사용해서 11ty 패키지를 설치한다.

> npm i --save @11ty/eleventy

여기서 진짜 조심해야 하는데, 반드시 **@11ty/** 가 붙어 있어야 한다. 그냥 eleventy는 다른 패키지다!

## package.json에 script 추가하기
이제 간단한 npm 명령어로 11ty를 실행하기 위해서 두 개의 script를 추가한다.

```json

"clean": "rm -rf _output",
"build": "npm run clean && eleventy",  
"serve": "eleventy --serve",


```
**clean** 은 만들어진 _output 폴더를 삭제하는 명령어이다.

11ty는 굉장히 빠른 처리 속도가 특징인데, 변경된 문서들(njk, markdown)만 새로 빌드하기 때문이다. 이 방법은 빠른 대신에 한가지 사소한 단점이 있는데, 삭제한 문서들의 생성된 웹페이지들이 남아있다는 것이다. 그래서 별도의 삭제 명령어로 전체 정적 웹페이지를 삭제하고 새로 빌드하는 것이 깔끔하다.

**build** 는 이름 그대로 블로그를 만들어주는 명령어다.

이 명령어가 실행되면 11ty는 우리가 작성해둔 규칙과 문서들(njk, markdown)를 바탕으로 정적 웹페이지를 생성한다. 최종적으로 정적 웹페이지를 생성할 때엔 이 명령어로 생성하는 것이 좋다. 왜냐면 clean 명령어로 기존의 정적 웹페이지를 모두 삭제하고, 새로 생성하기 때문이다. 이 방법은 우리가 문서를 지웠워도 찌꺼기가 남지 않는 깔끔한 상태로 생성되도록 한다. 놀라운 건, 이렇게 해도 11ty는 눈 깜짝할 사이에 정적 웹페이지 생성을 완료한다.

**serve** 는 실시간으로 정적 웹페이지를 만들고, node.js로 웹서버를 실행하여 보여준다.

평소 문서들(njk, md)를 작성하는 동안은 serve 로 한다. 여기서 11ty의 장점이 확 체감되는데, 무려 **핫리로드(hot-reload)** 가 된다! 핫리로드는 변경사항을 실시간으로 보여주는 기능인데, 0.2초 정도의 속도로 빠르게 변경점이 적용되어서 정적 웹페이지가 생성되어서 적용된다.

> npm run serve   

그러면 아마 아래와 비슷한 결과가 나올 것이다.

```text

[11ty] Wrote 0 files in 0.02 seconds (v3.0.0)   
Server at http://localhost:8080/ // SERVE로 하면 같이 뜸.   


```
개발 하는 동안에는 serve로 작업하고, 최종적으로 빌드할 때엔 build를 쓰는 것이 좋다.

지금 우리가 만든 정적 웹사이트는 **http://localhost:8080** 에서 전달해주고 있다. 

![1](/resources/11ty/2025-04-27-hello-world/1.png)

아쉽게도 개점휴업 상태다. 

```html

Cannot GET /


```
이 에러는 / 을 GET 하지 못했다는 뜻이다. 우리가 웹페이지를 볼 때, 기본적으로 웹서버에 GET 쿼리로 해당 경로의 웹페이지를 요청한다. 아직 우리가 어떤 문서(njk, md)도 작성하지 않았기 때문에 11ty가 아무 것도 만들지 못했고, 아무 것도 없기 때문에 11ty 아무 것도 불러올 수 없었다. 

## index.njk 파일 만들기
이제 11ty가 작업할 문서를 하나 만들어보자.

지금까지 만들어진 프로젝트 구조는 아래와 같다.

```text

hello-world  
├ node_modules   
├ package-lock.json  
├ package.json


```

이곳에 **index.njk** 를 만들어 준다. 프로젝트 구조는 아래와 같이 변한다.

```text

hello-world   
├── node_modules   
├── index.njk  
├── package-lock.json  
├── package.json


```

njk는 **nunjucks** 의 약자다.

모질라(mozilla) 재단이 javascript를 이용해 html을 렌더링 할 수 있도록 만든 템플릿 엔진이다. 템플릿이라는 익숙치 않은 단어가 나왔지만, 근본적인 기능은 **javascript로 html 코드를 생성한다** 라는 것만 이해하면 된다.

이 index.njk안에 **hello,world.**를 적어준다.

```html

hello,world.  


```

아무 문법 없이 그냥 일단 복사-붙여넣기 하면 된다. 조금 횡하고 어색할 텐데, 걱정하지 말자. 지금은 아무런 꾸미는 것 없이 그냥 hello,world. 만 표시하는 게 우리의 목표기 때문이다.

## .eleventy.js 파일 만들기
index.njk가 만들어졌지만, 아직 정적 웹페이지가 생성되기에는 멀었다. 왜냐면  일해야하는 일감은 주어졌는데, 일하는 순서나 방법을 전혀 알려주지 않았기 때문이다.

아까 위에서 njk가 javascript로 html 코드를 만든다고 했던 걸 기억할 것이다. 그래서 11ty가 동작할 javascript 코드를 만들어줘야 11ty가 일을 시작할 수 있다.

이 파일은 11ty에서는 고정되어있다.

> .eleventy.js

이 javascript 파일을 프로젝트에 생성하자. 정말정말 중요한 점은 앞에 붙은 *.* 이 반드시 붙어야 한다. javascript를 생성하고 나면 프로젝트 구조는 아래와 같아진다.

```text

hello-world   
├── node_modules   
├── .eleventy.js  
├── index.njk  
├── package-lock.json  
├── package.json


````

이제 .eleventy.js 의 기본 코드를 작성한다.

```javascript

export default function(eleventyConfig) {
  return {
    dir: {
      input: ".",       
      output: "_output" 
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}

```

여러가지 기능들이 있지만, 지금은 **dir** 만 집중해서 보면 된다. 

```javascript

input : "."


```

**input** 은 njk와 md 같은 정적 웹페이지를 만드는데 필요한 문서들이 어디에 있는지 작성한다.

지금 우리는 .eleventy.js 와 index.njk 가 같은 hello-world 디렉토리에 있기 때문에 **.** 으로 표기한다. **.** 은 본인이 있는 위치를 뜻한다. 즉, .eleventy.js 본인이 있는 위치라는 뜻.

```javascript

output: "_output"


```

**output** 은 11ty가 생성한 정적 웹페이지를 어디에 만들지 정한다. 이름은 자유롭게 바꿀 수 있지만, 11ty 기본값은 _output 이다.

## hello,world.
이제 모든 것이 준비되었다. 11ty에게 해야하는 일(index.njk)와 일하는 방법(.eleventy.js)을 모두 제공했다. 11ty는 index.njk 파일을 .eleventy.js 규칙에 따라서 정적 웹페이지를 생성할 것이다.

다시 한번 npm run serve 명령어를 사용해보자.

![2](/resources/11ty/2025-04-27-hello-world/2.png)

## 마무리
11ty는 굉장히 빠르고 가벼운 정적 웹사이트 생성기이다. 그리고 핫리로드는 생각한 것 이상으로 개발 편의성을 높여준다. 문서(njk, md)를 수정하다가 저장만 하면 실시간으로 정적 웹페이지가 변한다. 너무 빨라서 정적 웹페이지라는 것을 깜빡 잊을 만큼 빠르다!

node.js 기반으로 동작하기 때문에 node.js 백엔드를 처음 공부하는 사람에게는 더욱 추천한다. 11ty가 제공하지 않는 여러 node.js 패키지들을 받으면서 node.js 에 익숙해지는데 도움이 된다.

그렇다고 해서 단점이 없는 것은 아닌데, 단점은 **너무 자유롭다** 는 것이다. 웹 개발에 익숙한 사람들에게는 큰 장점이 되지만, 처음 웹 개발에 뛰어든 사람들에게는 이 자유로움은 곧 **뭐든지 내가 다 해야 한다** 는 막막함으로 오기 때문이다.

그런 단점이 있지만, 반대로 11ty로 웹 개발에서 필요한 지식들을 학습하고 써먹으면서 적용할 수 있는 좋은 복습 환경이 된다고 말할 수 있다.