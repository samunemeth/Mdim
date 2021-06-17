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
let grid = make2DArray(10, 10); // make grid is a 10 by 10 array

grid.forEachM((elem, pos) => {
    console.log(elem, ' at position ', pos); // logs every element and it's position to the console
});

```