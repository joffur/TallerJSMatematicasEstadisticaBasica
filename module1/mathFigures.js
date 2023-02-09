// HTML elements used to select type of calculation
const selectorFigure = document.querySelectorAll('input[name="geometricFigure"]');

// HTML elements used to calculate and display values of rectangle
const sectionRectangle = document.querySelector('.rectangle-section');
const baseRectangle = document.querySelector('#baseRectangle');
const heightRectangle = document.querySelector('#heightRectangle');
const displayBaseRectangle = document.querySelector('#displayBaseRectangle');
const displayHeightRectangle = document.querySelector('#displayHeightRectangle');
const perimeterRectangle = document.querySelector('#perimeterRectangle');
const areaRectangle = document.querySelector('#areaRectangle');

// HTML elements used to calculate and display values of circle
const sectionCircle = document.querySelector('.circle-section');
const radiusCircle = document.querySelector('#radiusCircle');
const displayRadiusCircle = document.querySelector('#displayRadiusCircle');
const displayDiameterCircle = document.querySelector('#displayDiameterCircle');
const perimeterCircle = document.querySelector('#perimeterCircle');
const areaCircle = document.querySelector('#areaCircle');

// HTML elements used to calculate and display values of triangles
const sectionTriangle = document.querySelector('.triangle-section');
const sideATriangle = document.querySelector('#aTriangle');
const sideBTriangle = document.querySelector('#bTriangle');
const sideCTriangle = document.querySelector('#cTriangle');
const triangleWarning = document.querySelector('#triangleWarning');
const displayATriangle = document.querySelector('#displayATriangle');
const displayBTriangle = document.querySelector('#displayBTriangle');
const displayCTriangle = document.querySelector('#displayCTriangle');
const heightTriangle = document.querySelector('#heightTriangle');
const perimeterTriangle = document.querySelector('#perimeterTriangle');
const areaTriangle = document.querySelector('#areaTriangle');

// Classes for elements
class Rectangle {
  constructor (base, height) {
    this.base = base;
    this.height = height;
  }
  getPerimeter() {
    const perimeter = (this.base * 2) + (this.height * 2);
    return perimeter;
  }
  getArea() {
    const area =  this.base * this.height;
    return area;
  }
};

class Circle {
  constructor (radius) {
    this.radius = radius;
  }
  getDiameter() {
    const diameter = this.radius * 2;
    return diameter;
  }
  getPerimeter() {
    const perimeter = 2 * Math.PI * this.radius;
    return parseFloat(Number.parseFloat(perimeter).toFixed(2));
  }
  getArea() {
    const area = Math.PI * (this.radius ** 2);
    return parseFloat(Number.parseFloat(area).toFixed(2));
  }
}

class Triangle {
  constructor (sideA, sideB, sideC) {
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;
  }
  checkTriangle() {
    if (
      (this.sideA < (this.sideB + this.sideC)) &&
      (this.sideB < (this.sideA + this.sideC)) &&
      (this.sideC < (this.sideA + this.sideB))){
      return true;
    }
    else {
      return false;
    }
  }
  getPerimeter() {
    const perimeter = this.sideA + this.sideB + this.sideC;
    return perimeter;
  }
  getArea() {
    const s = this.getPerimeter() / 2;
    const area = Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    return parseFloat(Number.parseFloat(area).toFixed(2));
  }
  getHeight() {
    const height = (2 * this.getArea())  / this.sideB;
    return parseFloat(Number.parseFloat(height).toFixed(2));
  }
}

// Selector figure picker
for (const element of selectorFigure) {
  element.addEventListener('input', selectFigure);
}

function selectFigure(event) {
  if (event.target.value === 'rectangle') {
    sectionRectangle.classList.remove('inactive');
    sectionCircle.classList.add('inactive');
    sectionTriangle.classList.add('inactive');
  }
  else if (event.target.value === 'circle') {
    sectionRectangle.classList.add('inactive');
    sectionCircle.classList.remove('inactive');
    sectionTriangle.classList.add('inactive');
  }
  else {
    sectionRectangle.classList.add('inactive');
    sectionCircle.classList.add('inactive');
    sectionTriangle.classList.remove('inactive');
  }
}

//Rectangle segment
baseRectangle.addEventListener('input', calculateRectangle);
heightRectangle.addEventListener('input', calculateRectangle);

function calculateRectangle() {
  if (heightRectangle.value === "" || baseRectangle.value === "") {
    if (baseRectangle.value !== "") {
      const base = parseFloat(baseRectangle.value);
      displayBaseRectangle.innerText = base;
    }
    else {
      const height = parseFloat(heightRectangle.value);
      displayHeightRectangle.innerText = height;
    }
    return -1;
  }
  else {
    const base = parseFloat(baseRectangle.value);
    const height = parseFloat(heightRectangle.value);
    const rectangle = new Rectangle(base, height);
    displayBaseRectangle.innerText = base;
    displayHeightRectangle.innerText = height;
    perimeterRectangle.innerText = rectangle.getPerimeter();
    areaRectangle.innerText = rectangle.getArea();
  }
};

// Circle segment
radiusCircle.addEventListener('input', calculateCircle);

function calculateCircle() {
  if (radiusCircle.value === "") {
    return -1;
  }
  else {
    const radius = parseFloat(radiusCircle.value);
    console.log(radius);
    const circleOut = new Circle(radius);
    displayRadiusCircle.innerText = radius;
    displayDiameterCircle.innerText = circleOut.getDiameter();
    perimeterCircle.innerText = circleOut.getPerimeter();
    areaCircle.innerText = circleOut.getArea();
  }
}

// Triangle segment
sideATriangle.addEventListener('input', calculateTriangle);
sideBTriangle.addEventListener('input', calculateTriangle);
sideCTriangle.addEventListener('input', calculateTriangle);

function calculateTriangle() {
  if ((sideATriangle.value === "" || sideBTriangle.value === "" || sideCTriangle.value === "")) {
    if (sideATriangle.value !== "") {
      const sideA = parseFloat(sideATriangle.value);
      displayATriangle.innerText = sideA;
    }
    if (sideBTriangle.value !== "") {
      const sideB = parseFloat(sideBTriangle.value);
      displayBTriangle.innerText = sideB;
    }
    if (sideCTriangle.value !== "") {
      const sideC = parseFloat(sideCTriangle.value);
      displayCTriangle.innerText = sideC;
    }
    return -1;
  } else {
    const sideA = parseFloat(sideATriangle.value);
    const sideB = parseFloat(sideBTriangle.value);
    const sideC = parseFloat(sideCTriangle.value);
    const triangle = new Triangle(sideA, sideB, sideC);
    const isValidTriangle = triangle.checkTriangle();
    if (isValidTriangle) {
      triangleWarning.classList.add('inactive');
      displayATriangle.innerText = sideA;
      displayBTriangle.innerText = sideB;
      displayCTriangle.innerText = sideC;
      heightTriangle.innerText = triangle.getHeight();
      perimeterTriangle.innerText = triangle.getPerimeter();
      areaTriangle.innerText = triangle.getArea();
    } else {
      triangleWarning.classList.remove('inactive');
    }
  }
}