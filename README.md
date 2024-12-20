# SuperBlock Assignment

## 🚀 설치 및 실행

```bash
# clone repository
$ git clone https://github.com/1eeminhyeong/superblock-assignment.git
$ cd superblock-assignment

# start dev server
$ corepack enable
$ pnpm install && pnpm dev
```

## 📜 기능 설명

문제를 보고 그래프 알고리즘이 제일 먼저 떠올라 DFS 방식을 이용하였습니다. 게임은 다음 순서로 진행됩니다.

1. 게임판 생성: 무작위로 [행, 열]로 이루어진 풍선 배열을 생성합니다.
2. 풍선 클릭: 풍선을 클릭하면 DFS 알고리즘으로 상하좌우 연결된 풍선 그룹을 탐색합니다.
   - 가장 큰 풍선 그룹이라면 해당 그룹을 터뜨립니다.
   - 그렇지 않다면 게임이 종료되며, 게임판은 리셋됩니다.
3. 난이도 조정: 기본 게임판의 크기는 5\*5이며, 사용자가 3부터 32까지 원하는 크기로 조정할 수 있습니다.
4. 리셋 버튼: 언제든 리셋 버튼을 눌러 게임판을 초기화할 수 있습니다.

## 🔧 사용 기술

- React, Typescript, Jotai, Antd, Vitest, React-testing-library

## 🧪 테스트

```bash
# run test
$ pnpm test:run
```

- 단위 테스트: DFS 탐색 로직 및 풍선 그룹 계산과 같은 핵심 함수에 대해 작성
- 통합 테스트: BalloonGrid 컴포넌트의 렌더링, 풍선 클릭 이벤트, 모달 호출 등을 검증

## 🌐 상태 관리

- 풍선 위치는 matrix에 의존적이기 때문에 Context API 대신 Jotai를 사용했습니다.
- Derived Atom을 활용해 풍선의 위치와 상태를 효율적으로 관리했습니다.
- 전역 상태를 통해 Props Drilling을 예방하고 유지보수를 용이하게 했습니다.
