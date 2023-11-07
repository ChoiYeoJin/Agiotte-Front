import * as api from "../utils/api"
import * as storage from "../utils/storage"


// 왜 버튼을 누르면 alert가 안뜨는지
const loginButtonEl = document.querySelector(".loginButton");
loginButtonEl.addEventListener("click", clickLoginButton);

function clickLoginButton(e) {
  const id = document.querySelector("#idInput").value;
  const email = document.querySelector("#emailInput").value;

  storage.setItem("token", "test");
  console.log(storage.getItem("token"));

// 
if (id === '') {
  alert('id를 입력해주세요.');
  idEl.focus();
  return false;
}
if (!checkEmail(email)) {
  alert('올바른 이메일 주소를 입력해주세요.');
  emailEl.focus();
  return false;
}

// 입력한 값 : idInput, emailInput
// 가져오는 값 : 어떻게 표시하는지
// 이 둘이 같은지 검사하기
if (username === 'admin' && password === 'password') {
  alert('아이디 또는 이메일이 올바르지 않습니다.');
};
}

// 제대로 입력 되었으면 비밀번호 변경페이지로 넘어가기
function moveTopwch (){
  window.location.href = "http://localhost:8080/change-pw/";
}

