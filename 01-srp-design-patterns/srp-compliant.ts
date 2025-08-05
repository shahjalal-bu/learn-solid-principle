{
  interface Shape {
    area(): number;
  }

  class Circle implements Shape {
    constructor(public radius: number) {}

    area(): number {
      return Math.PI * this.radius * this.radius;
    }
  }

  class Square implements Shape {
    constructor(public length: number) {}

    area(): number {
      return this.length * this.length;
    }
  }

  class AreaCalculator {
    constructor(public shapes: Shape[]) {}

    sum(): number {
      return this.shapes.reduce((acc, shape) => acc + shape.area(), 0);
    }
  }

  class Outputter {
    constructor(public areaCalculator: AreaCalculator) {}

    toText(): string {
      return `Sum of the areas of provided shapes: ${this.areaCalculator.sum()}`;
    }

    toJson(): string {
      return JSON.stringify({
        totalArea: this.areaCalculator.sum(),
      });
    }
  }

  const shapes = [new Circle(2), new Square(3), new Circle(4)];
  const areaCalculator = new AreaCalculator(shapes);
  const outputter = new Outputter(areaCalculator);
  console.log(outputter.toText());
  console.log(outputter.toJson());
}
