import * as api from "../utils/api"
import * as storage from "../utils/storage"

const loginButton = document.querySelector(".loginButton");
loginButton.addEventListener("click", clickLoginButton);

async function clickLoginButton(e) {

  const password = document.querySelector("#password-input").value;
  const passwordCheck = document.querySelector("#passwordCheck-input").value;

  storage.setItem("token", "test");
  console.log(storage.getItem("token"));
}

  if (!passwordInput(password)) {
    alert('올바른 비밀번호를 입력해주세요!\n비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.');
    password.focus();
    return false;
  }

  if (passwordCheck === '') {
    alert('입력한 비밀번호와 일치하지 않습니다!');
    passwordCheck.focus();
    return false;
  }

