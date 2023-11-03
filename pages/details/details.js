//받아올 데이터 img, subject, tag(state), price, quantity,

//장바구니에 저장해야하니까 전역? 상품ID, quantity
//바로구매시

const id = 11;

const details = await fetchDetails(id);

const img = document.querySelector(".main-img");
const subject = document.querySelector(".subject");
const tag = document.querySelector(".tag-box");
const price = document.querySelector(".price");
const quantity = document.querySelector(".quantity");

async function fetchDetails(id) {
  //데이터를 가져온셈 치자
  //const res = await fetch(`/${id}/`);
  //const data = res.json();
  const details = {
    subject: "귀여운 원숭이 인형 팝니다",
    img: "/img/test2.png",
    tag: "good",
    price: 40000,
    quantity: 5,
  };

  return details;
}
