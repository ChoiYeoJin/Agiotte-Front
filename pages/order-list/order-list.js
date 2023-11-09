import { getOrderCardHTML } from "./order-card";
import * as api from "../utils/api";

let testdata = `[
    {
        "_id": "6549a5524982a14936615c7b",
        "UserId": "test",
        "Name": "test",
        "Address": "우리집",
        "Phone": "전화번호",
        "Email": "이메일",
        "ProductInfos": [
            {
                "Price": 33300,
                "Amount": 3,
                "ProductName": "당근 50kg",
                "ProductImg": "/imgs/carrot.png",
                "Detail": "맛있으면 당근을 흔들어주세요.",
                "Condition": "최상품",
                "_id": "6549a5524982a14936615c7c"
            },
            {
                "Price": 44400,
                "Amount": 4,
                "ProductName": "사과 50kg",
                "ProductImg": "apple.png",
                "Detail": "맛있는 신선 사과",
                "Condition": "최상품",
                "_id": "6549a5524982a14936615c7d"
            }
        ],
        "TotalPrice": 277500,
        "Status": "주문완료",
        "Cancel": false,
        "shortId": "vunCCpL4eck0-hh8xIqXn",
        "createdAt": "2023-11-07T02:47:46.849Z",
        "updatedAt": "2023-11-07T02:47:46.849Z",
        "__v": 0
    },
    {
        "_id": "6549a5b84982a14936615c85",
        "UserId": "test",
        "Name": "test",
        "Address": "우리집",
        "Phone": "전화번호",
        "Email": "이메일",
        "ProductInfos": [
            {
                "Price": 33300,
                "Amount": 3,
                "ProductName": "당근 50kg",
                "ProductImg": "/imgs/carrot.png",
                "Detail": "맛있으면 당근을 흔들어주세요.",
                "Condition": "최상품",
                "_id": "6549a5b84982a14936615c86"
            }
        ],
        "TotalPrice": 99900,
        "Status": "주문완료",
        "Cancel": false,
        "shortId": "sOLpNw9k106_0fZ6D-IFW",
        "createdAt": "2023-11-07T02:49:28.605Z",
        "updatedAt": "2023-11-07T02:49:28.605Z",
        "__v": 0
    },
    {
        "_id": "6549a5b94982a14936615c88",
        "UserId": "test",
        "Name": "test",
        "Address": "우리집",
        "Phone": "전화번호",
        "Email": "이메일",
        "ProductInfos": [
            {
                "Price": 33300,
                "Amount": 3,
                "ProductName": "당근 50kg",
                "ProductImg": "/imgs/carrot.png",
                "Detail": "맛있으면 당근을 흔들어주세요.",
                "Condition": "최상품",
                "_id": "6549a5b94982a14936615c89"
            }
        ],
        "TotalPrice": 99900,
        "Status": "주문완료",
        "Cancel": false,
        "shortId": "yyaLdSvEOFEMfQJVHDR0P",
        "createdAt": "2023-11-07T02:49:29.246Z",
        "updatedAt": "2023-11-07T02:49:29.246Z",
        "__v": 0
    }
]`;

const boxEl = document.querySelector(".card-box");

//data load
const fetchData = async () => {
  const data = await api.sendGet("/orders");
  return data;
};
const data = await fetchData();
console.log(data);

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
