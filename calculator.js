
// all the operator functions

function add (a,b) {
	return (a+b);
}

function subtract (a,b) {
	return a-b;
}

function multiply (a,b){
	return a*b;
}

function divide(a,b){
    return a/b;
}

function power(a,b) {
	
	let base = a;
	let base2 = a;
	let power = b;

	for (let i = 0; i < power-1; i++){
		base2 = base2 * base;
	}
	
	return base2;
}

function factorial(number) {
	
	if (number == 0){
		return 1;
	}
	else{
		let start = number;
		
		for (let i = number-1; i > 0; i--){
			start = start * i;
		}
		return start;
	}
}

function operate(operator, a, b){

    if (operator == "+"){
       return add(a,b);
    }
    else if(operator == "-"){
        return subtract(a,b);
    }
    else if(operator == "/"){
        return divide(a,b);
    }
    else if(operator == "*"){
        return multiply(a,b);
    }
}


// add event listeners

const buttons = document.querySelectorAll(".button");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.getElementById("display-text");

var currentNumber = "";
var storedNumber = "";
var storedOperator;
var answer;

// function to conver answer to reasonable decimal places or base 10

function round(answer){
    
    let length = (answer.toString()).length 

    if (length > 8){

        //case with no decimal place
        if (answer.toString().search(/\./) == -1){

            answer = answer.toExponential(4);
        }
        else if(answer.toString().search(/\./) > 8){
            
            answer = answer.toExponential(4);
        }
        else{
            answer = answer.toFixed(4);
        }
    }
    return answer;
}

function screen_clear(){
        display.innerHTML = "";
}

//event listener for numbers
for (let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener("click", function(e){

        if (currentNumber.length < 10){    
            if (display.innerHTML === ""){
                currentNumber = numbers[i].innerHTML;
                display.innerText = currentNumber;
            }
            else {
                currentNumber = currentNumber + numbers[i].innerHTML;
                display.innerText = currentNumber;
            }
        }
    });
}

//event listener for rest of operators
for (let i = 0; i < operators.length; i++){

    operators[i].addEventListener("click", function(e){

        if (storedNumber === ""){
            storedNumber = currentNumber;
            currentNumber = "";
            storedOperator = operators[i].innerHTML;
            screen_clear();
        }
        else{
            storedNumber = operate(storedOperator,Number(storedNumber),Number(currentNumber));
            currentNumber = "";
            storedOperator = operators[i].innerHTML;
            screen_clear();
        }
    })
}

// event listener for equals
const equals = document.querySelector("#equals");

equals.addEventListener("click", function(e){
    
    screen_clear();
    if (storedOperator != "" && storedNumber != "" && currentNumber != ""){
        answer = operate(storedOperator, Number(storedNumber), Number(currentNumber));
        display.innerText = round(answer);
    }
});

//event listener for clear
const clear = document.querySelector("#clear");

clear.addEventListener("click", function(e){
    screen_clear();
    storedNumber = "";
    storedOperator = "";
    currentNumber = "";
})