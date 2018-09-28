# Workshop, this is about JS (ES5, ES6), VanillaJS, Babel, Webpack, VueJS, FP .... and more!

### Table of Contents

+ [Values & Types](#values-and-types)
+ [Coercion](#coercion)
+ [Truthly & Falsy](#truthly-and-falsy)
+ [Equality](#equality)
+ [Inequality](#inequality)
+ [Hoisting](#hoisting)
+ [Strict Mode](#strict-mode)
+ [Functions Scope and as Values](#functions-scope-and-as-values)
+ [Immediately Invoked Function Expressions (IIFEs)](#immediately-invoked-function-expressions-(iifes))
+ [Closure](#closure)
+ [this Identifier](#this-identifier)
+ [Prototypes](#prototypes)
+ [Old & New (ES5 & ES6)](#old-&-new-(es5-&-es6))
+ [Polyfilling](#polyfilling)
+ [Transpiling](#transpiling)
+ [Non-Javascript](#non-javascript)
+ [ES6](#es6)
+ [Constants](#constants)
+ [Let](#let)
+ [Arrow functions](#arrow-functions)
+ [Classes](#classes)
+ [Concise methods and Object Literals](#concise-methods-and-object-literals)
+ [Destructing](#destructing)
+ [Spread Operator](#spread-operator)
+ [String Interpolation](#string-interpolation)
+ [Computed Property Names](#computed-property-names)
+ [Default function parameters](#default-function-parameters)
+ [Promises](#promises)
+ [Async and await](#async and await)
+ [Modules on JS](#modules-on-js)
+ [Common JS](#common-js)
+ [ES6 Modules](#es6-modules)
+ [Functional Programming](#functional-programming)
+ [Declarative vs Imperative Coding Style (FP)](#declarative-vs-imperative-coding-style-(fp))
+ [First class functions](#first-class-functions)
+ [Pure Functions](#pure-functions)
+ [High Order Functions (FP)](#high-order-functions-(fp))
+ [Currying](#currying)
+ [Composed Functions](#composed-functions)
+ [Modern JavaScript Explained For Dinosaurs](#modern-javascript-explained-for-dinosaurs)
+ [Nodejs](#nodejs)
+ [What is NodeJS?](#what-is-nodejs?)
+ [What is NPM?](#what-is-npm?)
+ [NPM Tools](#npm-tools)
+ [Babel](#babel)
+ [Webpack](#webpack)

## Values and Types

JavaScript has typed values, not typed variables. The following built-in types are available:

+ string
+ number
+ boolean
+ null and undefined
+ object
+ symbol (new to ES6)

```js
var a;
typeof a; // "undefined"

a = "hello world";
typeof a; // "string"

a = 42;
typeof a; // "number"

a = true;
typeof a; // "boolean"

a = null;
typeof a; // "object" --weird, bug
/*
  This is a long-standing bug in JS, but one that is likely never going to be fixed
*/

a = undefined;
tyoepf a; // "undefined"

a = {b:"c"};
typeof a;

/*
  The return value from the typeof operator is always one of six string values (seven as of ES6!)
*/

/* 
  The object type refres to a compound value, where you can set properties.
  They can be accessed by dot notation and bracket notation
*/

var obj = {
  , a : "hello world"
  , b : 42
  , c : true
};

console.log(obj.a); // "hello world"
console.log(obj.b); // 42
console.log(obj.c); // true

console.log(obj[a]); // "hello world"
console.log(obj[b]); // 42
console.log(obj[c]); // true

var b = "a";

console.log(obj[b]); // "hello world"
console.log(obj["b"]); // 42
```

**[Back to top](#table-of-contents)**

## Coercion

+ Explicit coercion  
  `Number("999.99") == 999.99`

+ Implicit coercion  
  `"999.99" == 999.999`

  Implicit coercion is a mechanism that can be learned, and moreover should be learned by anyone wishin to take JavaScript programming seriously!

**[Back to top](#table-of-contents)**

### Truthly and Falsy

We briefly mentioned the "truthy" and "falsy" nature of values: when a non-boolean value is coerced to a boolean, does it become true or false, respectively?

The specific list of "falsy" values in JavaScript is as follows:

+ `""` (empty string)
+ `0, -0, NaN` (invalid number)
+ null, undefined
+ false

An value that's not on this "falsy" list is "truthy"

**[Back to top](#table-of-contents)**

### Equality

There are four equality operators:

+ `==` 
+ `!=` 
+ `===` strict equality
+ `!==` strict equality

```js
console.log("49"===49) // false, Coercion is not allowed
console.log("49"==49) // true
```

**[Back to top](#table-of-contents)**

### Inequality

+ `<`
+ `>`
+ `<=`
+ `>=`

```js
var a = 41;
var b = "42";
var c = "43";

console.log(a < b) // true
console.log(b < c) // true
```

**[Back to top](#table-of-contents)**

## Hoisting

```js
var a = 2;

foo(); // works because foo() declaration is "hoisted"

function foo(){
  a = 3;

  console.log(a); // 3

  var a; // declaration is hoisted to the top of foo()
}

console.log(a); // 2

```

**[Back to top](#table-of-contents)**

## Strict Mode

ES5 added a "strict mode" to the language, which tightens the rules for certain behavrios. Generally these restrictions are seen as keeping the code to a safer and more appropriate set of guidelines, Also adhering to strict mode makes your code generally more optimizable by the engine.

```js
function foo(){
  "use strict";
  // this code is strict mode 
  function bar(){
    // this code is strict mode
  }
}
// this code is not strict mode
```

```js
function foo(){
  "use strict"; //turn on strict mode
  a = 1; //var missing, ReferenceError
}

foo();

```

**[Back to top](#table-of-contents)**

## Functions Scope and as Values



The function itself is a value, just like 42 or [1,2,3] would be.

```js
// Anonymous function
var foo = function(){
  //..
}

// Named function
var x = function bar(){
  //..
}
```

**[Back to top](#table-of-contents)**

### Immediately Invoked Function Expressions (IIFEs)

```js
(function IIFE(){
  console.log("Hello!");
})();
// "Hello!"
```

It may seem strange but it's not as foreign as first glance.
```js
function foo(){...}

// 'foo' function reference expression,
// then '()' executes it
foo()

// 'IIFE' function expression
// then '()' executes it
(function IIFE(){..})();
```

IIFE is often used to declare variables that won't affect the surrounding code outside the IIFE

```js
var a = 42;

(function IIFE(){
  var a = 10;
  console.log(a); // 10
})();

console.log(a); // 42
```

**[Back to top](#table-of-contents)**

### Closure 

You can think of closure as a way to "remember" and continue to access a function's scope (its variables) even once the function has finished running.

```js
function makeAdder(x){
  // parameters 'x' is an inner variable

  // inner function 'add()' uses 'x', so
  // it has a "closure" over it
  function add(y){
    return y + x;
  }

  return add:
}
```

**[Back to top](#table-of-contents)**

## this Identifier

Another very commonly misunderstood concept in JavaScript is the `this` keyword.
While it may often seem that `this` is related to "object-oriented patterns", `this` is a different mechanism.

If a function has a this reference inside it, that `this` reference usually points to an object. But which object it points to depends how the function was called.

**It's important to realize that `this` does not refer to the function itself, as is the most common misconception**

```js
function foo(){
  console.log(this.bar);
}

var bar = "global";

var obj1 = {
  bar : "obj1"
  , foo : foo
}:

var obj2 = {
  bar:"obj2"
};

// ------
foo(); // "global"
obj1.foo(); // "obj1"
foo.call(obj2); // "obj2", what does it do call function of an object?
new foo(); // undefined
```

**[Back to top](#table-of-contents)**

## Prototypes

When you reference a property on an object, if that property doesn't exist, JavaScript will automatically use that object's internal prototype reference to find another object to look for the property on.
You could think of this almos as a fallback if the property is missing.

```js
var foo={
  a : 42
};
// create 'bar' and link it to 'foo'
var bar = Object.create(foo);
bar.b = "hello world";

bar.b; // "hello world"
bar.a; // 42 <-- delegated to 'foo'
```
This linkage may seem like a strange feature of the language. The most common way this feature is used is to try to emulate/fake a "class" mechanism with "inheritance".

(a more natural way of applying prototypes is a pattern called "behavior delegation", where you linked objects to be able to delegate from one to the other for parts of the needed behavior)

**[Back to top](#table-of-contents)**

## Old & New (ES5 & ES6)

### Polyfilling

The word "polyfill" is an invented term used to refer to taking the definition of a newer feature and producing a piece of code that's equivalent to the behavior but is able to run in older JS environments.

```js
if(!Number.isNaN){
  Number.isNaN = function isNaN(x){
    return x !== x;
  }
}
```

**[Back to top](#table-of-contents)**

### Transpiling

There's no way to polyfill new syntax that has been added to the language. The new syntax would throw and error in the old JS engine as unrecognized/invalid.

So the better option is to use a tool that converts your newer code into older cod equivalents. This process is commonly called "transpiling" + compiling.

Essentially, your source code is authored in the new syntax form, but what you deploy to the browser is the transpiled code in old syntax form. You tipically insert the transpiler into your build process similar to your code linter or your minifier.

Why not just write the older code directly?

+ The new syntax added to the language is desined to make your code more readable and maintainable. You should prefer writing newer and cleaner syntax, not only yourself but for all other members of the development team.
+ If you transpile only for older browsers, but serve the new syntax to the newest browsers you get to take advangtage of browsers performance optimizations with the new syntax.
+ Using the new syntax earlier allows it to be tested more robustly in the real world.

```js
function foo(a=2){
  console.log(a);
}
foo(); // 2
foo(42); //42
```
```js
function foo(){
  var a = arguments[0] !== undefined ? arguments[0] : 2;
  console.log(a)
}
```

Here are some good options:
+ Babel (Transpiles ES6+ into ES5)
+ Traceur (Transpiles ES6, ES7,and beyond into ES5)

**[Back to top](#table-of-contents)**

## Non-Javascript


The reality is that mos JS is written to run in and interact with environment like browsers, a good chunk of the stuff that you write in your code is, strictly speaking, not directly controlled by JavaScript.

The mos common non-JavaScript JavaScript you'll encounter is the DOM API. For example:
```js
var el = document.getElementByID("foo");
```

The `document` variable exits as a global variable when your code is running in a browser. It's not provided by the JS engine, nor is it particularly controlled by the JavaScript specification. Ittakes the form of something that looks an awful lot like a normal JS object, but it's not really exactly that. It's a special object, often called a "host object"

**[Back to top](#table-of-contents)**

## ES6

### Constants

Support for constants (also known as "immutable variables"), i.e., variables which cannot be re-assigned new content. Notice: this only makes the variable itself immutable, not its assigned content (for instance, in case the content is an object, this means the object itself can still be altered).

```js
const PI = 3.141593;

console.log(PI)
//3.141593

PI = 1234;
//TypeError: Assignment to constant variable.

```

**[Back to top](#table-of-contents)**

### Let 

Block-scoped variables (and constants) without hoisting.

Using var

```js
function test(){
  var a = "Hello!"
  if(true){
    var a = "Nope!"
    console.log(a);
  }  
  console.log(a);
}

test();
//Nope!
//Nope!
```

Using let

```js
function test(){
  let a = "Hello!"
  if(true){
    let a = "Nope!"
    console.log(a);
  }  
  console.log(a);
}

test();
//Nope!
//Hello!
```

**[Back to top](#table-of-contents)**

### Arrow functions

Arrow functions are shorthand for an anonymous function that keep the current context.

Lexical `this`

```js
//ES5
function Person(name, age){
  this.name = name;
  this.age = age;
  setTimeout(function(){
    console.log(this.name + " is "+ this.age +" years old")
  })
}
var juan = new Person("Juan",30);
//undefined is undefined
```

The Old Solution (not the best solution of course, poor solution, **low js skills**)

```js
//ES5
function Person(name, age){
  //Save the context within a variable
  var self = this;

  self.name = name;
  self.age = age;
  setTimeout(function(){
    console.log(self.name + " is "+ self.age+" years old")
  })
};

var juan = new Person("Juan",30);
//Juan is 30 years old
```

The Old Solution

```js
function Person(name, age){
  this.name = name;
  this.age = age;
  
  setTimeout(function(){
    console.log(this.name + " is "+ this.age+" years old")
  }.bind(this))
};

var juan = new Person("Juan",30);
//Juan is 30 years old
```

With **arrow functions**

```js
function Person(name, age){
  this.name = name;
  this.age = age;

  setTimeout(()=>{
    console.log(this.name + " is "+ this.age+" years old")
  })
};

var juan = new Person("Juan",30);
//Juan is 30 years old
```

Arrow functions with **One parameter**

```js
//ES5's functions
function increment(a){
  return a++
}

//Arrow function
const increment = a =>a++
```

Arrow functions with **Two parameter**

```js
//ES5's functions
function sumTwoNumbers(a,b){
  return a+b;
}

//Arrow function
const sumTwoNumbers = (a,b)=>a+b
```

Arrow functions with **Body**

```js
//ES5's functions
function doubleNumbers(numberList){
  return numberList.map(function(number){
    return number*2
  })
}

//Arrow function
const sumTwoNumbers = (a,b)=>{
  return numberList.map(number=>number*2)
}

//Function refactored
const sumTwoNumbers = (a,b)=>numberList.map(number=>number*2)
```

**[Back to top](#table-of-contents)**

## Classes

Class syntax has been added to ES6. The underlying inheritance model is still prototypal but the class syntax can make it easier to reason about relationships. To create a class just use the class keyword. Classes can be created with class expressions or class declarations. Unlike function declarations, class declarations are not hoisted.

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  get color() {
    return this._color;
  }

  set color(c) {
    this._color = c;
  }

  // Read only property
  get dimensions() {
    return `height: ${this.height}, width: ${this.width}`;
  }

  static area(rectangle) {
    return rectangle.width * rectangle.height;
  }
}

class Square extends Rectangle {
  constructor(width) {
    super(width, width);
  }
}

const s = new Square(10);

console.log(s.width);

console.log(s.dimensions);

console.log(Rectangle.area(s));
```

**[Back to top](#table-of-contents)**

## Concise methods and Object Literals

In object literals and classes we can condense render: function () {} to render()

The old way
```js
const foo = function(){
  return "foo"
};
const a = "a";
const obj = {
  foo:foo
  , a:a
  , getTite:function(){
    return "The title is "+ this.a;
  }
}
```

Concise methods
```js
const foo = function () {
  return "foo"
};

const a = "a";

const obj = {
  foo,
  a,
  getTitle() {
    return `The title is ${this.a}`;
  }
};

console.log(obj.foo());
console.log(obj.a);
console.log(obj.getTitle());
```

**[Back to top](#table-of-contents)**

### Destructing

Both arrays and objects now support destructuring.

Array destructuring gives a quicker and more fine-grained approach to interacting with elements in an array. See below:

Old way
```js
const user = {
  name:"Elon"
  , lastName:"Musk"
};
 const name = user.name;
 const lastName = user.lastName;

const names = ["Elon", "Justin", "Joe"];
const firstName = names[0]
const thirdName = names[2]
```

Using destructing
```js
const user = {
  name:"Elon"
  , lastName:"Musk"
  , permissions:{
    read:true
    , write:false
    , execute:false
  }
};
const {name, lastName, age=0} = user;
console.log(name) //Elon
//assign a new variable name
const {name:userName} = user;
console.log(userName) //Elon
//Nested destructing
const {permissions:{read, write:writePermission}} = user;
console.log(read) // true
console.log(writePermission) // true

const names = ["Elon", "Justin", "Joe"];
const [firstName, ,thirdName] = names;
```

**[Back to top](#table-of-contents)**

## Spread Operator

Spreading of elements of an iterable collection (like an array or even a string) into both literal elements and individual function parameters.

```js
const foo = [1,2,3];
const fooSecond = [4,5,6];

const allFoo = [...foo, ...fooSecond]; //[ 1, 2, 3, 4, 5, 6 ]

function sumThreeNumbers(first,second,third){
  return first + second + third;
}
const parameters = [1,2,3];

//Using apply (ES5 Function)
sumThreeNumbers.apply(undefined, parameters)

//Using Spread Operator
sumThreeNumbers(...parameters);

//Creating objects
const obj = {
  prop1:"1"
  prop2:"2"
  prop3:"3"
}

const objb = {
  prop4:"4"
  prop5:"5"
  prop6:"6"
}

const objc = {
  ...obj
  , ...objb
}

console.log(objc);
/*
{ prop1: '1',
  prop2: '2',
  prop3: '3',
  prop4: '4',
  prop5: '5',
  prop6: '6' }
*/
```

**[Back to top](#table-of-contents)**

### String Interpolation

Intuitive expression interpolation for single-line and multi-line strings. (Notice: don't be confused, Template Literals were originally named "Template Strings" in the drafts of the ECMAScript 6 language specification)

```js
const user ={
  name:"Elon"
  , lastName:"Musk"
}
//Old way
console.log("The user "+ user.name+" "+user.lastName+" is wonderful")

//Using String Templates
console.log(`The user ${user.name} ${user.lastName} is wonderful`)

console.log(`The person ${user.name}
wants to build rockets and launch 
them to Mars`)

```

**[Back to top](#table-of-contents)**

### Computed Property Names

```js
function person({name, lastName, age}){
  function completeName(){
    return `${name}Age`
  }
  return {
    name
    , lastName
    , age
    , [completeName()]:age
  }
}


const user = {
  name:"Elon"
  , lastName:"Martinez"
  , age:27
}


console.log(person(user))
/*
{ name: 'Elon',
  lastName: 'Martinez',
  age: undefined,
  ElonAge: undefined }
*/
```

**[Back to top](#table-of-contents)**

## Default function parameters

```js
function sum(a, b = 0, c = 0) {
    return a + b + c
}
console.log(sum(3)) //3
```

**[Back to top](#table-of-contents)**

## Promises

Promises give us a way to handle asynchronous processing in a more synchronous fashion. They represent a value that we can handle at some point in the future. And, better than callbacks here, Promises give us guarantees about that future value, specifically:

No other registered handlers of that value can change it (the Promise is immutable)
We are guaranteed to receive the value, regardless of when we register a handler for it, even if it's already resolved (in contrast to events, which can incur race conditions).

```js
const message = ()=>new Promise((resolve,reject)=>{
  setTimeout(()=> resolve("Hello"), 1000)
})

const name = ()=>new Promise((resolve,reject)=>{
  setTimeout(()=> resolve("Elon !"), 1000)
})
//Solving a promise
message()
  .then(responsePromiseOne=>{
    name().then(responsePromiseTwo=>{
      console.log(`${responsePromiseOne} ${responsePromiseTwo}`)
    })
  })
//Hello Elon !

//Rejecting a promise
const wantToBeMyGirlfriend = ()=>new Promise((resolve,reject)=>{
  setTimeout(()=>reject("noooppee!"), 3000)
})

wantToBeMyGirlfriend()
  .then(response=>{
    console.log(response)
  })
  .catch(error=>{
    console.error(error)
  })
//noooppee!
```

A Promise itself has one of the following three states:

* Pending - until a Promise is fulfilled it is in pending state
* Fulfilled - when the first handler is called the Promise is considered fulfilled with the value passed to that handler.
* Rejected - if the second handler is called, the Promise is considered rejected with the value passed to that handler.

Promise All

```js
const p1 = Promise.resolve(3); //3
const p2 = 1337; //1337
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
}); //"foo"

Promise.all([p1, p2, p3]).then(values => { 
  console.log(values); // [3, 1337, "foo"] 
});
```
**[Back to top](#table-of-contents)**

## Async and await

There’s a special syntax to work with promises in a more comfort fashion, called “async/await”. It’s surprisingly easy to understand and use.

```js
const message = ()=>new Promise((resolve,reject)=>{
  setTimeout(()=> resolve("Hello"), 1000)
})

const name = ()=>new Promise((resolve,reject)=>{
  setTimeout(()=> resolve("Elon !"), 1000)
})

//Consuming promises using async and await function
async function getMessage(){
  try{
    console.log(`${await message()} ${await name()}`)
  }catch(error){
    console.error(error)
  }
  
}
getMessage();
//Hello Elon !
```

**[Back to top](#table-of-contents)**

### Modules on JS

### Common JS

Modules are the fundamental building blocks of the code structure. The module system allows you to organize your code, hide information and only expose the public interface of a component using module.exports. Every time you use the require call, you are loading another module.

```js
// add.js
function add (a, b) {
  return a + b
}

module.exports = add
```

To use the add module we have just created, we have to require it.

```js
// index.js
const add = require('./add')

console.log(add(4, 5))
//9
```

**[Back to top](#table-of-contents)**

### ES6 Modules

The goal for ECMAScript 6 modules was to create a format that both users of CommonJS and of AMD are happy with:

Similar to CommonJS, they have a compact syntax, a preference for single exports and support for cyclic dependencies.
Similar to AMD, they have direct support for asynchronous loading and configurable module loading.
Being built into the language allows ES6 modules to go beyond CommonJS and AMD (details are explained later):

Their syntax is even more compact than CommonJS’s.
Their structure can be statically analyzed (for static checking, optimization, etc.).
Their support for cyclic dependencies is better than CommonJS’s.
The ES6 module standard has two parts:

Declarative syntax (for importing and exporting)
Programmatic loader API: to configure how modules are loaded and to conditionally load modules

```js
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5

//Exports everything
//------ main.js ------
import * as lib from 'lib';
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5

//Default exports (one per module) 
//------ myFunc.js ------
export default function () { ... };

//------ main1.js ------
import myFunc from 'myFunc';
myFunc();
```

**[Back to top](#table-of-contents)**

## Functional Programming

### Declarative vs Imperative Coding Style (FP)

We are going to switch our mindset. From here on out, we'll stop telling the computer how to do its job and instead write a specification of what we'd like as a result. I'm sure you'll find it much less stressful than trying to micromanage everything all the time.

Declarative, as opposed to imperative, means that we will write expressions, as opposed to step by step instructions.

Think of SQL. There is no "first do this, then do that". There is one expression that specifies what we'd like from the database. We don't decide how to do the work, it does. When the database is upgraded and the SQL engine optimized, we don't have to change our query. This is because there are many ways to interpret our specification and achieve the same result.

```js
// imperative
const makes = [];
for (let i = 0; i < cars.length; i += 1) {
  makes.push(cars[i].make);
}

// declarative
const makes = cars.map(car => car.make);
```

Other Example

```js
// imperative
const authenticate = (form) => {
  const user = toUser(form);
  return logIn(user);
};

// declarative
const authenticate = compose(logIn, toUser);
```

**[Back to top](#table-of-contents)**

### First class functions

When we say functions are "first class", we mean they are just like everyone else... so in other words a normal class. We can treat functions like any other data type and there is nothing particularly special about them - they may be stored in arrays, passed around as function parameters, assigned to variables, and what have you.

```js
const hi = name => `Hi ${name}`;
const greeting = name => hi(name);
```

```js
httpGet('/post/2', json => renderPost(json));
// go back to every httpGet call in the application and explicitly pass err along.
httpGet('/post/2', (json, err) => renderPost(json, err));
// renderPost is called from within httpGet with however many arguments it wants
httpGet('/post/2', renderPost);
```

**[Back to top](#table-of-contents)**

### Pure Functions

A pure function is a function which:

+ Given the same input, will always return the same output.
+ Produces no side effects.
+ Doesn't mutate Object's State (Immutability)

Consider the next examples

```js
// impure (is sharing state the minimum variable)
let minimum = 21;
const checkAge = age => age >= minimum;

// pure
const checkAge = (age) => {
  const minimum = 21;
  return age >= minimum;
};
```

```js
// impure (is mutating data)
let values = [1,2,3,4];
const sum10 = list => {
  for(let counter=0;counter<list.length;counter++)
    list[counter]+=10
  return list
};
console.log(sum10(values))
console.log(values)
/*
[ 11, 12, 13, 14 ]
[ 11, 12, 13, 14 ]
*/

// pure (it doesn't mutate the out state)
let values = [1,2,3,4];
const sum10 = list=>{
  const temp = [...list];
  for(let counter=0;counter<temp.length;counter++)
  temp[counter]+=10
  return temp
}
/*
[ 11, 12, 13, 14 ]
[ 1, 2, 3, 4 ]
*/

//ES6 and its pure functions to the rescue
let values = [1,2,3,4];
const sum10 = list=>list.map((value,index)=>value+10)
console.log(sum10(values))
console.log(values)
/*
[ 11, 12, 13, 14 ]
[ 1, 2, 3, 4 ]
*/
```

**[Back to top](#table-of-contents)**

### High Order Functions (FP)

High Order Functions

A higher order function is a function that takes a function as an argument, or returns a function. Higher order function is in contrast to first order functions, which don’t take a function as an argument or return a function as output.

Duplicate the values of an array
```js
const values = [2,3,4];
//First class function
const doubleValue=value=>value*2;

const duplicateList = list=>list.map(doubleValue);
console.log(duplicateList(values))// [ 4, 6, 8 ]
/*
  const duplicateList = list=>list.map(value=>value*2);
*/
```

**[Back to top](#table-of-contents)**

### Currying

The concept is simple: You can call a function with fewer arguments than it expects. It returns a function that takes the remaining arguments.

```js
const add = x => y => x + y;
/*
function add(x){
  return function(y){
    return x+y
  }
}
*/
const increment = add(1);
const addTen = add(10);

increment(2); // 3
addTen(2); // 12

//Example 2
const splitBy = simbol => string=>string.split(simbol)
const splitBySpace = splitBy(" ");
const splitByComma = splitBy(",");

console.log(splitBySpace("hello guys"));
//[ 'hello', 'guys' ]
const words = splitBySpace;
console.log(words("this should be separate"));
//[ 'this', 'should', 'be', 'separate' ]
const getCVSValues = splitByComma;
console.log(getCVSValues("value1,value2,value3"));
//[ 'value1', 'value2', 'value3' ]
```

**[Back to top](#table-of-contents)**

### Composed Functions

The composition of two functions returns a new function. This makes perfect sense: composing two units of some type (in this case function) should yield a new unit of that very type. You don't plug two legos together and get a lincoln log. There is a theory here, some underlying law that we will discover in due time.

In our definition of compose, the g will run before the f, creating a right to left flow of data. 

This is much more readable than nesting a bunch of function calls. Without compose, the above would read:
```js
const compose = (f, g) => x => f(g(x));

const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const shout = compose(exclaim, toUpperCase);
//const shout = x => exclaim(toUpperCase(x));
console.log(shout('send in the clowns')); // "SEND IN THE CLOWNS!"
```

```js
const compose = (f, g) => x => f(g(x));
/*
const compose = function(fcnOne, fcnTwo){
  return function(parameter){
    return fcnOne(fcnTwo(parameter))
  }
}
*/
const splitBy = simbol => string=>string.split(simbol)
const splitBySpace = splitBy(" ");
const splitByComma = splitBy(",");

const response = "oscar martinez,walter maidub,eduardo ramirez";

//const map = (fcn,list)=>list.map(fcn)
//Currying
const map = fcn=>list=>list.map(fcn)

const getUsersData = compose(map(splitBySpace),splitByComma);

console.log(getUsersData(response))
/*
[ [ 'oscar', 'martinez' ],
  [ 'walter', 'maidub' ],
  [ 'eduardo', 'ramirez' ] ]
*/

```

**[Back to top](#table-of-contents)**

## Modern JavaScript Explained For Dinosaurs

![Dinosaurs Everywhere](img/dinosaurs.png "Logo Title Text 1")

![Dinosaurs Everywhere](img/dontdoit.jpg "Logo Title Text 1")

## Nodejs

### What is NodeJS?

Node.js is a JavaScript runtime environment. But what is that, one might ask. By run-time environment, the infrastructure to build and run software applications is meant. To build applications in JavaScript, in this case. Let’s see what are the Node.js definition versions.

The company itself describes Node.js as a “JavaScript runtime built on "**Chrome V8 engine**". Wikipedia states, that “Node.js is an open-source and cross-platform environment to execute code”. According to TechTarget, it is 
"a development platform aimed at building server-side applications". And PCMag tells us that Node.js is “a platform with its own web server for better control”. That is certainly enough to grasp the main idea.

**[Back to top](#table-of-contents)**

### What is NPM?

**npm** is the package manager for JavaScript and the world’s largest software registry. Discover packages of reusable code — and assemble them in powerful new ways.

**[Back to top](#table-of-contents)**

### NPM Tools

npm is gaining more and more steam as a replacement for other build tools such as Gulp, Grunt, Bower, and others. While the previously mentioned are great tools, node provides a great way to implement build processes with only npm and your package.json file. Here, we will go into an introduction to this process as well as a few key things to know about if you are looking to learn about using NPM as a build tool.

Using npm as a build tool is all about working in the package.json file and creating custom scripts in the scripts object of file, so that is where we will spend most of our time.

**Shortcut scripts:**

+ npm test
+ npm start
+ npm stop
+ npm install
+ npm uninstall
+ npm publish
+ npm update

They are shortcuts for npm run `<command>`

**Pre and Post Hooks:**

Another cool feature about npm is that any script that can be executed also has a set of pre- and post- hooks, which are simply definable in the scripts object.

+ npm run prelint, npm run lint, npm run postlint
+ npm run pretest, npm run test, npm run posttest

**Passing Arguments**

Another cool feature with npm (since npm 2.0.0, at least) is passing argument sets through to the underlying tools. This can be a little complex, but here’s an example:

```json
"scripts": {
  "test": "mocha test/",
  "test:xunit": "npm run test -- --reporter xunit"
}
```

**[Back to top](#table-of-contents)**

**NPM Config Variables**

One last thing that is worth mentioning - npm has a config directive for your package.json. This lets you set arbitrary values which can be picked up as environment variables in your scripts. Here’s an example:
```json
"name": "fooproject",
"config": {
  "reporter": "xunit"
},
"scripts": {
  "test": "mocha test/ --reporter $npm_package_config_reporter",
  "test:dev": "npm run test --fooproject:reporter=spec"
}
```

**[Back to top](#table-of-contents)**

**The Windows Problem**

Let’s get something out of the way before we progress. Because npm is reliant on the operating systems shell to run scripts commands, they can quickly become unportable. While Linux, Solaris, BSD and Mac OSX come preinstalled with Bash as the default shell, Windows does not. On Windows, npm will resort to using Windows command prompt for these things.

A good chunk of syntax that works in Bash will also work in Windows command prompt the same way:

+ `&&` for chaining tasks
+ `&` for running tasks simaltaneously
+ `<` for inputting the contents (stdin) of a file to a command
+ `>` for redirecting output (stdout) of a command and dumping it to a file
+ `|` for redirecting output (stdout) of a command and sending it to another 

The biggest problems between the two is the availability and naming of commands (e.g. cp is COPY in Windows) and variables (Windows uses % for variables, Bash $). 

**Using multiple files**

```json
"devDependencies": {
  "jshint": "latest"
},
"scripts": {
  "lint": "jshint *.js"
}
```

**Running multiple tasks**

```json
"devDependencies": {
  "jshint": "latest",
  "stylus": "latest",
  "browserify": "latest"
},
"scripts": {
  "lint": "jshint **",
  "build:css": "stylus assets/styles/main.styl > dist/main.css",
  "build:js": "browserify assets/scripts/main.js > dist/main.js",
  "build": "npm run build:css && npm run build:js",
  "prebuild:js": "npm run lint"
}
```

**Clean**

```json
"scripts": {
  "clean": "rm -r dist/*"
}
```

**Watch**

>Nodemon is a famous watcher used for npm projects

```json
"devDependencies": {
  "mocha": "latest",
  "stylus": "latest"
},
"scripts": {
  "test": "mocha test/",
  "test:watch": "npm run test -- -w",

  "css": "stylus assets/styles/main.styl > dist/main.css",
  "css:watch": "npm run css -- -w"
}
```

NPM Tools resources

[Introduction to Using NPM as a Build Tool](https://medium.com/javascript-training/introduction-to-using-npm-as-a-build-tool-b41076f488b0)  

[How to Use npm as a Build Tool](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)  

[Simple build tools: npm scripts vs Makefile vs runjs](https://hackernoon.com/simple-build-tools-npm-scripts-vs-makefile-vs-runjs-31e578278162)


## Babel

Babel is a JavaScript compiler
Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. Here are the main things Babel can do for you:

+ Transform syntax
+ Polyfill features that are missing in your target + environment (through @babel/polyfill)
+ Source code transformations (codemods)
+ And more! (check out these videos for inspiration)

**ES2015 and beyond**

Babel has support for the latest version of JavaScript through syntax transformers.

These plugins allow you to use new syntax, right now without waiting for browser support. Check out our usage guide to get started.

**JSX and React**

Babel can convert JSX syntax! Check out our React preset to get started. Use it together with the babel-sublime package to bring syntax highlighting to a whole new level.

**Babel is Multiple Packages**

In previous Babel versions, you’d simply install babel. Now you install separate packages:

+ babel-core — The core compiler. It transforms nothing out of the box. You need plugins for that (more on this below).
+ babel-cli — The command line interface. It includes three handy command line tools: babel-doctor, which checks your config, babel-node, which is useful for running babel against your Node scripts in development, and babel, which is the core CLI.

**Be Sure to Polyfill**

Although Babel transpiles to ES5, some ES6 features like Array.from, set, map, promise, generator functions, and many others can’t be transpiled. So if you use these, they must be polyfilled. There are three ways to handle this:

+ babel-polyfill
+ babel-runtime
+ Do it yourself. Pull in specific polyfills as needed.

**Babel Presets**

Technically presets are collections of plugins
The usecase is the support of particular language features.

A preset is a set of plugins used to support particular language features.

Babel Presets:

+ @babel/preset-env
+ @babel/preset-flow
+ @babel/preset-react
+ @babel/preset-typescript

**Preset stages**

Stages represent the status of experimental features. Pre stage-3 should be used with caution.


The [TC39](https://github.com/tc39) categorizes proposals into the following stages:

+ Stage 0 - Strawman: just an idea, possible Babel plugin.
+ Stage 1 - Proposal: this is worth working on.
+ Stage 2 - Draft: initial spec.
+ Stage 3 - Candidate: complete spec and initial browser implementations.
+ Stage 4 - Finished: will be added to the next yearly release.

[Try it out!!!!](https://babeljs.io/repl)  
[Babel Presets Info](https://babeljs.io/docs/en/next/presets)

**[Back to top](#table-of-contents)**

## Webpack

What is webpack?

At its simplest, webpack is a module bundler for your JavaScript. However, since its release it’s evolved into a manager of all your front-end code (either intentionally or by the community’s will).

`webpack.config.js` file in the root of our project directory

```js
const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
};
```

VanillaJS

The Vanilla JS team takes pride in the fact that it is the **most lightweight framework available anywhere**; using our production-quality deployment strategy, your users' browsers will have Vanilla JS loaded into memory before it even requests your site.

To use Vanilla JS, just put the following code anywhere in your application's HTML:

```html
<script src="path/to/vanilla.js"></script>
```

When you're ready to move your application to a production deployment, switch to the much faster method:

```html

```
 
**That's right - no code at all. Vanilla JS is so popular that browsers have been automatically loading it for over a decade.**

Retrieve DOM element by ID

| Framework | Code | ops/sec |
| :---: | :---: | :---: |
| Vanilla JS	| document.getElementById('test-table') | 12,137,211 |
| jQuery	| $jq('#test-table');	| 350,557 |

```js
// Native selectors.
(function(window, document) {
	'use strict';

	var noop = function() {
	};

	// DOCUMENT LOAD EVENTS
	// not needed at the bottom of the page
	document.addEventListener('DOMContentLoaded', noop);
	window.onload = noop;

	// SELECTORS
	document.getElementById('id');
	document.getElementsByClassName('some-class-name');
	document.getElementsByTagName('a');
	document.querySelectorAll('.class-name');
	// only returns the first match of querySelectorAll
	document.querySelector('.class-name');

	// EACH (NODE LIST)

	var nodes = document.querySelectorAll('.class-name'),
		elements = Array.prototype.slice.call(nodes);

	// 1.
	elements.forEach(noop);

	// 2. (clean, but creates a new array)
	[].forEach.call(nodes, noop);

	// 3.
	Array.prototype.forEach.call(nodes, noop);

	// 4. - jquery style!
	function $$(selector) {
		var nodes = document.querySelectorAll(selector);
		return Array.prototype.slice.call(nodes);
	}

	$$('selector'); // similar to jQuery

	// FIRST
	var nodeList = document.querySelectorAll('.some-class'),
		first = nodeList[0];

	// LAST
	var last = nodeList[nodeList.length - 1];

	// InnerHTML na InnerText
	var node = document.getElementById('my-id');
	node.innerHTML = 'New Html!';
	node.innerText = 'New text';

	// IS A (matches - needs a polyfill in older browsers)
	var node = document.getElementById('header-link'),
		isAnchor = node.matches('a');

	// FILTER
	var nodeList = document.getElementsByClassName('my-class'),
		filtered = Array.prototype.filter.call(nodeList, function(header) {
			// filter condition

			return header.innerText.indexOf('Item') !== -1;
		});

	// FIND
	var parent = document.querySelector('.parent'),
		children = parent.querySelectorAll('.child');

	// NEXT/PREV
	var node = document.getElementById('my-id');
	node.nextElementSibling;
	node.nextElementSibling;

	// CLOSEST
	var node = document.getElementById('my-id'),
		isFound = false;

	while (node instanceof Element) {
		if (node.matches('.target-class')) {
			isFound = true;
			break;
		}
		node = node.parentNode;
	}

	// isFound and node will be populated

	// prototype closest!
	if (Element && !Element.prototype.closest) {
		Element.prototype.closest = function(selector) {
			var el = this;
			while (el instanceof Element) {
				if (el.matches(selector)) {
					return el;
				}
				el = el.parentNode;
			}
		}
	}

	// NEW ELEMENTS
	var heading = document.createElement('h1'),
		target = document.getElementById('global-nav');

	heading.innerText = 'HELLO WORLD!!!!';
	document.querySelector('.my-class')
		.insertBefore(heading, target);

	// NODE PROPERTIES
	var node = document.getElementById('my-el');
	// style
	node.style.backgroundColor = 'blue';
	// attributes
	node.getAttribute('href');
	// properties
	node.href;
	node.checked;
	node.disabled;
	node.selected;

	// MOCK EVENTS
	var anchor = document.getElementById('my-anchor'),
		event = new Event('click');
	anchor.dispatchEvent(event);

	// Listeners
	var node = document.getElementById('my-node'),

	// this = element
		onClick = function(event) {
			// can filter by target
			if (!event.target.matches('.tab-header')) {
				return;
			}

			// stop the default browser behaviour
			event.preventDefault();

			// stop the event from bubbling up the dom
			event.stopPropagation();

			// other listeners on this node will not fire
			event.stopImmediatePropagation();
		};

	node.addEventListener('click', onClick);
	node.removeEventListener('click', onClick);
	// can also add to all by using loop
	// can add to higher element and use 'matches' to see if specific
	// 	child was clicked (similar to .on)

	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/url', true);
	xhr.onload = function() {
		if (this.status === 200) {
			console.log('success!');
		} else {
			console.log('failed', this.status);
		}
	};

	xhr.send();

	var xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/url/post', true);
	xhrPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhrPost.onload = noop;
	xhrPost.send();

})(window, window.document);
```

[TODO App](../VanillaJS/src/index.html)  

[TODO App - VanillaJS](http://todomvc.com/examples/vanillajs)

[TODO App - Vanilla ES6](http://todomvc.com/examples/vanilla-es6)

**[Back to top](#table-of-contents)**


