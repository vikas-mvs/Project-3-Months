const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let input = "";

/*  Button Click Handling */
buttons.forEach((btn) => {
btn.addEventListener("click", () => {
    const value = btn.textContent;

    //  AC (All Clear)
    if (value === "AC") {
    input = "";
    display.textContent = "0";
    return;
    }

    // ⌫ Delete last character
    if (value === "⌫") {
    input = input.slice(0, -1);
    display.textContent = input || "0";
    return;
    }

    // ⚡ Equal button
    if (value === "=") {
    try {
        input = calculate(input).toString();
        display.textContent = input;
    } catch (err) {
        display.textContent = "Error";
        input = "";
    }
    return;
    }

    //  Prevent multiple operators in a row
    if (isOperator(value)) {
    if (input === "") return;

    const lastChar = input[input.length - 1];
    if (isOperator(lastChar)) {
        input = input.slice(0, -1);
    }
}

    input += value;
    display.textContent = input;
});
});

/* 🧠 Safe Calculator Engine (NO eval) */
function calculate(expr) {
let tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);

if (!tokens) return 0;

  // ✖️ ➗ First priority
for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "*" || tokens[i] === "/") {
    let a = parseFloat(tokens[i - 1]);
    let b = parseFloat(tokens[i + 1]);

      let result = tokens[i] === "*" ? a * b : a / b;

    tokens.splice(i - 1, 3, result.toString());
    i--;
    }
}

  // ➕ ➖ Second priority
let result = parseFloat(tokens[0]);

for (let i = 1; i < tokens.length; i += 2) {
    let operator = tokens[i];
    let number = parseFloat(tokens[i + 1]);

    if (operator === "+") result += number;
    else if (operator === "-") result -= number;
}

return result;
}

/*  Helper: check operator */
function isOperator(char) {
return ["+", "-", "*", "/"].includes(char);
}