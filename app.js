let getName = document.querySelector("#name");
let getEmail = document.querySelector("#email");
let getPass = document.querySelector("#password");
let errorName = document.querySelector(".error-name");
let errorEmail = document.querySelector(".error-email");
let errorPass = document.querySelector(".error-pass");
let errorUpper = document.querySelector(".error-upper");
let errorLower = document.querySelector(".error-small");
let errorNumber = document.querySelector(".error-number");
let errorSymbol = document.querySelector(".error-symbol");
let getIMg = document.querySelector(".on-off");
let getBtn = document.querySelector(".submit-btn");
let getModal = document.querySelector(".modal");
let getModalTitle = document.querySelector(".modal-title");

// اعتبارسنجی نام
const validName = () => {
  if (getName.value.length <= 3) {
    errorName.style.color = "red";
    errorName.innerHTML = "حداقل 3 کاراکتر باشد";
  } else {
    errorName.style.color = "#00da24";
  }
};

// اعتبارسنجی ایمیل
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validEmail = () => {
  if (!isValidEmail(getEmail.value)) {
    errorEmail.style.color = "red";
    errorEmail.innerHTML = "ایمیل معتبر نیست!";
  } else {
    errorEmail.style.color = "#00da24";
    errorEmail.innerHTML = "ایمیل معتبر است!";
  }
};

// بررسی شرایط پسورد و رنگ‌بندی
const validPass = () => {
  const pass = getPass.value;

  const isLongEnough = pass.length >= 8;
  const hasUpper = /[A-Z]/.test(pass);
  const hasLower = /[a-z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSymbol = /[^A-Za-z0-9]/.test(pass);

  errorPass.style.color = isLongEnough ? "#00da24" : "red";
  errorUpper.style.color = hasUpper ? "#00da24" : "red";
  errorLower.style.color = hasLower ? "#00da24" : "red";
  errorNumber.style.color = hasNumber ? "#00da24" : "red";
  errorSymbol.style.color = hasSymbol ? "#00da24" : "red";

  return {
    isLongEnough,
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
  };
};

getName.addEventListener("keyup", validName);
getPass.addEventListener("keyup", validPass);
getEmail.addEventListener("keyup", validEmail);

// نمایش و مخفی‌سازی پسورد
getIMg.addEventListener("click", () => {
  getPass.type = getPass.type === "password" ? "text" : "password";
  getIMg.setAttribute(
    "src",
    getPass.type === "text" ? "/Img/on.svg" : "/Img/off.svg"
  );
});

// نمایش مودال
const showModal = (message, color) => {
  getModal.classList.add("visible");
  getModalTitle.innerHTML = message;
  getModal.style.backgroundColor = color;
  setTimeout(() => {
    getModal.classList.remove("visible");
  }, 2000);
};

// بررسی نهایی موقع کلیک
const checkBtn = () => {
  const passChecks = validPass();

  if (
    getName.value.length < 1 &&
    getPass.value.length < 1 &&
    getEmail.value.length < 1
  ) {
    showModal("همه فیلدها خالی هستند❌", "red");
  } else if (getName.value.length < 1) {
    showModal("فیلد نام خالی است❌", "red");
  } else if (getEmail.value.length < 1) {
    showModal("فیلد ایمیل خالی است❌", "red");
  } else if (!isValidEmail(getEmail.value)) {
    showModal("ایمیل معتبر نیست❌", "red");
  } else if (getPass.value.length < 1) {
    showModal("فیلد پسورد خالی است❌", "red");
  } else if (
    !passChecks.isLongEnough ||
    !passChecks.hasUpper ||
    !passChecks.hasLower ||
    !passChecks.hasNumber ||
    !passChecks.hasSymbol
  ) {
    showModal("پسورد شما همه شرایط را ندارد❌", "red");
  } else {
    showModal("ورود با موفقیت انجام شد✅", "#12e512");
  }
};

getBtn.addEventListener("click", checkBtn);
