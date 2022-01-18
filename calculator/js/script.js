


const numberButtons = document.querySelectorAll('[number-button]');
const operatorButtons = document.querySelectorAll('[operation-button]');
const equallyButton = document.querySelector('[equally-button]');
const deleteButton = document.querySelector('[delete-button]');
const deleteAllButton = document.querySelector('[delete-all-button');
const underOutputText = document.querySelector('[under-output]');
const upperOutputText = document.querySelector('[upper-output]');


class Calculator {

    constructor(underOutputText, upperOutputText) {
        this.underOutputText = underOutputText;
        this.upperOutputText = upperOutputText;
        this.clear();
    }

    clear() {
        this.underOutput = '';
        this.upperOutput = '';
        this.operation = undefined;

    }

    delete() {
        if (this.underOutput !== '') {
            this.underOutput = this.underOutput.toString().slice(0, -1);
        }
        else
            if (this.underOutput === '' && this.upperOutput === '') {
                return;
            }
            else
                if (this.upperOutput !== '' && this.underOutput === '') {
                    this.upperOutput = this.upperOutput.toString().slice(0, -1);
                    this.operation = undefined;
                }
    }

    addNumber(number) {
        if (number === '.' && this.underOutput.includes('.'))
            return;
        this.underOutput = this.underOutput.toString() + number.toString();
    }

    choseOperation(operation) {
        if (this.underOutput === '' && this.upperOutput === '') {
            return;
        }
        else
            if (this.upperOutput !== '' && this.underOutput === '') {
                if (this.operation !== undefined) {
                    this.upperOutput = this.upperOutput.toString().slice(0, -1);
                }
                this.upperOutput = this.upperOutput + operation;
                this.operation = operation
                this.underOutput = '';
            }
            else
                if (this.upperOutput !== '') {
                    this.calculate();
                    this.operation = operation;
                    this.upperOutput = this.underOutput + operation;
                    this.underOutput = '';
                }
                else {
                    this.operation = operation;
                    this.upperOutput = this.underOutput + operation;
                    this.underOutput = '';
                }
    }

    calculate() {
        let result;
        this.underOutput.slice(0, -1);
        const upper = parseFloat(this.upperOutput);
        const under = parseFloat(this.underOutput);
        if (isNaN(upper) || isNaN(under))
            return;
        switch (this.operation) {
            case '+':
                result = upper + under;
                break
            case '-':
                result = upper - under;
                break
            case '×':
                result = upper * under;
                break
            case '÷':
                result = upper / under;
                break
            default:
                return
        }
        this.underOutput = result;
        this.operation = undefined;
        this.upperOutput = '';
    }



    update() {
        this.underOutputText.innerText = this.correctNumber(this.underOutput);
        if (this.operation != null) { /////выводило в верхней строке undef
            this.upperOutputText.innerText = `${this.correctNumber(this.upperOutput)} ${this.operation}`;///я не знаю, как пофиксить повтор знака при дробном числе
        } else {
            this.upperOutputText.innerText = '';
        }
    }

    correctNumber(number) {
        // const temp = parseFloat(number);
        // if (isNaN(temp)) return '';
        // return temp.toLocaleString('en');
        const stringNumber = number.toString();
        const beforeNumbers = parseFloat(stringNumber.split('.')[0]);
        const afterNumbers = stringNumber.split('.')[1];
        let beforeDisplay;
        if (isNaN(beforeNumbers)) {
            beforeDisplay = '';
        } else {
            beforeDisplay = beforeNumbers.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (afterNumbers != null) {
            return `${beforeDisplay}.${afterNumbers}`;
        } else {
            return beforeDisplay;
        }
    }
}


const calculator = new Calculator(underOutputText, upperOutputText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText);
        calculator.update();
    })
})


operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOperation(button.innerText);
        calculator.update();
    })
})

equallyButton.addEventListener('click', button => {
    calculator.calculate();
    calculator.update();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.update();
})

deleteAllButton.addEventListener('click', button => {
    calculator.clear();
    calculator.update();
})
