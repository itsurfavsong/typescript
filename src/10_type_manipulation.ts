// ------------------------------------------------------------
// 타입 조작
// ------------------------------------------------------------
// keyof & typeof 연산자
interface User {
  id: number;
  name: string;
  age: number;
}

type UserKeys = keyof User; // "id" | "name" | "age" 유니온 타입으로 만들어짐. 
// const key: UserKeys = "email"; // Error : "email"은 User interface에 정의된 키값이 아니다. 

const user = { name: '홍길동', age: 25 };
type User2 = typeof user;

const user2: User2 = {
  name: "Linda",
  age: 25,
};

// keyof 연산자: User interface
const user3: UserKeys = "name";

// typeof 연산자: user 객체의 타입을 추출
const user4: typeof user = {
  name: "Jane",
  age: 25,
};

// ----
// 인덱스트 엑세스 타입
// ---
// 객체나 배열이나 튜플의 특정 요소나 속성의 타입을 추출할 때, 사용한다. 
interface Post {
  title: string;
  content: string;
  image: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
}

function printAuthorInfo1(author: { id: number; name: string; age: number; }) {
  console.log(`${author.name}: (${author.id})`);
}

function printAuthorInfo2(author: Post["author"]): void {
  console.log(`${author.name}: (${author.id})`);
}

// 배열 요소의 타입추출
const COLOURS = ["red", "green", "blue"] as const;
type Colours = typeof COLOURS[number]; // 배열의 값들을 유니온 타입으로 한 번에 추출

// 튜플의 요소 타입 추출
type Tuple = [number, string, boolean];
type Tuple1 = Tuple[0]; // number
type Tuple2 = Tuple[1]; // string
type Tuple3 = Tuple[number]; // number | string | boolean

// ------------------------------
// 맵드 타입 (Mapped Type)
// 기존의 타입을 기반으로 새로운 타입을 일괄 생성할 때 사용한다.
// ------------------------------
type User1 = {
  id: number;
  name: string;
  age: number;
};

// 모든 속성을 옵셔널로 바꾸고 싶다? 이렇게 하세요.
type OptionalUser1 = {
  [K in keyof User1]?: User1[K];
};
type OptionalUser2 = OptionalUser1;

// 모든 키값을 readonly로 변경
// type ReadonlyUser = {
//   readonly id: number;
//   readonly name: string;
//   readonly age: number;
// };

type ReadonlyUser = Readonly<User1>;
type ReadonlyUser2 = Readonly<User1>;

// ------------------------------
// template literal type
// ------------------------------
// string literal 타입을 조합해서 새로운 string literal 타입을 생성할 때 사용한다.
type Colour2 = "red" | "green" | "blue";
type Intensity = "light" | "dark";
type ColourTheme = `${Intensity}-${Colour2}`;
type Theme = "light-red" | "dark-green" | "blue-light";

