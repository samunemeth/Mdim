# JavaScript Mdim library
This library is made for multidimensional arrays in JavaScript. It is fully [ES6](https://www.w3schools.com/js/js_es6.asp) compatible. The minified version (the one with the extension *.min.js*) includes all the functions from the original library, it just removes the comments an the readability.

## Standalone functions:
- `make2DArray()`
- `makeArray()`

## Array operations:
- ~~`removeElement()`~~
- ~~`copyArr()`~~
- [`forEachM()`](#forEachM)
- [`fillM()`](#fillM)
- [`dim()`](#dim)


<a name="forEachM"></a>

### `forEachM( f(elem, pos) )`

This is a multidimensional version of the [`forEach()`](https://www.w3schools.com/jsref/jsref_foreach.asp) function. It loops trough all the nested arrays. It takes a function as a parameter, and executes it for every element in the array. It gives the function the current element, and the position of the element.

**Example:**

```javascript
let grid = make2DArray(10, 10); // make grid a 10 by 10 array

grid.forEachM((elem, pos) => {
    console.log(elem, ' at position ', pos); // logs every element and it's position to the console
});

```


<a name="fillM"></a>

### `fillM( val )` or `fillM( f(pos, elem) )`

This function fills a multidimensional array with something. It takes either a function, or a constant value. It gives the function the position of the current spot, and the element that will be replaced with the output of the function.

**Example:**

```javascript
let grid = make2DArray(10, 10); // make grid a 10 by 10 array

grid.fillM(3); // fill the grid with the number 3
console.log(grid); // this should log something like: [[3, 3, 3, ...] ...]

grid.fillM((pos, elem) => {
    return {x: pos[0], y: pos[1], old: elem}; // fill the grid with object that contain the objects position and the old value (in this case: 3)
});
console.log(grid); // this should log something like: [[{x: 0, y: 0, old: 3}, ...] ...]

```


<a name="dim"></a>

### `dim()`

The dim method returns the dimensions of the array.

**Example:**

```javascript
let grid = make2DArray(10, 5); // make grid a 10 by 5 array

console.log(grid.dim()); // should log: [10, 5]

```