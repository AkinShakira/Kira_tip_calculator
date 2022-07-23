"use strict";

const billInput = document.querySelector(".js-bill");
const totalPeopleInput = document.querySelector(".js-num-people");
const customInput = document.querySelector(".js-custom-tip-input");

const btnTip = document.querySelectorAll(".js-btn-tip");
const btnCustomTip = document.querySelector(".js-btn-custom");
const totalTip = document.querySelector(".js-total-tip-fig");
const totalPerPerson = document.querySelector(".js-total-person-fig");
const btnReset = document.querySelector(".js-btn-reset");
const btnCalcCustomTip = document.querySelector(".js-btn-calc-custom");
const customForm = document.querySelector(".custom-form");
const overlay = document.querySelector(".overlay");
const inputAlert = document.querySelector(".input-alert");
const btnCloseOverlay = document.querySelectorAll(".btn-close-overlay");
let appActive = true;

function startApp() {
  appActive = true;
  totalTip.textContent = "0.00";
  totalPerPerson.textContent = "0.00";
  billInput.removeAttribute("disabled", "");
  totalPeopleInput.removeAttribute("disabled", "");
  btnCustomTip.textContent = "Custom";
  for (let i = 0; i < btnTip.length; i++) btnTip[i].classList.replace("bg-pink-600", "bg-pink-800");
  btnCustomTip.classList.replace("bg-pink-400", "bg-pink-100");
  function clearInput() {
    billInput.value = "";
    totalPeopleInput.value = "";
    customInput.value = "";
  }
  clearInput();
}

function getInputValues() {
  const billValue = Number(billInput.value);
  const totalPeopleValue = Number(totalPeopleInput.value);
}

function calcTip() {
  const billValue = Number(billInput.value);
  const totalPeopleValue = Number(totalPeopleInput.value);
  const t = Number(this.value);

  if (appActive) {
    if (billValue !== 0 && totalPeopleValue !== 0) {
      let totalTipAmt = (t / 100) * billValue;
      let totalBill = totalTipAmt + billValue;
      let billEach = totalBill / totalPeopleValue;
      totalTip.textContent = totalTipAmt.toFixed(2);
      totalPerPerson.textContent = billEach.toFixed(2);
      const activeTipBtn = () => this.classList.replace("bg-pink-800", "bg-pink-600");
      activeTipBtn();
      disableApp();

    } else {
      displayAlertModal();
    }
  }
}

function calcCustomTip() {
  const billValue = Number(billInput.value);
  const totalPeopleValue = Number(totalPeopleInput.value);
  const customTipValue = Number(customInput.value);
  let totalTipAmt = 0,
    totalBill = 0,
    billEach = 0;

  if (appActive) {
    if (billValue !== 0 && totalPeopleValue !== 0) {
      totalTipAmt = (customTipValue / 100) * billValue;
      totalBill = totalTipAmt + billValue;
      billEach = totalBill / totalPeopleValue;
      totalTip.textContent = totalTipAmt.toFixed(2);
      totalPerPerson.textContent = billEach.toFixed(2);
      btnCustomTip.textContent = customTipValue + "%";
      hideCustomForm();
      disableApp();
      // activeBtn();
    }
  }
}

function displayCustomForm() {
  const billValue = Number(billInput.value);
  const totalPeopleValue = Number(totalPeopleInput.value);
  if (appActive)  {
    if (billValue !== 0 && totalPeopleValue !== 0) {
      customForm.classList.remove("hidden");
      overlay.classList.remove("hidden");
    } else {
      displayAlertModal();
    }
  }
}

function hideCustomForm() {
  customForm.classList.add("hidden");
  overlay.classList.add("hidden");
  const activeCustomBtn = () =>
    btnCustomTip.classList.replace("bg-pink-100", "bg-pink-400");
  activeCustomBtn();
}

function displayAlertModal() {
  inputAlert.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function hideOverlay() {
  inputAlert.classList.add("hidden");
  customForm.classList.add("hidden");
  overlay.classList.add("hidden");
}

function disableApp() {
  appActive = false;
  for (let i = 0; i < btnTip.length; i++) {
    btnTip[i].classList.remove("hover:bg-pink-700");
  }
  btnCustomTip.classList.remove("hover:bg-pink-300");
  billInput.setAttribute("disabled", "");
  totalPeopleInput.setAttribute("disabled", "");
}


for (let i = 0; i < btnTip.length; i++) {
  btnTip[i].addEventListener("click", calcTip);
  
}

btnCustomTip.addEventListener("click", displayCustomForm);

btnCalcCustomTip.addEventListener("click", calcCustomTip);

overlay.addEventListener("click", hideOverlay);

for (let i = 0; i < btnCloseOverlay.length; i++) {
  btnCloseOverlay[i].addEventListener("click", hideOverlay);
}

btnReset.addEventListener("click", startApp);
