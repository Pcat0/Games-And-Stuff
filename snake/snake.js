var c = document.getElementById("gameBoard");
var ctx = c.getContext("2d");
var board = [];
var i = 0;
var playerNum = 2;
var sizeX = 1000;
var sizeY = 580;
sizeX = sizeX - 20;
sizeY = sizeY - 20;
while (i <= (sizeX/20)) {board[i] = []; i++;}
var Snake = function(Xstart, Ystart) {
    this.snakeBody = [[1,1]];//x,y
    this.direction = 1;//0=up 1=right 2=down 3=left
    this.length = 5;
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
        if ((newBody[0] < 0)||(newBody[1] < 0)||(newBody[0] > (sizeX/20))||(newBody[1] > (sizeY/20))) {this.stop()}
        ctx.fillStyle = "#FF0000";
        ctx.fillRect((newBody[0] * 20),(newBody[1] * 20),20,20);
        this.snakeBody.unshift(newBody);
        if (this.snakeBody.length > this.length){
            ctx.clearRect((this.snakeBody[this.snakeBody.length - 1][0] * 20),(this.snakeBody[this.snakeBody.length - 1][1] * 20),20,20);
            board[this.snakeBody[this.snakeBody.length - 1][0]][this.snakeBody[this.snakeBody.length - 1][1]] = 0;
            this.snakeBody.pop();
        }
        if (board[newBody[0]][newBody[1]] == 1) {
            console.log("die");
            this.stop();
        }
        if(board[newBody[0]][newBody[1]] == 2) {
            this.length = this.length + 5;
            new Food();
        }
        board[newBody[0]][newBody[1]] = 1;
    };
    return this;
};
var Food = function() {
    this.coordinate = [Math.floor((Math.random() * (sizeX/20)) + 1), Math.floor((Math.random() * (sizeY/20)) + 1)];
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(this.coordinate[0] * 20,this.coordinate[1] * 20,20,20);
    board[this.coordinate[0]][this.coordinate[1]] = 2;
};
this.start = function(snakeName) {
   return snakeName.main = setInterval(function(){snakeName.move()},120);
};
this.stop = function(snakeName) {
    return clearInterval(snakeName.main);
};
new Food();
var snake = new Snake(1,1);
if (playerNum == 2) {
    var snake2 = new Snake(29,1);
}
onkeydown = onkeyup = function(e){
    var map = [];
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    console.log(map);
    if (map[38]) {snake.direction = 0;}
    if (map[39]) {snake.direction = 1;}
    if (map[40]) {snake.direction = 2;}
    if (map[37]) {snake.direction = 3;}
    if (map[87] && playerNum == 2) {snake2.direction = 0;}
    if (map[68] && playerNum == 2) {snake2.direction = 1;}
    if (map[83] && playerNum == 2) {snake2.direction = 2;}
    if (map[65] && playerNum == 2) {snake2.direction = 3;}
};

