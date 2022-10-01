const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

//let i = 0;
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

    console.log('answer', answer);

    answer.answer = decideOpp(answer);

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

function add(numOne, numTwo){
    let addSum = parseFloat(numOne) + parseFloat(numTwo);
    console.log('in add', addSum);
    return addSum;
}

function subtract(numOne, numTwo){
    let subSum = parseFloat(numOne) - parseFloat(numTwo);
    console.log('in subtract', subSum);
    return subSum;
}

function multiply(numOne, numTwo){
    let multSum = parseFloat(numOne) * parseFloat(numTwo);
    console.log('in multiply', multSum);
    return multSum;
}

function divide(numOne, numTwo){
    let divSum = parseFloat(numOne) / parseFloat(numTwo);
    console.log('in divide', divSum);
    return divSum;
}
let i = 0;
function decideOpp(equation){
    
    console.log('in decideOpp', equation.numbers[i].operator);
    console.log('first num', equation.numbers[i].numberOne);
    console.log('second num', equation.numbers[i].numberTwo);

    //let answerNumOne = parseFloat(numbers.numbers[i].)

    let opp = equation.numbers[i].operator;

    if(opp === '+'){
        return total = add(equation.numbers[i].numberOne, equation.numbers[i].numberTwo);
    }else if(opp === '-'){
        return subtract(equation.numbers[i].numberOne, equation.numbers[i].numberTwo);
    }else if(opp === '*'){
        return multiply(equation.numbers[i].numberOne, equation.numbers[i].numberTwo);
    }else if(opp === '/'){
        return divide(equation.numbers[i].numberOne, equation.numbers[i].numberTwo);
    }
    i++;
}

