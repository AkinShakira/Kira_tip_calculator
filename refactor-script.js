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
const btnCloseOverlay = document.querySelectorAll(".btn-close-overlay");

// MODALS
const overlay = document.querySelector(".overlay");
const alertModal = document.querySelector(".input-alert");

// DISPLAY RESULT
const totalTipResult = document.querySelector(".js-total-tip-fig");
const totalPerPersonResult = document.querySelector(".js-total-person-fig");

let appActive = true;


// WORKING
function initialState() {
    appActive = true;
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
function clearInput() {
    billInput.value = "";
    numberOfPeopleInput.value = "";
    customTipInput.value = "";
}

// WORKING
function startApp() {
    // this set required initial states
    initialState();
    clearInput();
}



// NOT WORKING
//  NOT GETTING BUTTON VALUE
// ORIGINAL 
function getUserInputValue(event, { isCustom = false } = {}) {
    //         console.log(event.target);
    //     console.log(event.target.value);


    //     const billValue = Number(billInput.value);
    //     const selectedTipPercentage = isCustom
    //       ? Number(customTipInput.value)
    //       : Number(event.target.value);
    //     const numberOfPeople = Number(numberOfPeopleInput.value);

    //     return {
    //     selectedTipPercentage,
    //     billValue,
    //     numberOfPeople,
    //     };
    // };


    function getUserInputValue() {
        const billValue = Number(billInput.value);
        const numberOfPeople = Number(numberOfPeopleInput.value);
        return {
            billValue,
            numberOfPeople,
        };
    };



    // // SEPARATE GET TIP  FXN OUT

    function getTipValue(event, { isCustom = false } = {}) {

        console.log(event.target);
        console.log(event.target.value);
        const selectedTipPercentage = isCustom
            ? Number(customTipInput.value)
            : Number(event.target.value);

        return {
            selectedTipPercentage,
        };
    }









    //  WORKING
    // validation will throw error if invalid
    // when any of the validation fails it returns it doesn't check all rules
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
  
        if (billValue = 0) {
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

        if (numberOfPeople = 0) {
            return {
                valid: false,
                error: "number of people should not be equal to zero",
            };
        }
        return { valid: true, error: "" };
    }


    // WORKING
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






    // NOT WORKING
    // const  selectedTipButton = () => {
    //     this.classList.replace("bg-pink-800", "bg-pink-600");
    // }
    // // todo change mouse cursor


    // NOT WORKING
    // handle all tips button click event
    function tipButtonsHandler(event) {

        // // ORIGINAL
        //         if (!appActive) return;
        //     const {
        //     billValue = 0,
        //     selectedTipPercentage = 0,
        //     numberOfPeople = 0,
        //   } = getUserInputValue({ isCustom: false });

        //     console.log(this)
  
        //   console.log(selectedTipPercentage, billValue, numberOfPeople);

    
    
        // if (!appActive) return;
        // const {
        //   billValue = 0,
        //   selectedTipPercentage = 0,
        //   numberOfPeople = 0,
        // } = getUserInputValue(event, { isCustom: false });

        // console.log(this);

        // console.log(selectedTipPercentage, billValue, numberOfPeople);

    
    

        if (!appActive) return;
        const {
            billValue = 0,
            numberOfPeople = 0,
        } = getUserInputValue();


        console.log(event.target);

        console.log(billValue, numberOfPeople);

    
        const { selectedTipPercentage = 0 } = getTipValue(event, { isCustom: false });



    
    
        //  WORKING
        // validate input
        const { valid, error } = validateUserInput(billValue, numberOfPeople);
        console.log({ valid, error })
        if (valid === false) {
            displayAlertModal(error);
            return;
        }

        const { totalTipAmount, billPerPerson } = calculateTotalTipAndBillPerPerson(
            billValue,
            numberOfPeople,
            selectedTipPercentage
        );

        // print values
        totalTipResult.textContent = totalTipAmount;
        totalPerPersonResult.textContent = billPerPerson;
        console.log(
            billValue,
            numberOfPeople,
            selectedTipPercentage,
            totalTipAmount,
            billPerPerson
        );

        //   selectedTipButton();

        // REMOVE THIS
        disableApp();

        //
    }


    // handles the custom tip button
    function calcCustomTip() {
        if (!appActive) return;
        const {
            billValue = 0,
            selectedTipPercentage = 0,
            numberOfPeople = 0,
        } = getUserInputValue({ isCustom: true });


        // validate input
        const { valid, error } = validateUserInput(billValue, numberOfPeople);
        if (valid === false) {
            displayAlertModal(error);
            return;
        }

        const { totalTipAmount, billPerPerson } = calculateTotalTipAndBillPerPerson(
            billValue,
            numberOfPeople,
            selectedTipPercentage
        );

        // print values
        totalTipResult.textContent = totalTipAmount;
        totalPerPersonResult.textContent = billPerPerson;
        btnCustomTip.textContent = selectedTipPercentage + "%";

        hidecustomTipForm();

    
        // REMOVE THIS
        disableApp();
    }




    function displayAlertModal(error) {
        alertModal.classList.remove("hidden");
        alertModal.children[0].textContent = error;
        overlay.classList.remove("hidden");
    }

    function hideOverlay() {
        alertModal.classList.add("hidden");
        customTipForm.classList.add("hidden");
        overlay.classList.add("hidden");
    }


    // REMOVE THIS
    function disableApp() {
        appActive = false;
        for (let i = 0; i < btnTip.length; i++) {
            btnTip[i].classList.remove("hover:bg-pink-700");
        }
        btnCustomTip.classList.remove("hover:bg-pink-300");
        billInput.setAttribute("disabled", "");
        numberOfPeopleInput.setAttribute("disabled", "");
    }



    // function displaycustomTipForm() {
    //   const billValue = Number(billInput.value);
    //   const numberOfPeople = Number(numberOfPeopleInput.value);
    //   if (appActive) {
    //     if (billValue !== 0 && numberOfPeople !== 0) {
    //       customTipForm.classList.remove("hidden");
    //       overlay.classList.remove("hidden");
    //     } else {
    //       displayAlertModal(error);
    //     }
    //   }
    // }



    function displaycustomTipForm() {
        if (!appActive) return;
        const {
            billValue = 0,
            numberOfPeople = 0,
        } = getUserInputValue();

        const { valid, error } = validateUserInput(billValue, numberOfPeople);
        if (valid === false) displayAlertModal(error);
        else {
            customTipForm.classList.remove("hidden");
            overlay.classList.remove("hidden");
        }
    }

    function hidecustomTipForm() {
        customTipForm.classList.add("hidden");
        overlay.classList.add("hidden");
        const activeCustomBtn = () =>
            btnCustomTip.classList.replace("bg-pink-100", "bg-pink-400");
        activeCustomBtn();
    }




    // EVENT HANDLERS
    // btnTip.forEach((btn) =>
    //   btn.addEventListener("click", getUserInputValue.bind(btn))
    // );


    btnTip.forEach(function (btn) {
        btn.addEventListener("click", function (event) {
            getTipValue(event, { isCustom: false })
        })
    });


    // btnTip.forEach(function (btn) {
    //     btn.addEventListener("click", function (event) {
    //          tipButtonsHandler;
    //      });
    // });


    
    btnTip.forEach(function (event, btn) {
        btn.addEventListener("click", tipButtonsHandler(event));
    });

    // btnTip.forEach(btn => btn.addEventListener("click", tipButtonsHandler))

    btnCustomTip.addEventListener("click", displaycustomTipForm);

    btnCalcCustomTip.addEventListener("click", calcCustomTip);

    overlay.addEventListener("click", hideOverlay);

    for (let i = 0; i < btnCloseOverlay.length; i++) {
        btnCloseOverlay[i].addEventListener("click", hideOverlay);
    }

    btnReset.addEventListener("click", startApp);










































    // /////////////////////////////////
    // const billInput = document.querySelector(".js-bill");
    // const numberOfPeopleInput = document.querySelector(".js-num-people");
    // const customTipInput = document.querySelector(".js-custom-tip-input");

    // const btnTip = document.querySelectorAll(".js-btn-tip");
    // const btnCustomTip = document.querySelector(".js-btn-custom");
    // const totalTipResult = document.querySelector(".js-total-tip-fig");
    // const totalPerPersonResult = document.querySelector(".js-total-person-fig");
    // const btnReset = document.querySelector(".js-btn-reset");
    // const btnCalcCustomTip = document.querySelector(".js-btn-calc-custom");
    // const customTipForm = document.querySelector(".custom-form");
    // const overlay = document.querySelector(".overlay");
    // const alertModal = document.querySelector(".input-alert");
    // const btnCloseOverlay = document.querySelectorAll(".btn-close-overlay");
    // let appActive = true;

    // function startApp() {
    //   appActive = true;
    //   totalTipResult.textContent = "0.00";
    //   totalPerPersonResult.textContent = "0.00";
    //   billInput.removeAttribute("disabled", "");
    //   numberOfPeopleInput.removeAttribute("disabled", "");
    //   btnCustomTip.textContent = "Custom";
    //   for (let i = 0; i < btnTip.length; i++)
    //     btnTip[i].classList.replace("bg-pink-600", "bg-pink-800");
    //   btnCustomTip.classList.replace("bg-pink-400", "bg-pink-100");
    //   function clearInput() {
    //     billInput.value = "";
    //     numberOfPeopleInput.value = "";
    //     customTipInput.value = "";
    //   }
    //   clearInput();
    // }

    // function getInputValues() {
    //   const billValue = Number(billInput.value);
    //   const numberOfPeople = Number(numberOfPeopleInput.value);
    // }

    // function calcTip() {
    //   const billValue = Number(billInput.value);
    //   const numberOfPeople = Number(numberOfPeopleInput.value);
    //   const t = Number(this.value);

    //   if (appActive) {
    //     if (billValue !== 0 && numberOfPeople !== 0) {
    //       let totalTipAmt = (t / 100) * billValue;
    //       let totalBill = totalTipAmt + billValue;
    //       let billEach = totalBill / numberOfPeople;
    //       totalTipResult.textContent = totalTipAmt.toFixed(2);
    //       totalPerPersonResult.textContent = billEach.toFixed(2);
    //       const activeTipBtn = () =>
    //         this.classList.replace("bg-pink-800", "bg-pink-600");
    //       activeTipBtn();
    //       disableApp();
    //     } else {
    //       displayAlertModal();
    //     }
    //   }
    // }

    // function calcCustomTip() {
    //   const billValue = Number(billInput.value);
    //   const numberOfPeople = Number(numberOfPeopleInput.value);
    //   const customTipValue = Number(customTipInput.value);
    //   let totalTipAmt = 0,
    //     totalBill = 0,
    //     billEach = 0;

    //   if (appActive) {
    //     if (billValue !== 0 && numberOfPeople !== 0) {
    //       totalTipAmt = (customTipValue / 100) * billValue;
    //       totalBill = totalTipAmt + billValue;
    //       billEach = totalBill / numberOfPeople;
    //       totalTipResult.textContent = totalTipAmt.toFixed(2);
    //       totalPerPersonResult.textContent = billEach.toFixed(2);
    //       btnCustomTip.textContent = customTipValue + "%";
    //       hidecustomTipForm();
    //       disableApp();
      
    //     }
    //   }
    // }

    // function displaycustomTipForm() {
    //   const billValue = Number(billInput.value);
    //   const numberOfPeople = Number(numberOfPeopleInput.value);
    //   if (appActive) {
    //     if (billValue !== 0 && numberOfPeople !== 0) {
    //       customTipForm.classList.remove("hidden");
    //       overlay.classList.remove("hidden");
    //     } else {
    //       displayAlertModal();
    //     }
    //   }
    // }

    // function hidecustomTipForm() {
    //   customTipForm.classList.add("hidden");
    //   overlay.classList.add("hidden");
    //   const activeCustomBtn = () =>
    //     btnCustomTip.classList.replace("bg-pink-100", "bg-pink-400");
    //   activeCustomBtn();
    // }

    // function displayAlertModal() {
    //   alertModal.classList.remove("hidden");
    //   overlay.classList.remove("hidden");
    // }

    // function hideOverlay() {
    //   alertModal.classList.add("hidden");
    //   customTipForm.classList.add("hidden");
    //   overlay.classList.add("hidden");
    // }

    // function disableApp() {
    //   appActive = false;
    //   for (let i = 0; i < btnTip.length; i++) {
    //     btnTip[i].classList.remove("hover:bg-pink-700");
    //   }
    //   btnCustomTip.classList.remove("hover:bg-pink-300");
    //   billInput.setAttribute("disabled", "");
    //   numberOfPeopleInput.setAttribute("disabled", "");
    // }

    // for (let i = 0; i < btnTip.length; i++) {
    //   btnTip[i].addEventListener("click", calcTip);
    // }

    // btnCustomTip.addEventListener("click", displaycustomTipForm);

    // btnCalcCustomTip.addEventListener("click", calcCustomTip);

    // overlay.addEventListener("click", hideOverlay);

    // for (let i = 0; i < btnCloseOverlay.length; i++) {
    //   btnCloseOverlay[i].addEventListener("click", hideOverlay);
    // }

    // btnReset.addEventListener("click", startApp)
}