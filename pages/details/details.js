import * as api from "../utils/api";
import * as storage from "../utils/storage";
import { getTagHTML } from "../utils/tags";

const urlParams = new URLSearchParams(window.location.search);
const productId = Number(urlParams.get("id"));

const details = await fetchDetails(productId);

const imgEl = document.querySelector(".main-img");
const subImgEls = document.querySelectorAll(".sub-img");
const subjectEl = document.querySelector(".subject");
const tagEl = document.querySelector(".tag-box");
const priceEl = document.querySelector(".price");
const selectEl = document.querySelector("select");
const totalEl = document.querySelector(".total-price");
const detailInfoEl = document.querySelector(".detail-info");

const localePrice = Number(details.price).toLocaleString();

const imgs = details.productImg;
//img가 없는 경우??
imgEl.setAttribute("src", imgs[0]);
for (let i = 0; i < imgs.length; i++) {
  subImgEls[i].setAttribute("src", imgs[i]);
  subImgEls[i].addEventListener("click", (e) => {
    imgEl.setAttribute("src", e.target.getAttribute("src"));
  });
}

subjectEl.innerText = details.productName;
tagEl.innerHTML = getTagHTML(details.condition);
priceEl.innerText = localePrice + "원";
totalEl.innerText = localePrice;
detailInfoEl.innerText = details.detail;

selectEl.addEventListener("change", changeQuantityEvent);
/*
제품 수량 드롭박스에 동적으로 넣기
*/
if (details.amount > 1) {
  const frag = document.createDocumentFragment();

  for (let i = 2; i < details.amount + 1; i++) {
    const option = document.createElement("option");
    option.innerText = i;
    frag.appendChild(option);
  }
  selectEl.appendChild(frag);
}

/*
장바구니 버튼 기능
amount, productId, productName, price
*/
const cartButtonEl = document.querySelector(".cart-button");
cartButtonEl.addEventListener("click", clickCartButtonEvent);

/*
바로구매 버튼 기능
*/
const buyButtonEl = document.querySelector(".buy-button");
buyButtonEl.addEventListener("click", clickBuyButtonEvent);

async function fetchDetails(id) {
  //데이터를 가져온셈 치자
  //const details = await api.sendGet(`/products/${id}`)
  const details = {
    productName: "귀여운 원숭이 인형 팝니다",
    productImg: ["/imgs/test2.jpg", "/imgs/carrot.png"],
    detail: `-상품 사이즈- 길이30cm 상태 깨끗합니다. 귀여운 원숭이 인형을 판매합니다. 이 원숭이 인형은 부드럽고 털실로 만들어져 있어 안심하고 안아주기 좋습니다. 사랑스러운 디자인과 다양한 색상으로 아이들과 함께 놀기에 완벽합니다.`,
    condition: "새상품",
    price: 40000,
    amount: 5,
  };

  return Promise.resolve(details);
}

function changeQuantityEvent(e) {
  const qnt = e.target.value;
  totalEl.innerText = (Number(details.price) * qnt).toLocaleString();
}

//storage.clear();
function clickCartButtonEvent(e) {
  storage.updateCart(productId, {
    productName: details.productName,
    productId: productId,
    productImg: details.productImg,
    price: details.price,
    amount: Number(selectEl.value),
  });

  console.log(storage.getItem("cart"));
  //alert("장바구니로 이동하시겠습니까?");
}

function clickBuyButtonEvent(e) {
  storage.setItem("buyNow", {
    productName: details.productName,
    productId: productId,
    productImg: details.productImg,
    price: details.price,
    amount: Number(selectEl.value),
  });
  location.href = "../order/?buyNow=true";
}

function clickSubImages() {
  // 모든 서브 이미지 요소 선택
  const subImages = document.querySelectorAll(".subImage");

  // 각 서브 이미지에 클릭 이벤트 리스너 추가
  subImages.forEach((img) => {
    img.addEventListener("click", function () {
      // 메인 이미지의 src 속성을 클릭된 이미지의 src로 변경
      document.getElementById("main-image").src = this.src;
    });
  });
}
