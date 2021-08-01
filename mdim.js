/*
    Created by: Samu Németh
    Creation date: 2021
    License: MIT
    Contact:
        E-mail: samunemeth.hu@gmail.com
        Website: http://www.samunemeth.hu/
*/


/* --- 1.0 Standalone functions --- */


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
}

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
    2.1 Remove element (removed)
*/

/*
    2.2 Copy multidimensional array
    copies a multidimensional array with the spread operator
*/

Array.prototype.copy = function () {

    if (!this.length) return [];

    if (this[0] && this[0].constructor == Array) {

        let arr = [];

        for (let i = 0; i < this.length; i++) {
            arr.push(this[i].copy());
        }

        return arr;
    }

    return [...this];
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
    const func = f && f.constructor == Function;

    for (let i = 0; i < this.length; i++) {

        const pos = [...from];
        pos.push(i);

        if (evaluate) {

            if (func) {
                this[i] = f(pos, this[i]);
                continue;
            }

            this[i] = f;
            continue;
        }

        this[i].fillM(f, pos);
    }
}

/*
    2.5 Dimensions of multidimensional array
    for getting the dimensions of a multidimensional array
*/

Array.prototype.dim = function (prev = []) {

    prev.push(this.length);
    if (this[0] && this[0].constructor == Array) {
        return this[0].dim(prev);
    }
    return prev;
}

/*
    2.6 Last element of an array
    for getting the last element of an array
*/

Object.defineProperty(Array.prototype, 'last', {
    get: function() {
        return this[this.length - 1];
    }
});

// Array.prototype.last = function () {
//     return this[this.length - 1];
// }

/*
    2.6 Last element of a multidimensional array
    for getting the last element of a multidimensional array
*/

Object.defineProperty(Array.prototype, 'lastM', {
    get: function() {

        const last = this.last;

        if (last && last.constructor == Array) {
            return last.lastM;
        }
    
        return last;
    }
});

// Array.prototype.lastM = function () {

//     const last = this.last();

//     if (last && last.constructor == Array) {
//         return last.lastM();
//     }

//     return last;
// }