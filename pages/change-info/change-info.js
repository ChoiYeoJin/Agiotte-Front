import * as storage from "../utils/storage";
import * as api from "../utils/api";
import { checkPassword, checkEmail } from "/js/commonRegex.js";

const memNameEl = document.querySelector(".member-name");
const memIdEl = document.querySelector(".member-id");
const passEl = document.querySelector(".input-pass");
const passCheckEl = document.querySelector(".input-pass-check");
const emailEl = document.querySelector(".input-email");
const zipEl = document.querySelector(".input-zip");
const addrEl = document.querySelector(".input-detail-addr");

const modifyBtnEl = document.querySelector(".modify-button");
const withdrawBtnEl = document.querySelector(".withdraw-button");
const userName = storage.getItem("user-name");
const userId = storage.getItem("user-id");

memNameEl.innerText = userName;
memIdEl.innerText = userId;

if (!checkPassword(passEl.value)) {
  alert(
    "올바른 비밀번호를 입력해주세요!\n비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
  );
  passwordEl.focus();
  return false;
}
if (passCheckEl.value === "") {
  alert("입력한 비밀번호와 일치하지 않습니다!");
  passCheckEl.focus();
  return false;
}
if (!checkEmail(emailEl.value)) {
  alert("올바른 이메일 주소를 입력해주세요!");
  emailEl.focus();
  return false;
}
if (zipEl.value === "") {
  alert("우편번호가 없습니다!");
  return false;
}

if (addrEl.value === "") {
  alert("주소가 없습니다!");
  addrEl.focus();
  return false;
}

const clickModifyButtonEvent = () => {};
