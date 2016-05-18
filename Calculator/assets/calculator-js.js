/**
 * Created by dfernandes on 12/05/16.
 */

var helper = function () {
	return {
		parseArguments: function (firstArgument, secondArgument) {
			return {
				numberOne: parseInt(firstArgument, 10),
				numberTwo: parseInt(secondArgument, 10)
			}
		},
		selectByClass: function (className) {
			return document.getElementsByClassName(className)[0];
		}
	};
};


function Calculator() {
	this.helper = helper();
	this.inputField = this.helper.selectByClass('js-inputfield');
	this.clearButton = this.helper.selectByClass('js-clear');
	this.solveButton = this.helper.selectByClass('js-button-solve');
	this.numberButtons = document.getElementsByClassName('js-button');
	this.operatorButtons = document.getElementsByClassName('js-button-operator');
	var _this = this;
	this.doAddition = function (a, b) {

		var result = a + b;
		this.inputField.value = result;
	};
	this.doSubtraction = function (a, b) {
		var result = a - b;
		this.inputField.value = result;
	};
	this.doDivision = function (a, b) {
		var result = a / b;
		this.inputField.value = result;
	};
	this.doMultiplication = function (a, b) {
		var result = a * b;
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
			var definedNumbers = entryText.split(operator);

			_this.solveOperation(operator, definedNumbers[0], definedNumbers[1]);
		})

	};
	this.initialEvents();

}
var calculator = new Calculator();


calculator.init();


/*var buttonCollection = document.getElementsByTagName('button');
 for (var i = 0; i < buttonCollection.length; i++) {
 console.log(buttonCollection[i].value);
 }*/
// var inputField = document.getElementsByTagName('input');
// for (var i = 0; i < buttonCollection.length; i++) {
// 	buttonCollection[i].addEventListener('click', function () {
// 			inputField = buttonCollection[i];
// 			});
// }

