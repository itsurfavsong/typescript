// ------------------------------------------------
// 타입스크립트의 집합론
// boolean: true, false
// number: 1, 2, 3
// string: "1", "2", "3"
// object: { name: "1", age: 1 }
// array: [1, 2, 3]
// tuple: [1, "1"]
// enum: { KOREA: "ko", USA: "us", CHINA: "cn" }
// union: 1 | 2 | 3
// intersection: 1 & 2 & 3
// 객체 내부의 구조(property)를 기준으로 타입을 결정하는 구조적 타입 시스템
type Animal = {
  name: string;
};

type Dog = {
  type: 'DOG';
  name: string;
  age: number;
};

type Human = {
  type: 'HUMAN';
  name: string;
  lang: string;
};

// property가 적으면 superset, property가 많으면 subset
type User = {
  name: string;
  age: number;
};

type Admin = {
  name: string;
  age: number;
  role: string;
};

// --------------------------------------------------
// 타입 호환성: A와 B 두 개의 타입이 존재할 때, A타입의 값을 B타입으로 취급해도 괜찮은 지 판단하는 것
let number1: number = 1;
let number2: 2 = 2;

number1 = number2; // 호환 가능, number1은 number2를 품을 수 있다. 
// number2 = number1; // 호환 불가능, number2는 number1을 품을 수 없음

const dog: Dog = { type: 'DOG', name: "흰둥이", age: 1 };
const animal: Animal = dog; // (name이라는 property가 있다) 자식 타입을 부모 타입으로 취급한다 -> upcasting, 하지만 부모가 가진 프로퍼티 전체는 사용 못한다. 
// animal.breed = "1"; // breed는 없음. 
// downcasting 불가능 (JS는 동적 타입이기 때문)
// Dog이 변하면 Animal도 변하고, Animal이 변하면 Dog도 변한다. 

// --------------------------------------------------
// 타입 초과 속성 체크
// 객체 리터럴을 직접 대입하는 상황에서 개발자의 실수 방지를 위해 더 엄격하게 타입 체크한다. 
const animal2: Animal = { name: "이쁜이" };

// --------------------------------------------------
// 타입 추론: 명시적으로 타입을 적지 않아도, 타입스크립트가 코드를 분석해서 타입을 결정하는 기능
// 일반 변수의 타입 추론
let num2 = 1; // number로 타입 추론
const num = 1; // 1 number literal로 타입 추론

// 객체의 타입추론
let obj = { name: "mark", age: 1 };
// obj = { lang: 'ko' }; // 타입 추론이 되지 않음

// 구조 분해 할당의 타입 추론 (자동)
let [num5, str5, bool5]: [number, string, boolean] = [1, 'str', true];
let [num6, str6, bool6] = [1, 'str', true];

// 함수의 리턴 타입 추론
function add(a: number, b: number): number {
  return a + b;
}

// 기본 값이 설정된 파라미터의 타입 추론
function add2(msg = 'test') {
  return 'hi';
}

// 최적 공통 타입 추론
let arr: (number | string | boolean)[] = [1, 'hi', false];
let arr2 = [1, 'hi', false];

// ----------------------------------------------------
// 타입 단언(type assertion): 타입스크립트에게 특정 타입으로 간주하도록 지시하는 것
// 개발자가 해당 타입에 대해 확실한 정보를 가지고 있을 때, 컴파일러에게 특정 타입을 강제로 지정하는 기능.

let num9 = 10 as never;
// let num10 = 10 as string; // error: number랑 string은 같은 level이거든. subset이나 superset의 관계만 가능할 듯. 
const main = document.getElementById("main") as HTMLElement;

// ----------------------------------------------------
// non-null assertion operator: ! (값이 null이나 undefined가 아님을 확실할 때, `!`를 이용해서 타입 단언)
type User1 = {
  name: string;
  age?: number; // ?는 optional chaining
};

const user1: User1 = { name: "james" };
user1.name.toString();
user1.age!.toString();

// 타입 좁히기를 선호한다. (타입 단언을 사용하지 않는다.)

// const 단언: 모든 프로퍼티가 readonly를 갖도록 단언 가능
let user10 = {
  name: "tom",
  age: 20
} as const;

// ---------------------------------------------------
// 타입 좁히기: 여러 타입이 섞여있는 상황에서, 조건문을 통해 특정 범위로 타입을 제한
// 이때는 switch가 더 가독성이 좋을 수 있다. 
function printVal(val: number | string | null): void {
  if (typeof val === 'number') {
    console.log(val.toFixed(2));
  } else if (typeof val === 'string') {
    console.log(val.toUpperCase());
  } else {
    console.log('null이다.'); // typeof null은 object로 반환됨. (JS의 버그)
  }
}

// 객체의 타입 좁히기: `in` 연산자 이용 (잘 안쓰인다)
function whatIsKinds(animal: Human | Dog) {
  if ('age' in animal) {
    animal.age;
  } else {
    animal.lang;
  }
}

// ---------------------------------------------------------------------------------------------------
// instanceof와 서로소 유니온이 선호되는 타입 좁히기이다. 이 타입이 맞는가? 

// 클래스 인스턴스 좁히기: `instanceof` 연산자 이용
// animal 안에 dog2가 있는지 확인
class Dog2 { bark: string = '멍'; }
class Cat2 { meow: string = '야옹'; }

function chkInstance(animal: Dog2 | Cat2) {
  if (animal instanceof Dog2) {
    animal.bark;
  } else {
    animal.meow;
  }
}

// 서로소 유니온 타입 좁히기 -------------------------------------------
// 서로소 유니온 타입: 각 타입이 서로소(공통된 속성이 없는)인 유니온 타입
// 예: type T = { type: 'A' } | { type: 'B' };
// 이 경우 'type' 속성을 기준으로 타입을 좁힐 수 있다.
function test3(animal: Dog | Human) {
  if (animal.type === 'HUMAN') {
    animal.lang;
  } else {
    animal.age;
  }
}