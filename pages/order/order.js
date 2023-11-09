import * as storage from "../utils/storage";
import * as api from "../utils/api";

const DELIVERY = 3000;

//user정보는 보안상 이때 가져와야겠지? 임시데이터 구매자정보
const user = await api.sendGet("/users");

console.log(user);

const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");
const userPhoneEl = document.querySelector(".user-phone");
const userAddrEl = document.querySelector(".user-addr");

userNameEl.innerText = user.UserName;
userEmailEl.innerText = user.Email;
userPhoneEl.innerText = user.Phone === undefined ? "" : user.Phone;
userAddrEl.innerText = user.Address;

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
      payName = `${cart[0].name} 외 ${cart.length - 1}종`;
    } else {
      payName = cart[0].name;
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
      name: prod.name,
      totalPrice: (prod.price * prod.amount).toLocaleString(),
    };
  }
}

async function clickPayButtonEvent(e) {
  const cart = storage.getItem("cart");
  const productInfos = cart.map((item) => {
    return {
      Price: item.price,
      Amount: item.amount,
      ProductName: item.name,
      ProductImg: item.img,
      Detail: item.detail,
      Condition: item.Condition,
    };
  });
  console.log(productInfos);
  const response = await api.sendPost("/orders", {
    Name: user.Name,
    Address: user.Address,
    Phone: user.Phone,
    Email: user.Email,
    ProductInfos: productInfos,
  });

  if (response !== undefined) {
    alert("결제 성공!");
    window.location.href = "order-success.html";
  } else {
    alert("결제 실패!");
  }
}
