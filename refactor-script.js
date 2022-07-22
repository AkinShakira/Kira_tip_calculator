"use strict";

const billElem = document.querySelector(".js-bill");
let billInput = document.querySelector(".js-bill");

const totalPeopleElem = document.querySelector(".js-num-people");
let totalPeopleInput = document.querySelector(".js-num-people");

const customInput = Number(
  document.querySelector(".js-custom-tip-input").value
);

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
  billElem.removeAttribute("disabled", "");
  totalPeopleElem.removeAttribute("disabled", "");
  function clearInput() {
    billInput.value = "";
    totalPeopleInput.value = "";
  }
  clearInput();
}

function getInputValues() {
  const billValue = Number(billInput.value);
  const totalPeopleValue = Number(totalPeopleInput.value);
}

function displayCustomForm() {
  const billValue = Number(billInput.value);
  const totalPeopleValue = Number(totalPeopleInput.value);

  if (billValue !== 0 && totalPeopleValue !== 0) {
    customForm.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else {
    displayAlertModal();
  }
}

function hideCustomForm() {
  customForm.classList.add("hidden");
  overlay.classList.add("hidden");
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
  billElem.setAttribute("disabled", "");
  totalPeopleElem.setAttribute("disabled", "");
}

// To show the active button... Not working
// function activeBtn() {
//   // for (let i = 0; i < btnTip.length; i++) {
//     btnTip[i].classList.remove("bg-pink-800");
//     btnTip[i].classList.add("bg-pink-100");
// }
// }

function calcTip() {
  const billValue = Number(billInput.value);
  const totalPeopleValue = Number(totalPeopleInput.value);
  // const t = Number(this.value) || Number(
  //   document.querySelector(".js-custom-tip-input").value
  // );
  const t = 10;

  let totalTipAmt = 0,
    totalBill = 0,
    billEach = 0;

  if (billValue !== 0 && totalPeopleValue !== 0) {
    totalTipAmt = (t / 100) * billValue;
    totalBill = totalTipAmt + billValue;
    billEach = totalBill / totalPeopleValue;
    totalTip.textContent = totalTipAmt.toFixed(2);
    totalPerPerson.textContent = billEach.toFixed(2);
  }
}

function definedTip() {
  // const billValue = Number(billInput.value);
  // const totalPeopleValue = Number(totalPeopleInput.value);
  // console.log(billValue, totalPeopleValue);
  // const t = Number(this.value);

  if (appActive) {
    // if (billValue !== 0 && totalPeopleValue !== 0) {
    //   let totalTipAmt = (t / 100) * billValue;
    //   let totalBill = totalTipAmt + billValue;
    //   let billEach = totalBill / totalPeopleValue;
    //   totalTip.textContent = totalTipAmt.toFixed(2);
    //   totalPerPerson.textContent = billEach.toFixed(2);
    // To show the active button... Not working
    // activeBtn();
    calcTip();
    disableApp();
  } else {
    displayAlertModal();
  }
}

function CustomTip() {
  // const billValue = Number(billInput.value);
  // const totalPeopleValue = Number(totalPeopleInput.value);
  // const t = Number(
  //   document.querySelector(".js-custom-tip-input").value
  // );
  // let totalTipAmt = 0,
  // totalBill = 0,
  // billEach = 0;

  if (appActive) {
    //   billValue !== 0 && totalPeopleValue !== 0 && {
    //     totalTipAmt = (t / 100) * billValue;
    //     totalBill = totalTipAmt + billValue;
    //     billEach = totalBill / totalPeopleValue;
    //   }
    // }
    calcTip();
    // totalTip.textContent = totalTipAmt.toFixed(2);
    // totalPerPerson.textContent = billEach.toFixed(2);
    hideCustomForm();
    btnCustomTip.textContent = customInput + "%";
    // activeBtn();
    disableApp();
  }
}

for (let i = 0; i < btnTip.length; i++) {
  btnTip[i].addEventListener("click", definedTip.bind(btnTip[i]));
  // To show the active button... Not working
  // btnTip[i].addEventListener('click', activeBtn);
}

btnCustomTip.addEventListener("click", () => {
  if (appActive) {
    displayCustomForm();
  }
});

btnCalcCustomTip.addEventListener("click", CustomTip.bind(btnCalcCustomTip));

overlay.addEventListener("click", hideOverlay);

btnReset.addEventListener("click", startApp);

for (let i = 0; i < btnCloseOverlay.length; i++) {
  btnCloseOverlay[i].addEventListener("click", hideOverlay);
}
