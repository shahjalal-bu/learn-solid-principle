class Square {
    constructor(public width: number) {}
}

class Circle {
    constructor(public radius: number) {}
}

class AreaCalculator {
    constructor(public shapes: any[]){}

    public sum(){
        return this.shapes.reduce((acc, shape) => {
            if(shape instanceof Square){
                return acc + shape.width * shape.width;
            }
            if(shape instanceof Circle){
                return acc + Math.PI * shape.radius * shape.radius;
            }
        }, 0);
    }
}

const shapes = [new Square(10), new Circle(5)];
const areaCalculator = new AreaCalculator(shapes);
console.log(areaCalculator.sum());

