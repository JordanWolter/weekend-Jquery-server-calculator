
//const { response } = require("express");

$(document).ready(onReady);

let numbers = [];
let operator = '';
let history = [];

function onReady(){
    console.log('jquery is loaded!');

    $('#plus').on('click', addButton);
    $('#minus').on('click', minusButton);
    $('#multiply').on('click', multiplyButton);
    $('#divide').on('click', divideButton);
    $('#calculator').on('submit', equalsButton);
    $('#clear').on('click', clearButton);

};

//function to make operator +
function addButton(){
    operator = '+';
    console.log('in addButton', operator);
    $('#plus').css('background-color', 'black');
    $('#plus').css('color', 'lightgrey');
    return operator;
};

//function to make operator -
function minusButton(){
    operator = '-';
    console.log('in minusButton', operator);
    $('#minus').css('background-color', 'black');
    $('#minus').css('color', 'lightgrey');
    return operator;
};

//function to make operator *
function multiplyButton(){
    operator = '*';
    console.log('in multiplyButton', operator);
    $('#multiply').css('background-color', 'black');
    $('#multiply').css('color', 'lightgrey');
    return operator;
};

//function to make operator /
function divideButton(){
    operator = '/';
    console.log('in divideButton', operator);
    $('#divide').css('background-color', 'black');
    $('#divide').css('color', 'lightgrey');
    return operator;
};

//function to send numbers and operator for eval
function equalsButton(evt){
    evt.preventDefault();

    console.log('in equalsButton');

    //new object to be sent to server
    let newNumbers = {
        numberOne: $('#firstNum').val(),
        numberTwo: $('#secondNum').val(),
        operator: operator
    }

    console.log('calc input', newNumbers);

    $.ajax({
        url: '/calculator',
        method: 'POST',
        data: newNumbers
    })
    .then(response => {
        console.log('POST/calculator response', response);

        //calls function on respose from server
        loadCalc();

    })
    .catch((err) => {

        console.log('POST/calculator error', err);
    });

};

//function to update arrays and render to dom
function loadCalc(){
    console.log('in loadCalc');

    $.ajax({
        url: '/calculator',
        method: 'GET'
    })
    .then((response) => {
        console.log('GET/calculator', response);
        numbers = response;
        history.push(numbers);

        render();
    })
}


//render function
function render(){
    console.log('in render', numbers);

    //get rid of old answer and append new one
    $('#result').empty();
    $('#result').append(`Answer: ${numbers.answer}`);

    //clears history, then appends new histoy to dom with new equation
    $('#history').empty();
    let i = 0;
    for(let index of history){
        console.log('numbers', numbers);
        console.log(index.numbers[i].numberOne);
        console.log(index.numbers[i].numberTwo);
        $('#history').append(`
        <li id="old">${index.numbers[i].numberOne} 
        ${index.numbers[i].operator} 
        ${index.numbers[i].numberTwo}
         = ${index.answer}</li>
        `)
        i++;
    }
    console.log('i',i);
}

//function to empty input fields
function clearButton(){
    $('#firstNum').val('');
    $('#secondNum').val('');
    $('#plus').css('background-color', 'lightgrey');
    $('#plus').css('color', 'black');
    $('#minus').css('background-color', 'lightgrey');
    $('#minus').css('color', 'black');
    $('#multiply').css('background-color', 'lightgrey');
    $('#multiply').css('color', 'black');
    $('#divide').css('background-color', 'lightgrey');
    $('#divide').css('color', 'black');
    $('#result').empty();
};

//trying to get reload to append history from server
function onReload(){

    $.ajax({
        url: '/calculator',
        method: 'FETCH'
    })
    .then((response) => {
        console.log('GET/calculator', response);
        numbers = response;
        history.push(numbers);

        render();
    })

}