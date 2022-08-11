"use strict";

// FORMS
const customTipForm = document.querySelector(".custom-form");

// INPUTS
const billInput = document.querySelector(".js-bill");
const numberOfPeopleInput = document.querySelector(".js-num-people");
const customTipInput = document.querySelector(".js-custom-tip-input");

// BUTTONS
const btnTip = Array.from(document.getElementsByClassName("js-btn-tip"));
const btnCustomTip = document.querySelector(".js-btn-custom");
const btnReset = document.querySelector(".js-btn-reset");
const btnCalcCustomTip = document.querySelector(".js-btn-calc-custom");
const btnCloseOverlay = Array.from(document.querySelectorAll(".btn-close-overlay"));

// MODALS
const overlay = document.querySelector(".overlay");
const alertModal = document.querySelector(".input-alert");

// DISPLAY RESULT
const totalTipResult = document.querySelector(".js-total-tip-fig");
const totalPerPersonResult = document.querySelector(".js-total-person-fig");




//  //  //  //  //  //  //  //
//  FUNCTIONS

// WORKING
// SET THE INITIAL STATE WHEN THE APP IS LOADED

function initialState() {
    totalTipResult.textContent = "0.00";
    totalPerPersonResult.textContent = "0.00";
    billInput.removeAttribute("disabled", "");
    numberOfPeopleInput.removeAttribute("disabled", "");
    btnCustomTip.textContent = "Custom";

    for (let i = 0; i < btnTip.length; i++) {
        btnTip[i].classList.replace("bg-pink-600", "bg-pink-800");
    }

    btnCustomTip.classList.replace("bg-pink-400", "bg-pink-100");
}


// WORKING
// THIS CLEARS THE INPUT AREAS 
function clearInput() {
    billInput.value = "";
    numberOfPeopleInput.value = "";
    customTipInput.value = "";
}

// WORKING
// THIS RESETS THE APP TO THE INITIAL STATE AND CLEARS ALL INPUT AREAS 
function startApp() {
    // this set required initial states
    initialState();
    clearInput();
}



// WORKING
// THIS GETS THE USER INPUT FROM THE INPUT AREAS
function getUserInputValue() {
  const billValue = Number(billInput.value);
  const numberOfPeople = Number(numberOfPeopleInput.value);
    return {
      billValue,
      numberOfPeople,
    };
};




// WORKING
// VALIDATES USER INPUT
function validateUserInput(billValue, numberOfPeople) {
  if (!billValue && !numberOfPeople) {
    return { valid: false, error: "No valid input is provided" };
  }

  if (!billValue) {
    return { valid: false, error: "bill amount is not provided" };
  }

  if (billValue < 0) {
    return {
    valid: false,
    error: "bill amount should not be less than zero",
    };
  }

  if ((billValue = 0)) {
    return {
      valid: false,
      error: "bill amount should not be equal to zero",
    };
  }

  if (!numberOfPeople) {
    return { valid: false, error: "number of people is not provided" };
  }

  if (numberOfPeople < 0) {
    return {
      valid: false,
      error: "number of people should not be less than zero",
    };
  }

 if ((numberOfPeople = 0)) {
    return {
      valid: false,
      error: "number of people should not be equal to zero",
     };
  }

  return { valid: true, error: "" };
}



// WORKING
// THIS GETS THE CUSTOM TIP VALUE FROM 
function getCustomTip () {
  const selectedTipPercentage = Number(customTipInput.value);
  return {
    selectedTipPercentage,
  };
};


// DESELECTS ANY SELECTED TIP BUTTON
const deselectTipButton = () => {
  btnTip.forEach((btn) =>
    btn.classList.replace("bg-pink-600", "bg-pink-800")
  );
};


// WORKING
// CALCULATES THE TIP AMOUNT AND BILL PER PERSON
function calculateTotalTipAndBillPerPerson(
  billValue,
  numberOfPeople,
  selectedTipPercentage
) {
const totalTipAmount = (selectedTipPercentage / 100) * billValue;
const billPerPerson = (totalTipAmount + billValue) / numberOfPeople;

return {
  totalTipAmount: totalTipAmount.toFixed(2),
  billPerPerson: billPerPerson.toFixed(2),
  };
}



// WORKING
// ENCOMPASSES ALL FUNCTIONS TO CALL WHEN A TIP BUTTON IS CLICKED 
function tipButtonsHandler() {
  // DESELECTS ANY SELECTED TIP BUTTON
  deselectTipButton();
  

  // GET USER INPUT
  const { billValue = 0, numberOfPeople = 0 } = getUserInputValue();


  // VALIDATE ALL USER INPUT
  const { valid, error } = validateUserInput(billValue, numberOfPeople);
  if (valid === false) {
    displayAlertModal(error);
    return;
  }

  // GET TIP VALUE
  const getTipBtnValue = () => {
    const selectedTipPercentage = Number(this.value);
    return {
      selectedTipPercentage,
    };
  };
  const { selectedTipPercentage = 0 } = getTipBtnValue();


  // CALCULATE THE TIP AMOUUNT AND BILL PER PERSON
  const { totalTipAmount, billPerPerson } = calculateTotalTipAndBillPerPerson(
    billValue,
    numberOfPeople,
    selectedTipPercentage
  );

  // PRINT VALUES
  totalTipResult.textContent = totalTipAmount;
  totalPerPersonResult.textContent = billPerPerson;

  // HIGHLIGHTS SELECTED TIP BUTTON
  const selectedTipButton = () => {
    this.classList.replace("bg-pink-800", "bg-pink-600");
  };
  selectedTipButton();
}



function customTipHandler() {
  // GET USER INPUT
  const { billValue = 0, numberOfPeople = 0 } = getUserInputValue();

  // VALIDATE ALL USER INPUT
  const { valid, error } = validateUserInput(billValue, numberOfPeople);
  if (valid === false) {
    displayAlertModal(error);
    return;
  }

  // GET TIP VALUE
  const { selectedTipPercentage = 0 } = getCustomTip();

  // CALCULATE THE TIP AMOUUNT AND BILL PER PERSON
  const { totalTipAmount, billPerPerson } = calculateTotalTipAndBillPerPerson(
    billValue,
    numberOfPeople,
    selectedTipPercentage
  );

  // PRINT VALUES
  totalTipResult.textContent = totalTipAmount;
  totalPerPersonResult.textContent = billPerPerson;
  btnCustomTip.textContent = selectedTipPercentage + "%";

  hidecustomTipForm();
}


// DISPLAY CUSTOM TIP INPUT AREA
function displaycustomTipForm() {
  // GET USER INPUT
  const { billValue = 0, numberOfPeople = 0 } = getUserInputValue();

  // VALIDATE ALL USER INPUT
  const { valid, error } = validateUserInput(billValue, numberOfPeople);
  if (valid === false) {
    displayAlertModal(error);
    return;
  }

  // DESELECT ANY SELECTED TIP BUTTON
  deselectTipButton();

  // DISPLAY CUSTOM TIP INPUT AREA
  customTipForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
}


// HIDE CUSTOM TIP INPUT AREA
function hidecustomTipForm() {
  customTipForm.classList.add("hidden");
  overlay.classList.add("hidden");
  const activeCustomBtn = () =>
    btnCustomTip.classList.replace("bg-pink-100", "bg-pink-400");
  activeCustomBtn();
}



// DISPLAY ERROR MESSAGE
function displayAlertModal(error) {
  alertModal.classList.remove("hidden");
  alertModal.children[0].textContent = error;
  overlay.classList.remove("hidden");
}


// HIDE OVERLAY, ALERT MODAL AND CUSTOM TIP INPUT AREA
function hideOverlay() {
  alertModal.classList.add("hidden");
  customTipForm.classList.add("hidden");
  overlay.classList.add("hidden");
}










// // //  //  //  //  //  //
// EVENT HANDLERS
    
btnTip.forEach(btn => btn.addEventListener("click", tipButtonsHandler));

btnCustomTip.addEventListener("click", displaycustomTipForm);

btnCalcCustomTip.addEventListener("click", customTipHandler);

overlay.addEventListener("click", hideOverlay);

btnCloseOverlay.forEach(btn => btn.addEventListener("click", hideOverlay));

btnReset.addEventListener("click", startApp);