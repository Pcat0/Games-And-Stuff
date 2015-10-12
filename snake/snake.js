var Snake = function() {
    this.snakeBody = [];
    this.iterateArray = function(array) {
        var i = array.length;
        while (i >= 0) {
            i = i - 1;
            array[i + 1] = array[i];
        }
        return array;
    };
};
var snake = new Snake();
