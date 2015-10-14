
var Snake = function() {
    var c = document.getElementById("gameBoard");
    var ctx = c.getContext("2d");
    this.snakeBody = [[5,5]];//x,y
    this.direction = 0;//0=up 1=right 2=down 3=left
    
    this.move = function(){
        var newBody = [];
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
        ctx.fillRect((newBody[0] * 5),(newBody[1] * 5),20,20);
        return this.snakeBody.unshift(newBody);
    };
    return this;
};
var snake = new Snake();
onkeydown = onkeyup = function(e){
        var map = [];
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
        console.log(map);
        if (map[38]) {
            console.log("1");
            snake.direction = 0;
        }
        if (map[39]) {
            console.log("2");
            snake.direction = 1;
        }
        if (map[40]) {
            console.log("3");
            snake.direction = 2;
        }
        if (map[37]) {
            console.log("4");
            snake.direction = 3;
        }
        
    };
    main = setInterval(function(){snake.move()},10);

