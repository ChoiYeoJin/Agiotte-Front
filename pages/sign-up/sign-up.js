// import {checkEmail} from "/js/commonRegex.js";
// import {checkPassword} from "/js/commonRegex.js";
// import {runFakeApi} from "/js/api.js";

let isIdAvailable = false; // 아이디 중복 여부를 저장하는 변수

const checkIdEl = document.getElementById("checkId");
const signupFormEl = document.getElementById("sign-up-form");

const checkId = () => {
  const signUpIdEl = document.getElementById("sign-up-id");
  let userId;
  if (signUpIdEl) {
    userId = signUpIdEl.value;
  }

  if (!userId) return false;

  alert("사용 가능한 아이디입니다.");
  isIdAvailable = true;

  //아래 주석은 훗날 api 나올때 사용
  // fetch(`https://kdt-sw-7-team02.elicecoding.com/users/${userId}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     id: userId,
  //   }),
  // })
  // .then(response => response.json())
  // .then(data => {
  //   if (data.isDuplicated) {
  //     alert("이미 사용중인 아이디입니다.");
  //     isIdAvailable = false;
  //   } else {
  //     alert("사용 가능한 아이디입니다.");
  //     isIdAvailable = true;
  //   }
  // })
  // .catch(error => console.log(error));
};

const registerUser = e => {
  e.preventDefault();
  // 사용자가 입력한 정보를 가져옴

  const nameEl = document.getElementById("sign-up-name");
  const idEl = document.getElementById("sign-up-id");
  const emailEl = document.getElementById("sign-up-email");
  const passwordEl = document.getElementById("sign-up-password");
  const passwordCheckEl = document.getElementById("sign-up-password-check");

  const name = nameEl.value;
  const id = idEl.value;
  const email = emailEl.value;
  const password = passwordEl.value;
  const passwordCheck = passwordCheckEl.value;

  if (name === "") {
    alert("이름을 입력해주세요!");
    nameEl.focus();
    return false;
  }
  if (id === "") {
    alert("id를 입력해주세요!");
    idEl.focus();
    return false;
  }
  if (!checkEmail(email)) {
    alert("올바른 이메일 주소를 입력해주세요!");
    emailEl.focus();
    return false;
  }
  if (!checkPassword(password)) {
    alert(
      "올바른 비밀번호를 입력해주세요!\n비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
    );
    passwordEl.focus();
    return false;
  }
  if (passwordCheck === "") {
    alert("입력한 비밀번호와 일치하지 않습니다!");
    passwordCheckEl.focus();
    return false;
  }

  // 입력 검증
  // if (!name || !id || !email || !password || !passwordCheck) {
  //     alert("모든 필드를 입력해주세요.");
  //     return;
  // }

  // 아이디 사용 가능 여부 검증
  if (!isIdAvailable) {
    alert("아이디 중복 확인이 필요합니다.");
    return;
  }

  // 이메일 형식 검증
  // const emailRegex = /^\S+@\S+\.\S+$/;
  // if (!emailRegex.test(email)) {
  //     alert("유효한 이메일 주소를 입력해주세요.");
  //     return;
  // }

  // 비밀번호 복잡성 검증 [비밀번호가 8자 이상이고, 대문자, 소문자, 숫자, 특수문자를 모두 포함]
  // const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // if (!passwordRegex.test(password)) {
  //     alert(
  //         "비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
  //     );
  //     return;
  // }

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

  console.log(data);

  // TODO: xxAPI 작업
  // runFakeApi(data).then(res => {
  //     console.log(res)
  // }).catch(err => console.error(err));

  // 백엔드에 데이터 전송
  // fetch("https://kdt-sw-7-team02.elicecoding.com/users/join", {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  // })
  //     .then(response => {
  //         if (!response.ok) {
  //             throw new Error("회원가입에 실패했습니다.");
  //         }
  //         return response.json();
  //     })
  //     .then(data => {
  //         alert("회원가입에 성공하였습니다.");
  //         console.log("Success:", data);
  //     })
  //     .catch(error => {
  //         alert(error.message);
  //         console.error("Error:", error);
  //     });
};

if (checkIdEl) {
  checkIdEl.addEventListener("click", checkId);
}

if (signupFormEl) {
  signupFormEl.addEventListener("submit", registerUser);
}

// id 중복 체크 버튼
// document.getElementById("checkId").addEventListener("click", function () {
//     const userId = document.getElementById("sign-up-id").value;
//
//     axios
//         .post(`https://kdt-sw-7-team02.elicecoding.com/users/${userId}`, {
//             id: userId,
//         })
//         .then(function (response) {
//             if (response.data.isDuplicated) {
//                 alert("이미 사용중인 아이디입니다.");
//                 isIdAvailable = false;
//             } else {
//                 alert("사용 가능한 아이디입니다.");
//                 isIdAvailable = true;
//             }
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// });

// 회원가입 버튼
// document
//     .getElementById("sign-up-form")
//     .addEventListener("submit", function (event) {
//         event.preventDefault();
//
//         // 사용자가 입력한 정보를 가져옴
//         const name = document.getElementById("sign-up-name").value;
//         const id = document.getElementById("sign-up-id").value;
//         const email = document.getElementById("sign-up-email").value;
//         const password = document.getElementById("sign-up-password").value;
//         const passwordCheck = document.getElementById(
//             "sign-up-password-check"
//         ).value;
//
//         // 입력 검증
//         if (!name || !id || !email || !password || !passwordCheck) {
//             alert("모든 필드를 입력해주세요.");
//             return;
//         }
//
//         // 아이디 사용 가능 여부 검증
//         if (!isIdAvailable) {
//             alert("아이디 중복 확인이 필요합니다.");
//             return;
//         }
//
//         // 이메일 형식 검증
//         const emailRegex = /^\S+@\S+\.\S+$/;
//         if (!emailRegex.test(email)) {
//             alert("유효한 이메일 주소를 입력해주세요.");
//             return;
//         }
//
//         // 비밀번호 복잡성 검증 [비밀번호가 8자 이상이고, 대문자, 소문자, 숫자, 특수문자를 모두 포함]
//         const passwordRegex =
//             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         if (!passwordRegex.test(password)) {
//             alert(
//                 "비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
//             );
//             return;
//         }
//
//         // 비밀번호 확인
//         if (password !== passwordCheck) {
//             alert("비밀번호가 일치하지 않습니다.");
//             return;
//         }
//
//         // 마케팅 활용 동의 체크박스가 체크되었는지 확인
//         const marketingAgreement = document.querySelector(
//             'input[name="marketing"]'
//         ).checked;
//
//         // 백엔드에 보낼 데이터 객체 생성
//         const data = {
//             name: name,
//             id: id,
//             email: email,
//             password: password,
//             marketingAgreement: marketingAgreement,
//         };
//
//         // 백엔드에 데이터 전송
//         fetch("https://kdt-sw-7-team02.elicecoding.com/users/join", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("회원가입에 실패했습니다.");
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 alert("회원가입에 성공하였습니다.");
//                 console.log("Success:", data);
//             })
//             .catch(error => {
//                 alert(error.message);
//                 console.error("Error:", error);
//             });
//     });
