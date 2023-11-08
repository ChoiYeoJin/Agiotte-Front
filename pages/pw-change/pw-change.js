import * as api from "../utils/api"
import * as storage from "../utils/storage"

const API_URL = ' http://kdt-sw-7-team02.elicecoding.com:3000/ ';

const changeButtonEl = document.querySelector(".changeButton");
changeButtonEl.addEventListener("click", clickchangeButton);

const passwordRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const checkPwValid = (targetPassword) => {
  return passwordRegexp.test(targetPassword);
}

async function clickchangeButton(e) {

  const passwordEl = document.querySelector("#password-input");
  const password = passwordEl.value;

  const passwordCheckEl= document.querySelector("#passwordCheck-input");
  const passwordCheck = passwordCheckEl.value;

  if (password === '') {
    alert('비밀번호를 입력해주세요.');
    passwordEl.focus();
    return false;
  }

  if (passwordCheck === '') {
    alert('비밀번호 확인을 입력해주세요.');
    passwordCheckEl.focus();
    return false;
  }

   
if (!checkPwValid(password)) {
   alert('올바른 비밀번호를 입력해주세요!\n비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.');
   password.focus();
   return false;
 }


// API Request
 const params = {
	  HashPwd : String
};

fetch({
  url: `${API_URL}/users/password`,
  method: 'PUT',
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify(params),
})
.then(res => {
  console.log(res, res.ok, res.status);

  if(res.ok) {
    alert('비밀번호가 변경되었습니다.');
  } else {
    alert('비밀번호가 일치하지 않습니다.');
    password.focus();
  }
})
.catch(err => console.error(err));
}