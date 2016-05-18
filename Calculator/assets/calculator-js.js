/**
 * Created by dfernandes on 12/05/16.
 */

var helper = function () {
	return {
		parseArguments: function (firstArgument, secondArgument) {
			return {
				numberOne: parseFloat(firstArgument),
				numberTwo: parseFloat(secondArgument)
			}
		},
		selectByClass: function (className) {
			return document.getElementsByClassName(className)[0];
		}
	};
};


function Calculator() {
	this.helper = helper();
	this.inputField = this.helper.selectByClass('js-inputField');
	this.clearButton = this.helper.selectByClass('js-clear');
	this.solveButton = this.helper.selectByClass('js-button-solve');
	this.numberButtons = document.getElementsByClassName('js-button');
	this.operatorButtons = document.getElementsByClassName('js-button-operator');
	var _this = this;
	var result;
	this.operation = function () {
		var entryText = _this.inputField.value;
		var operator;
		if (entryText.indexOf('+') !== -1) {
			operator = '+';
		}
		else if (entryText.indexOf('-') !== -1) {
			operator = '-';
		}
		else if (entryText.indexOf('/') !== -1) {
			operator = '/';
		}
		else if (entryText.indexOf('x') !== -1) {
			operator = 'x';
		}
		return operator;
	};
	this.doAddition = function (a, b) {

		result = a + b;
		this.inputField.value = result;
	};
	this.doSubtraction = function (a, b) {
		result = a - b;
		this.inputField.value = result;
	};
	this.doDivision = function (a, b) {
		result = a / b;
		this.inputField.value = result;
	};
	this.doMultiplication = function (a, b) {
		result = a * b;
		this.inputField.value = result;
	};
	this.clearField = function () {
		this.inputField.value = '';
	};
	this.solveOperation = function (operator, numberOne, numberTwo) {
		var parseNumbers = this.helper.parseArguments(numberOne, numberTwo);


		switch (operator) {
			case '+':
				this.doAddition(parseNumbers.numberOne, parseNumbers.numberTwo);
				break;
			case '-':
				this.doSubtraction(parseNumbers.numberOne, parseNumbers.numberTwo);
				break;
			case '/':
				this.doDivision(parseNumbers.numberOne, parseNumbers.numberTwo);
				break;
			case 'x':
				this.doMultiplication(parseNumbers.numberOne, parseNumbers.numberTwo);
				break;
		}


	};
	this.addNumbersToFieldOnClick = function (inputField) {
		this.inputField.value += inputField;
	};
	this.addOperationToField = function (inputField) {
		this.inputField.value += inputField;
	};

	this.init = function () {
		console.log(this.inputField);
	};
	this.initialEvents = function () {
		// console.log(this.numberButtons);
		var temp = Array.prototype.slice.call(this.numberButtons);
		var temp1 = Array.prototype.slice.call(this.operatorButtons);

		temp.map(function (currentElement) {
			currentElement.addEventListener('click', function (evt) {
				_this.addNumbersToFieldOnClick(currentElement.value);

			})
		});
		temp1.map(function (currentOperator) {
			currentOperator.addEventListener('click', function (evt) {
				_this.addOperationToField(currentOperator.value);
			})
		});
		this.clearButton.addEventListener('click', function (evt) {
			evt.preventDefault();
			_this.clearField();
		});
		this.solveButton.addEventListener('click', function (evt) {
			var operator = _this.operation();
			var definedNumbers = _this.inputField.value.split(operator);
			_this.solveOperation(operator, definedNumbers[0], definedNumbers[1]);
		});

		document.addEventListener('keydown', function (keyEvent) {
			var enterKey = 13;
			var key = keyEvent.keyCode || keyEvent.which;
			var operator = _this.operation();
			var definedNumbers = _this.inputField.value.split(operator);
			if (key == enterKey) {
				keyEvent.preventDefault();
				_this.solveOperation(operator, definedNumbers[0], definedNumbers[1])
			}
		})


	};
	this.initialEvents();

}
var calculator = new Calculator();


calculator.init();