/*
    Created by: Samu Németh
    License: MIT
    Contact:
        E-mail: samunemeth.hu@gmail.com
        Website: http://www.samunemeth.hu/
*/

/*
    Copyright 2021 Samu Németh
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
    TABLE OF CONTENT

    --------Name and number-----------------------function name and parameter----------

    1.0 Multi dimensional arrays
        1.1 2D array creator                        make2DArray(x, y);
        1.2 Multi dimensional array creator         makeArray(dim);
    2.0 Array operations                            
        2.1 Remove element                          removeElement(arr, elem);
        2.2 Copy array                              copyArr(arr);
        2.3 Multidimensional forEach                forEachM(arr, f(e, pos));
        2.4 Fill multidimensional array             fillM(arr, f(pos, e));
*/



/* --- 1.0 Multi dimensional arrays --- */


/*
    1.1 2D array creator
    fast but it can only handle 2 dimensions
*/

function make2DArray(x, y) {
    arr = new Array(x);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(y);
    };
    return (arr);
};

/*
    1.2 Multi dimensional array creator
    slow but it can handle any number of dimensions
*/

function makeArray(dim) {

    // check for invalid list of dimensions
    if (!dim || typeof dim != 'object' || dim.constructor != Array) return undefined;
    if (dim.length < 1) return undefined;
    if (!dim[0] || dim[0] % 1 != 0) return undefined;

    // if only 1 dimension then create simple array, else do recursion
    if (dim.length == 1) {
        return new Array(dim[0]);
    } else {
        const old = dim[0];
        dim.shift();
        return makeArrayHelp(new Array(old), dim);
    }
}

function makeArrayHelp(arr, dim) {

    // check for invalid list of dimensions
    if (!dim[0] || dim[0] % 1 != 0) return undefined;

    // add sub-arrays
    for (let k = 0; k < arr.length; k++) {
        arr[k] = new Array(dim[0]);
    }

    // do recursion if there are more dimensions
    if (dim.length > 1) {
        dim.shift();
        for (let k = 0; k < arr.length; k++) {
            arr[k] = makeArrayHelp(arr[k], dim);
        }
    }

    return arr;
}


/* --- 2.0 Array operations --- */


/*
    2.1 Remove element
*/

function removeElement(arr, elem) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elem) {
            arr.splice(i, 1);
        }
    }
    return arr;
};

/*
    2.2 Copy array
    copies an array with the spread operator
*/

function copyArr(arr) {
    return [...arr];
}

/*
    2.3 Multidimensional forEach 
    forEach for multidimensional arrays
*/

Array.prototype.forEachM = function (f, from = []) {

    if (!this.length) return;
    const evaluate = !this[0] || this[0].constructor != Array;

    for (let i = 0; i < this.length; i++) {

        const pos = [...from];
        pos.push(i);

        if (evaluate) {
            f(this[i], pos);
            continue;
        }

        this[i].forEachM(f, pos);
    }
}

/*
    2.4 Fill multidimensional array
    for filling a multidimensional array with anything
*/

Array.prototype.fillM = function (f, from = []) {

    if (!this.length) return;
    const evaluate = !this[0] || this[0].constructor != Array;
    const static = f?.constructor != Function;

    for (let i = 0; i < this.length; i++) {

        const pos = [...from];
        pos.push(i);

        if (evaluate) {

            if (static) {
                this[i] = f;
                continue;
            }

            this[i] = f(pos, this[i]);
            continue;
        }

        this[i].fillM(f, pos);
    }
}
