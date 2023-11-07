import * as api from "../utils/api"
import * as storage from "../utils/storage"

const loginButton = document.querySelector(".loginButton");
  loginButton.addEventListener("click", clickLoginButton);
  
  function clickLoginButton(e) {

    const email = document.querySelector("#password-input").value;
    const password = document.querySelector("#passwordCheck-input").value;

    storage.setItem("token", "test");
    console.log(storage.getItem("token"));
  }