// 제네릭스 -> 외부에서 전달되는 것 외부에서 결정한다.
// <T> -> Type의 약자, 관례적으로 사용한다.

function printAny(arg: any) {
  return arg;
}

let num1 = printAny(1);
num1.toUpperCase(); // 오류를 감지하지 못함. any는 모든 타입을 허용하기 때문.
let str1 = printAny("hello");
let bool1 = printAny(true);
let obj1 = printAny({ name: "John", age: 30 });

// 제네릭스를 사용하면 타입이 고정된다.
function printGeneric<T>(value: T): T {
  return value;
}

let num2 = printGeneric<number>(100);
// num2.toUpperCase(); // 오류를 감지함. T는 number로 고정되었기 때문.
let str2 = printGeneric("hello");
str2.toUpperCase(); // 오류를 감지하지 못함. T는 string으로 고정되었기 때문.
let bool2 = printGeneric(true);
// bool2.toUpperCase(); // 오류를 감지함. T는 boolean으로 고정되었기 때문.
let obj2 = printGeneric({ name: "John", age: 30 });
// obj2.toUpperCase(); // 오류를 감지함. T는 { name: "John", age: 30 }으로 고정되었기 때문.

// ------------------------------ 제네릭스 사용 예시 ------------------------------
// 제네릭스는 interface, class, function 등에서 많이 사용된다. 
// 제네릭 인터페이스 
interface DropBox1<T> {
  value: T;  
  selected: boolean;
}

const dropBox1: DropBox1<string> = {
  value: "hello",
  selected: false
}

interface DropBox2<T, U> {
  value: T,
  selected: U
}

const dropBox2: DropBox2<string, boolean> = {
  value: "hello",
  selected: false
}

// 제네릭 인터페이스를 사용하면 타입이 고정된다.
interface DropBoxGeneric<T> {
  value: T;
  selected: boolean;
}

const dropBox3: DropBoxGeneric<number> = {
  value: 1,
  selected: true
}

const dropBox4: DropBoxGeneric<string> = {
  value: "hello",
  selected: true
}

// ------------------------------ 클래스에서의 제네릭 ------------------------------
// 클래스에서의 제네릭
class BoxNormal {
  public kinds: string[] = [];

  public add(val: string): void {
    this.kinds.push(val);
  }

  public toString(): string {
    return this.kinds.toString();
  }
}

const boxNormal: BoxNormal = new BoxNormal();
boxNormal.add('test');
// boxNormal.add(1); error

class BoxGeneric<T> {
  public kinds: T[] = [];

  public add(val: T): void {
    this.kinds.push(val);
  }

  public toString(): string {
    return this.kinds.toString();
  }
}

const boxGeneric: BoxGeneric<number> = new BoxGeneric<number>();
boxGeneric.add(1);

const boxGeneric2: BoxGeneric<string> = new BoxGeneric<string>();
boxGeneric2.add('test');

// ------------------------------ 제네릭스의 제약 ------------------------------
// 제네릭 제약조건: 제네릭에서 특정 조건을 만족하는 타입만 받도록 제한
interface HasLength {
  length: number;
}

function printLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

// printLength(1); // error
printLength("hello");
printLength([1, 2, 3]);
printLength({ length: 10 });