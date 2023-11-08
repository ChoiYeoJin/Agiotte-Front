import * as api from "../utils/api"
import * as storage from "../utils/storage"

const API_URL = 'http://kdt-sw-7-team02.elicecoding.com:3000/images/bmo1.gif';

const findButtonEl = document.querySelector(".findButton");
findButtonEl.addEventListener("click", clickfindButton);

const emailRegexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const checkEmailValid = (targetEmail) => {
    return emailRegexp.test(targetEmail);
}

function clickfindButton(e) {

  const nameEl = document.querySelector("#nameInput");
  const name = nameEl.value;
  const emailEl = document.querySelector("#emailInput");
  const email = emailEl.value;

if (name === '') {
  alert('이름을 입력해주세요.');
  nameEl.focus();
  return false;
}

if (email === '') {
    alert('이메일을 입력해주세요.');
    passwordEl.focus();
    return false;
}

if (!checkEmailValid(email)) {
  alert('올바른 이메일 주소를 입력해주세요.');
  emailEl.focus();
  return false;
}

// API Request
const params = {
  "UserName": "String", 
  "Email": "String"
};

fetch({
  url: `${API_URL}/users/id`,
  method: 'POST',
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify(params),
})
.then(res => {
  console.log(res, res.ok, res.status);
  
  if(res.ok) {
    alert('회원님의 아이디는'+ String +'입니다.');
  } else {
    alert('이름이나 이메일이 일치하지 않습니다.');
  }
})
.catch(err => console.error(err));
// alert('등록된 정보가 없습니다')
}