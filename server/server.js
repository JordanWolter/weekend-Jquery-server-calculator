const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

let history = [];
let answer = {
    numbers: history,
    //operator: '',
    addSum: add(),
    subSum: subtract(),
    multSum: multiply(),
    divSum: divide() 
};

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
});

app.get('/calculator', (req, res) => {

    decideOpp(answer)

    res.send();

});

app.post('/calculator', (req, res) => {
    let newNumFrom = req.body;

    history.push(newNumFrom);

    res.sendStatus(201);

});

function add(numOne, numTwo){
    let addSum = numOne + numTwo;
    console.log('in add', addSum);
    return addSum;
}

function subtract(numOne, numTwo){
    let subSum = numOne - numTwo;
    console.log('in subtract', subSum);
    return subSum;
}

function multiply(numOne, numTwo){
    let multSum = numOne * numTwo;
    console.log('in multiply', multSum);
    return multSum;
}

function divide(numOne, numTwo){
    let divSum = numOne / numTwo;
    console.log('in divide', divSum);
    return divSum;
}

function decideOpp(numbers){
    console.log('in decideOpp', numbers.operator);

    //let answerNumOne = parseFloat(numbers.numbers[i].)

    let opp = numbers.operator;

    if(opp === '+'){
        return add(numbers.numOne, numbers.numTwo);
    }else if(opp === '-'){
        return subtract();
    }else if(opp === '*'){
        return multiply();
    }else if(opp === '/'){
        return divide();
    }
}

