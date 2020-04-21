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

function run(fn, arg1){
    () => fn(arg1);
}


run(logHello)


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

// VIDEO 8 PURE FUNCTIONS
// no es pura
const randomFunction = number => number * Math.random();

// sí es pura

const function2 = number => number * 2;

// En general, si queremos una función pura no podemos usar
//No random values
// no current date/ time
// no global state dom, files, db
// no mutation of parameters
// tampoco es pura por lo de mutation parameters, porque minAge no está definida aquí y puede ser variable
const isEligible = age => age > minAge;
// sería pura así
const isEligible2 = (age, minAge) => age > minAge;


//VIDEO 10 UPDATING OBJECTS
// Object.assign() y el spread operator son equivalentes 
const person = { 
    name: 'Irene',
    address: {
        country: 'España',
        city: 'Madrid'
    } 
};
const updated = Object.assign({}, person, { name: 'Elvira' });
console.log({updated});
const updated2 = {...person, name: 'Elvira'}

// Si hacemos directamente
updated.name = 'Mosh';
//para claves de primer nivel, person no cambia, pero para las de segundo nivel cambia person
console.log({person});
console.log({updated});
updated.address.country = 'USA';
console.log({person});
console.log({updated});

// INMUTABILITY IN ARRAYS
const arrayNumbers = [1, 2, 3];
// Adding an item
    // al final
    let added = [...arrayNumbers, 4];
    console.log({added});
    // al principio
    added = [0, ...arrayNumbers];
    console.log({added});
    // en la iésima posición, por ejemplo la 2
    const index = arrayNumbers.indexOf(2);
    added = [
        ...arrayNumbers.slice(0, index),
        1.5,
        ...arrayNumbers.slice(index)
        ];
    console.log({added})
// Removing an item
const removed = arrayNumbers.filter(n => n!==2);
console.log({removed});

// Updating an item
// Cambio el 3 por 30
const arrayUpdated = arrayNumbers.map(n => n === 3 ? 30 : n);
console.log({arrayUpdated});
// Enforcing Inmulatibility
// librerías
// Inmutable (Facebook)
// Immer
// Mori

// Inmutable.js
// npm install immutable (con dos emes)