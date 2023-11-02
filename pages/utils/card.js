import "../index.css";
import { getTagHTML } from "./tags.js";

export const getCardHTML = (name, price, img, tag) => {
  return `
      <div class="card ml-5 mt-5 w-[260px] h-[430px] flex-none  bg-transparent">
        <img class="w-[260px] h-[300px] rounded-[10px]" src="${img}" />
        <div class="text-center">
          ${getTagHTML(tag)}
        </div>

        <div>
          <p class="h-23 mt-4 text-base  text-left text-[#2f4f4f]">
            ${name}
          </p>
        </div>
        <div>
          <p class="mt-2 text-xl font-bold text-left text-black">${Number(
            price
          ).toLocaleString()}원</p>
        </div>
      </div>
    `;
};
