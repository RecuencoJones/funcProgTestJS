//Calcular el producto de todos los pares mayores que 5 sin
//incluir el número par más grande

var l1 = [1,8,2,15,6,7,8,12];
var l2 = [12,8,2,15,6,7,8,12];
var l3 = [1,8,2,15,6,7,8,12,12];
var l4 = [1,8,2,15,12,6,7,8,12];

Array.prototype.group = function(){
    var list = this;
    var unique = [], times = [];
    
    list.forEach(function(o){
        if(unique.indexOf(o)==-1){
            unique.push(o);
        }
    });
    unique = unique.sort(function(a, b) {return b-a});

    unique.forEach(function(){times.push(0)});
    
    list.forEach(function(i){
        times[unique.indexOf(i)]++;
    });

    return unique.map(function(x) {
        return [x, times[unique.indexOf(x)]];
    });
}

function magic(a){
											  // example with l1
    var tmp = a                               // [1,8,2,15,6,7,8,12]
    .filter(function(x) { return x%2 == 0; }) // [8,2,6,8,12]
    .filter(function(x) { return x>5 })       // [8,6,8,12]
    .sort(function(a,b) {return b-a})         // [12,8,8,6]
    .group()                                  // [[12,1],[8,2],[6,1]]
    .splice(1);                               // [[8,2],[6,1]]

    tmp.forEach(function(x) { 
        tmp[tmp.indexOf(x)]=Math.pow(x[0],x[1]); 
    });                                       // [64,6]

    var dummy = tmp.reduce(function(x,y) { return x*y });    // 384
    return dummy;
}

console.log(l1,"-->",magic(l1));
console.log(l2,"-->",magic(l2));
console.log(l3,"-->",magic(l3));
console.log(l4,"-->",magic(l4));
