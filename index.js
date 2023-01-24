const operandBtns = document.querySelectorAll("button[data-type=operand]");
const operatorBtns = document.querySelectorAll("button[data-type=operator]");

const deleteBtns = document.querySelector("button[data-type=del]");
const clearBtns = document.querySelector("button[data-type=clear]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[dat-current-operand]");
const output = document.getElementById("display");

let isOperator = false;
let calc = [];


operandBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (output.value == '0') {
            output.value = e.target.value;
        } else if (isOperator) {
            isOperator = false;
            output.value = e.target.value;
        } else if (output.value.includes('.')) {
            output.value = output.value + "" +
                e.target.value.replace('.', '');
        } else {
            output.value = output.value + "" + e.target.value;
        }
    });

})
clearBtns.addEventListener("click", (e) => clear())

function clear() {
    output.value = "0";
    isOperator = false;
    isDecimal = false;
}
deleteBtns.addEventListener('click', (e) => del())

function del() {
    e.target.value.pop();
}

operatorBtns.forEach((btn) => btn.addEventListener('click', e => {
    switch (e.target.value) {
        case "=":
            calc.push(output.value);
            output.value = eval(calc.join(""));

            calc = [];
            break;
        default:
            let last = calc[calc.length - 1];
            if (['*', '/', '+', '-'].includes(last) && isOperator) {
                calc.pop();
                calc.push(e.target.value)
            } else {
                calc.push(output.value);
                calc.push(e.target.value)
            }
            isOperator = true;
            break;
    }
}))