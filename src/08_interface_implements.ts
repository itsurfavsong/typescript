// ------------------------------ Interface ------------------------------
interface Swimming {
  swimming(): void;
}

interface Flying {
  flying(): void;
}

interface Residable {
  residence(): void;
}

// ------------------------------ Mammal 관련 ------------------------------
abstract class Mammal {
  constructor(
    protected name: string,
  ) {
    this.name = name;
  }
  // 추상 메소드
  abstract residence(): void;

  // 일반 메소드
  public breathe(): void {
    console.log(`${this.name}이/가 폐호흡한다.`);
  }
}

class Whale extends Mammal implements Swimming {
  override residence(): void {
    console.log(`${this.name}이/가 놀이터에 살고 있다.`);
  }

  public swimming(): void {
    console.log(`${this.name}이/가 수영한다.`);
  }
}

class FlyingSquirrel extends Mammal implements Residable {
  override residence(): void {
    console.log(`${this.name}이/가 나무 위에 살고 있다.`);
  }

  public flying(): void {
    console.log(`${this.name}이/가 비행한다.`);
  }
}

// ------------------------------ Fish 관련 ------------------------------
class FlyingFish implements Swimming, Flying {
  // 수영, 비행, 바다에 산다. 
  constructor(
    protected name: string,
  ) {
    this.name = name;
  }

  // 일반 메소드
  public breathe(): void {
    console.log(`${this.name}이/가 폐호흡한다.`);
  }

  public swimming(): void {
    console.log(`${this.name}이/가 수영한다.`);
  }

  public flying(): void {
    console.log(`${this.name}이/가 비행한다.`);
  }
}

class Shark extends FlyingFish {
  public residence(): void {
    console.log(`${this.name}이/가 놀이터에 살고 있다.`);
  }
}

class Clownfish extends FlyingFish {
  public residence(): void {
    console.log(`${this.name}이/가 나무 위에 살고 있다.`);
  }
}