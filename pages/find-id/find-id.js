

// 등록된 정보가 없거나 같을 경우
const HEADER = {
    "Content-Type": "application/json",
  };
  
  const loginButton = document.querySelector(".loginButton");
  loginButton.addEventListener("click", clickLoginButton);
  
  function clickLoginButton(e) {

    // 내가 작성한 것에 맞게 이름, 이메일 # 수정하기
    const email = document.querySelector("#emailInput").value;
    const password = document.querySelector("#passwordInput").value;
  
    alert(email + password);
    fetch("/users/login", {
      method: "POST",
      headers: HEADER,
      body: JSON.stringify({
        email: email,
        password: password,
      }),

    }).then((res) => {
      const status = res.status;
      if (status === 200) {
        alert("회원님의 아이디는 ooo 입니다");
      } else {
        alert(`${status} 아이디 또는 이메일이 틀립니다.`);
      }
    });
  }
  
// 입력 오류일 때
const registerUser = (e) => {
  e.preventDefault();

const nameEl = document.getElementById("sign-up-name");
const emailEl = document.getElementById("sign-up-email");

const name = nameEl.value;
const email = emailEl.value;

if (name === '') {
  alert('이름을 입력해주세요!');
  nameEl.focus();
  return false;
}
if (!checkEmail(email)) {
  alert('올바른 이메일 주소를 입력해주세요!');
  emailEl.focus();
  return false;
}
}


// 백엔드에 보낼 데이터 객체 생성
const data = {
    name: name,
    email: email,
};

console.log(data);