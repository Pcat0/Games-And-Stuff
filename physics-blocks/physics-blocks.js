var Block = function(){
  this.a =1
};
var BlockTest = function(){
  Block.call(this)
  this.b =2
}
