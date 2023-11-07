import * as api from "../utils/api"
import * as storage from "../utils/storage"


const loginButtonEl = document.querySelector(".loginButton");
loginButtonEl.addEventListener("click", clickLoginButton);

function clickLoginButton(e) {
  const id = document.querySelector("#idInput").value;
  const email = document.querySelector("#emailInput").value;

if (id === '') {
  alert('아이디를 입력해주세요.');
  idEl.focus();
  return false;
}

// 왜 버튼을 누르면 alert가 안뜨는지
if (!checkEmail(email)) {
  alert('올바른 이메일 주소를 입력해주세요.');
  emailEl.focus();
  return false;
}
}

// 입력한 값 : idInput, emailInput
// 가져오는 값 : 어떻게 표시하는지
// 이 둘이 같은지 검사하기
// api.sendPost 
// 백엔드에 지정된 url을 통해 본인인증 확인 - 성공했는지 실패했는지 return 값이 옴


// 제대로 입력 되었으면 비밀번호 변경페이지로 넘어가기
function moveTopwch (){
  window.location.href = "http://localhost:8080/change-pw/";
}

