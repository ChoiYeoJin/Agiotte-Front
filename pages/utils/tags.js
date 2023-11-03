const newState = `<p
            class="w-12 rounded-[3px] mt-3 text-sm font-bold text-[#4d8eee] bg-[#cfdfff] text-center"
          >
            새상품
          </p>`;

const goodState = `<p
            class="w-16 rounded-[3px] mt-3 text-sm font-bold text-[#3CC85B] bg-[#d2ffe4] text-center"
          >
            좋은상태
          </p>`;

const normalState = `<p
            class="w-9 rounded-[3px] mt-3 text-sm font-bold text-[#727579] bg-[#D7D7D7] text-center"
          >
            보통
          </p>`;

const states = new Map();
states.set("new", newState);
states.set("good", goodState);
states.set("normal", normalState);

export function getTagHTML(tagState) {
  return states.get(tagState);
}
