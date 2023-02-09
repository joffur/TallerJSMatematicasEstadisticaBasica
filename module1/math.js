console.group('Cuadrado');

const ladoCuadrado = 5;
const perimetroCuadrado = ladoCuadrado * 4;
const areaCuadrado = ladoCuadrado * ladoCuadrado;

function cuadrado(lado) {
  return {
    perimetro: lado * 4,
    area: lado * lado,
  }
}

console.log({
  ladoCuadrado,
  perimetroCuadrado,
  areaCuadrado,
});

console.groupEnd('Cuadrado');
console.group('Triángulo');

const ladoTriangulo1 = 6;
const ladoTriangulo2 = 6;
const ladoTrianguloBase = 4;
const alturaTriangulo = 5.5;

const perimetroTriangulo = ladoTriangulo1 + ladoTriangulo2 + ladoTrianguloBase;
const areaTriangulo = (ladoTrianguloBase * alturaTriangulo) / 2;

function triangulo(lado1, lado2, base, altura) {
  return {
    perimetro: lado1 + lado2 + base,
    area: (base * altura) / 2,
  }
}

function calcularAlturaTirangulo(lado1, base) {
  if (lado1 == base) {
    console.warn('Este no es un triángulo isosceles')
  }
  else {
    return Math.sqrt(Math.pow(lado1, 2) - ((Math.pow(base, 2)) / 4));
  }
}

console.log({
  ladoTriangulo1,
  ladoTriangulo2,
  ladoTrianguloBase,
  alturaTriangulo,
  perimetroTriangulo,
  areaTriangulo,
});

console.groupEnd('Triángulo');
console.group('Circulo');

const radioCirculo = 3;
const diametroCirculo = radioCirculo * 2;
const PI = 3.1415;

const circunferencia = diametroCirculo * PI;
const areaCirculo = (radioCirculo ** 2) * PI;

console.log({
  radioCirculo,
  diametroCirculo,
  PI,
  circunferencia,
  areaCirculo,
});

function calcularCirculo(radio) {
  const diametro = radio * 2;
  const radioAlCuadrado = Math.pow(radio, 2);
  
  return {
    circunferencia: diametro * Math.PI,
    area: radioAlCuadrado * Math.PI,
  }
}

console.groupEnd('Circulo');