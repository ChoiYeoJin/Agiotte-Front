import { sendGet } from "../utils/api";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("1234");

async function getOrderDetails(Id) {
  try {
    const data = await sendGet(`/orders`);

    console.log(data);

    const itemDiv = document.querySelector(".list-main");
    document.querySelector(".order-name").textContent = createProdName(
      data.ProductInfos[0].ProductName,
      data.ProductInfos.length
    );
    document.querySelector("img").src = data.productImg;
    document.querySelector(".order-price").textContent = data.TotalPrice;
  } catch (error) {
    console.error(error);
  }
}

function createProdName(name, len) {
  if (len > 1) {
    return name + ` 외 ${len - 1}종`;
  }
  return name;
}

window.onload = () => getOrderDetails(id);
