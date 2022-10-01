//const {response} = require('express');

$(document).ready(onReady);


let numbers = [];


function onReady(){
    console.log('jquery is loaded!');

    $('#plus').on('click', addButton);
    $('#minus').on('click', minusButton);
    $('#multiply').on('click', multiplyButton);
    $('#divide').on('click', divideButton);
    $('#equals').on('submit', equalsButton);
    $('#clear').on('click', clearButton);
};

function addButton(){
    let operator = '+';
    console.log('in addButton', operator);
    return operator;
};

function minusButton(){
    let operator = '-';
    console.log('in minusButton', operator);
    return operator;
};

function multiplyButton(){
    let operator = '*';
    console.log('in multiplyButton', operator);
    return operator;
};

function divideButton(){
    let operator = '/';
    console.log('in divideButton', operator);
    return operator;
};

function pickOperator(){
    addButton;
    minusButton;
    multiplyButton;
    divideButton;
    if(operator === '+'){
        console.log('operator +', operator);
    }else if(operator === '-'){
        console.log('operator -', operator);
    }else if(operator === '*'){
        console.log('operator *', operator);
    }else if(operator === '/'){
        console.log('operator /', operator);
    }
}

function equalsButton(evt){
    evt.preventDefault();

    console.log('in equalsButton');

    let opp = operator;

    let newNumbers = {
        numberOne: $('#firstNum').val(),
        numberTwo: $('#secondNum').val(),
        operator: opp
    }

    console.log('calc input', newNumbers);

    $.ajax({
        url: '/calculator',
        method: 'POST',
        data: newNumbers
    })
    .then(response => {
        console.log('POST/calculator response', response);

        loadCalc();

    })
    .catch((err) => {

        console.log('POST/calculator error', err);
    });

    // $('#firstNum').val('');
    // $('#secondNum').val('');

};

function loadCalc(){
    console.log('in loadCalc');

    $.ajax({
        url: '/calculator',
        method: 'GET'
    })
    .then((response) => {
        console.log('GET/calculator', response);
        numbers = response;

        render();
    })
}

function render(){
    console.log('in render', numbers);


}

function clearButton(){

};