# Invex Programming Language

## Introduction
Invex (invocation expressions) is a programming language based on functions only.
The language can be easily used in any JS project as a scripting language.
It doesn't define anything except keywords, so the interpreter weighs very little.

## Syntax
The whole syntax is based on classic function calls, like in many other languages.

```js
* square a number
set(sqr, fun(
  mul(arg(1), arg(1))))
```

## Types
There are 4 types of values in Invex:
- `num`: integer; `1`, `54`, `5553`, etc.
- `sym`: symbol; `sqr`, `fall`, etc.
- `fun`: function; `fun(...contents...)`.
- `deq`: list; can't be represented without additional functions, so this type can be not implemented.

## Keywords
There are several functions that have special capabilities.
- `set(<sym>, <any>)` sets a symbol to a value, creating a new function.
- `get(<sym>)` returns a value by the symbol.
- `fun(<tokens>...)` creates a new function. The only function in the language, which arguments are not evaluated.
- `arg(<num>)` returns the nth argument of the currently executing function.
- `if(<any>, <fun>, [fun])` if the first argument is true, executes the second argument, otherwise the third.
- `loop(<fun>, <fun>)` repeats the second argument until the first argument is false.

## Embedding
As was said invex can be embedded in a JS project.

To run code, you need to import the interpreter and run it with a code.
```js
import invex from "./invex.js"; // <-- copy file to you folder and use it's name
invex.run(/* code you want to run */ code);
```

But usually you want to have more then 6 keywords, so you can add more to the interpreter.
```js
Object.assign(invex.atoms, {
  add: (a, b) => a + b,          // nums and syms are numbers and strings in js
  call: (fn) => invex.calc(fn),  // call invex function, invex functions are lists with type property set to "fun"
})
```

## Usage
Any one can use Invex for any purpose, but it's not recommended to use it for anything serious.
Invex is a language for fun, not for profit (if you somehow able to make a profit with it).

## License
No license yet. So the copyright for this language belongs to me, but any intellectual property based on this project belongs to the creator of this intellectual property.