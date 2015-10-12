var Snake = function() {
    this.snakeBody = [];
    this.direction = 1;
    this.facing = 1;
    var map = [];
    onkeydown = onkeyup = function(e){
        e = e || event; // to deal with IE
        //map[e.keyCode] = e.type == 'keydown';
        alert(e.keyCode);
        
        
    };
};
var snake = new Snake();
