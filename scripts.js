"use strict";

// // to be deleted
const billElem = document.querySelector(".js-bill");
const billValue = Number(document.querySelector(".js-bill").value);

const totalPeopleElem = document.querySelector(".js-num-people");
const totalPeopleValue = Number(document.querySelector(".js-num-people").value);

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



// function startingValues() {
//   billValue = 0;
//   totalPeopleValue = 0;
//   totalTip.textContent = 0;
//   totalPerPerson.textContent = 0;
//   appActive = true; 
// }

function displayCustomForm() {
  const billValue = Number(document.querySelector(".js-bill").value);
  const totalPeopleValue = Number(document.querySelector(".js-num-people").value);

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
  };
  btnCustomTip.classList.remove("hover:bg-pink-300");
  billElem.setAttribute('disabled', '');
  totalPeopleElem.setAttribute("disabled", "");
};
  

function calcTip() {
  const billValue = Number(document.querySelector(".js-bill").value);
  const totalPeopleValue = Number(document.querySelector(".js-num-people").value);
  const t = Number(this.value);

  if (appActive){
    if (billValue !== 0 && totalPeopleValue !== 0) {
      let totalTipAmt = (t / 100) * billValue;
      let totalBill = totalTipAmt + billValue;
      let billEach = totalBill / totalPeopleValue;
      totalTip.textContent = totalTipAmt.toFixed(2);
      totalPerPerson.textContent = billEach.toFixed(2);
      disableApp();
    } else {
      displayAlertModal();
    }
  }
}

function calcCustomTip() {
  const billValue = Number(document.querySelector(".js-bill").value);
  const totalPeopleValue = Number(document.querySelector(".js-num-people").value);
  const customInput = Number(
    document.querySelector(".js-custom-tip-input").value
  );
  let totalTipAmt = 0,
    totalBill = 0,
    billEach = 0;

  if (appActive) {
    if (billValue !== 0 && totalPeopleValue !== 0) {
      totalTipAmt = (customInput / 100) * billValue;
      totalBill = totalTipAmt + billValue;
      billEach = totalBill / totalPeopleValue;
      hideCustomForm();
    }
  }

  totalTip.textContent = totalTipAmt.toFixed(2);
  totalPerPerson.textContent = billEach.toFixed(2);
  btnCustomTip.textContent = customInput + "%";
  disableApp();
}




for (let i = 0; i < btnTip.length; i++) {
  btnTip[i].addEventListener("click", calcTip);
}

btnCustomTip.addEventListener("click", () => {
  if (appActive) {
    displayCustomForm();
  }
});

btnCalcCustomTip.addEventListener("click", calcCustomTip);

overlay.addEventListener("click", hideOverlay);

for (let i = 0; i < btnCloseOverlay.length; i++) {
  btnCloseOverlay[i].addEventListener("click", hideOverlay);
}

btnReset.addEventListener('click', startingValues)