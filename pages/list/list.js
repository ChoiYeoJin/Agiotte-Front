//TODO: 무한스크롤 동작은 하지만 Type에러가 뜨는데 해당부분 확인해보기
//서버에서 card 불러오기

import { getCardHTML } from "../utils/card";

//일단 없으니까 그냥 가져온셈 침
const cards = [
  { id: 11, price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { id: 10, price: 30000, name: "원숭이 인형", img: "test2.jpg", tag: "new" },
  { id: 11, price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { id: 10, price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "new" },
  { id: 11, price: 30000, name: "여아 신발", img: "test1.jpg", tag: "new" },
  { id: 10, price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { id: 11, price: 30000, name: "여아 신발", img: "test1.jpg", tag: "normal" },
  {
    id: 10,
    price: 40000,
    name: "원숭이 인형",
    img: "test2.jpg",
    tag: "normal",
  },
  { id: 11, price: 30000, name: "여아 신발", img: "test1.jpg", tag: "normal" },
  {
    id: 10,
    price: 40000,
    name: "원숭이 인형",
    img: "test2.jpg",
    tag: "normal",
  },
  { id: 11, price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { id: 10, price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { id: 11, price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { id: 10, price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { id: 11, price: 30000, name: "여아 신발", img: "test1.jpg", tag: "good" },
  { id: 10, price: 40000, name: "원숭이 인형", img: "test2.jpg", tag: "good" },
  { id: 11, price: 30000, name: "여아 신발", img: "test1.jpg", tag: "normal" },
  {
    id: 10,
    price: 40000,
    name: "원숭이 인형",
    img: "test2.jpg",
    tag: "normal",
  },
];

loadCards(cards);

//intersection이 발생하는지 관찰할 대상
const target = document.querySelector("#observer-target");

const onIntersect = async ([entry], observer) => {
  if (entry.isIntersecting) {
    await fetchData();
    observer.unobserve(entry.target);
    observer.observe(entry.target);
  }
};

const options = {
  rootMargine: "100px",
  threshold: 0.5,
};

const observer = new IntersectionObserver(onIntersect, options);
observer.observe(target);

const page = 1;

//백에서 상품 리스트 페이지로 가져오는 함수
const fetchData = async () => {
  //const response = await fetch(`/${page}`);
  //const data = await response.json();

  //set item from data.result 배열 업데이트
  //if (data.length > 0) {
  // 새로운 데이터가 있는 경우만 처리
  loadCards(cards);
  page++;
  //observer.observe(target);
  //}
};

function loadCards(cards) {
  const cardBox = document.querySelector(".card-box");

  const cardFrame = document.createElement("div");
  cardFrame.classList.add("flex");
  cardFrame.classList.add("flex-wrap");
  cardFrame.classList.add("space-x-5");
  cardFrame.classList.add("justify-center");

  cards.forEach((item) => {
    cardFrame.innerHTML += getCardHTML(
      item.id,
      item.name,
      item.price,
      item.img,
      item.tag
    );
  });

  cardBox.appendChild(cardFrame);
}
