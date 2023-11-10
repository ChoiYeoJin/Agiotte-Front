//서버에서 card 불러오기

import { getCardHTML } from "../utils/card.js";
import * as api from "../utils/api.js";

const data = await api.sendGetWithQuery("/categories/products", {
  en_name: "goods",
  page: 1,
});

await initMain();
const cardElements = document.querySelectorAll(".card");

async function initMain() {
  const cardBox = document.querySelector(".card-box");

  const cardFrame = document.createElement("div");
  cardFrame.classList.add("grid");
  cardFrame.classList.add("lg:grid-cols-6");
  cardFrame.classList.add("md:grid-cols-3");
  cardFrame.classList.add("gap-5");
  cardFrame.classList.add("justify-center");

  const data = await api.sendGetWithQuery("/categories/products", {
    en_name: "goods",
    page: 1,
  });

  data.products.forEach((item) => {
    cardFrame.innerHTML += getCardHTML(
      item.seq,
      item.name,
      item.price,
      api.IMG_URL + item.img[0],
      item.condition
    );
  });

  cardBox.appendChild(cardFrame);
}

function clickCardEvent(e) {
  //class 속성에 상품id 넣어둬야

  const id = 1;
  //상세페이지로
}
