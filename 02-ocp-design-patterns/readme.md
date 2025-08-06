# 💳 Open-Closed Principle (OCP) —

**Open-Closed Principle (OCP)** — the second principle of **SOLID** — using a simple **AreaCalculator ** written in **TypeScript**.

## 📖 What is the Open-Closed Principle?

**Definition:**

Software entities (such as classes, modules, functions, etc.) should be **open for extension** but **closed for modification**.

**This implies:**

- You should be able to add new functionality by adding new code.
- This should be done without modifying existing, tested, and stable code.
---

Absolutely! Let’s break down the **AreaCalculator and Shape example**) in terms of the **Open-Closed Principle (OCP)** — what violates it, how to fix it, and why the fix is better.

---

### ❌ **Original (Violated OCP - `AreaCalculator` does everything)**

```ts
class Square {
  constructor(public width: number) {}
}

class Circle {
  constructor(public radius: number) {}
}

class AreaCalculator {
  constructor(private shapes: any[]) {}

  public sum() {
    return this.shapes.reduce((total, shape) => {
      if (shape instanceof Square) {
        return total + shape.width * shape.width;
      } else if (shape instanceof Circle) {
        return total + Math.PI * shape.radius * shape.radius;
      }
      return total;
    }, 0);
  }
}
```

### 🔍 What's wrong here?

This **violates the Open-Closed Principle**, which says:

> “Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.”

That means you **should be able to add new shapes** (like `Triangle`) **without modifying the existing `AreaCalculator` class**. But in this code, you have to **edit the `sum()` method** every time you add a new shape — this is **not scalable** and **risky**.

---

### ✅ **Refactored Version (Follows OCP)**

```ts
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

class AreaCalculator {
  constructor(private shapes: Shape[]) {}

  public sum(): number {
    return this.shapes.reduce((total, shape) => total + shape.area(), 0);
  }
}
```

### 🔍 Why is this better?

* You can **add new shapes** (like `Triangle`, `Rectangle`) **without touching `AreaCalculator`**.
* Each class is **responsible for its own logic** — `Square` knows how to calculate its area.
* The code is **cleaner, more modular, and easier to test**.

---

### ✅ Add a New Shape Without Modifying Anything Else:

```ts
class Triangle implements Shape {
  constructor(public base: number, public height: number) {}

  area(): number {
    return 0.5 * this.base * this.height;
  }
}
```

Now you can use it like this:

```ts
const shapes: Shape[] = [
  new Square(4),
  new Circle(3),
  new Triangle(10, 5),
];

const calculator = new AreaCalculator(shapes);
console.log(calculator.sum()); // total area without modifying AreaCalculator
```

---

### ✨ Summary

* ❌ **Before:** `AreaCalculator` had to know every shape and its logic.
* ✅ **After:** Shapes handle their own logic; `AreaCalculator` just sums areas.
* 📌 This makes your code **open for extension** (add shapes) but **closed for modification** (don’t touch `AreaCalculator`).

