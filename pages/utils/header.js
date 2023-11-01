import "../index.css";
import logo from "/imgs/logo.png";
import loginButton from "/imgs/login_button.png";

document.querySelector("#header").innerHTML = `
    <div class="header w-full h-[170px] px-10">
      <div class="head flex justify-between px-20 pt-5">
        <div>
        <img class="w-40" src="${logo}" alt="logo" />
        </div>
        <div class="w-[450px]">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            class="w-full h-10 mt-3 px-2 rounded-[5px] bg-[#efefef]"
            type="text"
            style="display: inline-block"
            placeholder="찾고싶은 중고물품을 검색하세요"
          />
        </div>

        <button>
          <img class="headerLoginButton mt-3" src="${loginButton}" alt="login" />
        </button>

      </div>
      <div>
        <nav class="navbar flex space-x-7 mt-10 ml-20" style="list-style: none">
          <li><a class="text-lg" href="#">유아의류</a></li>
          <li><a class="text-lg" href="#">유아용품</a></li>
          <li><a class="text-lg" href="#">가구</a></li>
          <li><a class="text-lg" href="#">기타</a></li>
        </nav>
      </div>
    </div>
`;
