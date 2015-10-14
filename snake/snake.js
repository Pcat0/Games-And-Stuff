//
var Snake = function(up,right,down,left) {
    this.up = up;
    this.right = right;
    this.down = down;
    this.left = left;
    var c = document.getElementById("gameBoard");
    var ctx = c.getContext("2d");
    this.snakeBody = [[5,5]];//x,y
    this.direction = 0;//0=up 1=right 2=down 3=left
    onkeydown = onkeyup = function(e){
        var map = 0;
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
        alert(e.keyCode);
        if map[this.up] {
            this.direction = 0;
        }
        if map[this.right] {
            this.direction = 1;
        }
        if map[this.down] {
            this.direction = 2;
        }
        if map[this.left] {
            this.direction = 3;
        }
    };
    this.move = function(){
        var newBody = []
        newBody[0] = this.snakeBody[0][0];
        newBody[1] = this.snakeBody[0][1];
        switch (snake.direction) {
            case 0:
                newBody[1] = newBody[1]-1;
                break;
            case 1:
                newBody[0] = newBody[0]+1;
                break;
            case 2:
                newBody[1] = newBody[1]+1;
                break;
            case 3:
                newBody[0] = newBody[0]-1;
                break;
        }
        ctx.fillStyle = "#FF0000";
        ctx.fillRect((newBody[0] * 5),(newBody[0] * 5),(newBody[0] * 5 + 5),(newBody[0]() * 5 + 5));
        return this.snakeBody.unshift(newBody);
    };
    return this;
};
var snake = new Snake(38,39,40,37);
