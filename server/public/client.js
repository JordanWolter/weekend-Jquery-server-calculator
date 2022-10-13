
//const { response } = require("express");

$(document).ready(onReady);

let numbers = [];
let operator = '';

function onReady(){
    console.log('jquery is loaded!');

    $('#plus').on('click', addButton);
    $('#minus').on('click', minusButton);
    $('#multiply').on('click', multiplyButton);
    $('#divide').on('click', divideButton);
    $('#calculator').on('submit', equalsButton);
    $('#clear').on('click', clearButton);

    loadCalc();
    //render(history);
    noInput();

};

//function to make operator +
function addButton(){

    operator = '+';
    console.log('in addButton', operator);
    $('#plus').css('background-color', 'black');
    $('#plus').css('color', 'lightgrey');

};

//function to make operator -
function minusButton(){

    operator = '-';
    console.log('in minusButton', operator);
    $('#minus').css('background-color', 'black');
    $('#minus').css('color', 'lightgrey');

};

//function to make operator *
function multiplyButton(){

    operator = '*';
    console.log('in multiplyButton', operator);
    $('#multiply').css('background-color', 'black');
    $('#multiply').css('color', 'lightgrey');

};

//function to make operator /
function divideButton(){

    operator = '/';
    console.log('in divideButton', operator);
    $('#divide').css('background-color', 'black');
    $('#divide').css('color', 'lightgrey');

};

//function to send numbers and operator for eval
function equalsButton(evt){
    evt.preventDefault();

    console.log('in equalsButton');

    //new object to be sent to server
    let newNumbers = {
        
        numberOne: $('#firstNum').val(),
        numberTwo: $('#secondNum').val(),
        operator: operator,
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
        
        // //history.push(response);
        // console.log('history', history)

        render(response);

        noInput();

    });
};

function renderAnswer(history){

    let answer = [];

    for(let index of history.answer){
        console.log('getting answers', index);

        $('#result').empty();
        $('#result').append(`Answer: ${index}`);

        answer.push(index);
    }
    return answer;
}

function noInput(){

    let noNum = false;
    if($('#firstNum').val().length === 0 || $('#secondNum').val().length === 0){
        $('#result').empty();

    }

    return noNum

}

//render function
function render(history){

    let answer = 0;
    let i = 0;
    
    // if($('#numOne').val().length !== 0){
        
    // }
    answer = renderAnswer(history);
   

    $('#history').empty();
    for(let index of history.numbers){
        console.log('getting numbers', index);

        $('#history').append(`
         <li id="old">${index.numberOne} 
         ${index.operator} 
         ${index.numberTwo}
          = ${answer[i]}</li>
         `);

         i++;
    } 
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
