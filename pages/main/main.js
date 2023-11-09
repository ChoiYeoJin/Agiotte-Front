//서버에서 card 불러오기

import { getCardHTML } from "../utils/card";
import * as api from "../utils/api";

//일단 없으니까 그냥 가져온셈 침
const cards = [
  { id: "1", price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { id: "1", price: 30000, name: "원숭이 인형", img: "test2.jpg", tag: "new" },
  { id: "1", price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { id: "1", price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "new" },
  { id: "1", price: 30000, name: "여아 신발", img: "test1.jpg", tag: "new" },
  { id: "1", price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { id: "1", price: 30000, name: "여아 신발", img: "test1.jpg", tag: "normal" },
  {
    id: "1",
    price: 40000,
    name: "원숭이 인형",
    img: "test2.jpg",
    tag: "normal",
  },
  { id: "1", price: 30000, name: "여아 신발", img: "test1.jpg", tag: "normal" },
  {
    id: "1",
    price: 40000,
    name: "원숭이 인형",
    img: "test2.jpg",
    tag: "normal",
  },
  { id: "1", price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { id: "1", price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { id: "1", price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { id: "1", price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { id: "1", price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { id: "1", price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { id: "1", price: 30000, name: "여아 신발", img: "test1.jpg", tag: "normal" },
  {
    id: "1",
    price: 40000,
    name: "원숭이 인형",
    img: "test2.jpg",
    tag: "normal",
  },
];

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
  console.log(data);

  data.products.forEach((item) => {
    cardFrame.innerHTML += getCardHTML(
      item.id,
      item.name,
      item.price,
      api.IMG_URL + item.img[0],
      item.tag
    );
  });

  cardBox.appendChild(cardFrame);
}

function clickCardEvent(e) {
  //class 속성에 상품id 넣어둬야
  console.log(e.target);
  const id = 1;
  //상세페이지로
}
