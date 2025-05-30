---
title: "[weekly] [nb] 버전 관리 및 협업하기(2)"
subtitle: "toss 오픈 소스 프로젝트 중에서 하나를 골라 어떻게 git과 Github을 통해 협업이 이루어지는지 설명해 주세요."
tags:
  - weekly
layout: layouts/post.njk
date: 2025-05-30
---

## es-hangul
**레포지토리 주소** : [https://github.com/toss/es-hangul](https://github.com/toss/es-hangul)

### 선정 이유
다른 프로젝트는 개인 하나의 개발자가 issues 올리고 PR 까지 가는 경우가 많았다.

그런데 es-hangul 은 사용자의 요청/제보 가 PR 까지 이루어지는 경우가 많아서 흐름을 파악하기가 좋았따.

### issues
#### 목록
es-hangul 프로젝트가 특히 좋은 점은 issues 가 한글로 작성되어 있다. 

다른 프로젝트는 영어로 작성된 경우가 많은데, 역시 한글 라이브러리 프로젝트라서 그런가.

![1](/resources/weekly/2025-05-30-version-control-02/1.png)

의외로 es-hangul 은 github에 올라간 issues는 그렇게 많지 않다.

toss 내부적으로 사용되면서 어느정도 issues들이 처리된 라이브러리라서 그런 걸 수도 있고, 기존 베이스가 되는 [Hnagul.js](https://github.com/e-/Hangul.js) 가 워낙 완성도가 높은 상태여서 일 수도 있다. 

#### 이슈 작성
아무튼 이 issues 에 **요청 / 제보** 를 적으면 된다.

![2](/resources/weekly/2025-05-30-version-control-02/2.png)

#### 담당자가 확인
그러면 담당자가 확인 후 \'아, 이건 bug 구나 혹은 요청이구나\' 같은 것을 확인하고 태그를 다는 등 작업을 진행한다.

![3](/resources/weekly/2025-05-30-version-control-02/3.png)

그리고 확인이 되었다는 댓글을 달아서 확인했다는 것을 알려준다.

#### 조치
조치하고 나서 올리는 pull request 에 해당 issues 번호와 함께 변동사항을 기입한다.

![4](/resources/weekly/2025-05-30-version-control-02/4.png)

어떠한 issue 가 있었고, 이것을 해결하기 위해서 어떠한 방법을 썼고, 혹은 지금 당장 조치할 수 없는 이유 같은 것을 적는다.

## issue 는 항상 동기적으로 처리될 필요는 없다!
위의 사례 처럼, 이유가 있는 경우엔 issue 는 다른 issue 보다 나중에 해결되어도 된다.

중요도가 상대적으로 덜 할 수도 있고, 

치명적인 오류나 굳이 들어갈 필요 없는 기능일 수도 있고, 

수정되거나 추가되면 좋지만 시간이 부족할 수도 있다.

**중요한 것은 PR 에 충분히 설명하는 것이다.**