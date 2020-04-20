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

// VIDEO 7 CURRYING

// Queremos hacer otra función que se llame wrapInSpan sería similar a wrapInDiv
const wrapInSpan = str => `<span>${str}</span>`;
// como se parece bastante a wrapInDiv queremos hacer una función wrap que generalice ambas

const wrap = (type, str) => `<${type}>${str}</${type}>`
console.log(wrap('button','Click'))

// El problema es que ahora si hacemos pipe con esta función wrap, wrap tiene dos argumentos y da error
const transformWrap = pipe(trim, toLowerCase, wrap);
console.log(transformWrap('  Click   ')) //<click>undefined</click>
// lo va ejecutando de derecha a izquierda
console.log(pipe(trim)('  Click   ')) // devuelve 'Click'
console.log(pipe(trim, toLowerCase)('  Click   ')) // devuelve click
// por último haría wrap(irene) wrap tiene dos argumentos type y str así que irene lo toma como si fuera el type
// querríamos hacer algo tipo 
//const transformWrap2 = pipe(trim, toLowerCase, wrap('button'))
// pero esto no funciona porque pipe necesita que le pasemos una función como parámetro y wrap('button') es un string

// Tecnica Currying, transforma una función con n argumentos en una función con 1 argumento

const add = (a,b) => a + b;
console.log(add(2,5))
const add2 = a => b => a + b;
console.log(add2(2)(5))

// así transformamos wrap en wrap2
const wrap2 = type => str => `<${type}>${str}</${type}>`

const transformWrap2 = pipe(trim, toLowerCase, wrap2('button'));
const transformed2 = transformWrap2('   Click    ')
console.log({transformed2})
