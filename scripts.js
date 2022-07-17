'use strict';

// // to be deleted
// const bill = Number(document.querySelector(".js-bill").value);
// const totalPeople = document.querySelector(".js-num-people").value;
// const customInput = Number(
//   document.querySelector(".js-custom-tip-input").value
// );


const tip5 = document.querySelector('.js-btn-5');
const tip10 = document.querySelector('.js-btn-10');
const tip15 = document.querySelector('.js-btn-15');
const tip25 = document.querySelector('.js-btn-25');
const tip50 = document.querySelector('.js-btn-50');
const btnCustomTip = document.querySelector('.js-btn-custom');
const totalTip = document.querySelector('.js-total-tip-fig');
const totalPerPerson = document.querySelector('.js-total-person-fig');
const btnReset = document.querySelector(".js-btn-reset");
const btnCalcCustomTip = document.querySelector('.js-btn-calc-custom');
const customForm = document.querySelector('.custom-form');
const overlay = document.querySelector('.overlay');
const inputAlert = document.querySelector('.input-alert');


function toggleOverlay() {
  customForm.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}


function alertModal() {
  inputAlert.classList.remove("hidden");
  overlay.classList.remove("hidden");
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
  }
  else {
    alertModal();
  }

};


function CalcCustomTip() {
  const bill = Number(document.querySelector(".js-bill").value);
  const totalPeople = Number(document.querySelector(".js-num-people").value);
  const customInput = Number(document.querySelector('.js-custom-tip-input').value);
  let totalTipAmt = 0, totalBill = 0, billEach = 0;


 if (bill !== 0 && totalPeople !== 0) {
   totalTipAmt = (customInput / 100) * bill;
   totalBill = totalTipAmt + bill;
   billEach = totalBill / totalPeople;
   toggleOverlay();
 }
 else {
   alertModal();
 }  

  totalTip.textContent = totalTipAmt.toFixed(2);
  totalPerPerson.textContent = billEach.toFixed(2);
  btnCustomTip.textContent = customInput + "%"; 
};




tip5.addEventListener("click", calcTip);
tip10.addEventListener("click", calcTip);
tip15.addEventListener("click", calcTip);
tip25.addEventListener("click", calcTip);
tip50.addEventListener("click", calcTip);
btnCustomTip.addEventListener('click', toggleOverlay);
btnCalcCustomTip.addEventListener('click', CalcCustomTip);





// Trying to select all buttons once and add eventlistner to the group
// const btnTip = document.querySelectorAll(".js-btn-tip");
// const btnTip = document.getElementsByClassName("js-btn-tip");
// eachBtnTip.onClick = eachBtnTip.map(calcTip);
// console.log(btnTip);
// console.log(eachBtnTip);