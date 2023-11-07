import { sendGet } from "../utils/api";

//id 쿼리스트링
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("1234");

// const data = await sendGet(url, id);

// fetch(`send`)
//   .then(response => response.json())
//   .then(data => {
//     const itemDiv = document.querySelector(".list-main");
//     itemDiv.querySelector(".ml-2").textContent = data.name;
//     itemDiv.querySelector("img").src = data.image;
//     itemDiv.querySelector(
//       ".flex.items-center.border-r.border-gray-200.justify-center"
//     ).textContent = data.price;
//   });
