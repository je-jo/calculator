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

let operator;
const inputDisplay = document.querySelector(".inputted");
const resultDisplay = document.querySelector(".result");
//let firstNumber = "";
let secondNumber;
let lengthToSlice;
inputDisplay.textContent = "";

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", function (e) {
        if (e.currentTarget.textContent.match(/\d/)) {
            if (!(typeof firstNumber === "number")) {
                inputDisplay.textContent += e.currentTarget.textContent
                firstNumber = inputDisplay.textContent;
            } else {
                inputDisplay.textContent += e.currentTarget.textContent
                secondNumber = inputDisplay.textContent.slice(lengthToSlice);
            }

        } else if (e.currentTarget.textContent.match(/\D/)) {
            operator = e.currentTarget.textContent;
            firstNumber = Number(firstNumber);
            lengthToSlice = (firstNumber.toString().length) + 3;
            inputDisplay.textContent = firstNumber;
            inputDisplay.textContent += ` ${e.currentTarget.textContent} `;
            resultDisplay.textContent = operate(operator, firstNumber, Number(secondNumber));
        }
    });
});

// const operators = document.querySelectorAll(".operator");

// operators.forEach(operator => {
//     operator.addEventListener("click", function (e) {
//         firstNumber = Number(firstNumber);
//         inputDisplay.textContent = firstNumber;
//         inputDisplay.textContent += ` ${e.currentTarget.textContent} `;
//         if (e.currentTarget.textContent === "+") {
//             operator = "plus"
//         } else if (e.currentTarget.textContent === "-") {
//             operator = "minus"
//         } else if (e.currentTarget.textContent === "*") {
//             operator = "times"
//         } else if (e.currentTarget.textContent === "/") {
//             operator = "dividedby"
//         }
//         console.log(operator)
//         return operator;
// });
// });

// const equals = document.querySelector(".equals");

// equals.addEventListener("click", operate);


resultDisplay.textContent = "imaresult";