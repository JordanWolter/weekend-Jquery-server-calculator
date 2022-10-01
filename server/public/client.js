

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

function addButton(){
    operator = '+';
    console.log('in addButton', operator);
    return operator;
};

function minusButton(){
    operator = '-';
    console.log('in minusButton', operator);
    return operator;
};

function multiplyButton(){
    operator = '*';
    console.log('in multiplyButton', operator);
    return operator;
};

function divideButton(){
    operator = '/';
    console.log('in divideButton', operator);
    return operator;
};

function pickOperator(){
    if(operator === '+'){
        console.log('operator +', operator);
        return '+';
    }else if(operator === '-'){
        console.log('operator -', operator);
        return '-';
    }else if(operator === '*'){
        console.log('operator *', operator);
        return '*';
    }else if(operator === '/'){
        console.log('operator /', operator);
        return '/';
    }
}

function equalsButton(evt){
    evt.preventDefault();

    console.log('in equalsButton');

    let opp = pickOperator();

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
        history.push(numbers);

        render();
    })
}
let i = 0;
function render(){
    console.log('in render', numbers);

    $('#result').empty();
    $('#result').append(`Answer: ${numbers.answer}`);

    $('#history').empty();
    
    for(let index of history){
        console.log('numbers', numbers);
        console.log(index.numbers[0].numberOne);
        console.log(index.numbers[0].numberTwo);
        $('#history').append(`
        <li>${index.numbers[i].numberOne} 
        ${index.numbers[i].operator} 
        ${index.numbers[i].numberTwo}
         = ${index.answer}</li>
        `)
    }
    i++;
}

function clearButton(){

};