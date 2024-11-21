import { LightningElement } from 'lwc';
import calculatorBasic from './normalCalculator.html';
import calculatorScientific from './scientificCalculator.html';
import calculatorParent from './calculatorParent.html';

export default class CalculatorParent extends LightningElement {
    chosenTemplates ; // Default template is 'Basic Calculator'
    displayValue = '0'; // Initial display value

    // Render method to decide which template to display
    render() {
        return this.chosenTemplates === 'Basic Calculator'
            ? calculatorBasic
            : this.chosenTemplates === 'Scientific Calculator'
            ? calculatorScientific
            : calculatorParent;
    }

    // Handle button click to switch between Basic and Scientific calculators
    handleClick(event) {
        this.chosenTemplates = event.target.label;
    }

    // Function to add clicked values to the display
    handleButtonClick(event) {
        const buttonValue = event.target.textContent;

        if (buttonValue === '=') {
            this.calculateResult();
        } else if (buttonValue === 'C') {
            this.clearDisplay();
        } else {
            this.updateDisplay(buttonValue);
        }
    }

    // Update the display value based on the button clicked
    updateDisplay(value) {
        // If display is 0 or Error, replace it with the new value
        if (this.displayValue === '0' || this.displayValue === 'Error') {
            this.displayValue = value;
        } else {
            this.displayValue += value; // Append the value
        }
    }

    // Function to calculate the result
    calculateResult() {
        try {
            let expression = this.displayValue;

    
            // Convert scientific function names to corresponding JS functions
            expression = expression.replace(/sin\(/g, 'Math.sin(');
            expression = expression.replace(/cos\(/g, 'Math.cos(');
            expression = expression.replace(/tan\(/g, 'Math.tan(');
            expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
            expression = expression.replace(/log\(/g, 'Math.log10('); // Base 10 log
            expression = expression.replace(/pi/g, 'Math.PI');
            expression = expression.replace(/e/g, 'Math.E');
            expression = expression.replace(/\^/g, '**'); // Exponentiation operator
    
            // Replace 'x' with '*' for multiplication and '÷' with '/' for division
            expression = expression.replace(/x/g, '*').replace(/÷/g, '/');
    
            // Calculate the result
            this.displayValue = eval(expression);
        } catch (error) {
            this.displayValue = 'Error'; // Display error if invalid expression
        }
    }
    
    
    

    // Function to clear the display
    clearDisplay() {
        this.displayValue = '0'; // Reset to default state
    }
}
