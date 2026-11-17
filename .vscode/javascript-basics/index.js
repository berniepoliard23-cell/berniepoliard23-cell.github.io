//Learning Javascript
console.log('Hello World');
let name = 'Bernie'; // string literal
console.log(name);
let number = '23'; // number literal
console.log(number)
let interestRate = 0.3;
interestRate = 1;
console.log(interestRate)
let lastName = undefined; //undefined literal
console.log(lastName)
let selectedColor = null; //null literal
console.log(selectedColor)
let isApproved = 'true'
console.log(isApproved)
// Object literal
let person = {
    name: 'Bernie',
    age: 23
};
console.log(person);
// Two way to find Property
// Dot Notation
person.name = 'Kayla';
// Bracket Notation
person['name'] = 'Janice'
// Array literal
let selectedColors = ['red', 'blue']; //Numbers can be added too
selectedColors[2]= 'green';
console.log(selectedColors.length);

// Function literal
// Performing a task
function greet(name, lastName) { // Body of function
console.log('Hello ' + name + '' + lastName);
}
greet('Mike', 'Jackson');

// Caculating a value
function square(number) {
    return number * number;
}
console.log(square(2));

// Document of variables
let fullName = "Bernie Poliard";
let age = 23;
let student = true;
document.getElementById("p1").textContent = `My name is ${fullName}`;
document.getElementById("p2").textContent = `I am ${age} years old`;
document.getElementById("p3").textContent = `It's ${student} I am a student`;

// arithmetic operator
let students = 30;
students = students + 1;
students = students * 5;
console.log(students);

// Accepting user input
// 1.Easy way = window prompt
let username;
username = window.prompt("What's your username?")
console.log(username);

// 2.Professioal way = HTML textbox
document.getElementById('mySubmit').onclick = function(){
    username = document.getElementById('myText').value;
    document.getElementById('myH1').textContent = `Hello ${username}`
}

// Type Conversion
let x;
let y;
let z;

x = Number(x);
y = String(y);
z = Boolean(z);

console.log(x,typeof x);
console.log(y,typeof y);
console.log(z,typeof z);