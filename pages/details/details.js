import * as api from "../utils/api";
//받아올 데이터 img, subject, tag(state), price, quantity,

//장바구니에 저장해야하니까 전역? 상품ID, quantity
//바로구매시

import { getTagHTML } from "../utils/tags";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const details = await fetchDetails(productId);

const imgEl = document.querySelector(".main-img");
const subjectEl = document.querySelector(".subject");
const tagEl = document.querySelector(".tag-box");
const priceEl = document.querySelector(".price");
const selectEl = document.querySelector("select");
const totalEl = document.querySelector(".total-price");
const localePrice = Number(details.price).toLocaleString();

imgEl.setAttribute("src", details.img);

subjectEl.innerText = details.subject;

tagEl.innerHTML = getTagHTML(details.tag);

priceEl.innerText = localePrice + "원";

totalEl.innerText = localePrice;

if (details.quantity > 1) {
  const frag = document.createDocumentFragment();

  for (let i = 2; i < details.quantity + 1; i++) {
    const option = document.createElement("option");
    option.innerText = i;
    frag.appendChild(option);
  }
  selectEl.appendChild(frag);
}

selectEl.addEventListener("change", changeQuantityEvent);

async function fetchDetails(id) {
  //데이터를 가져온셈 치자
  //const details = await api.sendGet(`/products/${id}`)
  const details = {
    subject: "귀여운 원숭이 인형 팝니다",
    img: "/imgs/test2.jpg",
    tag: "good",
    price: 40000,
    quantity: 5,
  };

  return Promise.resolve(details);
}

function changeQuantityEvent(e) {
  const qnt = e.target.value;
  totalEl.innerText = (Number(details.price) * qnt).toLocaleString();
}
