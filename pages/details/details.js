//받아올 데이터 img, subject, tag(state), price, quantity,

//장바구니에 저장해야하니까 전역? 상품ID, quantity
//바로구매시

import { getTagHTML } from "../utils/tags";

const id = 11;

const details = await fetchDetails(id);

const img = document.querySelector(".main-img");
const subject = document.querySelector(".subject");
const tag = document.querySelector(".tag-box");
const price = document.querySelector(".price");
const select = document.querySelector("select");
const total = document.querySelector(".total-price");
const localePrice = Number(details.price).toLocaleString();

img.setAttribute("src", details.img);

subject.textContent = details.subject;

tag.innerHTML = getTagHTML(details.tag);

price.innerText = localePrice + "원";

total.innerText = localePrice;

if (details.quantity > 1) {
  for (let i = 2; i < details.quantity + 1; i++) {
    const option = document.createElement("option");
    option.innerText = i;
    select.appendChild(option);
  }
}

select.addEventListener("change", changeQuantityEvent);

async function fetchDetails(id) {
  //데이터를 가져온셈 치자
  //const res = await fetch(`/${id}/`);
  //const data = res.json();
  const details = {
    subject: "귀여운 원숭이 인형 팝니다",
    img: "/imgs/test2.jpg",
    tag: "good",
    price: 40000,
    quantity: 5,
  };

  return details;
}

function changeQuantityEvent(e) {
  const qnt = e.target.value;
  total.innerText = (Number(details.price) * qnt).toLocaleString();
}
