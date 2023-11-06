export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  const data = localStorage.getItem(key);
  try {
    // JSON.parse를 시도합니다. JSON 배열이든 객체든 상관 없이 변환됩니다.
    return JSON.parse(data);
  } catch (e) {
    // JSON.parse가 실패하면 원본 문자열 데이터를 반환합니다.
    return data;
  }
};

export const updateCart = (productId, details) => {
  let storedCart = getItem("cart");

  if (storedCart === null) {
    setItem("cart", [
      {
        productName: details.productName,
        productId: productId,
        productImg: details.productImg,
        price: details.price,
        amount: Number(details.amount),
      },
    ]);
    return;
  }

  const idx = storedCart.findIndex((item) => item.productId === productId);

  if (idx !== -1) {
    storedCart[idx].amount += Number(details.amount);
  } else {
    storedCart.push({
      productName: details.productName,
      productId: productId,
      productImg: details.productImg,
      price: details.price,
      amount: Number(details.amount),
    });
  }
  setItem("cart", storedCart);
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
