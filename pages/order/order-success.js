import * as api from "../utils/api";

const urlParams = new URLSearchParams(window.location.search);
const lastImg = urlParams.get("last-img");

console.log(lastImg);

const lastImgEl = document.querySelector(".last-img");
console.log();
lastImgEl.setAttribute("src", api.IMG_URL + lastImg);
