import * as api from "../utils/api";
import * as storage from "../utils/storage";

const loginButtonEl = document.querySelector(".login-button");

loginButtonEl.addEventListener("click", clickLoginButton);

async function clickLoginButton(e) {
  //5. 지정한 input element에서 .value로 입력상태의 데이터를 가져온다
  const email = document.querySelector("#emailInput").value;
  const password = document.querySelector("#passwordInput").value;

  //일단은 백엔드 보내는 부분은 제외해주세요.
  const response = await api.sendPost("/users/login", {
    UserId: email,
    HashPwd: password,
  });

  if (response !== undefined) {
    storage.setItem("token", response.token);
    location.href = "../main/";
  } else {
    alert("아이디 또는 비밀번호가 다릅니다!");
  }
}

const signupButtonEl = document.querySelector(".signup-button");
signupButtonEl.addEventListener("click", (e) => {
  location.href = "../sign-up/";
});
