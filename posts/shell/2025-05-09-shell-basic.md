---
title: "[shell] 기초 명령어"
subtitle: "shell 기초 명령어"
tags:
  - shell
layout: layouts/post.njk
date: 2025-05-09
---

## pwd
**p**rint **w**orking **d**irectory 의 약자로, 현재 작업 중인 디렉터리를 출력한다.

```shell

pwd


```


## ls
**l**i**s**t 의 약자로, 현재 또는 특정 디렉토리 내에 있는 디렉토리/파일 정보를 보여준다.

```shell

ls [options] [path]


```

### options
#### a
**a**ll 의 약자로, 모든 파일을 보여준다.

#### l
**l**ong 의 약자로, 더 길게 정보를 표시한다. 숨겨진 파일들도 보여주기 때문에 al 셋트로 많이 사용한다.

### example
```shell

ls -al


```

## cd
```shell

cd [path]


```
**c**hange **d**irectory 의 약자로, 디렉토리를 이동한다.

### example
```shell

cd github/example


```

## mkdir
**m**a**k**e **dir**ectory 의 약자로, 하나 이상의 디렉터리를 만든다.

```shell

mkdir [path] [path] ...


```

### example
```shell

mkdir example


```

## touch
원래는 파일 업데이트 날짜를 갱신하기 위해서 **건드리는** 용도로 만들어졌다.

근데 에러를 방지하기 위해서 해당하는 파일이 없을 경우, 동일한 이름의 빈 파일을 만들었다. 이 기능을 역으로 개발자들이 빈 파일을 만드는데 사용하는 용도로 가끔 쓴다.

보통은 그냥 아래 vim 으로 만들고 바로 파일 작성까지 하는 경우가 많다. 

```shell

touch [file]


```

### example
```shell

touch example.md


```

## vim
**v**i **im**proved 의 약자로, 개선된 vi 라는 뜻을 가진 편집기 다.

## cat
concatenate 의 약자로, 하나 이상의 파일을 **연결**해서 출력한다.


원래는 이어서 보여주는 영도였지만, 지금은 그냥 파일 출력의 기능으로 많이 사용하고 있다.

```shell

cat [file] [file] ...


```

### example

```shell

cat example1.txt example2.txt


```
 
 ## tac
 cat 을 거꾸로 뒤집은 명령어로, 진짜 내용을 끝에서부터 거꾸로 출력한다.

 ```shell

tac [file] [file] ...


 ```

### example
 ```shell


tac example1.txt exmaple2.txt


 ```

## head
파일의 처음 몇 줄을 출력하는 명령어다.

별도로 지정하지 않으면, 기본적으로 10 줄을 반환한다.

```shell

head [-n] [file]


```

### example
```shell

head -n 5 example.txt


```

## tail
head 와 반대로 파일의 마지막 몇 줄을 출력한다.

마찬가지로 기본값은 10 줄 이다.

```shell

tail [-n] [file]


```

### example
```shell

tail -n 5 example.txt


```

## more
긴 파일을 페이지 단위로 출력하는 원시적인 형태의 문서 뷰어다.

제공되는 기능은 아래와 같다.

1. 스페이스 누르면 다음 페이지로 이동
2. q 누르면 종료

```shell

more [file]


```

### example
```shell

more example.txt


```

## less
less is more 에서 온 명령어로 more 보다 더 확장된 기능을 제공하는 뷰어다.

추가된 기능으로는 아래와 같다.

1. 위 아래 자유 스크롤
2. 검색(/,?)
3. 빠른 이동(숫자+g, G)

```shell

less [file]


```

### example
```shell

less example.txt


```

## mv
**m**o**v**e 의 약자로 파일 또는 디렉토리를 이동할 때 사용한다.

```shell

mv [options] [file] [file]


```

### options

#### i
iteractive(상호작용)의 약자로, 영어 단어 interactive 에는 좀 더 신중하게 한다는 의미도 내포되어있다.

만약 해당 디렉토리에 동일한 이름의 파일이 있을 경우에 덮어씌울 것인지 확인 한다.

#### f
force 의 약자로, 무조건 강제로 덮어씌운다.

기본적으로 mv 는 무조건 덮어씌우지만, 디렉토리나 파일이 없을 때나 권한이 없을 때는 에러가 발생한다.

-f 를 쓰면 이걸 죄다 무시하고 무조건 강제로 덮어씌울 수 있다.

### example
```shell

mv example.md markdown/example.md


```

## cp
copy 의 약자로 파일 또는 디렉토리를 복사한다.

```shell

cp [options] [path] [path]


```

### options
#### i
interactive 의 약자. 마찬가지로 신중하게 하기 위해서 해당 디렉토리에 같은 파일이 있으면 사용자에게 다시 되 묻는다.

#### r
reculsive(재귀) 의 약자. 디렉토리의 경우엔 안에 여러 파일이 있을 수 있기 때문에 재귀적으로 동작하면서 안의 모든 파일에도 동작하도록 한다.

### example
```shell

cp -ri example.md markdown/example.md


```

## rm
remove 의 약자로 파일 또는 디렉토리를 지운다.

계속해서 path 를 넣으면 한번에 여러 파일, 디렉토리를 지울 수 있다.

```shell

rm [options] [path] [path]


```

### options
cp 와 거의 동일하다.

#### i
interactive 의 약자. 마찬가지로 신중하게 하기 위해서 해당 디렉토리에 같은 파일이 있으면 사용자에게 다시 되 묻는다.

#### r
reculsive(재귀) 의 약자. 디렉토리의 경우엔 안에 여러 파일이 있을 수 있기 때문에 재귀적으로 동작하면서 안의 모든 파일에도 동작하도록 한다.

#### f
force 의 약자. 강제로 지운다. 권한이 없는 파일이나 디렉토리도 지우기 때문에 조심해야 한다.

### example
```shell

rm -rf example.md example


```