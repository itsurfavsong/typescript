// 추상 클래스 (미완성 클래스, 그래서 instance 할 수가 없다.)
abstract class Mammal {
  constructor(
    protected name: string,
    protected residence: string
  ) {
    this.name = name;
    this.residence = residence;
  }

  // 일반 메소드
  public breath(): void {
    console.log(`${this.name}이/가 폐호흡한다.`);
  }

  // 추상 메소드: 자식쪽에서 반드시 오버라이딩 해야하는 method입니다. 
  abstract printResidence(): void;
}

// 추상 클래스는 단독으로 인스턴스 생성이 불가능하다. 
// const mammal: Mammal = new Mammal();

// 부모의 추상 메소드를 반드시 오버라이드해서 구현해야지 오류가 나지 않는다. 
class Whale extends Mammal {
  override printResidence(): void { // 강제 오버라이딩
    console.log(`${this.name}이/가 ${this.residence}에 살고 있다.`);
  }
}

