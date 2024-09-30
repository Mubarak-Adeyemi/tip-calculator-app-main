// DOM Elements
const billInput = document.getElementById("bill");
const tabs = document.querySelectorAll(".tab");
const customTab = document.querySelector(".custom-tab");
const peopleInput = document.getElementById("people");
const billErrorMsg = document.querySelector(".bill");
const peopleErrorMsg = document.querySelector(".people");
const tipAmountOutput = document.getElementById("tip-amount");
const totalAmountOutput = document.getElementById("total-amount");
const resetButton = document.getElementById("reset-btn");

let billValue = 0;
let peopleValue = 0;
let tipValue = 0;

// Calculating tip and total per person
function calculateTip() {
  // Validate input
  if (!isValidInput()) return;

  const tipPerPerson = (billValue * tipValue) / 100 / peopleValue;
  const totalPerPerson = billValue / peopleValue + tipPerPerson;

  updateOutput(tipPerPerson, totalPerPerson);
}

// Updating the output fields
function updateOutput(tipAmount, totalAmount) {
  tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountOutput.textContent = `$${totalAmount.toFixed(2)}`;
}

// Input validation and error handling
function isValidInput() {
  let isValid = true;

  // Validate Bill input
  if (billValue <= 0 || isNaN(billValue)) {
    billErrorMsg.classList.add("invalid");
    billInput.classList.add("invalid");
    isValid = false;
  } else {
    billErrorMsg.classList.remove("invalid");
    billInput.classList.remove("invalid");
  }

  // Validate People input
  if (peopleValue <= 0 || isNaN(peopleValue)) {
    peopleErrorMsg.classList.add("invalid");
    peopleInput.classList.add("invalid");
    isValid = false;
  } else {
    peopleErrorMsg.classList.remove("invalid");
    peopleInput.classList.remove("invalid");
  }

  return isValid;
}

// Event listener for bill input
billInput.addEventListener("input", (e) => {
  billValue = parseFloat(e.target.value) || 0;
  calculateTip();
});

// Event listeners for tip selection buttons
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    tabs.forEach((tab) => {
      tab.classList.remove("active");
      tab.setAttribute("aria-pressed", false); // Set aria-pressed to true for active button
    });
    tab.classList.add("active");
    tab.setAttribute("aria-pressed", "true");

    tipValue = parseFloat(tab.dataset.value);
    customTab.value = ""; // Reset custom tip input
    calculateTip();
  });
});

// Event listener for custom tip input
customTab.addEventListener("input", (e) => {
  tipValue = parseFloat(e.target.value) || 0;
  tabs.forEach((tab) => tab.classList.remove("active")); // Deactivate other buttons
  calculateTip();
});

// Event listener for people input
peopleInput.addEventListener("input", () => {
  peopleValue = parseInt(peopleInput.value) || 0;
  calculateTip();
});

// Reset function to clear inputs and outputs
function resetCalculator() {
  billInput.value = "";
  peopleInput.value = "";
  customTab.value = "";
  tipValue = 0;
  billValue = 0;
  peopleValue = 0;
  tipAmountOutput.textContent = "$0.00";
  totalAmountOutput.textContent = "$0.00";
  tabs.forEach((tab) => tab.classList.remove("active"));
  clearErrorMessages();
}

// Function to clear error messages and styles
function clearErrorMessages() {
  billErrorMsg.classList.remove("invalid");
  billInput.classList.remove("invalid");
  peopleErrorMsg.classList.remove("invalid");
  peopleInput.classList.remove("invalid");
}

// Event listener for reset button
resetButton.addEventListener("click", resetCalculator);
