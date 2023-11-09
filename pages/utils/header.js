//TODO: 카테고리 api로 가져와서 적용되도록 해야함
//
import "../index.css";
import logo from "/imgs/logo.png";
import loginButton from "/imgs/login_button.png";
import * as storage from "../utils/storage";

document.querySelector("#header").innerHTML = `
    <div class="header w-full h-[60px] lg:h-[170px]">
      <div class="head flex justify-between px-5 lg:px-20 pt-5">
        <div class="hidden lg:block">
          <a href="../main/">
            <img class="w-40" src="${logo}" alt="logo" />
          </a>
        </div>
        <div class="hidden lg:block w-[450px]">
          <i class="fa-solid fa-magnifying-glass absolute ml-[26rem] mt-6"></i>
          <input
            class="w-full h-10 mt-3 px-2 rounded-[5px] bg-[#efefef]"
            type="text"
            style="display: inline-block"
            placeholder="찾고싶은 중고물품을 검색하세요"
          />
        </div>
        <div class="hidden lg:block">
          <button
            class="header-logout hidden"
            href="#"
            onclick="location.href='../login/'"
          >
            <img
              class="headerLoginButton mt-3"
              src="${loginButton}"
              alt="login"
            />
          </button>
          <div class="header-login mt-3">
            <a class="logout cursor-pointer">로그아웃</a>
            <a class="mx-3" href="../order-list/">마이페이지</a>
            <a href="../cart/"><i class="fa-solid fa-bag-shopping"></i></a>
          </div>
        </div>
        <div class="mobile-header w-full flex lg:hidden items-center">
          <div class="mobile-skip-icon hidden cursor-pointer">
            <i class="fa-solid fa-chevron-left mr-2"></i>
          </div>
          <div class="search-bar flex-grow w-full">
            <input
              class="mobile-search-bar w-full px-4 py-1 border border-gray-300 rounded-lg hidden"
              type="text"
              placeholder=""
            />
          </div>

          <i
            class="mobile-search-icon fa-solid fa-magnifying-glass mx-2 text-xl cursor-pointer"
          ></i>
          <i
            class="mobile-user-icon fa-regular fa-user mx-2 text-xl cursor-pointer"
          ></i>
        </div>
      </div>
      <div class="hidden lg:block">
        <nav class="navbar group dropdown" style="list-style: none">
          <div class="flex space-x-7 pt-10 pl-20">
            <li class="relative tracking-wide">
              <a class="text-lg leading-tight" href="../list/"
                ><span
                  class="link link-underline link-underline-black m-1 text-black"
                  >유아의류</span
                ></a
              >
            </li>

            <li>
              <a class="text-lg leading-tight" href="../list/"
                ><span
                  class="link link-underline link-underline-black m-1 text-black"
                  >유아용품</span
                ></a
              >
            </li>
            <li>
              <a class="text-lg leading-tight" href="../list/"
                ><span
                  class="link link-underline link-underline-black m-1 text-black"
                  >가구</span
                ></a
              >
            </li>
            <li>
              <a class="text-lg leading-tight" href="../list/"
                ><span
                  class="link link-underline link-underline-black m-1 text-black"
                  >기타</span
                ></a
              >
            </li>
          </div>

          <div
            class="block w-full h-[200px] bg-white group-hover:block dropdown-menu-1 absolute hidden pt-3 pl-2 z-10"
          >
            <div class="bg-white flex space-x-10 pt-5 pl-20">
              <div>
                <div><a class="block" href="../list/">여아의류</a></div>
                <div><a class="block mt-2" href="#">남아의류</a></div>
              </div>
              <div>
                <div><a class="block" href="../list/">유아용품</a></div>
                <div><a class="block mt-2" href="../list/">장난감</a></div>
                <div><a class="block mt-2" href="../list/">청결용품</a></div>
                <div><a class="block mt-2" href="../list/">안전용품</a></div>
                <div><a class="block mt-2" href="../list/">잡화</a></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div
        class="mobile-menu w-full h-[200px] bg-white absolute pt-3 z-10 hidden"
      >
        <div class="bg-white py-5 pt-5 flex  justify-center space-x-10   min-w-[380px]">
          <div>
            <div>
              <a class="block mt-2 text-xl font-semibold" href="../list/"
                >유아의류</a
              >
            </div>
            <div><a class="block mt-2 ml-2" href="../list/">여아의류</a></div>
            <div><a class="block mt-2 ml-2" href="#">남아의류</a></div>
          </div>
          <div>
            <div>
              <a class="block mt-2 text-xl font-semibold" href="../list/"
                >유아용품</a
              >
            </div>
            <div><a class="block mt-2 ml-2" href="../list/">장난감</a></div>
            <div><a class="block mt-2 ml-2" href="../list/">청결용품</a></div>
            <div><a class="block mt-2 ml-2" href="../list/">안전용품</a></div>
            <div><a class="block mt-2 ml-2" href="../list/">잡화</a></div>
          </div>
          <div>
            <a class="block mt-2 text-xl font-semibold" href="../list/">가구</a>
          </div>
          <div>
            <a class="block mt-2 text-xl font-semibold" href="../list/">기타</a>
          </div>
        </div>
      </div>
    </div>
`;

const token = storage.getItem("token");

const logoutEl = document.querySelector(".logout");
const logoutHeaderEl = document.querySelector(".header-logout");
const loginHeaderEl = document.querySelector(".header-login");

if (token === null) {
  //logout상태
  logoutHeaderEl.classList.remove("hidden");
  loginHeaderEl.classList.add("hidden");
} else {
  logoutHeaderEl.classList.add("hidden");
  loginHeaderEl.classList.remove("hidden");
}

const clickLogoutEvent = () => {
  storage.removeItem("token");
  logoutHeaderEl.classList.remove("hidden");
  loginHeaderEl.classList.add("hidden");
  alert("로그아웃 되었습니다!");
  location.href = "../main/";
};

logoutEl.addEventListener("click", clickLogoutEvent);

const mobileSearchBarEl = document.querySelector(".mobile-search-bar");
const mobileSearchIconEl = document.querySelector(".mobile-search-icon");
const mobileUserIconEl = document.querySelector(".mobile-user-icon");
const mobileMenuEl = document.querySelector(".mobile-menu");
const mobileSkipIconEl = document.querySelector(".mobile-skip-icon");

const clickSearchIconEvent = () => {
  mobileSkipIconEl.classList.remove("hidden");
  mobileSearchBarEl.classList.remove("hidden");
  mobileMenuEl.classList.remove("hidden");
};

const clickSkipIconEvent = () => {
  mobileSkipIconEl.classList.add("hidden");
  mobileSearchBarEl.classList.add("hidden");
  mobileMenuEl.classList.add("hidden");
};

const clickUserIconEvent = () => {
  if (token) {
    location.href = "../order-list/";
  } else {
    location.href = "../login/";
  }
};

mobileSearchIconEl.addEventListener("click", clickSearchIconEvent);
mobileSkipIconEl.addEventListener("click", clickSkipIconEvent);
mobileUserIconEl.addEventListener("click", clickUserIconEvent);
