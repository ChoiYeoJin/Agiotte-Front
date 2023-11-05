//장바구니 기능
let cart = [];

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

//장바구니 상품 목록 렌더링
//장바구니 담겨있는 상품이 없을시 표기 [임시]
function renderCart() {
  const cartElement = document.getElementById("cart"); //<- 나중에 한번에 관리 할 예정

  if (cart.length === 0) {
    cartElement.innerHTML = "<p>장바구니에 담긴 상품이 없습니다.</p>";
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
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <p>${item.name}</p>
          <input type="number" value="${item.quantity}" />
          <p>${item.price}</p>
          <button onClick="removeFromCart('${item.name}')">삭제</button>
        </div>
      `;
    })
    .join("");

  cartElement.innerHTML += `
      <div class="cart-total">
        <p>상품 금액: ${totalAmount}</p>
        <p>배송비: ${totalDeliveryFee}</p>
        <p>주문 금액: ${totalAmount + totalDeliveryFee}</p>
        <button>구매하기</button>
      </div>
    `;
}

// "구매하기" 버튼을 눌렀을 때 실행될 함수 [임시]
function purchase() {
  alert("구매가 완료되었습니다.");
  cart = []; // 장바구니를 비움
  renderCart(); // 장바구니를 다시 렌더링
}
