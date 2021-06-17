# JavaScript Mdim library
This library is made for multidimensional arrays in Javascript.

## Standalone functions:
- `make2DArray()`
- `makeArray()`

## Array operations:
- ~~`removeElement()`~~
- ~~`copyArr()`~~
- [`forEachM()`](#forEachM)
- [`fillM()`](#fillM)


<a name="forEachM"/>

### forEachM( f(elem, pos) )

This is a multidimensional version of the forEach function. It loops trough all the nested arrays. It takes a function as a parameter, and executes it for every element in the array. It gives the function the current element, and the position of the element.

Example:

```javascript
let grid = make2DArray(10, 10); // make grid a 10 by 10 array

grid.forEachM((elem, pos) => {
    console.log(elem, ' at position ', pos); // logs every element and it's position to the console
});

```

<a name="fillM"/>

### fillM( f(pos, elem) ) or fillM( val )

This function fills a multidimensional array with something. It takes either a function, or a constant value. It gives the function the position of the current spot, and the element that will be replaced with the output of the function.

**Example:**

```javascript
let grid = make2DArray(10, 10); // make grid a 10 by 10 array

grid.fillM(3); // fill the grid with the number 3
console.log(grid); // log it

grid.fillM((pos, elem) => {
    return {x: pos[0], y: pos[1], old: elem}; // fill the grid with object that contain the objects position and the old value (in this case: 3)
});
console.log(grid); // log it

```