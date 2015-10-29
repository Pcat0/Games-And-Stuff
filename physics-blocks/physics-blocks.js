var c = document.getElementById("gameBoard");
var ctx = c.getContext("2d");
var block = function(){
  this.objectData = {
    'solid':null,
    'color':null,
    'onCollision':null
  };
};
var BlockTest = function(){
  Block.call(this)
  this.objectData {
    'solid':true,
    'color':null,
    'onCollision':null
  };
};
