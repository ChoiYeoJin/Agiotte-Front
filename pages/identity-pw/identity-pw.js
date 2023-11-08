import * as api from "../utils/api"
import * as storage from "../utils/storage"


const loginButtonEl = document.querySelector(".loginButton");
loginButtonEl.addEventListener("click", clickLoginButton);

function clickLoginButton(e) {
  const idEl = document.getElementById("idInput");
  const emailEl = document.getElementById("emailInput");

  const id = idEl.value;
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
}



// 제대로 입력 되었으면 비밀번호 변경페이지로 넘어가기
function moveTopwch (){
  window.location.href = "http://localhost:8080/change-pw/";
}

