//장바구니 기능

let cart = [];

//상품을 담는 겍ㅊ[
function addToCart(item) {
  cart.push(item);
}

//상품삭제
function removeFromCart(itemName) {
  cart = cart.filter(item => item.name !== itemName);
}

//장바구니 상품 목록 렌더링
function renderCart() {
  const cartElement = document.getElementById("cart");

  if (cart.length === 0) {
    cartElement.innerHTML = "<p>장바구니에 담긴 상품이 없습니다.</p>";
    return;
  }

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
