import * as storage from "../utils/storage";
import * as api from "../utils/api";

//user정보는 보안상 이때 가져와야겠지? 임시데이터 구매자정보
const user = await api.sendGet("/users");

console.log(user);
const urlParams = new URLSearchParams(window.location.search);
const buyNow = urlParams.get("buyNow");

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

let lastImg = "";

async function clickPayButtonEvent(e) {
  const cart = storage.getItem("cart");
  console.log(cart);
  if (buyNow !== "true") {
    const productInfos = cart.map((item) => {
      return {
        Price: item.price,
        Amount: item.amount,
        ProductName: item.productName,
        ProductImg: item.productImg,
        Detail: "디테일",
        Condition: "좋은상태",
      };
    });

    const response = await api.sendPost("/orders", {
      Name: user.UserName,
      Address: user.Address,
      Phone: user.Phone === undefined ? "전화번호 없음" : user.Phone,
      Email: user.Email,
      ProductInfos: productInfos,
    });

    lastImg = item.productImg;
  } else {
    const prod = storage.getItem("buyNow");

    const response = await api.sendPost("/orders", {
      Name: user.UserName,
      Address: user.Address,
      Phone: user.Phone === undefined ? "전화번호 없음" : user.Phone,
      Email: user.Email,
      ProductInfos: [
        {
          Price: prod.price,
          Amount: prod.amount,
          ProductName: prod.name,
          ProductImg: prod.img,
          Detail: "디테일",
          Condition: "좋은상태",
        },
      ],
    });

    lastImg = prod.img;
  }

  if (response !== undefined) {
    alert("결제 성공!");
    window.location.href = "order-success.html?last-img=" + lastImg;
  } else {
    alert("결제 실패!");
  }
}
