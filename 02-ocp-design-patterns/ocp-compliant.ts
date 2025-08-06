{
  interface Shape {
    area(): number;
  }

  class Square implements Shape {
    constructor(public width: number) {}

    area(): number {
      return this.width * this.width;
    }
  }

  class Circle implements Shape {
    constructor(public radius: number) {}

    area(): number {
      return Math.PI * this.radius * this.radius;
    }
  }

  class Triangle implements Shape {
    constructor(public base: number, public height: number) {}

    area(): number {
      return 0.5 * this.base * this.height;
    }
  }

  class AreaCalculator {
    constructor(public shapes: Shape[]) {}

    sum(): number {
      return this.shapes.reduce((acc, shape) => acc + shape.area(), 0);
    }
  }

  const shapes: Shape[] = [new Square(10), new Circle(5), new Triangle(10, 5)];
  const areaCalculator = new AreaCalculator(shapes);
  console.log(areaCalculator.sum());
}
