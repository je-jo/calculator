function add(a, b) { return a + b };
function substract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) { return a / b }

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b)
    } else if (operator === "-") {
        return substract(a, b)
    } else if (operator === "*") {
        return multiply(a, b)
    } else if (operator === "/") {
        return divide(a, b)
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
    inputDisplay.textContent = "";
}

const btnClear = document.querySelector(".clear");
btnClear.addEventListener("click", clearAll);


const digits = document.querySelectorAll(".digit");
digits.forEach(digit => {
    digit.addEventListener("click", makeNumber)
});

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", calculate)
});

function makeNumber(e) {
    myNumber = myNumber.concat(e.currentTarget.textContent);
    inputDisplay.textContent += +e.currentTarget.textContent;
}

function calculate(e) {
    if (result === 0) {
        result = Number(myNumber);
    } else {
        result = operate(operator, result, Number(myNumber));
    }
    inputDisplay.textContent = ""
    inputDisplay.textContent += `${result} ${e.currentTarget.textContent} `;
    resultDisplay.textContent = result;
    myNumber = "";
    operator = e.currentTarget.textContent;
}

const equals = document.querySelector(".equals");
equals.addEventListener("click", function (e) {
    result = operate(operator, result, Number(myNumber));
    inputDisplay.textContent += ` ${e.currentTarget.textContent} `;
    resultDisplay.textContent = result;
})

clearAll();