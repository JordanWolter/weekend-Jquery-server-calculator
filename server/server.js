const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

//global variables
let history = [];
let total = [];
let answer = {
    numbers: history,
    answer: total
};

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));

app.listen(PORT, () => {

    console.log('Server is running on port', PORT);

});

app.get('/calculator', (req, res) => {

    console.log('answer object', answer);

//passes in object from client and runs equation will correct operator
    decideOpp(answer);

    removeAnswer(answer);

//updates the object answer

    res.send(answer);

});

app.post('/calculator', (req, res) => {
    console.log('in game POST', req.body);

    let newNumFrom = req.body;

    history.push(newNumFrom);

    res.sendStatus(201);

});

//function to add numbers
function add(numOne, numTwo){

    let addSum = numOne + numTwo;
    console.log('in add', addSum);
    total.push(addSum);
    
};

//function to subtract numbers
function subtract(numOne, numTwo){

    let subSum = numOne - numTwo;
    console.log('in subtract', subSum);
    total.push(subSum);

};

//function to multiply numbers
function multiply(numOne, numTwo){

    let multSum = numOne * numTwo;
    console.log('in multiply', multSum);
    total.push(multSum);

};

//function to divide numbers
function divide(numOne, numTwo){

    let divSum = numOne / numTwo;
    console.log('in divide', divSum);
    total.push(divSum);

};

//takes in the input numbers and operator from the client
function decideOpp(equation){

    let numOne = 0;
    let numTwo = 0;
    let opp = '';

    for(let index of equation.numbers){
        console.log('equation.numbers', index);

        numOne = parseFloat(index.numberOne);
        numTwo = parseFloat(index.numberTwo);
        opp = index.operator;
        
    };

//conditional to run appropriate equation
    if(opp === '+'){
        add(numOne, numTwo);
    }else if(opp === '-'){
        subtract(numOne, numTwo);
    }else if(opp === '*'){
        multiply(numOne, numTwo);
    }else if(opp === '/'){
        divide(numOne, numTwo);
    };
};

//removes answer (functions run and add answer from previous input on page reload)
function removeAnswer(answers){
    console.log('in removeAnswer', answers);

    if(answers.numbers.length !== answers.answer.length){
        answers.answer.pop();

    };
};

