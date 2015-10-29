var c = document.getElementById("gameBoard");
var ctx = c.getContext("2d");


var block = function(){
  this.test1 = 1;
  this.test2 = 1;
}
var testBlock = new block() {
  this.test2 = 2;
}
