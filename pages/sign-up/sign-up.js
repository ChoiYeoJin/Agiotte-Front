//회원가입 기능
document
  .getElementById("sign-up-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // 사용자가 입력한 정보를 가져옴
    const name = document.getElementById("sign-up-name").value;
    const id = document.getElementById("sign-up-id").value;
    const email = document.getElementById("sign-up-email").value;
    const password = document.getElementById("sign-up-password").value;
    const passwordCheck = document.getElementById(
      "sign-up-password-check"
    ).value;

    // 입력 검증
    if (!name || !id || !email || !password || !passwordCheck) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    // 비밀번호 확인
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 마케팅 활용 동의 체크박스가 체크되었는지 확인
    const marketingAgreement = document.querySelector(
      'input[name="marketing"]'
    ).checked;

    // 백엔드에 보낼 데이터 객체 생성
    const data = {
      name: name,
      id: id,
      email: email,
      password: password,
      marketingAgreement: marketingAgreement,
    };

    // 백엔드에 데이터 전송
    fetch("/users/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("회원가입에 실패했습니다.");
        }
        return response.json();
      })
      .then(data => {
        alert("회원가입에 성공하였습니다.");
        console.log("Success:", data);
      })
      .catch(error => {
        alert(error.message);
        console.error("Error:", error);
      });
  });
