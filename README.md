# 블로그 프로젝트

Next.js 13의 기능 학습과 서버사이드 렌더링 흐름의 이해를 강화하기 위한 블로그 프로젝트.  
유튜브, 네이버, 티스토리 등의 서비스를 관찰, 분석하여 API를 설계한 뒤 기능을 구현했습니다.

## 개발 기간

- ### 2023.09.09 ~ 2023.10.24

## 사이트 URL

- ### [https://blog-project-rose.vercel.app/](https://blog-project-rose.vercel.app/)

## 프로젝트 화면

![thumb2](https://github.com/youngentry/blog-project/assets/90388461/d65bedcd-efd6-46be-9667-e733d3c334fc)

# 목차

### [주요 기술 스택](#-주요-기술-스택)

### [주요 라이브러리](#-주요-라이브러리)

### [프로젝트 목적]()

### [폴더 구조]()

### [구현 기능](#-📱-구현-기능)

- [회원 기능](###-회원-기능)

  - next-auth GIthub 소셜 로그인 기능
  - next-auth ID/Password를 이용한 JWT 회원가입 : `bcrypt 비밀번호 보안`
  - 관리자, 테스터, 방문유저, 비로그인 : `권한 분기`

- [게시물 CRUD](###-게시물)

  - 웹에디터 ReactQuill 커스텀 : `binary 타입으로 DB에 저장되는 이미지 용량 문제 해결`
  - 이미지 첨부 시 Imgur 무료 이미지 호스팅 API를 이용하여 URL로 이미지 첨부
  - 커서가 위치한 자리에 이미지 첨부 : `forwardedRef로 컴포넌트에 ref 속성 주입`
  - 웹에디터 css 로딩 지연 현상 해결 : `UX 개선`

- [게시물 좋아요](###-게시물-좋아요)

  - 게시물 좋아요 : `단일 컴포넌트 단일 기능 원칙에 대한 노력`

- [댓글 CRUD](###-댓글)

  - 댓글 CRUD : `Atomic Design Pattern 적용 경험을 바탕으로 작업 난이도 낮추기`
  - 대댓글
  - 계층형 댓글

- [카테고리](###-카테고리)

  - 카테고리 추가
  - 계층형 카테고리

- [게시물 검색](###-게시물-검색)

  - 게시물, 카테고리 단일 검색
  - 게시물 + 카테고리 복합 조건 검색

- [회원 활동 관리](###-회원-활동-관리)

  - 좋아요한 게시물
  - 댓글 작성한 게시물

  ### [새로운 시도]()

# 주요 기술 스택

| Subject | Stack |
| :-- | :-- |
| Core | <img src="https://img.shields.io/badge/next.js-ffffff?style=for-the-badge&logo=next.js&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> |
| CSS | <img src="https://img.shields.io/badge/sass-DB7093?style=for-the-badge&logo=sass&logoColor=white"> |
| Database | <img src="https://img.shields.io/badge/mongodb-282C34?style=for-the-badge&logo=mongodb&logoColor=#61DAFB"> |
| Code Quality | <img src="https://img.shields.io/badge/prettier-2C414F?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> |

# 주요 라이브러리

- 회원기능

  - next-auth (소셜 로그인 방식, Session 로그인 방식)
  - next-auth/mongodb-adapter (next-auth와 DB연동)

- 웹 에디터
  - react-quill
  - highlight.js
- 보안
  - bcrypy (패스워드 암호화)
  - dompurify (XSS attack 방어)
- 배포
  - vercel

# 📱 구현 기능

### 회원 기능

![sign-s](https://github.com/youngentry/blog-project/assets/90388461/dfc5eb96-1e9d-4c14-90dc-abce430dee46)

- next-auth GIthub 소셜 로그인 기능

회원 기능 구현을 위해 **next-auth** 라이브러리를 사용하였습니다.

next-auth의 providers 메서드에 **Github OAuth** 속성을 추가하여 **소셜 로그인을 구현**하였으며, **MongoDBAdapter**를 이용하여 로그인한 클라이언트의 **회원 데이터를 DB에 저장**합니다.

🔗 [next-auth로 깃허브 소셜 로그인 + MongoDB 회원 정보 저장](https://sakuraop.tistory.com/594)

- next-auth ID/Password를 이용한 JWT 회원가입 : `bcrypt 비밀번호 보안`

form으로 **ID/Password 입력을 받아 회원가입**을 할 수 있도록 했습니다. 비밀번호를 곧바로 DB에 저장하면 개인정보 유출의 위험이 있기 때문에 bcrypt 라이브러리를 이용하여 비밀번호를 해쉬화하여 저장했습니다. **로그인 시**에는 next-auth의 authorize 메서드를 활용, 입력한 정보와 DB의 회원데이터를 비교하여 **유효한 경우 next-auth session에 로그인 정보를 저장**합니다.

🔗 [ID/Password JWT 가입 및 로그인 구현 방법 CredentialsProvider() 알고 보기](https://sakuraop.tistory.com/596)

- 관리자, 테스터, 방문유저, 비로그인 : `권한 분기`

회원별로 권한에 따라 **접근 가능한 경로 분기**, 권한에 따라 렌더링되는 컴포넌트를 다르게 하여 **클라이언트가 수행할 수 있는 작업을 분리**하였습니다.

```
// 상황별로 권한을 확인하는 함수를 모아서 관리합니다.

checkIsBlogAdmin() // 관리자
checkIsBlogManager() // tester
checkIsUser() // 일반 유저
checkIsSameAuthor() // 동일한 작성자
checkIsEditableAuthor() // 게시물 수정 권한
```

![roles](https://github.com/youngentry/blog-project/assets/90388461/b205eae9-bdf7-4a2e-9aa1-52393114c42d)

- 관리자

블로그 카테고리 편집, 모든 게시물 CRUD, 모든 댓글 CRUD, 게시물 좋아요, 자신의 활동 관리

- 테스터

본인의 게시물 CRUD, 본인의 댓글 CRUD, 게시물 좋아요, 자신의 활동 관리, 게스트 댓글 삭제

- 방문유저

본인의 댓글 CRUD, 게시물 좋아요, 자신의 활동 관리, 게스트 댓글 삭제

- 게스트

댓글 작성, 게스트 댓글 삭제

🔗 [next-auth로 Role-based access control 구현: 회원별 권한 분기 개선](https://sakuraop.tistory.com/617)

---

### 게시물

![edit-s](https://github.com/youngentry/blog-project/assets/90388461/54b3ec7d-6c40-46d8-be61-7775e4700ed6)

- 웹에디터 ReactQuill 커스텀 : `binary 타입으로 DB에 저장되는 이미지 용량 문제 해결`

내장된 이미지 삽입 버튼의 경우에는 **binary 타입으로 이미지 파일을 저장**합니다. DB에 저장될 수 있는 **Document의 용량 제한을 초과하는 문제를 해결**하기 위해서 내장 버튼이 아닌** 커스텀한 버튼을 삽일할 필요**가 있었습니다. ReactQuill의 Toolbar를 커스텀하여 직접 생성한 버튼을 추가할 수 있도록 Toolbar 컴포넌트를 나누었습니다.

```
    <div id='toolbar'>
      // ...
      <span className='ql-formats'>
        <input
          type='file'
          className={`${styles.uploadImageButton}`}
          onChange={onFileUpload} />
      </span>
    </div>
```

- 이미지 첨부 시 Imgur 무료 이미지 호스팅 API를 이용하여 URL로 이미지 저장

이미지 파일 첨부 시 binary 타입으로 저장하는 대신, **Imgur 무료 이미지 호스팅 사이트에 이미지를 업로드**한 뒤, 업로드 된 이미지의 URL을 `<Image/>`의 속성으로 추가하여 **DB에 binary 타입으로 저장하는 문제를 해결**하였습니다.

- 커서가 위치한 자리에 이미지를 첨부하기 : `forwardedRef로 컴포넌트에 ref 속성 주입`

에디터의 커서위치에 이미지를 첨부하기 위해서는 `ref` 속성이 필요했습니다. 하지만, ReactQuill 모듈에는 ref 속성이 존재하지 않습니다. 이 문제를 해결하기 위해 dynamic import로 모듈을 로드하기 전에 `forwardedRef` 속성을 이용하여 **ref 속성을 주입**하였습니다.

```
const CustomReactQuill = dynamic(
  async () => {
    // ReactQuillClass 변수에 ReactQuill 컴포넌트 할당
    const { default: ReactQuillClass } = await import('react-quill');

    // 컴포넌트에 ref 속성 주입
    const RefExtendedQuill = ({ forwardedRef, ...props }: CustomReactQuillPropsInterface) => {
      return <ReactQuillClass ref={forwardedRef} {...props} modules={editorModule} />;
    };
    return RefExtendedQuill;
  },
  { ssr: false },
);
```

- 웹에디터 css 로딩 지연 현상 해결 : `UX 개선`

웹에디터는 서버컴포넌트 내에서 dynamic import로 컴포넌트를 로드해야 했기 때문에 script가 style을 적용하기 전에 짧은 시간 동안 **클라이언트에게 날것의 tags가 보여지는 문제**가 있었습니다.

```
    <div className={styles.quillContainer}>
      <QuillToolbar quillRef={quillRef} /> // css 동적 로딩으로 인한 css 적용 지연이 되는 컴포넌트
      <CustomReactQuill forwardedRef={quillRef} />
    </div>
```

이 문제를 해결하기 위해서 **페이지를 불러오는 동안에 동적으로 로드해야하는 Toolbar를 미리 로드**하여 페이지 **로딩이 완료된 시점에는 곧바로 css가 적용된 모습**을 보여주도록 하였습니다. 페이지 로드에 필요한 시간은 차이가 거의 없는 정도기 때문에 이는 적절한 문제 해결 방법이라 생각했습니다.

```
  if (loading) {
    return (
      <div className={styles.spinContainer}>
        <Spin size='m'/>
        <div className={styles.quillBox}>
          <Quill {...quillProps} /> // 페이지를 로드하는(data를 불러오는) 사이에 컴포넌트를 로드하여 css 적용시키기
        </div>
      </div>
    );
  }
```

---

### 게시물 좋아요

- 게시물 좋아요 : `단일 컴포넌트 단일 기능 원칙에 대한 노력`

게시물 좋아요를 별도로 기술한 이유는 **단일 컴포넌트 단일 기능 원칙**에 대해 노력하고 있다는 점을 보여드릴 수 있는 간단한 예시라 생각했기 때문입니다. 프로젝트 전반에 클라이언트와 **인터렉션을 수행하는 기능 컴포넌트는 아래와 같이 개별 컴포넌트로** 나누었습니다.

```
const LikePostButton = (props) => {
    return (
      <button className={`${styles.likePost} ${className}`} onClick={() => handleClickLikePostButton()} type='button'>
        {isLiked ? <BsFillHeartFill /> : <BsHeart />}
        {likeCount}
      </button>
  );
};

export default LikePostButton;
```

이렇게 개별 컴포넌트로 나누어진 **버튼 컴포넌트를 재사용**하여, 게시물 페이지로 이동하지 않고도 트위터의 좋아요처럼 Card에서 곧바로 게시물에 좋아요 버튼을 누를 수 있도록 했습니다.

---

### 댓글

![reply-s](https://github.com/youngentry/blog-project/assets/90388461/516dd68b-cf4e-4d0d-8f06-83a55f61db4b)

- 댓글 CRUD : `Atomic Design Pattern 적용 경험을 바탕으로 작업 난이도 낮추기`

댓글 컴포넌트는 관리자, 댓글 작성자, 게스트 등 권한 분기에 따라 포함되는 정보가 많았습니다. 이 때문에 한 파일에 코드가 많아지자 작업이 쉽지 않았습니다. 따라서 이전에 진행한 프로젝트에서 **`Atomic Design Pattern`을 적용해본 경험**을 살려 댓글의 머리, 본문, 꼬리 세 영역을 molecule로 바라보고 리팩토링하는 과정을 통해 **댓글 기능 작업 난이도를 낮출 수 있었습니다.**

```
  <div className={styles.contentBox}>
    <CommentItemHead {...commentItemHeadProps} />
    <CommentItemBody {...commentItemBodyProps} />
    <CommentItemBottom {...commentFormProps} />
  </div>

```

- 대댓글

답글 기능을 구현하기 위해서 댓글을 작성할 때 `parentCommentId`의 여부에 따라서 **답글인지 아닌지를 구분**할 수 있도록 했습니다. 여기에 `depth`를 추가하여 해당 댓글이 **몇 번째 깊이의 댓글에 대한 답글이 될지에 대한 정보**와, 누구에게 답글을 하는 것인지 시각적인 정보를 더하기 위해서 `replyToNickname`로 **답글 대상 유저의 닉네임이 태그**되도록 했습니다.

```
  // DB에 저장할 댓글
  const saveCommentData: CommentInterface = {
    // ...
    parentCommentId: parentCommentId || null, // 어느 댓글 id에 답글을 달지
    depth: parentCommentId ? (depth || 0) + 1 : 0,
    replyToNickname, // 답글 작성자 닉네임
  };
```

하지만 이대로는 depth를 나타내기만 할 뿐, 댓글 작성 순서대로 나열이 되고 있었기 때문에 **부모 댓글과 자식 댓글끼리 묶어줄 필요**가 있었습니다.

훅을 이용하여 댓글 목록을 불러오기 전에 부모-자식 댓글끼리 묶어주는 작업을 위해 `sortCommentList` 함수를 만들었습니다.

```
export const sortCommentList = (comments: CommentInterface[]) => {
  const commentOrderMap = new Map();

  // Map: {A부모id: [A부모, A자식], B부모id: [B부모, B자식]} 과 같이 정렬
  for (const comment of comments) {
    if (comment.depth === 0) {
      commentOrderMap.set(comment._id, [comment]); // Map: {A부모id: [A부모]} 추가
    } else {
      const parentArray = commentOrderMap.get(comment.parentCommentId);
      parentArray.push(comment); // 부모 댓글 배열에 [A부모, A자식]과 같이 추가
    }
  }

  const sortedComments = Array.from(commentOrderMap.values()).flat(); // 배열 평탄화
  return sortedComments;
};
```

1. 자식 댓글은 부모 댓글이 작성된 뒤에 존재할 수 있다.
2. 자식 댓글을 자식 댓글끼리 작성된 순서를 반드시 유지하기 때문에, 자식 댓글에 대한 별도의 정렬 작업을 할 필요는 없다.
3. 부모-자식 묶음끼리의 순서만 유지하면 된다고 판단한다.

이러한 조건에 따라, 작성 순서를 유지하기 위해서 `Map 객체`를 생성한 뒤, 조회한 댓글 데이터를 for문으로 순회하여 `{ {부모A: [부모A,자식1,자식2]}, {부모B: [부모B,자식1,자식2]} }`형태를 만들었습니다.

그리고 이를 배열로 변경한 뒤 평탄화 작업을 통해서 목표 형태를 구현했습니다.

- 계층형 댓글

이렇게 부모-자식꼴로 정렬된 데이터를 `depth`의 깊이에 따라서 댓글 li에 paddingLeft를 주어 몇 번째 depth의 답글인지 렌더링하도록 했습니다.

```
const CommentList = ({
  const { commentList, setCommentList } = useCommentList(postId, newUpdate); // 정렬된 댓글 목록
  return (
        //...
          <li
            key={commentId}
            className={`${styles.commentItem}`}
            style={{ paddingLeft: `${0.5 + (depth || 0) * 4}rem` }}
          >
  );
})
```

---

### 카테고리

- 카테고리 추가
- 계층형 카테고리

---

### 게시물 검색

- 게시물, 카테고리 단일 검색
- 게시물 + 카테고리 복합 조건 검색

---

### 회원 활동 관리

- 좋아요한 게시물
- 댓글 작성한 게시물

# 💡 새로운 시도

- sendbird 코드 스타일을 참고하여 **직관적인 폴더와 컴포넌트 구조**를 만들기 위해 노력
- 그때그때 필요한 작업을 생각하는 대신, 체계적인 **설계 후 기능 구현** 노력 (UI>인터렉션>server>DB 각 과정에 필요한 작업을 글로 정리한 뒤에 코딩하는 습관 들이기)
- 전역상태관리의 사용을 최소한으로 하고 **서버 컴포넌트와 클라이언트 컴포넌트의 경계를 구분**하여 컴포넌트 간의 결합도 최대한 낮추기
- 하나의 함수는 하나의 기능, 하나의 기능 컴포넌트는 하나의 기능만 수행
- Github issue 주도 커밋으로 구현할 기능, 발생한 문제 관리
- 시범적으로 도입해볼 라이브러리나, 테스트 기능은 branch로 작업한 뒤에 merge 또는 폐기
- 웹보안 XSS, query injection attack 방어에 신경쓰기
