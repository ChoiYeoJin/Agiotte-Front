import * as api from "../utils/api"
import * as storage from "../utils/storage"

const API_URL = 'http://kdt-sw-7-team02.elicecoding.com:3000/images/bmo1.gif';

const verificationButtonEl = document.querySelector(".verificationButton");
verificationButtonEl.addEventListener("click", clickverificationButton);


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


// API Request
const params = {
	UserId : String,
	HashPwd : String,
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
  
  if(res.ok) {
    location.href = '/profile';
  } else {
    alert('아이디나 비밀번호가 일치하지 않습니다.');
  }
})
.catch(err => console.error(err));
}