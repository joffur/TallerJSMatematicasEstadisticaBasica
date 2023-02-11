// Charge of page
const cuponsAvailable = document.querySelector('.coupon-discount__available');

// Discount variables
const inputPrice = document.querySelector('#price');
const inputDiscount = document.querySelector('#discount');
const resultContainer = document.querySelector('#result-container');
const pResult = document.querySelector('#result');


// Coupon variables
const inputPrice2 = document.querySelector('#price-2');
const inputCoupon = document.querySelector('#coupon');
const couponResultContainer = document.querySelector('#coupon-result-container');
const btn = document.querySelector('#calculateCoupon');
const pCouponresult = document.querySelector('#coupon-result');

// Dinamic display of coupons
const coupons = {
  'WinterSale': 30,
  'Spooky': 20,
  'PlatziDays': 50,
  'GreedIsGood': 90,
  'Enjoy': 10,
};

function displayCouponsAvailable(obj) {
  const unsignedList = document.createElement('ul');
  for (const coupon in obj) {
    const span = document.createElement('span');
    const listItem = document.createElement('li');
    span.innerText = `${coupon}: ${obj[coupon]} %` 
    listItem.append(span);
    unsignedList.append(listItem);
  }
  cuponsAvailable.append(unsignedList);
}

displayCouponsAvailable(coupons);


// Classes used in project
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

class Coupon {
  constructor(price, coupon, coupons) {
    this.price = price;
    this.coupon = coupon;
    this.coupons = coupons;
  }
  getCoupon() {
    return this.coupon;
  }
  isValidPrice() {
    if (this.price <= 0) {
      return false;
    }
    else {
      return true;
    }
  }
  isValidCoupon() {
    let coupons = Object.keys(this.coupons);
    let isValid = false;
    for (let i = 0; i < coupons.length; i++) {
      if (coupons[i] === this.getCoupon()) {
        isValid = true;
        break;
      }
    };
    return isValid;
  }
}

// Product discount section
inputPrice.addEventListener('input', calculatePriceWithDiscount);
inputDiscount.addEventListener('input', calculatePriceWithDiscount);

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

// Discount with coupon section

inputPrice2.addEventListener('input', displayPrice);
btn.addEventListener('click', calculatePriceWithCoupon);

function displayPrice() {
  const price = Number(inputPrice2.value);
  pCouponresult.innerText = price;
}

function calculatePriceWithCoupon() {
  const price = Number(inputPrice2.value);


}