// ----------------------------------------------------
// 유틸리티 타입
// 제네릭, 맵드 타입, 조건부타입 등을 활용해서 타입스크립트가 미리 만들어둔 유틸리티 타입들을 알아보자!
// 복잡한 타입 조작을 직접 구현하지 않고 선언만으로 타입 변형을 할 수 있다.
// ----------------------------------------------------
interface User {
  id: number;
  name: string;
  email: string;
  gender?: 'M' | 'F';
  post: {
    id: number;
    title: string;
  }
} 

// --------------------------------
// 1. Partial<T>
// 타입 T의 모든 프로퍼티를 옵셔널로 변환
type PartialUser  = Partial<User>;

// --------------------------------
// 2. Required<T>
// 타입 T의 모든 속성을 필수 속성으로 변경
type RequiredUser = Required<User>;

// --------------------------------
// 3. Readonly<T>
// 타입 T의 모든 속성을 읽기 전용으로 변경
type ReadonlyUser = Readonly<User>;

// --------------------------------
// 4. Record<K, T>
// 타입 T의 모든 속성을 읽기 전용으로 변경
type RecordUser = Record<User['id'], string>;

// --------------------------------
// 5. Pick<T, K>
// 타입 T에서 특정 속성 K들만 골라서 새로운 타입 작성
type Post = Pick<User, 'id' | 'name'>;

// --------------------------------
// 6. Omit<T, K>
// 타입 T에서 특정 속성 K들을 제외한 새로운 타입 작성
type OnlyUser = Omit<User, 'post'>;

// ---------------------------------
// 7. Extract<T, U>
// 유니온 타입 T에서 U와 겹치는 타입만 추출하여 새로운 타입 작성
type UnionType = string | number | boolean;
type ExtractType = Extract<UnionType, string | number>;

// ---------------------------------
// 8. ReturnType<T>
// 함수 T의 리턴 타이을 추출하여 새로운 타입을 작성
function test() { return 'test' }
type TestReturnType = ReturnType<typeof test>;

  
