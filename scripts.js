'use strict';

// // to be deleted
// const bill = Number(document.querySelector(".js-bill").value);
// const totalPeople = document.querySelector(".js-num-people").value;
// 

const tip5 = document.querySelector('.js-btn-5');
const tip10 = document.querySelector('.js-btn-10');
const tip15 = document.querySelector('.js-btn-15');
const tip25 = document.querySelector('.js-btn-25');
const tip50 = document.querySelector('.js-btn-50');
const customTip = document.querySelector('.js-btn-custom');
const totalTip = document.querySelector('.js-total-tip-fig');
const totalPerPerson = document.querySelector('.js-total-person-fig');
const btnReset = document.querySelector(".js-btn-reset");



function calcTip() {
  const bill = Number(document.querySelector(".js-bill").value);
  const totalPeople = Number(document.querySelector(".js-num-people").value);
  const t = Number(this.value);
  let totalTipAmt = (t / 100) * bill;
  let totalBill = totalTipAmt + bill;
  let billEach = totalBill / totalPeople;
  totalTip.textContent = totalTipAmt.toFixed(2);
  totalPerPerson.textContent = billEach.toFixed(2);


  console.log(totalTipAmt, totalBill, billEach);
};

tip5.addEventListener('click', calcTip);
tip10.addEventListener("click", calcTip);
tip15.addEventListener("click", calcTip);
tip25.addEventListener("click", calcTip);
tip50.addEventListener("click", calcTip);





// calcTip(5, 200);