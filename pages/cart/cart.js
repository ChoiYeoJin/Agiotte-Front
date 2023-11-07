// 추가해야할 것
// 1. 상품 수량 변경
// 2. 에러처리 -> 대표적으로 상품 담는 객체 파트에서 콘솔로 출력해두게 했음, 후에 사용자가 볼 수 있게 변경할 것
// 3. 백엔드와 연결을 위해 비동기 처리로 AJAX와 같은것으로 연결 고려
// 4. 현재 상품 이름, 이미지, 가격, 배송비, 수량만 고려 - 상품 id , 옵션, 판매자 정보 등등

//가격에 콤마
import { addCommasToNumber } from "../utils/addCommasToNumber";

// 상태 태그 추가
import { getTagHTML } from "../utils/tags";

//장바구니 기능
let cart = [
  {
    id: "1",
    price: 30000,
    name: "여아 신발",
    img: "./test1.jpg",
    tag: "good",
    count: 1,
  },
  {
    id: "2",
    price: 40000,
    name: "원숭이 인형",
    img: "./test2.jpg",
    tag: "normal",
    count: 1,
  },
];
// let cart = [];

//상품을 담는 객체
function addToCart(item) {
  // 입력 값 검증 -> 따로 public 폴더에 js Regex 검증 파일에 추가해서 할지는 검토
  if (
    typeof item.name !== "string" ||
    typeof item.image !== "string" ||
    typeof item.price !== "number" ||
    typeof item.deliveryFee !== "number" ||
    typeof item.quantity !== "number"
  ) {
    console.error("유효하지 않은 상품 정보입니다.");
    return;
  }

  // 이미 장바구니에 있는 상품인지 확인
  const existingItem = cart.find(cartItem => cartItem.name === item.name);

  if (existingItem) {
    // 이미 장바구니에 있는 상품이면 수량을 업데이트
    existingItem.quantity += item.quantity;
  } else {
    // 장바구니에 없는 상품이면 장바구니에 추가
    cart.push(item);
  }

  // 장바구니를 다시 렌더링 <- 중요한건데 생각 못하다가 발견..
  renderCart();
}

//상품삭제
function removeFromCart(itemName) {
  const initialCartLength = cart.length;
  cart = cart.filter(item => item.name !== itemName);

  // 상품이 제거되었다면 장바구니를 다시 렌더링
  if (cart.length !== initialCartLength) {
    renderCart();
  }
}

// 장바구니 상품 수량 변경 함수 [임시이며 따로 버튼도 연결해야함]
function changeQuantity(itemName, quantity) {
  const item = cart.find(cartItem => cartItem.name === itemName);

  if (item) {
    item.quantity = quantity;
  }

  // 장바구니를 다시 렌더링
  renderCart();
}

//장바구니 상품 목록 렌더링
//장바구니 담겨있는 상품이 없을시 표기 [임시]
function renderCart() {
  const cartElement = document.getElementById("cart"); //<- 나중에 한번에 관리 할 예정
  const cardBoxElement = document.getElementById("card-box");
  const cartTotalElement = document.getElementById("cart-total");
  const totalElement = document.getElementById("total");

  if (cart.length === 0) {
    cardBoxElement.innerHTML = `
    <div class="flex items-center justify-center h-screen max-h-25">
  <h1>장바구니에 담긴 상품이 없습니다.</h1>
</div>

    `;
    return;
  }

  //장바구니 담았을시에 상품 배송비 계산 그리고 표기 적용
  let totalAmount = 0;
  let totalDeliveryFee = 0;

  cartElement.innerHTML = cart
    .map(item => {
      totalAmount += item.price * item.quantity;
      totalDeliveryFee += item.deliveryFee;

      return `
      <div class="cart-item border-b border-t flex px-10">

        <div class="w-1/2 border-r">
          <div class="flex p-10">
            <div>
              <img class="w-32 h-32" src="${item.img}" alt="${item.name}" />
            </div>
            <div class="pr-3 ml-16 font-bold text-2xl">
              <p>${item.name}</p>
              <p>${getTagHTML("new")}</p>
            </div>
          </div>
        </div>

        <div class="flex-grow border-r">
          <div class="flex items-center justify-center p-20 w-30">
            <button class="border w-10 h-10 bg-white-300">-</button>
            <input class="border w-10 h-10 bg-white-500 text-center appearance-none" type="number" value="${
              item.count
            }" />
            <button class="border w-10 h-10 bg-white-300">+</button>
          </div> 
        </div>

        <div class="flex-grow flex items-center justify-center border-r font-bold text-2xl">
          <h1>${addCommasToNumber(item.price * item.count)}원</h1>
        </div>

        <div class="flex-grow flex items-center justify-end">
          <button onClick="removeFromCart('${
            item.name
          }')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          삭제
          </button>
        </div>
      </div>

      `;
    })
    .join("");

  cartTotalElement.innerHTML = `
      <div class="cart-total flex text-center justify-center border-b items-center px-20">
        <div class="p-8">
          <p>상품금액</p>
          <p>${totalAmount}</p>
        </div>
        <div class="p-8 text-3xl font-bold">
          <p>+</p>
        </div>
        <div class="p-8">
          <p>배송비(30,000원 이상 무료)</p>
          <p>${totalDeliveryFee}</p>
        </div>
        <div class="p-8 text-3xl font-bold">
          <p>=</p>
        </div>  
        <div class="p-8">
          <p>주문금액</p>
          <p class="font-bold text-lg">${totalAmount + totalDeliveryFee}원</p>
        </div>
    </div>

    `;

  totalElement.innerHTML = `
  <div class="flex mt-20  border-t-2 border-red-400">
    <div class="p-10 flex-grow border-r border-b text-center">
      <p>총 상품금액</p>
      <p class="text-black">${addCommasToNumber(70000)}원</p>
    </div>
    <div class="p-10 flex-grow border-r border-b text-center">
      <p>총 배송비</p>
      <p class="text-black">+${addCommasToNumber(3000)}원</p>
    </div>
    <div class="p-10 w-1/2 border-b flex justify-end items-center space-x-4">
      <h4>결제금액</h4>
      <h4 class="text-red-400 font-bold">${addCommasToNumber(73000)}원</h4>
      <button onClick="()=>{}" class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md inline-flex items-center w-100 h-20 flex-shrink-0">
        구매하기
      </button>
    </div>
  </div>`;
}

// "구매하기" 버튼을 눌렀을 때 실행될 함수 [임시]
function purchase() {
  alert("구매가 완료되었습니다.");
  cart = []; // 장바구니를 비움
  renderCart(); // 장바구니를 다시 렌더링
}

renderCart();
