const btn = document.querySelector('#calculate');
const inputPrice = document.querySelector('#price');
const inputDiscount = document.querySelector('#discount');
const resultContainer = document.querySelector('#result-container');
const pResult = document.querySelector('#result');

const coupons = {
  'WinterSale': 30,
  'Spooky': 20,
  'PlatziDays': 50,
  'GreedIsGood': 90,
  'Enjoy': 10,
};

class Discount {
  constructor(price, discount = 0) {
    this.price = price;
    this.discount = discount;
  }
  isValidPrice() {
    if (this.price <= 0) {
      return false;
    }
    else {
      return true;
    }
  }
  isValidDiscount() {
    if (this.discount < 0 || this.discount >= 100) {
      return true;
    }
    else {
      return false;
    }
  }
  newPrice() {
    const newPrice = this.price * (1 - (this.discount / 100));
    return parseFloat(Number.parseFloat(newPrice).toFixed(2));
  }
}

// Product discount section
inputPrice.addEventListener('input', calculatePriceWithDiscount);
inputDiscount.addEventListener('input', calculatePriceWithDiscount);

// btn.addEventListener('click', calculatePriceWithDiscount);

function calculatePriceWithDiscount() {
  const price = Number(inputPrice.value);
  const discount = Number(inputDiscount.value);
  const calculateDiscount = new Discount(price, discount);
  
  if (calculateDiscount.isValidDiscount()) {
    resultContainer.classList.add('animated');
    pResult.innerText = 'El valor del descuento no es valido. No puede ser menor a 0 o mayor a 99';
    return -1;
  }

  if (!calculateDiscount.isValidPrice() || calculateDiscount.isValidDiscount()) {
    resultContainer.classList.add('animated');
    pResult.innerText = 'CHANCLA! por favor diligencia el formulario con datos válidos';
    return -1;
  }

  resultContainer.classList.add('animated');
  pResult.innerText = 'El nuevo precio con descuento es $' + calculateDiscount.newPrice();
}