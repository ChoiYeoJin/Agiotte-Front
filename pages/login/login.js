//login 기능
import * as api from "../utils/api";
import * as storage from "../utils/storage";

const loginButtonEl = document.querySelector(".login-button");
loginButtonEl.addEventListener("click", clickLoginButton);

async function clickLoginButton(e) {
  e.preventDefault();
  const email = document.querySelector("#emailInput").value;
  const password = document.querySelector("#passwordInput").value;
  const response = await api.sendPost("/users/login", {
    email: email,
    password: password,
  });

  const status = response.status;

  if (status === 200) {
    alert("login 성공!");
    //token저장
    const token = response.token;
    storage.setItem("token", token);
  } else {
    alert(`${status} 아이디 또는 비밀번호가 틀립니다.`);
  }
}
