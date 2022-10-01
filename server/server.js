const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

//global variables
let i = 0;
let history = [];
let total = 0;
let answer = {
    numbers: history,
    answer: total
};

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
});

app.get('/calculator', (req, res) => {

    console.log('answer object', answer);

//passes in object from client and runs equation will correct operator
    decideOpp(answer);

//updates the object answer
    answer.answer = total;

    console.log('answer', answer.answer);

    console.log('total', total);

    res.send(answer);

});

app.post('/calculator', (req, res) => {
    console.log('in game POST', req.body);

    let newNumFrom = req.body;

    console.log('newNumFrom', newNumFrom);

    history.push(newNumFrom);

    console.log('history.push', history);

    res.sendStatus(201);

});

//function to add numbers
function add(numOne, numTwo){
    let addSum = numOne + numTwo;
    console.log('in add', addSum);
    return total = addSum;
};

//function to subtract numbers
function subtract(numOne, numTwo){
    let subSum = parseFloat(numOne) - parseFloat(numTwo);
    console.log('in subtract', subSum);
    return total = subSum;
};

//function to multiply numbers
function multiply(numOne, numTwo){
    let multSum = parseFloat(numOne) * parseFloat(numTwo);
    console.log('in multiply', multSum);
    return total = multSum;
};

//function to divide numbers
function divide(numOne, numTwo){
    let divSum = parseFloat(numOne) / parseFloat(numTwo);
    console.log('in divide', divSum);
    return total = divSum;
};

//takes in the input numbers and operator from the client
function decideOpp(equation){
    
    console.log('in decideOpp', equation.numbers[i].operator);
    console.log('first num', equation.numbers[i].numberOne);
    console.log('second num', equation.numbers[i].numberTwo);

    //converts strings to float
    let numOne = parseFloat(equation.numbers[i].numberOne);
    let numTwo = parseFloat(equation.numbers[i].numberTwo);

    let opp = equation.numbers[i].operator;
    
//conditional to run appropriate equation
    if(opp === '+'){
        add(numOne, numTwo);
    }else if(opp === '-'){
        subtract(numOne, numTwo);
    }else if(opp === '*'){
        multiply(numOne, numTwo);
    }else if(opp === '/'){
        divide(numOne, numTwo);
    }
    i++;
    console.log('i', i);
}

