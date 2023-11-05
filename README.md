# Next.js 블로그 프로젝트

Next.js 13의 기능 및 서버사이드 렌더링 흐름에 대한 이해를 강화하기 위한 블로그 프로젝트입니다. 성공한 웹 서비스를 분석하여 효과적인 API 설계 및 기능 구현을 통해 웹 개발 역량을 증진시키기 위한 목표로 시작되었습니다.

## 개발 기간

- ### 2023.09.09 ~ 2023.10.31

## 사이트 URL

- ### [https://blog-project-rose.vercel.app/](https://blog-project-rose.vercel.app/category)

## 프로젝트 화면

![thumb2](https://github.com/youngentry/blog-project/assets/90388461/d65bedcd-efd6-46be-9667-e733d3c334fc)

# 목차

[주요 기술 스택](#주요-기술-스택)

[주요 라이브러리](#주요-라이브러리)

[프로젝트 목표](#프로젝트-목표)

[주요 기능](#주요-기능)

- [회원 기능](#회원-기능)

  - `next-auth` GIthub 소셜 로그인 기능
  - `next-auth` ID/Password를 이용한 JWT 회원가입 : `bcrypt 비밀번호 보안`
  - 회원 권한 분기: 관리자, 테스터, 방문 유저, 비로그인 사용자

- [게시물 CURD](#게시물)

  - 웹에디터 `ReactQuill` 커스터마이징 : `DB에 이진(binary) 데이터로 저장되는 이미지 용량 문제 해결`
  - 이미지 첨부 시 Imgur 무료 이미지 호스팅 API를 활용한 이미지 URL 첨부
  - 커서가 위치한 곳에 이미지 첨부 : `forwardedRef를 통해 ref 속성 주입`
  - XSS 공격 방어를 위한 `dompurify` 라이브러리 적용
  - 웹에디터 css 로딩 지연 현상 개선 : `UX 개선`

- [게시물 좋아요](#게시물-좋아요)

  - 게시물 좋아요 : `단일 컴포넌트 단일 기능 원칙에 따른 구현`

- [댓글 CRUD](#댓글)

  - 댓글 CRUD : `Atomic Design Pattern 적용 경험을 바탕으로 작업 난이도 감소`
  - 대댓글 지원
  - 계층형 댓글 구현

- [카테고리](#카테고리)

  - 계층형 카테고리 구현

- [게시물 검색](#게시물-검색)

  - 게시물 및 카테고리 단일 검색
  - 게시물, 카테고리, 게시물 작성자를 복합 조건으로 검색

- [회원 활동 관리](#회원-활동-관리)

  - 좋아요한 게시물 조회
  - 작성한 댓글 관리

[새로운 시도](#새로운-시도)

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
  - dompurify (XSS 공격 방어)
- 배포
  - vercel

# 프로젝트 목표

Next.js 13의 최신 기능 학습 및 서버사이드 렌더링(SSR) 흐름의 이해를 강화하고자, 실제 서비스 개발을 통해서 마주할 수 있는 프로세스들을 경험하는 것을 목표로 삼았습니다.

이전에 진행한 프로젝트들은 주로 데이터 가공과 잘 보여주기에 집중해왔던 경향이 있습니다. 그로 인해 개발의 목표는 오로지 사용자 경험(UX) 개선이 되었고, 이는 상호작용이 제한적이며 정보의 일방적인 전달이 중심인 뉴스보도 형태의 프로젝트로 진행되었습니다.

이러한 상황에서 상호작용 부분에 필요한 웹 보안 인식과, 예외적인 사용자 시나리오를 설계하는 것에 대한 이해가 부족하다는 것을 깨달았습니다. 비록 이것이 문제라고 단언하기는 어렵지만, 웹 개발 지망생으로서 전체 웹 개발 라이프사이클에 대한 이해를 강화할 필요성을 느꼈습니다.

따라서, 사용자 상호작용을 중심으로 한 프로젝트를 개발하기로 결심하였으며, 다양한 후보군 중에서 서버사이드 렌더링의 이점을 최대한 활용할 수 있는 블로그 서비스를 구현하기로 결정했습니다.

✔기능 구현 및 에러 핸들링 과정에서 마주하는 경험들을 블로그에 문서로 기록하기.

🔗 [티스토리 Next.js 13 블로그 프로젝트 카테고리](https://sakuraop.tistory.com/category/Next13%20%EB%B8%94%EB%A1%9C%EA%B7%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)

# 주요 기능

## 회원 기능

![sign-s](https://github.com/youngentry/blog-project/assets/90388461/dfc5eb96-1e9d-4c14-90dc-abce430dee46)

- ### next-auth GIthub 소셜 로그인 기능

회원 기능 구현을 위해 **next-auth** 라이브러리를 사용하였습니다.

next-auth의 providers 메서드에 **Github OAuth** 속성을 추가하여 **소셜 로그인을 구현**하였으며, **MongoDBAdapter**를 이용하여 로그인한 클라이언트의 **회원 데이터를 DB에 저장**합니다.

- ### next-auth ID/Password를 이용한 JWT 회원가입 : bcrypt 비밀번호 보안

form으로 **ID/Password 입력을 받아 회원가입**을 할 수 있도록 했습니다.

bcrypt 라이브러리를 이용하여 비밀번호를 해쉬화하여 저장하도록 했으며, **로그인 시**에는 next-auth의 authorize 메서드를 활용, 입력받은 정보와 DB의 회원데이터를 비교하여 **유효한 경우 session을 클라이언트의 cookie에 저장**합니다.

- ### 회원 권한 분기: 관리자, 테스터, 방문 유저, 비로그인 사용자

회원별로 권한에 따라 **접근 가능한 경로**에 제한을 두었습니다.

`middleware` 라우터를 만들어 비로그인 유저는 /manage를 포함한 경로에 접근할 수 없도록 하였으며, 유저의 권한에 따라 렌더링되는 컴포넌트를 다르게 해 수행할 수 있는 작업을 분리하였습니다.

```
// 권한을 확인하는 함수를 모아서 관리합니다.
checkIsBlogAdmin() // 관리자
checkIsBlogManager() // 테스터
checkIsUser() // 일반유저
checkIsSameAuthor() // 동일한 작성자
checkIsEditableAuthor() // 게시물 수정 권한
```

![roles](https://github.com/youngentry/blog-project/assets/90388461/b205eae9-bdf7-4a2e-9aa1-52393114c42d)

관리자(admin) : 블로그 카테고리 편집, 모든 게시물 CRUD, 모든 댓글 CRUD, 게시물 좋아요, 자신의 활동 관리

테스터(tester) : 본인의 게시물 CRUD, 본인의 댓글 CRUD, 게시물 좋아요, 자신의 활동 관리, 게스트 댓글 삭제

방문유저(visitor) : 본인의 댓글 CRUD, 게시물 좋아요, 자신의 활동 관리, 게스트 댓글 삭제

게스트(비로그인 유저) : 댓글 작성, 게스트 댓글 삭제

🔗 [Next.js 13 소셜 로그인](https://sakuraop.tistory.com/594)  
🔗 [ID/Password JWT 가입 및 로그인](https://sakuraop.tistory.com/596)  
🔗 [Middleware로 권한이 없는 유저 redirect](https://sakuraop.tistory.com/595)  
🔗 [next-auth로 Role-based access control 구현: 회원별 권한 분기 개선](https://sakuraop.tistory.com/617)

## 게시물

![edit-s](https://github.com/youngentry/blog-project/assets/90388461/54b3ec7d-6c40-46d8-be61-7775e4700ed6)

- ### 웹에디터 ReactQuill 커스터마이징 : DB에 이진(binary) 데이터로 저장되는 이미지 용량 문제 해결

ReactQuill에 내장된 이미지 삽입 버튼의 경우에는 **binary 타입으로 이미지 파일을 저장**합니다. DB에 저장될 수 있는 **Document의 용량 제한을 초과하는 문제를 해결**하기 위해서 내장 버튼이 아닌** 커스텀한 버튼을 삽일할 필요**가 있었습니다. ReactQuill의 Toolbar를 커스텀하여 직접 생성한 버튼을 추가할 수 있도록 Toolbar 컴포넌트를 나누었습니다.

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

- ### 이미지 첨부 시 Imgur 무료 이미지 호스팅 API를 활용한 이미지 URL 첨부

이미지 파일 첨부 시 binary 타입으로 저장하는 대신, **Imgur 무료 이미지 호스팅 사이트에 이미지를 업로드**한 뒤, 업로드 된 이미지의 URL을 `<Image/>`의 속성으로 추가하여 **DB에 binary 타입으로 저장하는 문제를 해결**하였습니다.

- ### 커서가 위치한 곳에 이미지 첨부 : forwardedRef를 통해 ref 속성 주입

에디터의 커서위치에 이미지를 첨부하기 위해서는 `ref` 속성이 필요했습니다. 하지만, ReactQuill 모듈에는 ref 속성이 존재하지 않습니다. 이 문제를 해결하기 위해 dynamic import로 모듈을 로드하기 전에 `forwardedRef` 속성을 이용하여 **ref 속성을 주입**하였습니다.

🔗 [imgur 이미지 URL 업로드 + ReactQuill에서 URL로 이미지 저장하기](https://sakuraop.tistory.com/614)

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

- ### XSS 공격 방어를 위한 dompurify 라이브러리 적용

게시물 내에 스크립트를 삽입하여 정보를 탈취하지 못하도록 dompurify 라이브러리를 적용했습니다.

🔗 [XSS 방어 DOMpurify - 스크립트 실행 막기](https://sakuraop.tistory.com/600)

- ### 웹에디터 css 로딩 지연 현상 개선 : UX 개선

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

## 게시물 좋아요

- ### 게시물 좋아요 : 단일 컴포넌트 단일 기능 원칙에 따른 구현

게시물 좋아요를 별도로 기술한 이유는 **단일 컴포넌트 단일 기능 원칙**에 대해 노력하고 있다는 점을 보여드릴 수 있는 간단한 예시라 생각했기 때문입니다.

프로젝트 전반에 걸쳐 클라이언트가 **인터렉션을 수행하는 기능 컴포넌트는 아래의 예시와 같이 개별 컴포넌트로** 나누는 시도를 해보았습니다.

컴포넌트를 잘게 나누면 나눌수록 컴포넌트 간의 결합도가 낮아지며 재사용률이 높아졌고, 새로운 컴포넌트나 페이지 구현에 필요한 시간을 크게 절약할 수 있었습니다.

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

개별 컴포넌트로 나누어진 **기능 컴포넌트를 재사용**하여, 게시물 페이지로 이동하지 않고도 Card에서 곧바로 게시물에 좋아요를 할 수 있도록 하거나, 회원 활동 페이지에서 좋아요한 게시물을 모아서 관리하도록 하는 기능을 구현하는 과정에 별도의 추가 기능 구현이 필요하지 않았습니다.

## 댓글

![reply-s](https://github.com/youngentry/blog-project/assets/90388461/516dd68b-cf4e-4d0d-8f06-83a55f61db4b)

- ### 댓글 CRUD : Atomic Design Pattern 적용 경험을 바탕으로 작업 난이도 감소

댓글 컴포넌트는 관리자, 댓글 작성자, 게스트 등 권한 분기에 따라 포함되는 정보가 많았습니다. 이 때문에 한 파일에 코드가 많아지자 작업이 쉽지 않았습니다. 따라서 이전에 진행한 프로젝트에서 **`Atomic Design Pattern`을 적용해본 경험**을 살려 댓글의 머리, 본문, 꼬리 세 영역을 molecule로 바라보고 리팩토링하는 과정을 통해 **댓글 기능 작업 난이도를 낮출 수 있었습니다.**

🔗 [댓글 기능구현(1): 댓글 작성, 수정, 삭제, 리스트 조회](https://sakuraop.tistory.com/601)  
🔗 [댓글 기능구현(2): 수정, 삭제 권한 분기(유저/게스트/관리자)](https://sakuraop.tistory.com/602)

```
  <div className={styles.contentBox}>
    <CommentItemHead {...commentItemHeadProps} />
    <CommentItemBody {...commentItemBodyProps} />
    <CommentItemBottom {...commentFormProps} />
  </div>

```

- ### 대댓글 지원

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

🔗 [댓글에 답글(대댓글) 구현하기](https://sakuraop.tistory.com/616)

- ### 계층형 댓글 구현

이렇게 부모-자식 묶음 꼴로 정렬된 데이터를 `depth`의 크기에 따라 댓글 li에 `paddingLeft`를 주어 몇 번째 depth에 대한 답글인지 렌더링하도록 했습니다.

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

## 카테고리

![image](https://github.com/youngentry/blog-project/assets/90388461/e11bfabb-9740-4e21-8113-4aaa6119016c)

- ### 계층형 카테고리 구현

`MainCategory`의 하위에 `SubCategory`가 저장되고, 게시물이 `SubCategory` 정보를 지니도록 했습니다.

`MainCategory`를 추가하면 하위에 `SubCategory`를 추가하는 form과 `SubCategory` 리스트가 나타납니다.

```
    <div className={styles.container}>
      <h2>카테고리 에딧 페이지 제목</h2>
      <AddMainCategoryForm />
      <CategoryList />
    </div>
```

게시물이 작성될 때에는 `SubCategory`에서 포함한 게시물의 데이터를 업데이트하여, `SubCategory`별로 몇 개의 게시물을 포함하고 있는지 정보를 알 수 있도록 했습니다.

## 게시물 검색

![search](https://github.com/youngentry/blog-project/assets/90388461/f346d4a4-b508-4510-870b-35cb23eb239a)

- ### 게시물 및 카테고리 단일 검색

게시물 검색 버튼과 검색 모달을 한데 묶은 모듈로 만들어, 이 컴포넌트를 어디든 삽입하면 곧바로 게시물 검색 기능을 이용할 수 있도록 만들었습니다.

```
    <>
      <SearchModal {...modalProps} />
      <OpenSearchModalButton {...modalProps} />
    </>
```

`ref`로 컴포넌트 바깥을 클릭하면 창이 닫히도록 하는 `hook`을 만들어 검색 모달에 적용시켰습니다.

```
  useClickOutside(modalRef, false, setIsVisibleModal);
```

input에 검색어를 입력하고 submit하게 되면 DB에서 해당 검색어를 제목에 포함하는 게시물을 찾거나, 카테고리를 클릭하여 해당 카테고리에 속한 게시물을 검색할 수 있도록 query를 구성했습니다.

```
   // input에 입력한 값을 title search query로 검색하는 페이지로 이동
  const GoToSearchResult = () => {
    if (!searchInput) {
      window.alert('검색어를 입력해주세요.');
      return;
    }

    router.push(`/category?title=${searchInput}`);
    setIsVisibleModal(false);
  };

  // 카테고리를 클릭하면 해당 카테고리를 search query로 검색하는 페이지로 이동
  <Link className={styles.categoryLink} href={`/category?subtitle=${subCategory.title}`}>
    {subCategory.title}
  </Link>
```

- ### 게시물, 카테고리, 게시물 작성자를 복합 조건으로 검색

title, SubCategory, author 속성을 복합적으로 검색하는 기능은 url에 직접 입력해 검색이 가능하도록 서버에서 구현해 두었습니다. 꼭 필요한 기능이라 생각되지 않아 컴포넌트로 프론트에 직접 구현은 하지 않았습니다.

```
    <div className={styles.category}>
      <Head title={title} subtitle={subtitle} author={author} />
      {postCards.length ? <CardItem postCards={postCards} /> : <div>게시물이 존재하지 않습니다.</div>}
    </div>
```

```
/**
 * 게시물 리스트를 조회합니다.
 */
export const getPostCardsData = async (title: string, subtitle: string, author?: string) => {
  // 검색 query를 props로 전달받아
  const titleQuery = title && `&title=${title}`;
  const subtitleQuery = subtitle && `&subtitle=${subtitle}`;
  const authorQuery = author && `&author=${author}`;

 // 게시물 검색 API 요청을 보냅니다.
  const url = `${BASE_URL}/category?${titleQuery}${subtitleQuery}${authorQuery}`;
  const options = setFetchOptions('GET');
  const res = await fetch(url, options);
  const data: CardInterface[] = await res.json(); // 댓글 리스트

  return res.ok ? data : [];
};
```

## 회원 활동 관리

![image](https://github.com/youngentry/blog-project/assets/90388461/b73a154d-951e-4e6e-92a6-5a213b615896)

![image](https://github.com/youngentry/blog-project/assets/90388461/27ff0579-0b0b-4c02-9366-e201d7c40725)

- 좋아요한 게시물 조회
- 작성한 댓글 관리

로그인을 한 회원이 블로그 내에서 활동한 내역을 모아서 확인하고 관리할 수 있도록 구현한 기능입니다.

# 새로운 시도와 노력

- **직관적인 폴더와 컴포넌트 구조** 구현에 노력 : 이를 위해 Sendbird 코드 스타일을 지속적으로 참고하며 프로젝트 구조를 개선한다.

- **설계 중심의 개발 방식** : 각 기능 구현에 앞서 충분한 설계를 수행. 필요한 작업을 대략적으로 아는 것이 아니라, UI 설계, 인터랙션 흐름, 서버 측 로직, 및 데이터베이스 구조와 관련된 작업을 정리한 뒤 코드 작성에 착수한다.

- **컴포넌트 분리 및 결합도 최소화** : 서버 컴포넌트와 클라이언트 컴포넌트를 구분하여 결합도를 최소화. 전역 상태 관리 기술 사용을 최소화하고, 각 컴포넌트가 가능한 독립적으로 기능을 수행할 수 있도록 구조화한다.

- **모듈화 및 기능 단일화** : 함수 및 컴포넌트는 하나의 기능에 집중하도록 설계. 하나의 함수는 하나의 기능을 수행하며, 각 기능 컴포넌트는 단일한 기능을 제공하도록 노력한다.

- **체계적인 문제 및 변경사항 관리** : GitHub Issue를 활용하여 구현 기능과 발생한 문제를 체계적으로 관리하여 변경사항 및 이슈에 대한 프로젝트의 흐름을 이해할 수 있도록 한다.

- **실험적 기술 및 기능 도입** : 새로운 라이브러리나 테스트 기능을 도입할 때, branch를 생성하여 작업을 진행한 뒤 테스트하고, 안정적이면 병합하거나 필요 없다면 폐기한다.

- **웹 보안 강화** : 웹 보안 측면에서 XSS (Cross-Site Scripting) 및 쿼리 주입 공격 방어에 주안점을 두어 방어적인 웹 개발을 노력한다.
