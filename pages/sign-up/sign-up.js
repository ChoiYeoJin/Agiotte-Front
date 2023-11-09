import { checkEmail } from "../utils/commonRegex.js";
import { checkPassword } from "../utils/commonRegex.js";
import { sendPost } from "../utils/api";

let isIdAvailable = false; // 아이디 중복 여부를 저장하는 변수

const checkIdEl = document.getElementById("checkId");
const signupFormEl = document.getElementById("sign-up-form");

const checkId = async () => {
  const signUpIdEl = document.getElementById("sign-up-id");
  let userId;
  if (signUpIdEl) {
    userId = signUpIdEl.value;
  }

  if (!userId) return false;

  const response = await sendPost(`/users/join/${userId}`);

  if (response.isDuplicated) {
    alert("이미 사용중인 아이디입니다.");
    isIdAvailable = false;
  } else {
    alert("사용 가능한 아이디입니다.");
    isIdAvailable = true;
  }
};

const registerUser = async e => {
  e.preventDefault();

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
    alert("올바른 비밀번호를 입력해주세요!");
    passwordEl.focus();
    return false;
  }
  if (passwordCheck === "") {
    alert("입력한 비밀번호와 일치하지 않습니다!");
    passwordCheckEl.focus();
    return false;
  }

  if (!isIdAvailable) {
    alert("아이디 중복 확인이 필요합니다.");
    return;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    alert("유효한 이메일 주소를 입력해주세요.");
    return;
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
    );
    return;
  }

  // if (password !== passwordCheck) {
  //   alert("비밀번호가 일치하지 않습니다.");
  //   return;
  // }

  const marketingAgreement = document.querySelector(
    'input[name="marketing"]'
  ).checked;

  const data = {
    name: name,
    id: id,
    email: email,
    password: password,
    marketingAgreement: marketingAgreement,
  };

  const signupResponse = await sendPost("/users/join", data);
  if (signupResponse) {
    alert("회원가입에 성공하였습니다.");
  } else {
    alert("회원가입에 실패하였습니다.");
  }
};

if (checkIdEl) {
  checkIdEl.addEventListener("click", checkId);
}

if (signupFormEl) {
  signupFormEl.addEventListener("submit", registerUser);
}
