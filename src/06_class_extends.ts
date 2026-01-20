// ---------------------------------------------------------
// 클래스 상속 (다중상속 금지)
// 부모-자식 관계
class Mammal {
  constructor(
    protected name: string,
    protected residence: string
  ) {
    this.name = name;
    this.residence = residence;
  }

  public breathe(): void {
    console.log(`${this.name}는 ${this.residence}에서 호흡한다.`);
  }

  public swimming(): void {
    console.log(`${this.name}는 ${this.residence}에서 수영한다.`);
  }
}

class Whale extends Mammal {
  constructor(name: string, residence: string) {
    // 자식쪽에서 생성자, 메소드를 정의할 경우, 반드시 부모 생성자를 먼저 호출하고, 
    // 후속 처리를 해야한다. 
    super(name, residence);
    console.log('자식 고래');
  }
}

class Dolphin extends Mammal {
  // 자식쪽의 생성자를 생략할 경우, 자동으로 부모 생성자를 호출한다. 
}

const whale: Whale = new Whale("고래", "바다");
const dolphin: Dolphin = new Dolphin("돌고래", "바다");

whale.swimming();
whale.breathe();
dolphin.swimming();
dolphin.breathe();

// ---------------------------------------------------------
// 다형성 (오버라이딩)
// 부모 클래스의 메소드를 자식 클래스에서 재정의
class Butterfly extends Mammal {
  constructor(name: string, residence: string) {
    super(name, residence);
  }
  // 오버라이딩: 부모에게 상속받은 메소드를 자식이 재정의해서 사용하는 것
  // v4.3+부터 `override` 키워드를 메소드명 앞에 붙여 명시
  public breathe(): void {
    console.log(`${this.name}는 ${this.residence}에서 호흡한다.`);
  }
}