<div align="center">
<h1 align="center">NE(O)RDINARY TEMPLATE</h1>

<p align="center">
  <a href="https://gridge.co.kr/" rel="noopener" target="_blank">
    <img width="1920" src="./background.png" alt="Gridge Logo">
  </a>
</p>

![version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

<p align="center">
  React.js + TypeScript + Redux
  <br>
  <a href="https://worker.gridge.co.kr"><strong>너디너리에 참여하러가기 👈</strong></a>
  <br>
  <br>
  <a href="https://github.com/neordinary/neordinary-template-react-ts-web/issues/new">버그 리포팅</a>
  ·
  <a href="https://github.com/neordinary/neordinary-template-react-ts-web/issues/new">기능 추가 요청</a>
  ·
  <a href="https://neordinary.github.io/">너디너리 블로그</a>
</p>

</div>

## 바로가기

- [권장버전](#권장버전)
- [설치방법](#설치방법)
- [실행방법](#실행방법)
- [빌드방법](#빌드방법)
- [프로젝트 구조에 대해 설명해주세요.](#프로젝트 구조에 대해 설명해주세요.)
- [새로운 화면은 어떻게 만들면 되나요?](#새로운 화면은 어떻게 만들면 되나요?)
- [API 연동은 어떻게 하면 될까요?](#API 연동은 어떻게 하면 될까요?)
- [3rd party API 연동은 어떻게 하면 될까요?](#3rd party API 연동은 어떻게 하면 될까요?)
- [질문 사항이 생기면 어떻게 해야하나요?](#질문 사항이 생기면 어떻게 해야하나요?)

## Quick start

## 권장버전

```sh
npm -v
# 8.19.2

node -v
# v18.12.1
```

## 설치방법

```sh
npm install -g eslint prettier
# lint 와 prettier 가 작동 할 수 있도록 global 로 설치해주세요.

npm install
```

## 실행방법

```sh
npm run start # 로컬에서 실행
```

## 빌드방법

```sh
npm run build-dev # dev 환경용 build 파일 생성

npm run build-stage # stage 환경용 build 파일 생성

npm run build-prod # prod 환경용 build 파일 생성
```

## 프로젝트 구조에 대해 설명해주세요.

```text
> .husky                    # git hook 을 실행시켜주는 폴더 (수정X)
> public
    > favicon.ico           # 브라우저 탭에 나오는 아이콘 파일
    > index.html            # React 소스를 랜더링하기 위한 Root DOM
    > manifest.json         # index.html 에 쓰일 값들 정의
> src
    > apis
        > core
            > index.ts      # axios 사용시 request, response 설정 파일
        > businessModel.ts  # 리소스 단위로 파일을 만들어서 API 를 호출하도록 관리
    > assets                # jpg, png 등 이미지 에셋 폴더
        > ...
    > components            # 반복적으로 쓰이는 컴포넌트 폴더
        > ...
    > config                # 프로젝트 내에 사용되는 설정 파일 폴더
        > constant.ts       # 상수 파일
    > layout
        ...                 # 반복적으로 쓰이는 레이아웃 폴더
    > models                # API Request, Response 에 쓰이는 모델 클래스 폴더
        ...
    > pages                 # 화면별 폴더를 만들고 index.ts, styles.tsx 로 html, css 파일 분리
        > ...
    > scss                # CSS 파일들
        > ...
    > utils                 # 공통적으로 쓰이는 함수 모음 유틸 폴더
        > ...
    _nav.tsx                # 좌측 네비게이션 항목 정의
    index.tsx               # 프로젝트 Root 파일
    routes.ts               # 프로젝트 Routing 정의 파일
    store.ts                # Redux 파일
.browserslistrc             # 브라우저 호환성을 위한 browserslist 설정 파일
.editorconfig               # 편집툴 공통 설정 파일
.env.development            # development 환경에서 사용 할 환경변수 정의 파일
.env.development.local      # local ""
.env.production             # production ""
.env.staging                # staging ""
.eslintignore
.eslintrc.js                # 코드 퀄리티를 통일하기 위한 lint 설정 파일
.gitattributes
.gitignore
.prettierignore
.prettierrc.js              # 코드 컨벤션을 통일하기 위한 prettier 설정 파일
package.json                # node 모듈을 설치하고 실행, 빌드하는 명령어와 설정 모음 파일
README.md
svg.d.ts                    # svg 파일을 ts 에서 불러올 수 있도록 하는 설정 파일
tsconfig.json               # typescript 를 javascript 로 변환하는 설정 파일
```

## 새로운 화면은 어떻게 만들면 되나요?
1. src/pages 내에 화면별 폴더를 만들어주세요.
2. 폴더내에 index.tsx 와 styles.tsx 를 만들어주세요.
3. styles.tsx 에는 styled-components 컴포넌트들을 정의해주세요.
4. index.tsx 에서 styles.tsx 컴포넌트를 불러와서 랜더링해주세요.

## API 연동은 어떻게 하면 될까요?
1. src/apis/리소스별파일.ts 파일을 만들어주세요.
```ts
import request from "./core";

export const getUserByUserId = async <T>(userId: number): Promise<T> => {
  const url = `/users/${userId}`;
  return await request.get<T>(url);
};
```

2. API 호출시 사용되는 Response Model Class 를 만들어주세요.
- (Request 파라미터가 많거나 리소스단위를 넘겨야 할때는 Request Model Class 를 만들어서 활용해주세요.)
```ts
interface UserInfo {
  id: number;
  name: string;
}
```
```ts
// const { id } = await getUserByUserId<UserInfo>(0);
const userInfo = await getUserByUserId<UserInfo>(0);
```
3. 위와 같이 API 호출 소스를 작성한 후 src/pages/폴더/index.tsx 파일에서 API 를 호출해주세요.

## 3rd party API 연동은 어떻게 하면 될까요?
새로운 npm 라이브러리를 사용해야 한다면 라이센스를 체크해야해요.

라이브러리마다 상업적으로 사용 가능/불가능한 라이센스를 가지고있기 때문에 꼭 확인해야해요.

## 좌측 네비게이션에 화면을 추가하려면 어떻게 해야하나요?
1. src/_nav.tsx 에 navGroup 혹은 navItem 을 추가해줍니다.
2. src/routes.ts 에 새로 만든 화면을 넣어줍니다.

## 질문 사항이 생기면 어떻게 해야하나요?
<a href="https://github.com/neordinary/neordinary-template-react-ts-web/issues/new">템플릿에 대한 질문 혹은 개선 사항 제안</a> 을 사용하여 이슈를 만들어주세요.

이슈를 확인하고 개선 사항을 반영하거나, 개선안으로 올려주신 PR이 있다면 검토후 적용하도록 하겠습니다.

## 파일 구조도
```
.
├── LICENSE
├── README.md
├── background.png
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── favicon.png
│   ├── index.html
│   └── manifest.json
├── src
│   ├── _nav.tsx
│   ├── apis
│   │   ├── banner.ts  // 배너 API 호출
│   │   ├── businessModel.ts
│   │   ├── core    // axios 기본 세팅 폴더
│   │   │   └── index.ts
│   │   ├── dashboard.ts    // 대시보드 API 호출
│   │   ├── exhibition.ts // 기획전 API 호출
│   │   ├── login.ts    // 로그인 API 호출
│   │   ├── reservation.ts
│   │   ├── space.ts  // 공간 API 호출
│   │   └── userManagement.ts   // 유저 관리 API 호출
│   ├── assets
│   │   ├── main-logo.svg
│   │   ├── neordinary-logo.svg
│   │   └── search.svg
│   ├── components
│   │   ├── AppAside.tsx
│   │   ├── AppContent.tsx
│   │   ├── AppFooter.tsx
│   │   ├── AppHeader.tsx
│   │   ├── AppSidebar.tsx
│   │   ├── AppSidebarNav.tsx
│   │   ├── Aside
│   │   │   └── index.tsx
│   │   ├── Content
│   │   │   └── index.tsx
│   │   ├── Footer
│   │   │   └── index.tsx
│   │   ├── Header
│   │   │   └── index.tsx
│   │   ├── Sidebar
│   │   │   └── index.tsx
│   │   ├── SidebarNav
│   │   │   └── index.tsx
│   │   ├── _dont-edit-component
│   │   │   ├── Types.tsx
│   │   │   ├── element-cover
│   │   │   │   └── CElementCover.tsx
│   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── useForkedRef.ts
│   │   │   │   └── useStateWithCallback.ts
│   │   │   ├── pagination
│   │   │   │   ├── CPagination.tsx
│   │   │   │   ├── CPaginationItem.tsx
│   │   │   │   └── CSmartPagination.tsx
│   │   │   ├── smart-table
│   │   │   │   ├── CSmartTable.tsx
│   │   │   │   ├── CSmartTableBody.tsx
│   │   │   │   ├── CSmartTableCleaner.tsx
│   │   │   │   ├── CSmartTableFilter.tsx
│   │   │   │   ├── CSmartTableHead.tsx
│   │   │   │   ├── CSmartTableInterface.tsx
│   │   │   │   └── CSmartTableItemsPerPageSelector.tsx
│   │   │   ├── spinner
│   │   │   │   └── CSpinner.tsx
│   │   │   └── table
│   │   │       ├── CTable.tsx
│   │   │       ├── CTableBody.tsx
│   │   │       ├── CTableCaption.tsx
│   │   │       ├── CTableDataCell.tsx
│   │   │       ├── CTableFoot.tsx
│   │   │       ├── CTableHead.tsx
│   │   │       ├── CTableHeaderCell.tsx
│   │   │       └── CTableRow.tsx
│   │   ├── custom
│   │   │   ├── Types.tsx
│   │   │   ├── element-cover
│   │   │   │   └── CElementCover.tsx
│   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── useForkedRef.ts
│   │   │   │   └── useStateWithCallback.ts
│   │   │   ├── pagination
│   │   │   │   ├── CPagination.tsx
│   │   │   │   ├── CPaginationItem.tsx
│   │   │   │   └── CSmartPagination.tsx
│   │   │   ├── smart-table
│   │   │   │   ├── CSmartTable.tsx
│   │   │   │   ├── CSmartTableBody.tsx
│   │   │   │   ├── CSmartTableCleaner.tsx
│   │   │   │   ├── CSmartTableFilter.tsx
│   │   │   │   ├── CSmartTableHead.tsx
│   │   │   │   ├── CSmartTableInterface.tsx
│   │   │   │   └── CSmartTableItemsPerPageSelector.tsx
│   │   │   ├── spinner
│   │   │   │   └── CSpinner.tsx
│   │   │   └── table
│   │   │       ├── CTable.tsx
│   │   │       ├── CTableBody.tsx
│   │   │       ├── CTableCaption.tsx
│   │   │       ├── CTableDataCell.tsx
│   │   │       ├── CTableFoot.tsx
│   │   │       ├── CTableHead.tsx
│   │   │       ├── CTableHeaderCell.tsx
│   │   │       └── CTableRow.tsx
│   │   ├── index.ts
│   │   └── shared   // 공통 컴포넌트   
│   │       ├── DetailPageHeader   // 상세페이지 헤더 (공간,기획전,배너)
│   │       |   ├── DetailPageHeader.styled.tsx
│   │       |   └── DetailPageHeader.tsx
            ├── DeleteModal    // 삭제 모달
│   │       │   ├── DeleteModal.styled.tsx
│   │       │   └── DeleteModal.tsx
│   │       └── SingleImageModal    // 단일 이미지 모달
│   │           ├── SingleImageModal.styled.tsx
│   │           └── SingleImageModal.tsx
│   ├── config  
│   │   └── constant.ts
│   ├── custom.d.ts
│   ├── index.tsx
│   ├── layout
│   │   └── DefaultLayout.tsx
│   ├── models   // type 선언 모음
│   │   ├── Banner.ts   // 배너 관련 타입 선언
│   │   ├── BusinessModel.ts
│   │   ├── Dashboard.ts
│   │   ├── Exhibition.ts   // 기획전 관련 타입 선언
│   │   ├── Login.ts
│   │   ├── RequesterBusinessModelAllResponse.ts
│   │   ├── Reservation.ts
│   │   ├── Space.ts   // 공간 관련 타입 선언
│   │   └── UserManagement.ts
│   ├── pages
│   │   ├── banner   // 배너 목록 페이지
│   │   │   ├── Banner.styled.tsx
│   │   │   └── Banner.tsx
│   │   ├── bannerDetail    // 배너 상세 페이지
│   │   │   ├── BannerDetail.styled.tsx
│   │   │   ├── BannerDetail.tsx
│   │   │   ├── bannerDetail.constants.ts  // 배너 상세 input 관리
│   │   ├── dashboard   // 대시보드 페이지
│   │   │   └── Dashboard.tsx
│   │   ├── exhibition  // 기획전 목록
│   │   │   ├── Exhibition.styled.tsx 
│   │   │   └── Exhibition.tsx 
│   │   ├── exhibitionDetail  // 기획전 상세 페이지
│   │   │   ├── ExhibitionDetail.styled.tsx
│   │   │   ├── ExhibitionDetail.tsx
│   │   │   ├── components // 기획전 상세에서 쓰이는 컴포넌트
│   │   │   │   ├── PlaceList.styled.tsx  
│   │   │   │   ├── PlaceList.tsx  // 선택된 공간 리스트 박스
│   │   │   │   ├── PlaceModal.styled.tsx
│   │   │   │   └── PlaceModal.tsx // 공간 선택 모달
│   │   │   └── exhibitionDetail.constants.ts // 기획전 input 관리
│   │   ├── keyword
│   │   │   ├── Keyword.tsx
│   │   │   └── components
│   │   │       ├── keywordElement.tsx
│   │   │       ├── keywordList.tsx
│   │   │       └── style.ts
│   │   ├── login   // 로그인 페이지
│   │   │   └── Login.tsx
│   │   ├── page404
│   │   │   └── Page404.tsx
│   │   ├── page500
│   │   │   └── Page500.tsx
│   │   ├── recommend
│   │   │   ├── Recommend.tsx
│   │   │   ├── RecommendStyle.ts
│   │   │   └── components
│   │   │       ├── recommendEdit
│   │   │       │   ├── recommendEdit.tsx
│   │   │       │   └── style.ts
│   │   │       └── recommendList
│   │   │           ├── recommendList.tsx
│   │   │           └── style.ts
│   │   ├── register
│   │   │   └── Register.tsx
│   │   ├── reservation
│   │   │   ├── Reservation.tsx
│   │   │   ├── ReservationDetail.tsx
│   │   │   ├── ReservationDetailStyle.tsx
│   │   │   ├── ReservationStyle.tsx
│   │   │   ├── components
│   │   │   │   ├── InfoBox
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── button
│   │   │   │   │   ├── backButton.tsx
│   │   │   │   │   ├── cancelButton.tsx
│   │   │   │   │   └── paymentButton.tsx
│   │   │   │   ├── cancelModal
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── style.ts
│   │   │   │   ├── commonContent.tsx
│   │   │   │   └── content.tsx
│   │   │   └── reservation.contstants.ts
│   │   ├── space  // 공간 목록 페이지
│   │   │   ├── Space.styled.tsx
│   │   │   └── Space.tsx
│   │   ├── spaceDetail  // 공간 상세 페이지
│   │   │   ├── SpaceDetail.styled.tsx
│   │   │   ├── SpaceDetail.tsx
│   │   │   ├── components  // 공간 상세에서 쓰이는 컴포넌트
│   │   │   │   ├── Floor.tsx // 층
│   │   │   │   ├── Image 
│   │   │   │   │   ├── ImageCarousel.styled.tsx 
│   │   │   │   │   ├── ImageCarousel.tsx // 공간 이미지 캐러셀
│   │   │   │   │   ├── ImageModal.styled.tsx
│   │   │   │   │   └── ImageModal.tsx  // 이미지 선택 (댜중) 모달
│   │   │   │   ├── Keyword  
│   │   │   │   │   ├── Keyword.styled.tsx
│   │   │   │   │   ├── Keyword.tsx  // 선택된 키워드 목록 박스
│   │   │   │   │   └── KeywordModal.tsx // 키워드 선택 모달
│   │   │   │   ├── Map
│   │   │   │   │   ├── Map.styled.tsx 
│   │   │   │   │   └── Map.tsx  // 주소 선택 모달 (daum)
│   │   │   │   └── OperationHour 
│   │   │   │       ├── OperationHour.styled.tsx
│   │   │   │       └── OperationHour.tsx  // 영업시간 datePicker
│   │   │   └──  spaceDetail.constant.ts  // 공간 상세 input 관리
│   │   └── userManagement  // 유저 관리 페이지
│   │       ├── index.tsx   // 유저 리스트
│   │       ├── styles.tsx
│   │       └── userManagementDetail.tsx    // 유저 디테일
│   ├── routes.ts
│   ├── scss
│   │   ├── _custom.scss
│   │   ├── _layout.scss
│   │   ├── _variables.scss
│   │   └── style.scss
│   ├── store.ts
│   └── utils
│       ├── file.ts
│       └── utility.ts
├── svg.d.ts
└── tsconfig.json
```
