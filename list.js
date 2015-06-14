/*
 * Calcular el producto de todos los pares mayores que 5 sin
 * incluir el número par más grande
 */

var l1 = [1,8,2,15,6,7,8,12]; //384
var l2 = [12,8,2,15,6,7,8,12]; //384
var l3 = [1,8,2,15,6,7,8,12,12]; //384
var l4 = [1,8,2,15,12,6,7,8,12]; //384
var l5 = [12,8,7,6,15,2,8,1]; //384
var l6 = [12,6,8,8]; //384
//var l7 = [12]; //0 --> Error!
var l8 = [12,6]; //6
//var l9 = [12,2,12]; //0 --> Error!
var l10 = [6,12,6,18,6]; //2592

/**
 * Input: List of int values
 * Output: List of tuple of size 2 each containing a number
 *      featured in the list and it's number of repetitions
 * Complexity: O(n^3) + O(n^2) + O(n^2) + O(n^3) = 2*O(n^3)
 * Worst case: No repeated values (copy full array again)
 */
Array.prototype.group = function(){
    var list = this;
    var unique = [], times = [];
    
    // Create array of distinct values 
    // O(length(list))*O(length(unique))*O(length(unique)) 
    // = O(n)*O(n)*O(n) = O(n^3) <- iter * indexOf * push
    // worst case: no repeated values
    list.forEach(function(o){
        if(unique.indexOf(o)==-1){ // indexOf has O(n) http://stackoverflow.com/questions/19287033/what-is-the-time-complexity-of-javascripts-array-indexof
            unique.push(o); //push has O(n) http://stackoverflow.com/questions/22614237/javascript-runtime-complexity-of-array-functions
        }
    });

    // initialize array of repetitions to 0 for each distinct value
    // O(length(unique))*O(length(unique))
    // = O(n)*O(n) = O(n^2) <- iter * push
    unique.forEach(function(){times.push(0)});
    
    // count repetitions of each value
    // O(length(list))*O(i)*O(length(unique))
    // = O(n)*O(1)*O(n) = O(n^2) <- iter * access * indexOf
    list.forEach(function(i){
        times[unique.indexOf(i)]++;
    });

    // map unique values and their repetitions into tuple
    // O(length(unique))*O(length(unique))*O(i)*O(length(times)) 
    // = O(n)*O(n)*O(1)*O(n) = O(n^3) <- iter * push * access * indexOf
    return unique.map(function(x) {
        return [x, times[unique.indexOf(x)]];
    });
};

/**
 * Input: List of tuple of size 2
 *      Tuple: [base, exponent]
 * Output: List of int
 */
Array.prototype.powerTuple = function(){
    return this.map(function (x) {
        return Math.pow(x[0], x[1]);
    });
};

function magic(a){
                                              // example with l1
    return a                                  // [1,8,2,15,6,7,8,12]
    .filter(function(x) { return x%2 == 0; }) // [8,2,6,8,12]
    .filter(function(x) { return x>5; })      // [8,6,8,12]
    .sort(function(a,b) { return b-a; })      // [12,8,8,6]
    .group()                                  // [[12,1],[8,2],[6,1]]
    .splice(1)                                // [[8,2],[6,1]]
    .powerTuple()                             // [64,6]
    .reduce(function(x,y) { return x*y; });   // 384
}

console.log(l1,"-->",magic(l1));
console.log(l2,"-->",magic(l2));
console.log(l3,"-->",magic(l3));
console.log(l4,"-->",magic(l4));
console.log(l5,"-->",magic(l5));
console.log(l6,"-->",magic(l6));
//console.log(l7,"-->",magic(l7));
console.log(l8,"-->",magic(l8));
//console.log(l9,"-->",magic(l9));
console.log(l10,"-->",magic(l10));
