import * as api from "../utils/api"
import * as storage from "../utils/storage"

const API_URL = 'http://kdt-sw-7-team02.elicecoding.com:3000/images/bmo1.gif';

const verificationButtonEl = document.querySelector(".verificationButton");
verificationButtonEl.addEventListener("click", clickverificationButton);

const passwordRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const checkPwValid = (targetPassword) => {
  return passwordRegexp.test(targetPassword);
}

function clickverificationButton(e) {

  const idEl = document.querySelector("#idInput");
  const id = idEl.value;
  const passwordEl = document.querySelector("#passwordInput");
  const password = passwordEl.value;

  if (id === '') {
    alert('아이디를 입력해주세요.');
    idEl.focus();
    return false;
  }
  if (password === '') {
    alert('비밀번호를 입력해주세요.');
    passwordEl.focus();
    return false;
  }
  if (!checkPwValid(password)) {
    alert('올바른 비밀번호를 입력해주세요!\n비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.');
    password.focus();
    return false;
  }

  // API Request
  const params = {
    UserId: String,
    HashPwd: String,
  };

  fetch({
    url: `${API_URL}/users`,
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then(res => {
      console.log(res, res.ok, res.status);

      if (res.ok) {
        location.href = 'http://localhost:8080/profile/';
      } else {
        alert('아이디나 비밀번호가 일치하지 않습니다.');
      }
    })
    .catch(err => console.error(err));
}