{
  class Circle {
    constructor(public radius: number) {}
  }

  class Square {
    constructor(public length: number) {}
  }

  class AreaCalculator {
    constructor(public shapes: (Circle | Square)[]) {}

    sum(): number {
      let sum = 0;
      for (const shape of this.shapes) {
        if (shape instanceof Circle) {
          sum += Math.PI * shape.radius * shape.radius;
        }
        if (shape instanceof Square) {
          sum += shape.length * shape.length;
        }
      }
      return sum;
    }

    output(): string {
      return `Sum of the areas of provided shapes: ${this.sum()}`;
    }
  }

  const shapes = [new Circle(2), new Square(3), new Circle(4)];
  const areaCalculator = new AreaCalculator(shapes);
  console.log(areaCalculator.output());
}
