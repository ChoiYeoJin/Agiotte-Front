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

mobileSearchIconEl.addEventListener("click", clickSearchIconEvent);
mobileSkipIconEl.addEventListener("click", clickSkipIconEvent);
