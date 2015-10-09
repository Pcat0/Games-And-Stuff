var Snake = function() {
    this.snakeBody = [];
    this.moveArray = function(array) {
        var i = array.length;
        while (i <= 0) {
            i = i - 1;
            array[i + 1] = array[i];
        }
        return i;
    };
};
var snake = new Snake();
