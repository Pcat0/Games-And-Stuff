var Snake = function() {
    var c = document.getElementById("gameBoard");
    var ctx = c.getContext("2d");
    this.snakeBody = [[5,5]];
    this.direction = 1; //1 = right/down  -1 = left/up
    this.facing = 1; //1 = left/right 2 = up/down  
    onkeydown = onkeyup = function(e){
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
        alert(e.keyCode);
        
        
    };
    this.move(){
        this.snakeBody.unshift(this.snakeBody[0[this.facing]]+this.direction);
    }
    return this;
};
var snake = new Snake();
