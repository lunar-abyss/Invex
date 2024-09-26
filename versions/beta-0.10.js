// INVEX Programming Language Interpreter by Lunaryss

// call stack
const cstack = [];

// preparer
const prepare = code => code
  .replace(/(\*.*$)|,/gm, " ")
  .replace(/[()]/g, " $& ")
  .toLowerCase()
  .trim()
  .split(/\s+/);

// parser
const parse = code => code
  .reduce((tree, t) => (
    t == "(" ? tree.push([tree.at(-1).pop()]) :
      t == ")" ? tree.at(-2).push(tree.pop()) :
        tree.at(-1).push(t), tree), [[]])[0];

// evaluator
const calc = function(code)
{
  // both integer and symbol literals
  if (+code + 1 || typeof code == "string")
    return +code + 1 ? +code : code;

  // data for function call
  const fn = atoms[code[0]];
  const args = fn == atoms.fun
    ? code.slice(1) : code.slice(1).map(calc);

  // native function
  if (typeof fn == "function")
    return fn(...args);

  // user function
  else if (typeof fn == "object" && fn.type == "fun")
    return cstack.push([code[0], ...args]),
      cstack[cstack.length - 1] = invex.call(fn),
      cstack.pop();

  // variable
  return fn ?? 0;
}

// keywords
const atoms = {
  set: (name, value) => value != 0 ? atoms[name] = value : (delete atoms[name], 0),
  get: name => atoms[name] ?? 0,
  fun: (...conts) => (conts.type = "fun", conts),
  arg: n => cstack.at(-1)[n] ?? 0,
  if: (cond, t, f = 0) => cond != 0 ? invex.call(t) : f && invex.call(f),
  loop: (cond, body) => { let r = 0; while (invex.call(cond) != 0) r = invex.call(cond); return r; },
}

// collecting module
const invex = {
  run: code => parse(prepare(code)).map(calc),
  calc: calc,
  call: fn => fn.map(calc).at(-1),
  clear: () => invex.atoms = atoms, 
  atoms: { ...atoms },
}

// exporting
export default invex;