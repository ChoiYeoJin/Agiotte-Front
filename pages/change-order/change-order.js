import { sendGet } from "../utils/api";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("1234");

async function getOrderDetails(Id) {
  try {
    const data = await sendGet(
      `http://kdt-sw-7-team02.elicecoding.com:3000/orders`,
      Id
    );

    const itemDiv = document.querySelector(".list-main");
    itemDiv.querySelector(".order-name").textContent = data.name;
    itemDiv.querySelector("img").src = data.image;
    itemDiv.querySelector(".order-price").textContent = data.price;
  } catch (error) {
    console.error(error);
  }
}

window.onload = () => getOrderDetails(id);
