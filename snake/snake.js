var Snake = function() {
    var c = document.getElementById("gameBoard");
    var ctx = c.getContext("2d");
    this.snakeBody = [[5,5]];//x,y
    this.direction = 0;//0=up 1=right 2=down 3=left
    onkeydown = onkeyup = function(e){
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
        alert(e.keyCode);
        
        
    };
    this.move = function(){
        var newBody = this.snakeBody[0]
        switch (direction) {
            case 0:
                newBody = [newBody[0],newBody[1]-1]
                break;
            case 1:
                newBody = [newBody[0]+1,newBody[1]]
                break;
            case 2:
                newBody = [newBody[0],newBody[1]+1]
                break;
            case 3
                newBody = [newBody[0]-1,newBody[1]]
                break;
        }
        return this.snakeBody.unshift(newbody);
    }
    return this;
};
var snake = new Snake();
