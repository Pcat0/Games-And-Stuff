var c = document.getElementById("gameBoard");
var ctx = c.getContext("2d");
var board = [];
var i = 0;
var playerNum = 2;
var sizeX = 1000;
var sizeY = 580;
var snake;
var snake2;
sizeX = sizeX - 20;
sizeY = sizeY - 20;

var Snake = function(Xstart, Ystart, color) {
    this.snakeBody = [[Xstart, Ystart]];//x,y
    this.direction = 1;//0=up 1=right 2=down 3=left
    this.length = 5;
    this.color = color;
    this.move = function(){
        var newBody = [];
        newBody[0] = this.snakeBody[0][0];
        newBody[1] = this.snakeBody[0][1];
        switch (this.direction) {
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
        if ((newBody[0] < 0)||(newBody[1] < 0)||(newBody[0] > (sizeX/20))||(newBody[1] > (sizeY/20))) {stop(this)}
        ctx.fillStyle = this.color;
        ctx.fillRect((newBody[0] * 20),(newBody[1] * 20),20,20);
        this.snakeBody.unshift(newBody);
        if (this.snakeBody.length > this.length){
            ctx.clearRect((this.snakeBody[this.snakeBody.length - 1][0] * 20),(this.snakeBody[this.snakeBody.length - 1][1] * 20),20,20);
            board[this.snakeBody[this.snakeBody.length - 1][0]][this.snakeBody[this.snakeBody.length - 1][1]] = 0;
            this.snakeBody.pop();
        }
        if (board[newBody[0]][newBody[1]] == 1) {
            console.log("die");
        }
        if(board[newBody[0]][newBody[1]] == 2) {
            this.length = this.length + 5;
            new Food();
        }
        board[newBody[0]][newBody[1]] = 1;
    };
    return this;
};
var gameStop = function(loser){
    if (playerNum == 2) {
        stop(snake);
        stop(snake2);
        if (loser == snake) {
            alert("player 2 won");
        }else{
            alert("player 1 won");
        }
    }
};
var Food = function() {
    this.coordinate = [Math.floor((Math.random() * (sizeX/20)) + 1), Math.floor((Math.random() * (sizeY/20)) + 1)];
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(this.coordinate[0] * 20,this.coordinate[1] * 20,20,20);
    board[this.coordinate[0]][this.coordinate[1]] = 2;
};
var start = function(snakeName) {
   return snakeName.main = setInterval(function(){snakeName.move()},120);
};
var stop = function(snakeName) {
    return clearInterval(snakeName.main);
};
var reset = function() {
    snake = null;
    snake2 = null;
    board = [];
    i = 0;
    while (i <= (sizeX/20)) {board[i] = []; i++;}
    ctx.clearRect(0, 0, c.width, c.height);
    new Food();
    snake = new Snake(1, 1, '#'+Math.floor(Math.random()*16777215).toString(16));
    if (playerNum == 2) {
        snake2 = new Snake(1, (sizeY/ 20 - 1), '#'+Math.floor(Math.random()*16777215).toString(16));
    }
}
var onkeydown = onkeyup = function(e){
    var map = [];
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    console.log(map);
    if (map[38] && (snake.direction != 2)) {snake.direction = 0;}
    if (map[39] && (snake.direction != 3)) {snake.direction = 1;}
    if (map[40] && (snake.direction != 0)) {snake.direction = 2;}
    if (map[37] && (snake.direction != 1)) {snake.direction = 3;}
    if (map[87] && (playerNum == 2) && (snake2.direction != 2)) {snake2.direction = 0;}
    if (map[68] && (playerNum == 2) && (snake2.direction != 3)) {snake2.direction = 1;}
    if (map[83] && (playerNum == 2) && (snake2.direction != 0)) {snake2.direction = 2;}
    if (map[65] && (playerNum == 2) && (snake2.direction != 1)) {snake2.direction = 3;}
};
