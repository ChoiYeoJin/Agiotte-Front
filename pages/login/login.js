//login 기능
//1. api 임포트
import * as api from "../utils/api";
import * as storage from "../utils/storage";

//2. 이름을 지정해둔 버튼 element를 가져온다
const loginButtonEl = document.querySelector(".login-button");
//3. click이벤트를 버튼에 추가한다
loginButtonEl.addEventListener("click", clickLoginButton);

//4. 추가한 이벤트를 구현한다
async function clickLoginButton(e) {
  //5. 지정한 input element에서 .value로 입력상태의 데이터를 가져온다
  const email = document.querySelector("#emailInput").value;
  const password = document.querySelector("#passwordInput").value;

  //일단은 백엔드 보내는 부분은 제외해주세요.
  const response = await api.sendPost("/users/login", {
    UserId: email,
    HashPwd: password,
  });

  console.log(response);
  if (response !== undefined) {
  }
}

const signupButtonEl = document.querySelector(".signup-button");
signupButtonEl.addEventListener("click", (e) => {
  location.href = "../sign-up/";
});
