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
            return divide(a, b);
        default:
            return a;
    }
}

const inputDisplay = document.querySelector(".display__input");
const resultDisplay = document.querySelector(".display__result");
let result;
let myNumber;
let operator;

// clear all

const btnClear = document.querySelector(".clear");
btnClear.addEventListener("click", clearAll);

function clearAll() {
    result = null;
    myNumber = "";
    resultDisplay.textContent = result;
    inputDisplay.textContent = result;
}

// get number input and store it

const digits = document.querySelectorAll(".digit");
digits.forEach(digit => {
    digit.addEventListener("click", buildString);
});

function buildString(e) {
    /* console.log(e)
    console.log(e.type)
    console.log(e.key) */
    myNumber = myNumber.toString();
    if (e.type === "click") {
        myNumber += e.currentTarget.value;
    } else {
        myNumber += e.key
    }
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

// decimal button

const dot = document.querySelector(".decimal");
dot.addEventListener("click", addDecimal);

function addDecimal() {
    myNumber = myNumber.toString();
    if (myNumber.includes(".")) {
        return
    } else {
        myNumber += ".";
        inputDisplay.textContent += ".";
    }
}

// backspace button

const btnBackspace = document.querySelector(".backspace");
btnBackspace.addEventListener("click", deleteCharacter)

function deleteCharacter() {
    myNumber = myNumber.toString();
    if (myNumber.length > 1) {
        myNumber = myNumber.slice(0, -1);
    } else {
        myNumber = 0;
    }
    updateDisplay();
}

// do calculations 

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", calculate);
});

function calculate(e) {
    console.log(operator)
    if (result === null && myNumber === "") {
        return
    }
    else if (operator && myNumber === "") { //prevents errors when clicking operator btns multiple times
        operator = e.currentTarget.textContent; //just use the last one clicked
        updateDisplay();
    } else {
        myNumber = parseFloat(myNumber);
        resultDisplay.textContent = myNumber;
        if (result === Infinity) {  //if divide by zero clear all
            alert(`Nope! Starting over.`);
            clearAll();
        } else if (result === null) {
            result = myNumber; //stores input as first number
        } else {
            result = operate(operator, result, myNumber); //when the 1.num is already stored, do calculation with input as 2.num.
            resultDisplay.textContent = `= ${+result.toFixed(3)}`;
        }
        myNumber = "";
        operator = e.currentTarget.textContent; //set operator after calculation, because of chaining.
        if (operator !== "=") {
            inputDisplay.textContent += ` ${operator}`;
        }
    }

}

clearAll();

/*window.addEventListener("keydown", function(e) {
    if (/\d/.test(e.key)) {
        buildString()
    }
}); */

window.addEventListener("keydown", buildString)


