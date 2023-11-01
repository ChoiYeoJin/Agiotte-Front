//login 기능
const HEADER = {
  "Content-Type": "application/json",
};

const loginButton = document.querySelector(".loginButton");
loginButton.addEventListener("click", clickLoginButton);

function clickLoginButton(e) {
  e.preventDefault();
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
      alert("login 성공!");
    } else {
      alert(`${status} 아이디 또는 비밀번호가 틀립니다.`);
    }
  });
}
