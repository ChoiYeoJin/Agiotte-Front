import * as storage from "../utils/storage";
import * as api from "../utils/api";

const DELIVERY = 3000;

//user정보는 보안상 이때 가져와야겠지? 임시데이터 구매자정보
const user = {
  name: "김진수",
  email: "rlawlstn12@gmail.com",
  phone: "000-0000-0000",
  addr: "서울시 송파구",
};

const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");
const userPhoneEl = document.querySelector(".user-phone");
const userAddrEl = document.querySelector(".user-addr");

userNameEl.innerText = user.name;
userEmailEl.innerText = user.email;
userPhoneEl.innerText = user.phone;
userAddrEl.innerText = user.addr;

//결제 정보
const cartProductsEl = document.querySelector(".cart-products");
const cartTotalPriceEl = document.querySelector(".cart-total-price");
const deliveryFeeEl = document.querySelector(".delivery-fee");

const payInfo = getPayInfo();
cartProductsEl.innerText = payInfo.name;
cartTotalPriceEl.innerText = payInfo.totalPrice + "원";

//결제 확인 버튼
const payButtonEl = document.querySelector(".payment-button");
payButtonEl.addEventListener("click", clickPayButtonEvent);

function getPayInfo() {
  // web storage에 저장된 장바구니 정보
  const urlParams = new URLSearchParams(window.location.search);
  const buyNow = urlParams.get("buyNow");
  console.log(buyNow);
  if (buyNow !== "true") {
    const cart = storage.getItem("cart");
    let payName = "";

    if (cart.length > 1) {
      payName = `${cart[0].productName} 외 ${cart.length - 1}종`;
    } else {
      payName = cart[0].productName;
    }

    const totalPrice =
      cart.reduce((acc, el) => (acc += el.price * el.amount), 0) + DELIVERY;
    return {
      name: payName,
      totalPrice: totalPrice.toLocaleString(),
    };
  } else {
    const prod = storage.getItem("buyNow");
    console.log(prod);
    return {
      name: prod.productName,
      totalPrice: (prod.price * prod.amount).toLocaleString(),
    };
  }
}

async function clickPayButtonEvent(e) {
  //const result = await api.sendPost("/orders/", payInfo);
  window.location.href = "./order-success.html";
}
