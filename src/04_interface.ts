// ---------------------------------------------------------
// 객체 구조 설명하는 것 -> interface / 객체들의 설계도
interface User {
  readonly name: string; // 필수 그리고 readonly로 인해 수정 불가능
  age: number; // 필수
  address?: string; // 선택적
}

// 담기는 값의 형태를 체크하는 것 -> type
type Dog = {
  name: string;
  age: number;
  barking: string;
}

// ---------------------------------------------------------
// 인터페이스 확장
// `extends` 키워드를 사용하여 인터페이스를 확장할 수 있다.
// 다중상속인데 사람들이 굉장히 어려움을 느끼고 자바스크립트만의 특징이라 다른 언어는 이런 개념이 없어서 사람들이 안쓴다. 
// intersection을 사용해라!!
interface Animal {
  name: string;
}

interface Human extends Animal { // age + name
  age: number;
}

interface Douner extends Animal, Human {
  kinds: string;
};

const douner: Douner = {
  name: "james",
  age: 20,
  kinds: "human",
};

douner.name = "james";
douner.age = 20;
douner.kinds = "human";

// ------------------------------------------------------------
// 선언 병합 (자바스크립트만의 특징)
interface birds {
  age: number;
}

interface birds {
  address: string;
}

const bird: birds = {
  age: 20,
  address: "seoul",
};

// ---------------------------------------------------------
// 메소드 정의 (함수 안의 타입 정의)
// 함수 타입 프로터티 방식
interface Lion {
  // 함수 타입 프로퍼티 방식 (기본)
  barking: (arg: Animal) => void;

  // 메소드 시그니처 방식 -> 타입 체크가 느슨하다. strict = true가 적용이 안된다. 
  barking2(arg: Animal): void;
}

let humanBarking = (arg: Human) => {
  console.log(arg.name);
}

//const dog2: Lion = {
//  barking: humanBarking, // error -> barking은 함수 타입 프로퍼티 방식이므로 함수를 대입해야한다.
//  barking2: humanBarking,
//}

// ---------------------------------------------------------
// 메소드 오버로딩
interface Pets {
  // 함수 타입 프로퍼티로는 메소드 오버로딩이 불가능하다.
  // mya: () -> void;
  // mya: (arg: string) -> void;

  // 메소드 시그니처 방식으로는 메소드 오버로딩이 가능하다.
  meow(): void;
  meow(arg: string): void;
}

