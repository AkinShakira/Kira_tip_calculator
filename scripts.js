"use strict";

// // to be deleted
// const bill = Number(document.querySelector(".js-bill").value);
// const totalPeople = document.querySelector(".js-num-people").value;
// const customInput = Number(
//   document.querySelector(".js-custom-tip-input").value
// );

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

function displayCustomForm() {
  const bill = Number(document.querySelector(".js-bill").value);
  const totalPeople = Number(document.querySelector(".js-num-people").value);

  if (bill !== 0 && totalPeople !== 0) {
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

function calcTip() {
  const bill = Number(document.querySelector(".js-bill").value);
  const totalPeople = Number(document.querySelector(".js-num-people").value);
  const t = Number(this.value);

  if (bill !== 0 && totalPeople !== 0) {
    let totalTipAmt = (t / 100) * bill;
    let totalBill = totalTipAmt + bill;
    let billEach = totalBill / totalPeople;
    totalTip.textContent = totalTipAmt.toFixed(2);
    totalPerPerson.textContent = billEach.toFixed(2);
  } else {
    displayAlertModal();
  }
}

function calcCustomTip() {
  const bill = Number(document.querySelector(".js-bill").value);
  const totalPeople = Number(document.querySelector(".js-num-people").value);
  const customInput = Number(
    document.querySelector(".js-custom-tip-input").value
  );
  let totalTipAmt = 0,
    totalBill = 0,
    billEach = 0;

  if (bill !== 0 && totalPeople !== 0) {
    totalTipAmt = (customInput / 100) * bill;
    totalBill = totalTipAmt + bill;
    billEach = totalBill / totalPeople;
    hideCustomForm();
  }

  totalTip.textContent = totalTipAmt.toFixed(2);
  totalPerPerson.textContent = billEach.toFixed(2);
  btnCustomTip.textContent = customInput + "%";
}

function resetApp() {}



for (let i = 0; i < btnTip.length; i++) {
  btnTip[i].addEventListener("click", calcTip);
}

btnCustomTip.addEventListener("click", displayCustomForm);

btnCalcCustomTip.addEventListener("click", calcCustomTip);

overlay.addEventListener("click", hideOverlay);

for (let i = 0; i < btnCloseOverlay.length; i++) {
  btnCloseOverlay[i].addEventListener("click", hideOverlay);
}
