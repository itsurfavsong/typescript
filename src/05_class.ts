// ---------------------------------------------------------
// OOP
// 캡슐화(private, protected, public), 상속(inheritance), 다형성(polymorphism)->오버라이딩, 오버로딩

// ---------------------------------------------------------
// Class: 객체를 정의하기 위한 집합, 타입으로도 사용 가능
// 클래스명은 파스칼케이스로 작성
// 파일명은 클래스명과 동일하게 작성
// 기본적으로 한 시스템 내에서 클래스명은 중복X
// static 장점: 메모리 효율이 좋음. 단점: 객체마다 다른 값을 가질 수 없음.

class Animal {
  // ---------------------------------------------------------
  // Field 정의
  // ---------------------------------------------------------
  // 인스턴스 필드
  public name: string;
  // 정적(static) 필드
  public static sName: string = '스테틱 이름'; // static은 클래스 자체에 귀속된다. 

  // ---------------------------------------------------------
  // 메소드 정의
  // ---------------------------------------------------------
  // 인스턴스 메소드
  public getName(): string {
    return '인스턴스 메소드';
  }

  // 정적(static) 메소드
  public static getStaticName(): string {
    return '정적 메소드';
  }

  // 생성자 메소드
  constructor(name: string) {
    this.name = name;
  }
}

// 인스턴스 필드 접근
const animal: Animal = new Animal("동물");

// 인스턴스 메소드 접근
animal.getName();

// 정적 필드 접근
Animal.sName;

// 정적 메소드 접근
Animal.getStaticName();

// ---------------------------------------------------------
// 생성자 메소드 constructor 객체가 생성될 때, 자동으로 호출되는 특수한 메소드
// ---------------------------------------------------------
class Whale {
  // public name: string;
  // 생성자 메소드
  // 객체의 인스턴스를 생성시, 실행되어야 하는 작업들을 위해서 사용
  // constructor(name: string) {
  //   this.name = name;
  // }

  // 생성자 단축 속성 parameter properties
  constructor(
    // ---------------------------------------------------------
    // this 참조 변수
    // ---------------------------------------------------------
    public name: string
  ) {
    // ---------------------------------------------------------
    // 생성자 메소드
    // ---------------------------------------------------------
    this.name = name; // 현재 instance 내부를 가르키는 말.
  }

  // 인스턴스 메소드
  public getName(): string {
    return this.name;
  }
}

const whale: Whale = new Whale("고래");
const whale2: Whale = new Whale("고래2");

// ---------------------------------------------------------
// 접근 제어 지시자 access modifiers
// public: class 내외부 어디에서나 접근 가능 (기본값)
// private: class 내부에서만 접근 가능
// protected: class 내부 또는 자식 클래스에서만 접근 가능

class Lizard {
  // public, private, protected
  number1: number = 1; // public은 생략이 된다. 
  public num2: number = 2;
  private num3: number = 3; // {} 안에서만 접근 가능
  protected num4: number = 4; // 상속 관계에서만 허용
}

const lizard: Lizard = new Lizard();

class BabyLizard extends Lizard { // 상속 관계
  test(): void {
    this.num4;
  }
}

