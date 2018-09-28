## Values & Types

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

## Coercion

+ Explicit coercion  
  `Number("999.99") == 999.99`

+ Implicit coercion  
  `"999.99" == 999.999`

  Implicit coercion is a mechanism that can be learned, and moreover should be learned by anyone wishin to take JavaScript programming seriously!

### Truthly & Falsy

We briefly mentioned the "truthy" and "falsy" nature of values: when a non-boolean value is coerced to a boolean, does it become true or false, respectively?

The specific list of "falsy" values in JavaScript is as follows:

+ `""` (empty string)
+ `0, -0, NaN` (invalid number)
+ null, undefined
+ false

An value that's not on this "falsy" list is "truthy"

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

## Strict Mode

ES5 added a "strict mode" to the language, which tightens the rules for certain behavrios. Generally these restrictions are seen as keeping the code to a safer and more appropriate set of guidelines, Also adhering to strict mode makes your code generally more optimizable by the engine.

```
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

## Non-Javascript


The reality is that mos JS is written to run in and interact with environment like browsers, a good chunk of the stuff that you write in your code is, strictly speaking, not directly controlled by JavaScript.

The mos common non-JavaScript JavaScript you'll encounter is the DOM API. For example:
```js
var el = document.getElementByID("foo");
```

The `document` variable exits as a global variable when your code is running in a browser. It's not provided by the JS engine, nor is it particularly controlled by the JavaScript specification. Ittakes the form of something that looks an awful lot like a normal JS object, but it's not really exactly that. It's a special object, often called a "host object"
