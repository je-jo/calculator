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
            return b === 0 ?
                alert("This could go on forever... Please enter another number.") :
                divide(a, b);
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
    operator = null;
    inputDisplay.textContent = 0;
    resultDisplay.textContent = 0;
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
        inputValue = e.currentTarget.value;
    }
    if (inputValue.match(/^[0-9]$/) && inputValue !== " ") {  //check if single number, exclude single space
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
    if (operator === "Enter") { //if there is already finished calculation, start over.
        clearAll();
    }
    myNumber += inputValue;
    updateDisplay();
}

function updateDisplay() {
    if (inputValue !== "Enter") {
        if (inputValue === operator) {
            inputDisplay.textContent = "";
            inputDisplay.textContent += `${result} ${operator}`;
        } else if (result) {
            inputDisplay.textContent = `${result} ${operator} ${parseFloat(myNumber)}`;
        } else {
            inputDisplay.textContent = parseFloat(myNumber);
        }
    }
    if (result === null) {
        resultDisplay.textContent = `= `;
    } else {
        resultDisplay.textContent = `= ${result}`;
    }
}

function addDecimal() {

    myNumber = myNumber.toString();
    if (myNumber.includes(".")) {
        return
    }
    else {
        myNumber += ".";
        inputDisplay.textContent += ".";
    }
}

function deleteCharacter() {
    myNumber = myNumber.toString();
    if (operator === "Enter") {
        clearAll();
    }
    if (myNumber.length > 1) {
        myNumber = myNumber.slice(0, -1);
    } else {
        myNumber = 0;
    }
    updateDisplay();
}

function calculate() {
    if (myNumber === ".") {
            myNumber = "0."; //prevent calculations with dot, convert to zero
    }
    if (result === null && myNumber === "") { //prevent operator before number
        return
    }
    else if (operator && myNumber === "") { //prevents errors when clicking operator btns multiple times before second num
        operator = inputValue; //just use the last one clicked
        updateDisplay();
        return
    } else {
        myNumber = parseFloat(myNumber);
        updateDisplay();
    }

    if (result === null) {
        result = parseFloat(myNumber.toFixed(3)); //stores input as first number
    } else {
        result = parseFloat((operate(operator, result, myNumber)).toFixed(3)); //when the 1.num is already stored, do calculation with input as 2.num.
        updateDisplay();
    }
    myNumber = "";
    operator = inputValue; //set operator after calculation, because of chaining.
    updateDisplay()
}

clearAll();