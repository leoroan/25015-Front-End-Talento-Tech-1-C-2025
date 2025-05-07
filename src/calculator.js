console.log('Hello there!!');

let displayValue = '0';
const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

function appendToDisplay(value) {
    if (displayValue === '0' && value !== '.') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    updateDisplay();
}

function calculate() {
    try {
        // Evaluar la expresión matemática
        displayValue = eval(displayValue).toString();
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
}