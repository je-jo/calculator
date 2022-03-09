function add(a, b) { return a + b };
function substract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) { return a / b };

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return substract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    } else if (operator === "=") {

        return a;
    }
}

const inputDisplay = document.querySelector(".display__input");
const resultDisplay = document.querySelector(".display__result");
let result;
let myNumber;
let operator;

function clearAll() {
    result = 0;
    myNumber = "";
    resultDisplay.textContent = result;
    inputDisplay.textContent = result;
}

const btnClear = document.querySelector(".clear");
btnClear.addEventListener("click", clearAll);




const digits = document.querySelectorAll(".digit");
digits.forEach(digit => {
    digit.addEventListener("click", populateDisplay)
});

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", calculate)
});

function populateDisplay(e) {
    /* if (e.currentTarget.value === "0." && myNumber.includes(".")) {
        return
     } */
    myNumber += e.currentTarget.value;
    if (result && operator) {
        inputDisplay.textContent = `${result} ${operator} ${parseFloat(myNumber)}`;
    } else {
        inputDisplay.textContent = parseFloat(myNumber);
    }
    resultDisplay.textContent = "=";
}

const dot = document.querySelector(".decimal");
dot.addEventListener("click", makeFloat)

function makeFloat() {
    myNumber += ".";
    //myNumber = parseFloat(myNumber);
}

const btnBackspace = document.querySelector(".backspace");
btnBackspace.addEventListener("click", function () {
    myNumber = myNumber.slice(0, -1);
});

function calculate(e) {
    resultDisplay.textContent = parseFloat(myNumber);
    if (result === 0) {
        result = parseFloat(myNumber);
    } else {
        result = operate(operator, result, parseFloat(myNumber));
    }
    if (e.currentTarget.textContent !== "=") {
        inputDisplay.textContent = "";
        inputDisplay.textContent += `${result} ${e.currentTarget.textContent} `;
    }
    if (result === Infinity) {
        resultDisplay.textContent = `Nope!`;
        result = 0;
    } else {
        resultDisplay.textContent = `= ${result}`;
    }
    myNumber = "";
    operator = e.currentTarget.textContent;
    console.log(`result is ${result} operator is ${operator} mynymber is ${myNumber}`)
}

clearAll();