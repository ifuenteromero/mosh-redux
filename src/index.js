import { compose, pipe } from 'lodash/fp';

//video 3

function sayHello() {
    return 'Hello World';
};


//Assign to a variable, pasamos una referencia de la función, no la invocamos
let fn = sayHello; 
//Son equivalentes
fn();
sayHello();

//Pass as an argument
function greet(fnMessage){
    console.log(fnMessage())
}

function logHello() {
    console.log('Hello');
}

function run(fn){
    fn();
}

// run(logHello)

//Return from other function

function sayBye() {
    return function() {
        console.log('retorna función');
    }
}

// fn2 = sayBye;
// console.log({fn2})
// console.log(fn2())
// console.log(fn2()())
// fn2 = sayBye();
// console.log({fn2})

//HIGHER ORDER FUNCTIONS
let numbers = [1, 2, 3];
//map y setTimeout es una higher order function porque toma una función como argumento
numbers.map(number => number*2)

setTimeout(() => console.log('Hello'), 1000);

// FUNCTION COMPOSITION

//NON FUNCTIONAL STYLE OF CODE
let input = "  JavaScript  ";
let output = `<div>${input.trim()}</div>`;
console.log({output})

//FUNCTIONAL STYLE
//trim
//wrap in div

const trim = str => str.trim();
const wrapInDiv = str => `<div>${str}</div>`;
const toLowerCase = str => str.toLowerCase();
const result = wrapInDiv(toLowerCase(trim('   Haskell   ')));
console.log({result});

// Hay dos problemas en result
//1- tenemos que leer de derecha a izquierda, tenemos un input lo trimeamos, lo pasamos a minúsculas...
//2- muchos paréntesis

//Instalamos lodash compose y pipe
// compose es una higher order function

// Para lo de los paréntesis usamos compose
const transform = compose(wrapInDiv, toLowerCase, trim);
const transformed = transform('  Irene   ');
console.log({transformed})

// Para lo de leer de derecha a izquierda usamos pipe

const transformPipe = pipe(trim, toLowerCase, wrapInDiv);
const transformedPipe = transformPipe('   Elvi     ');
console.log({transformedPipe})