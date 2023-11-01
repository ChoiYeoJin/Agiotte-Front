//서버에서 card 불러오기

import { getCardHTML } from "../utils/card";

//일단 없으니까 그냥 가져온셈 침
const cards = [
  { price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { price: 30000, name: "원숭이 인형", img: "test2.jpg", tag: "new" },
  { price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "new" },
  { price: 30000, name: "여아 신발", img: "test1.jpg", tag: "new" },
  { price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { price: 30000, name: "여아 신발", img: "test1.jpg", tag: "normal" },
  { price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "normal" },
  { price: 30000, name: "여아 신발", img: "test1.jpg", tag: "normal" },
  { price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "normal" },
  { price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { price: 30000, name: "여아 신발", img: "test1.jpg", tag: "normal" },
  { price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "normal" },
];

initMain();

function initMain() {
  const cardBox = document.querySelector(".card-box");

  const cardFrame = document.createElement("div");
  cardFrame.classList.add("flex");
  cardFrame.classList.add("flex-wrap");
  cardFrame.classList.add("space-x-5");
  cardFrame.classList.add("justify-center");

  cards.forEach((item) => {
    cardFrame.innerHTML += getCardHTML(
      item.name,
      item.price,
      item.img,
      item.tag
    );
  });

  cardBox.appendChild(cardFrame);
}
