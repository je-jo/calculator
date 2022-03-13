const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return b === 0 ? 42 : divide(a, b);
        default:
            return a;
    }
}

const inputDisplay = document.querySelector(".display__input");
const resultDisplay = document.querySelector(".display__result");
let inputValue;
let result;
let myNumber;
let operator;

// clear all

function clearAll() {
    result = null;
    myNumber = "";
    resultDisplay.textContent = 0;
    inputDisplay.textContent = 0;
}

// get value from clicks or keyboard and run appropriate func

window.addEventListener("keydown", getValue)

const buttons = document.querySelectorAll("button");
buttons.forEach(btn => {
    btn.addEventListener("click", getValue);
});

function getValue(e) {
    if (e.type === "keydown") {
        inputValue = e.key;
    } else if (e.type = "click") {
        inputValue = e.currentTarget.textContent;
    }
    if (isFinite(inputValue)) {  //check if number 
        console.log(e.key)
        buildString();
    } else if (inputValue.match(/[+\-*/]/) || inputValue === "Enter") {
        e.preventDefault();
        calculate();
    } else if (inputValue === ".") {
        addDecimal();
    } else if (inputValue === "Backspace") {
        deleteCharacter();
    } else if (inputValue === "Delete") {
        clearAll()
    } else {
        return
    }
}

function buildString() {
    myNumber = myNumber.toString();
    myNumber += inputValue
    updateDisplay();
}

function updateDisplay() {
    if (result && operator) {
        inputDisplay.textContent = `${result} ${operator} ${myNumber}`;
    } else {
        inputDisplay.textContent = parseFloat(myNumber);
    }
    resultDisplay.textContent = "=";
}

function addDecimal() {
    myNumber = myNumber.toString();
    if (myNumber.includes(".")) {
        return
    } else {
        myNumber += ".";
        inputDisplay.textContent += ".";
    }
}

function deleteCharacter() {
    myNumber = myNumber.toString();
    if (myNumber.length > 1) {
        myNumber = myNumber.slice(0, -1);
    } else {
        myNumber = 0;
    }
    updateDisplay();
}

function calculate() {
    if (result === null && myNumber === "") { //prevent operator before number
        return
    }
    else if (operator && myNumber === "") { //prevents errors when clicking operator btns multiple times
        operator = inputValue; //just use the last one clicked
        updateDisplay();
        return
    } else {
        myNumber = parseFloat(myNumber);
        resultDisplay.textContent = myNumber;
    }

    if (result === null) {
        result = myNumber; //stores input as first number
    } else {
        result = operate(operator, result, myNumber); //when the 1.num is already stored, do calculation with input as 2.num.
        resultDisplay.textContent = `= ${+result.toFixed(3)}`;
        /* if (result === Infinity) {  //if divide by zero clear all
            alert(`Nope! Starting over.`);
            clearAll();
        } */
    }
    myNumber = "";
    operator = inputValue; //set operator after calculation, because of chaining.
    if (operator !== "Enter") {
        inputDisplay.textContent += ` ${operator}`;
    }
}

clearAll();


