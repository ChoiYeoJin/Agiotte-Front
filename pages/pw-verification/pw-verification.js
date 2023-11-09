import * as api from "../utils/api"
import * as storage from "../utils/storage"

const API_URL = 'http://kdt-sw-7-team02.elicecoding.com:3000/images/bmo1.gif';

const verificationButtonEl = document.querySelector(".verificationButton");
verificationButtonEl.addEventListener("click", clickverificationButton);


const emailRegexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const checkEmailValid = (targetEmail) => {
    return emailRegexp.test(targetEmail);
}

function clickverificationButton(e) {

  const idEl = document.querySelector("#idInput");
  const id = idEl.value;
  const emailEl = document.querySelector("#emailInput");
  const email = emailEl.value;

if (id === '') {
  alert('아이디를 입력해주세요.');
  idEl.focus();
  return false;
}

if (email === '') {
    alert('이메일을 입력해주세요.');
    emailEl.focus();
    return false;
} 

if (!checkEmailValid(email)) {
  alert('올바른 이메일 주소를 입력해주세요.');
  emailEl.focus();
  return false;
}

// API Request
const params = {
  UserId: id,
  Email: email,
};

fetch({
  url: `${API_URL}/users/password`,
  method: 'POST',
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify(params),
})
.then(res => {
  console.log(res, res.ok, res.status);
  
  if(res.ok) {
    location.href = '/pw-change';
  } else {
    alert('아이디나 이메일이 일치하지 않습니다.');
  }
})
.catch(err => console.error(err));
}