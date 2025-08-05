
# 🧱 Single Responsibility Principle (SRP) Tutorial with TypeScript & Bun

This tutorial demonstrates the **Single Responsibility Principle (SRP)**, the first principle of SOLID design. You’ll learn:

* What SRP is
* How violating it affects your code
* How to refactor code to comply with SRP
* Why the refactor is better for maintainability and extensibility

We’ll use **TypeScript** for code clarity and run examples with **Bun** — a fast JavaScript runtime.

---

## 📖 What is SRP?

> **Single Responsibility Principle (SRP):**
> *A class should have only one reason to change.*

This means each class should have a **single responsibility** or job. If a class has multiple responsibilities, it becomes fragile and hard to maintain.

---

## 🔍 Example 1: SRP Violation

```typescript

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


```

### Shape Classes

```typescript
class Circle {
  constructor(public radius: number) {}
}

class Square {
  constructor(public length: number) {}
}
```

These are simple data holders but **do not know how to calculate their own areas**.

---

### Problematic AreaCalculator Class

```typescript
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
```

#### What’s wrong here?

* The class does **three things**:

  1. **Identifies shape types** with `instanceof`
  2. **Calculates areas** with shape-specific formulas
  3. **Formats output** in the `output()` method

This violates SRP because if you:

* Add a new shape, you must edit the `sum()` method.
* Change output formatting (e.g., JSON), you must edit the same class.

---

## ✨ Example 2: SRP-Compliant Refactor

```typescript

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

```

### Define a Shape Interface

```typescript
interface Shape {
  area(): number;
}
```

---

### Shape Classes Know Their Own Area

```typescript
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
```

---

### Simplified AreaCalculator

```typescript
class AreaCalculator {
  constructor(public shapes: Shape[]) {}

  sum(): number {
    return this.shapes.reduce((total, shape) => total + shape.area(), 0);
  }
}
```

### Dedicated Outputter Class

```typescript
class Outputter {
  constructor(private calculator: AreaCalculator) {}

  toText(): string {
    return `Sum of the areas of provided shapes: ${this.calculator.sum()}`;
  }

  toJSON(): string {
    return JSON.stringify({ totalArea: this.calculator.sum() });
  }
}
```

#### How did this solve the problem?

* By implementing the `Shape` interface, each shape class now knows how to calculate its own area, adhering to the Single Responsibility Principle.
* The `AreaCalculator` class no longer needs to identify shape types or calculate areas, as it simply calls the `area()` method on each shape.
* The `Outputter` class is responsible for formatting the output, allowing for easy changes to output formats without modifying the `AreaCalculator` class.

---

### How to run this example:

Create a file called `srp-compliant.ts` with all above classes plus usage:

```typescript
const shapes = [new Circle(2), new Square(3), new Circle(4)];
const calculator = new AreaCalculator(shapes);
const outputter = new Outputter(calculator);

console.log(outputter.toText());
console.log(outputter.toJSON());
```

---

## ⚙️ Running with Bun

1. Install Bun (if not already installed):

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Save your TypeScript files (`srp-violation.ts` and `srp-compliant.ts`).

3. Run either example:

```bash
bun run srp-violation.ts
bun run srp-compliant.ts
```

---