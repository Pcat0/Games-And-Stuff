Array.prototype.addArray = function(A){var out = [];for(var i=0; i< this.length; i++){out.push(this[i]+A[i])} return out;};
Array.prototype.subtractArray = function(A){var out = [];for(var i=0; i< this.length; i++){out.push(this[i]-A[i])} return out;};
var newCall = function(Cls,arg) {
    return new (Function.prototype.bind.apply(Cls, [null].concat(arg)));
};
var Point = function(x,y,z){
  this.tuple = [x,y,z];
  this.addVectorToPoint=function(v){return (this.tuple = this.tuple.addArray(v.tuple));};
  this.subtractVectorFromPoint=function(v){return (this.tuple = this.tuple.subtractArray(v.tuple));};
  this.subtractPointFromPoint=function(p){return newCall(Vector, this.tuple.subtractArray(p.tuple))};
  this.drawPoint=function(){console.log(this.tuple);};
};
var Vector = function(x,y,z){
	this.tuple = [x,y,z];
	this.addVectorToVector = function(v){return newCall(Vector, this.tuple.addArray(v.tuple))};
	this.subtractVectorFromVector = function(v){return newCall(Vector, this.tuple.subtractArray(v.tuple))};
	
};
