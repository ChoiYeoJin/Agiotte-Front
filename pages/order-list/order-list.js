import { getOrderCardHTML } from "./order-card";
import * as api from "../utils/api";

const boxEl = document.querySelector(".card-box");

//data load
const fetchData = async () => {
  const data = await api.sendGet("/orders");
  return data;
};
const data = await fetchData();

const frag = document.createDocumentFragment();

data.forEach((item) => {
  const prod = item.ProductInfos[0];

  const div = document.createElement("div");
  div.innerHTML += getOrderCardHTML(
    item.shortId,
    item.createdAt.substr(0, 10),
    prod.ProductImg,
    createProdName(prod.ProductName, item.ProductInfos.length),
    item.TotalPrice,
    item.Status
  );
  frag.appendChild(div);
});

boxEl.appendChild(frag);

const orderChangeBtnEls = document.querySelectorAll(".order-change-button");
const clickOrderChangeButtonEvent = (e) => {
  alert(e.target.getAttribute("id"));
  location.href = `../change-order/?order-id=${e.target.getAttribute("id")}`;
};

orderChangeBtnEls.forEach((el) => {
  el.addEventListener("click", clickOrderChangeButtonEvent);
});

function createProdName(name, len) {
  if (len > 1) {
    return name + ` 외 ${len - 1}종`;
  }
  return name;
}
