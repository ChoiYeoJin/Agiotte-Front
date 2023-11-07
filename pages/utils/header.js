//TODO: 카테고리 api로 가져와서 적용되도록 해야함
//
import "../index.css";
import logo from "/imgs/logo.png";
import loginButton from "/imgs/login_button.png";

document.querySelector("#header").innerHTML = `
        <div class="header w-full h-[170px]">
      <div class="head flex justify-between px-20 pt-5">
        <div>
          <a href="../main/">
            <img class="w-40" src="${logo}" alt="logo" />
          </a>
        </div>
        <div class="w-[450px]">
          <i class="fa-solid fa-magnifying-glass absolute ml-[26rem] mt-6"></i>
          <input
            class="w-full h-10 mt-3 px-2 rounded-[5px] bg-[#efefef]"
            type="text"
            style="display: inline-block"
            placeholder="찾고싶은 중고물품을 검색하세요"
          />
        </div>

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
          <a class="logout cursor-pointer">로그아웃</a> <a class="mx-3" href="../order-list/">마이페이지</a>
          <a href="../cart/"><i class="fa-solid fa-bag-shopping"></i></a>
        </div>
      </div>
            <div>
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
    </div>
`;

const logoutEl = document.querySelector(".logout");
const logoutHeaderEl = document.querySelector(".header-logout");
const loginHeaderEl = document.querySelector(".header-login");

const clickLogoutEvent = () => {
  localStorage.removeItem("token");
  logoutHeaderEl.classList.remove("hidden");
  loginHeaderEl.classList.add("hidden");
  alert("로그아웃 되었습니다!");
};
logoutEl.addEventListener("click", clickLogoutEvent);
