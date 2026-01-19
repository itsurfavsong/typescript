
// 타입 정의 방법
let num: number = 1;
let str: string = "1";
let bool: boolean = true;
let arr: number[] = [1, 2, 3];
let obj: { name: string; age: number } = { name: "1", age: 1 };
let tuple1: [number, string] = [1, "1"];

// 정수형 타입
let decimal: number = 6;
let hex: number = 0xf00d;
let nan: number = NaN;
let infinity: number = Infinity;
// let bigint: bigint = 1n; // (ES2020 이상만 가능함)
let binary: number = 0b1010;
let octal: number = 0o1234;

// 문자열 타입
let color: string = "red";
color = "blue";
color = "green";
color = "1";
let str2: string = `1 ${1}`;

// literal type
let numLiteral: 1 | 2 | 3 = 1;
let strLiteral: "1" | "2" | "3" = "1";
numLiteral = 2;
strLiteral = "2";

// boolean 타입
let boolLiteral: boolean = true;
boolLiteral = false;

// array 타입
// 배열 요소 타입([]) 방식
let numList: number[] = [1, 2, 3];
let strList: string[] = ["1", "2", "3"];

// 제네릭 방식
let numList2: Array<number> = [1, 2, 3];
let strList2: Array<string> = ["1", "2", "3"];

// 다차원 배열
let matrix: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// 유니온 타입을 사용한 다차원 배열
let multiList: (number | string)[][] = [[1, "2", 3], ["1", 2, "3"]];

// 튜플 타입 - 배열의 서브타입으로 크기와 타입이 고정된 배열 (js는 동적인 언어라 고정을 안해줬지만 ts는 다르다.)
let x: [number, string] = [1, "1"];
let y: [number, number] = [1, 2];
let x2: [number[], number, string] = [[1, 2, 3], 1, "1"];
// ⭐외부 라이브러리 타입들 정의해놓은 거 공부하세요⭐

// object 타입
let obj1: object = { name: "1", age: 1 };
let obj2: object = [ "1", 1 ];
let obj3: object = function() { };
let obj4: object = new Date();
let obj5: object = { name: "1", age: 1 }; // upcasting 문제가 생김. object는 부모, 거기안에 name, age는 자식
let obj6: { name: string, age: number } = { name: "1", age: 1 };
obj6.name = "2";

// optional(선택적) 프로퍼티 - 프로퍼티명 뒤에 ?를 붙여서 선택적 프로퍼티로 정의
// readonly(읽기전용) 프로퍼티 - 프로퍼티명 앞에 readonly를 붙여서 읽기전용 프로퍼티로 정의
let obj7: 
  { 
    readonly name: string, // 절대 바뀌면 안되는 것들을 readonly로 정의
    age: number, 
    gender?: string // 선택적 프로퍼티로 정의
  };

obj7 = { name: "1", age: 1 };

// null & undefined 타입
// "strict"=false 일 경우, 모든 타입에 할당 가능
// "strict"=true 일 경우, 암묵적 any 전부 차단, unknown은 반드시 검증 후 사용, null / undefined 전면 통제(타입 명시 반드시!!!!)
// "strictNullChecks"=true 일 경우, null과 undefined를 “모든 타입에 자동으로 들어갈 수 있는 값”으로 취급하지 않겠다-> 꼭 명시를 해라. null과 undefined를 별도의 타입으로 취급
let numNull: null = null;
let numUndefined: undefined = undefined;
let objNull: { name: string, age: number } | null = null;
let objUndefined: { name: string, age: number } | undefined = undefined;

// ---------------------------------------------------------------------------------------------------------------------
// Type Alias: 사용자가 정의하는 타입(변수명의 첫 글자는 대문자)
type User1 = 
{ 
  name: string;
  age: number;
};

// ---------------------------------------------------------------------------------------------------------------------
// index signature: 객체의 타입을 유연하게 정의할 수 있도록 하는 방법 
type LangCodes1 = {
  KOREA: string;
  USA: string;
  CHINA: string;
};

type LangCodes3 = {
  [key: string]: string; // 외부에서 전달해주는 값(외부 라이브러리, 백엔드에서 전달, 프론트에서 전달)을 모를 때, 선택적 옵션인지 아닌지 모를 때 index signature를 사용
  KOREA: string; // 반드시 포함되어야 하는 프로퍼티인 경우 직접 명시 (가장 안전한 방법)
};

const langCodes: LangCodes3 = {
  KOREA: "ko",
  USA: "us",
  CHINA: "cn",
};

// ---------------------------------------------------------------------------------------------------------------------
// enum: 열거형 - 여러 값들에 각각 이름과 특정 값을 부여해두고 사용하는 독립적인 타입
enum Role1 { // 값은 정의한 순서대로 0부터 idx 자동으로 할당됨 (숫자), 어떤 롤 이하 이상 허용한다는 것에 쓰이기에 편함. 숫자 이하라고 if절 주면 되거든. 
  USER,
  ADMIN,
};

console.log(Role1[Role1.ADMIN]);

const user10 = {
  name: "ellie",
  role: Role1.ADMIN
};

const user20 = {
  name: "james",
  role: Role1.USER
};

console.log(user20);

enum Role2 { // 정확한 값을 할당 (문자열), 어떤 롤 이하 이상 허용한다는 것에 쓰이지 불편함. 모든 롤을 다 적어줘야함. 
  USER2 = "USER",
  ADMIN2 = "ADMIN",
  GUEST2 = "GUEST",
};

const user30 = {
  name: "kim",
 role: Role2.ADMIN2, // 'ADMIN'으로 출력됨
};

console.log(user30);
// ----------------------------------------------------------------------------------------------------------------------
// tuple: 배열의 서브타입으로 크기와 타입이 고정된 배열 (js는 동적인 언어라 고정을 안해줬지만 ts는 다르다.)
let tuple: [number, string] = [1, "1"];

// ----------------------------------------------------------------------------------------------------------------------
// object: 객체의 타입을 유연하게 정의할 수 있도록 하는 방법 
type User = 
{ 
  name: string;
  age: number;
};

let obj8: User = { name: "james", age: 60 };
let obj9: User = { name: "yoon", age: 80 };

// ----------------------------------------------------------------------------------------------------------------------
// index signature: 객체의 타입을 유연하게 정의할 수 있도록 하는 방법 
type LangCodes = {
  KOREA: string;
  USA: string;
  CHINA: string;
};

type LangCodes2 = {
  [key: string]: string; // 외부에서 전달해주는 값(외부 라이브러리, 백엔드에서 전달, 프론트에서 전달)을 모를 때, 선택적 옵션인지 아닌지 모를 때 index signature를 사용
  KOREA: string; // 반드시 포함되어야 하는 프로퍼티인 경우 직접 명시 (가장 안전한 방법)
};

const langCodes1: LangCodes2 = {
  KOREA: "ko",
  USA: "us",
  CHINA: "cn",
};

// ----------------------------------------------------------------------------------------------------------------------
// enum: 열거형 - 여러 값들에 각각 이름과 특정 값을 부여해두고 사용하는 독립적인 타입
enum Role { // 값은 정의한 순서대로 0부터 idx 자동으로 할당됨 (숫자), 어떤 롤 이하 이상 허용한다는 것에 쓰이기에 편함. 숫자 이하라고 if절 주면 되거든. 
  USER,
  ADMIN,
};

console.log(Role[Role.ADMIN]);

const user1 = {
  name: "ellie",
  role: Role.ADMIN
};

const user2 = {
  name: "james",
  role: Role.USER
};

console.log(user2);

enum Role2 { // 정확한 값을 할당 (문자열), 어떤 롤 이하 이상 허용한다는 것에 쓰이지 불편함. 모든 롤을 다 적어줘야함. 
  USER = "USER",
  ADMIN = "ADMIN",
  GUEST = "GUEST",
};

const user3 = {
  name: "kim",
 role: Role2.ADMIN, // 'ADMIN'으로 출력됨
};

console.log(user3);
// ----------------------------------------------------------------------------------------------------------------------
// unknown 타입: any와 비슷하지만 더 안전한 타입. unknown은 타입을 명시해야만 사용할 수 있음. 어떤 타입인지 모르기 때문에 함부로 연산 불가. 
// 모든 타입을 허용해야할 때 사용한다. 
let val1: any = 10;
let val2: unknown = 10;

val1.length;
// val2.length; // Error

// unknown 이슈가 생겼으니까 이런 식으로 타입을 확인해야함. 
// 타입을 좁히기(Type Narrowing) 위해 typeof, 비교문 등을 활용
if(typeof val2 === 'string') {
  val2.length;
};

// ----------------------------------------------------------------------------------------------------------------------
// void: 반환값이 없는 함수의 반환 타입 (undefined만 할당이 가능한 타입, 리턴 타입이 없는 함수에서 리턴 타입으로 사용)
function test(): void { // 리턴값이 없다는 것을 명시적으로 나타냄. 
  console.log("void");
  // return; // return 타입이 안정해져있으면 기본으로 undefined 반환합니다. 
};

test();

// ----------------------------------------------------------------------------------------------------------------------
// algebraic data type: (Union, Intersection)
// Union: 타입의 합집합을 나타내는 타입, `|`을 통해 타입을 구분
// Intersection: 타입의 교집합을 나타내는 타입, `&`을 통해 타입을 구분
// 주의 사항? 시점에 따라서 사용 범위가 달라진다. 
// 1. 할당할 때, `A | B`의 필수 프로퍼티를 모두 가지고 있거나, `A | B`의 모든 프로퍼티를 가지고 있으면 타입 검사 통과 
// 2. 사용할 때, `A | B`가 공통적으로 가진 프로퍼티만 사용 가능
let unionNumeric: number | string;
unionNumeric = "10";
if(typeof unionNumeric === "string") {
  unionNumeric.length;
};

// union 타입에서의 객체
type Human = {
  name: string;
  lang: string;
};
type Dog = {
  name: string;
  age: number;
};
type Animal = Human | Dog; // Animal Type: Union 타입

let test1: Animal = {
  name: "james",
  lang: "en",
};

let test2: Animal = {
  name: "ellie",
  age: 40,
};
  
let test3: Animal = {
  name: "amie",
  age: 5,
  lang: "ko",
};

let test4: Animal = {
  name: "happy",
  age: 10,
  lang: "ko",
};

test4.name;
// test4.age; // Error <-사용할 때는 무조건 공통 프로퍼티만 사용할 수 있음. 

// intersection: 타입의 교집합을 나타내는 타입, `&`을 통해 타입을 구분
// 복수의 타입을 조합하는 경우 `&` 타입을 구분

type Human2 = {
  name: string;
  lang: string;
};
type Dog2 = {
  name: string;
  age: number;
};
type Animal2 = Human2 & Dog2;

// 할당 시점: 각 타입의 모든 프로퍼티를 가지고 있어야 통과
const animal2: Animal2 = {
  name: "elizabeth",
  lang: "cn",
  age: 28,
}; // 모든 프로퍼티가 필요함. 

// 사용 시점: 모든 프로퍼티에 접근 가능
animal2.age; // 모든 프로퍼티가 가능함
 
// ----------------------------------------------------------------------------------------------------------------------
// never: 절대 발생하지 않아야 하는, 불가능의 의미를 가진 타입
// 절대 발생하면 안되는 것에 대해서 미연의 방지? 느낌임, 분기처리할 때 절대로 오류 안나게 해주는 방법. 
 type color = "red" | "green" | "blue";

 function getFlower(val: color): string {
   if(val === "red") {
     return "Rose";
   } else if(val === "green") {
     return "Lily";
   } else if(val === "blue") {
     return "Bluebell";
   } else {
     return checkInfo(val);
   }
 }

 function checkInfo(info: never): never {
   throw new Error(`타입 오류: ${info}`);
 }