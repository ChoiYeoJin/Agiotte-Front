import * as api from "../utils/api";
import * as storage from "../utils/storage";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("order-id");

const zipEl = document.querySelector(".input-zip");
const addrEl = document.querySelector(".input-detail-addr");
let fullAddr = "";

async function getOrderDetails(Id) {
  try {
    const data = await api.sendGet(`/orders`);

    console.log(data);
    const targetData = data.find((item) => item.shortId === id);
    console.log(targetData);
    document.querySelector(".order-name").textContent = createProdName(
      targetData.ProductInfos
    );
    //document.querySelector("img").src = targetData.ProductInfos[0].ProductImg;
    document.querySelector(".order-price").textContent = targetData.TotalPrice;
  } catch (error) {
    console.error(error);
  }
}

function createProdName(orderList) {
  if (orderList.length > 1) {
    return `${orderList[0].ProductName} 외 ${orderList.length - 1}종`;
  }
  return orderList[0].ProductName;
}

window.onload = () => getOrderDetails(id);

const clickZipButtonEvent = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        //document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        //document.getElementById("sample6_extraAddress").value = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      zipEl.value = "(" + data.zonecode + ") " + addr;

      // 커서를 상세주소 필드로 이동한다.
      addrEl.value = `${extraAddr} `;
      addrEl.focus();
    },
  }).open();
};

const zipCodeButton = document.querySelector(".zip-code-button");
const changeOrderButton = document.querySelector(".change-order-button");
zipCodeButton.addEventListener("click", clickZipButtonEvent);
changeOrderButton.addEventListener("click", async () => {
  const user = await api.sendGet("/users");
  fullAddr += zipEl.value + addrEl.value;
  // const data = await api.sendPut("/orders", {
  //   orderId: id,
  //   Name: user.UserName,
  //   Address: fullAddr,
  //   Phone: user.Phone,
  // });

  try {
    const response = await fetch(`${api.API_URL}/orders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${storage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: id,
        Name: user.UserName,
        Address: fullAddr,
        Phone: user.Phone,
      }),
    });

    const data = response.text();
    //const data = await response.json();

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.log("실패");
    }
  } catch (error) {
    console.error(`오류발생 ${error}`);
  }
});

const cancelOrderButton = document.querySelector(".cancel-order-button");
cancelOrderButton.addEventListener("click", async () => {
  try {
    const response = await fetch(`${api.API_URL}/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: storage.getItem("token"),
      },
      body: {},
    });

    const data = await response.text();
    console.log(data);
    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.log("실패");
    }
  } catch (error) {
    //console.error(`오류발생 ${error}`);
  }
});
