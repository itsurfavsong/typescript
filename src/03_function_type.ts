// 함수의 타입 정의
function sum(a: number, b: number): number | string {
  return a + b;
}

// 화살표 함수의 타입 정의
const sum2 = (a: number, b: number): number | string => a + b;

// --------------------------------------------------------------
// 선택적 파라미터
function printName(name: string, age?: number): void {
  console.log(`${name}: ${age}`);
}

printName("james");
printName("james", 20);

// --------------------------------------------------------------
// 필수 파라미터가 선택적 파라미터보다 뒤에 작성되면 안된다. (에러 발생)
// function printName2(name: string = "james", age?: number = 20, gender: string = "male") {
//   console.log(name);
//   console.log(age);
//   console.log(gender);
// }

// --------------------------------------------------------------
// 나머지 파라미터
function printName3(...names: string[]) {
  console.log(names);
}

// --------------------------------------------------------------
// Rest 파라미터
function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}

sumAll(1, 2, 3, 4, 5);

function sumAll2(...numbers: number[]): number {
  let sum = 0;
  for (const val of numbers) {
    sum += val;
  }
  return sum;
}

sumAll2(1, 2, 3, 4, 5);

function sumAll3(...numbers: number[]): number {
  let sum = 0;
  for (let i = 0; i <= (numbers.length - 1); i++) {
    sum += numbers[i] as number;
  }
  return sum;
}

sumAll3(1, 2, 3, 4, 5);

// --------------------------------------------------------------
// 함수 타입 표현식
const add = (a: number, b: number): number => a + b;
const sub = (a: number, b: number): number => a - b;
const mul = (a: number, b: number): number => a * b;
const div = (a: number, b: number): number => a / b;

// 위에 코드를 함수 타입 표현식으로 정의
type Oper = (a: number, b: number) => number;

const addEx: Oper = (a, b) => a + b;
const subEx: Oper = (a, b) => a - b;
const mulEx: Oper = (a, b) => a * b;
const divEx: Oper = (a, b) => a / b;

// --------------------------------------------------------------
// 콜백 함수의 타입
function printName4(name: string, callback: (name: string) => void) {
  callback(name);
}

// --------------------------------------------------------------
// 호출 시그니처: 객체 정의 안에 함수의 형태를 기술하는 방식
type Animal = {
  (name: string): void; // 함수의 호출 시그니처
  age: number; // 속성
  gender: string; // 속성
}

const human: Animal = (name: string) => {
  console.log(name);
}

human.age = 20;
human.gender = "male";

// --------------------------------------------------------------
// 함수의 타입 호환성
// 리턴의 타입 호환성: upcasting 일 때만 호환이 가능하다. (부모 -> 자식)
type FunA = (num: number) => number;
type FunB = (num: number) => 10;

let funA: FunA = (num: number): number => num;
let funB: FunB = (num: number): 10 => 10;

funA = funB; // 호환 가능
// funB = funA; // error: 호환 불가능

// 파라미터의 타입 호환성: downcasting에서 허용.
type FunC = (num: number) => number;
type FunD = (num: 10) => number;

let funC: FunC = (num: number) => num;
let funD: FunD = (num: 10) => num;

// funC = funD; // error
funD = funC; // 호환 가능

funD(10); // <- 무조건 10만 들어온다. funC는 10이 들어올지 20이 들어올지 모른다.


// --------------------------------------------------------------
// 함수 오버로딩: 하나의 함수명에 여러개의 파라미터 조합을 선언하는 기능 (2개를 구현해야한다-개발자의 실수를 적게 하기 위해서)
// 1. 오버로드 시그니처: 구현부 없이 선언부만 만들어둔 함수
function addOverload(a: number, b: number): number;
function addOverload(a: number, b: number, c: number, d: number): number;
// 2. 오버로드 구현체: 구현부가 있는 함수
function addOverload(a: number, b: number, c?: number, d?: number): number {
  if (typeof c === 'number' && typeof d === 'number') {
    return a + b + c + d;
  } else {
    return a + b;
  }
}

addOverload(1, 2);
// addOverload(1, 2, 3); // error -> 파라미터가 3개인 시그니처는 정의하지 않았으므로 에러 발생
addOverload(1, 2, 3, 4);
// addOverload(1, 2, 3, 4, 5); // error -> 파라미터가 5개인 시그니처는 정의하지 않았으므로 에러 발생

// --------------------------------------------------------------
// 사용자 정의 타입 가드: `is` 키워드를 활용해서 타입을 좁히는 방법 (되도록이면 서로소 유니온을 이용해라. 서로소 유니온 사용이 불가능하다면 사용자 정의 타입 가드를 사용한다.)
type Cat = { meow: () => void; type:"CAT" };
type Dog = { bark: () => void; type:"DOG" };

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).type === "CAT";
}

function speakBy(animal: Cat | Dog) {
 if (isCat(animal)) {
   animal.meow();
 } else {
   animal.bark();
 }
}

speakBy({ meow: () => console.log('meow'), type:"CAT" });
speakBy({ bark: () => console.log('bark'), type:"DOG" });
