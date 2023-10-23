# 개발 일기

## 개요

최근 프로그래머스 과제테스트에 빠져 있다. 바닐라 자바스크립트로 SPA를 만들면서 기초적인 웹의 동작 방식과 컴포넌트 기반 개발 시 state의 관리 등에 대해 생각해보게 되는 게 마음에 들었다. 개인적으로는 결국 바닐라 부터 시작해서 왜 현재의 웹 기술들로 개발을 하고 있는지 역사적인 흐름을 바탕으로 어느 정도는 이해하고 있어야 한다고 생각하기 때문에, 밑바탕부터 시작해볼 수 있는 좋은 학습 과제라 생각한다.

그래서 프로그래머스에서 과제 테스트를 자주 진행하고 있었으나 아래의 문제들이 있었다.

1. 내 학습 기록이 깃허브에 남지 않는다.
2. 제공되는 서버와의 통신에 오류가 자주 일어난다.
3. 프로그래머스 자체 vscode 실행 환경이 사용하기에 불편하다.

위의 아쉬움들을 충족하기 위해 아래와 같이 해결하기로 했다.

1. 템플릿을 복사해서 개인 vscode에서 작업한다.
2. 해당 작업물을 깃허브에 업로드한다.
3. 서버에서 필요한 데이터를 미리 추출 해놓은 후 API 모킹 환경을 설정한다.

## 데이터 추출

단순 API 호출로 데이터를 가져와 미리 복사해두는 방식으로 진행했지만 해당 함수를 만드는 과정에서 배울 점이 많았다. 코드는 아래와 같다.

```js
// /src/mocks/crawl.js

const fetchNodes = async (mockData, nodeId) => {
  try {
    const res = await fetch(`${API_END_POINT}${nodeId || ''}`);

    if (res.ok) {
      const json = await res.json();

      mockData[`${nodeId || 'root'}`] = json;

      await Promise.all(
        json.map(async (node) =>
          node.type === 'DIRECTORY'
            ? await fetchNodes(mockData, node.id)
            : node,
        ),
      );

      return mockData;
    }
  } catch (error) {
    fetchNodes(mockData, nodeId);
  }
};

export const consoleFetchData = async () => {
  const data = await fetchNodes({});
  console.log(JSON.stringify(data));
};
```

1. 문제를 푸는 게 힘들 정도로 서버와의 통신 에러가 자주 일어나기 때문에 에러 발생 시 다시 http request를 실행시키는 과정이 꼭 필요했다. 처음엔 에러가 나면 함수 작동이 멈추는 걸 고려하지 않고 try-catch 문 없이 res.ok로 판별한 후 그렇지 않은 경우에 fetchNodes를 다시 실행하는 방식으로 만들었다. 그러나 당연히 함수가 멈추고 이후의 코드는 실행되지 않았다. 그래서 try-catch를 도입하고 에러 발생 시 catch해서 같은 함수를 다시 한 번 실행하도록 했다.

2. 가져온 JSON 데이터를 모두 한 객체에 모아서 해당 객체를 반환하려 했는데, 왠지 모르게 요청이 제대로 일어나고 있는데도 불구하고 첫 데이터만 담겨서 반환되었다. 문제는 forEach가 콜백함수의 async-await을 지원하지 않는다는 데에 있었다. Promise.all을 사용하는 것으로 해결했다. 코드는 아래와 같다.

```js
// 변경 전 코드
json.forEach(async (node) =>
  node.type === 'DIRECTORY' ? await fetchNodes(mockData, node.id) : node,
);

// 변경 후 코드
await Promise.all(
  json.map(async (node) =>
    node.type === 'DIRECTORY' ? await fetchNodes(mockData, node.id) : node,
  ),
);

// 참고: for...of를 활용한 방식 (병렬적으로 작동하지 않기 때문에 속도가 비교적 느리므로 계산 양이 많은 경우에는 Promise.all을 사용하는 편이 좋다.)
for (const node of json) {
  if (node.type === 'DIRECTORY') await fetchNodes(mockData, node.id);
}

// 참고 링크: https://constructionsite.tistory.com/43
```

## API 모킹

사실 별 다른 뜻 없이 서버와의 통신에서 오류가 너무 자주 발생해서 데이터를 크롤링해 놓은 후 사용하기 위해 도입했을 뿐이었다. 겸사겸사 MSW에 좀 더 익숙해지기도 하고. 그런데 생각보다 MSW를 도입하는 과정에서 많은 걸 배우게 됐다.

1. MSW는 jest나 cypress, storybook 등과 함께 사용할 수 있으며, 더욱 시너지를 발휘한다. 최근 testing 관련해서 관심이 많아, 해당 부분은 좀 더 공부를 해보고 다른 프로젝트에서 적용해볼 생각이다.
2. MSW는 최근 버전업을 했으며, 문법이 바뀌었다. 이제 rest를 사용하지 않고 http, HTTPResponse 등을 사용한다. 훨씬 직관적이고 간략해진 것 같아 마음에 들었다.
3. module, webpack, bundling이라는게 무엇이고 왜 존재하는지 제대로 알게 되었다. 바닐라 자바스크립트로 각종 모듈을 다운로드 받아 사용해본 적이 없었고, 웹팩 자체에 대한 공부는 소홀히 했던 탓에 생긴 맹점이었다.
4. MSW를 CDN 방식으로 사용하는 방식이 존재한다는 것과 그 사용법에 대해 알게 되었다. 다만 공식 문서에 충분한 설명이 되어있지 않고 자세한 사용법을 깃허브 이슈에서 질의응답 형태로만 발견할 수 있었다. 아래 링크를 참조하면 된다.

- 공식 문서의 CDN 설명: https://mswjs.io/docs/recipes/using-cdn
- 깃허브 이슈에 있는 자세한 사용법 설명: https://github.com/mswjs/msw/discussions/1387
