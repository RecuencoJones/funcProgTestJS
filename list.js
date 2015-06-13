/*
 * Calcular el producto de todos los pares mayores que 5 sin
 * incluir el número par más grande
 */

var l1 = [1,8,2,15,6,7,8,12];
var l2 = [12,8,2,15,6,7,8,12];
var l3 = [1,8,2,15,6,7,8,12,12];
var l4 = [1,8,2,15,12,6,7,8,12];
var l5 = [12,8,7,6,15,2,8,1];

/**
 * Input: List of int values
 * Output: List of tuples of size 2 each containing a number
 *      featured in the list and it's number of repetitions
 */
Array.prototype.group = function(){
    var list = this;
    var unique = [], times = [];
    
    // Create array of distinct values
    list.forEach(function(o){
        if(unique.indexOf(o)==-1){
            unique.push(o);
        }
    });

    // initialize array of repetitions to 0 for each distinct value
    unique.forEach(function(){times.push(0)});
    
    // count repetitions of each value
    list.forEach(function(i){
        times[unique.indexOf(i)]++;
    });

    // map unique values and their repetitions into tuples
    return unique.map(function(x) {
        return [x, times[unique.indexOf(x)]];
    });
}

/**
 * Input: List of tuples of size 2
 *      Tuple: [base, exponent]
 * Output: List of int
 */
Array.prototype.powerTuples = function(){
    return this.map(function(x) { 
        return Math.pow(x[0],x[1])
    });
}

function magic(a){
                                              // example with l1
    return a                                  // [1,8,2,15,6,7,8,12]
    .filter(function(x) { return x%2 == 0; }) // [8,2,6,8,12]
    .filter(function(x) { return x>5 })       // [8,6,8,12]
    .sort(function(a,b) {return b-a})         // [12,8,8,6]
    .group()                                  // [[12,1],[8,2],[6,1]]
    .splice(1)                                // [[8,2],[6,1]]
    .powerTuples()                            // [64,6]
    .reduce(function(x,y) { return x*y });    // 384
}

console.log(l1,"-->",magic(l1));
console.log(l2,"-->",magic(l2));
console.log(l3,"-->",magic(l3));
console.log(l4,"-->",magic(l4));
console.log(l5,"-->",magic(l5));
