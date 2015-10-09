var TicTacToe = function() {
  this.board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  //this.boardName = [["tic1", "tic2", "tic3"], ["tic4", "tic5", "tic6"], ["tic7", "tic8", "tic9"]];
  this.turn = 0;
  //single player - 1, multiplayer local - 2, multiplayer glode - 3
  this.gameMode = 0;
  
  var win = 0;

  //x/blue - 1
  //o/red - -1
  this.setGameMode = function(m) {
    return (this.gameMode = m);
  };
  this.play = function(x, y) {
    if ((this.gameMode == 2 || (this.gameMode == 1 && (this.turn % 2 === 0))) && this.get(x,y) === 0) {
      this.set(x, y, ((this.turn % 2 === 0) ? 1 : -1));
      this.turn++;
      win = this.win();
      if (win == 1) {
        console.log("blue won");
      }else if(win == -1){
        console.log("red won")
      }
      if (this.turn != 7 && this.gameMode == 1){
        this.AI();
      }
    }
  };
  this.set = function(x, y, z) {
    document.getElementById("tic" + ((y - 1) * 3 + x).toString()).style.backgroundColor = (z == 1) ? "#0000FF" : "#FF0000";
    return (this.board[y - 1][x - 1] = z);
  };

  this.get = function(x, y) {
    return this.board[y - 1][x - 1];
  };
  this.win = function() {
    var y = 1;
    var x = 1;
    var t = 0;
    while (y <= 3) {
      while (x <= 3) {
        t = this.get(x, y) + t;
        x++;
      }
      if (t == 3) {
        return "1";
      }
      if (t == -3) {
        return "-1";
      }
      //console.log(t);
      //console.log("");
      //console.log(y);
      t = 0;
      x = 1;
      y++;
    }
    y = 1;
    x = 1;
    while (x <= 3) {
      while (y <= 3) {
        t = this.get(x, y) + t;
        y++;
      }
      if (t == 3) {
        return "1";
      }
      if (t == -3) {
        return "-1";
      }
      t = 0;
      y = 1;
      x++;
      
    }
    if (this.get(1,1) + this.get(2,2) + this.get(3,3) == 3) {return "1";}
    if (this.get(1,1) + this.get(2,2) + this.get(3,3) == -3) {return "-1";}
    if (this.get(1,3) + this.get(2,2) + this.get(3,1) == 3) {return "1";}
    if (this.get(1,3) + this.get(2,2) + this.get(3,1) == -3) {return "-1";}
   return 0;
  };
  //
  this.AI = function(){
    var x = Math.floor((Math.random() * 3) + 1);
    var y = Math.floor((Math.random() * 3) + 1);
    while (this.get(x, y) != 0) {x = Math.floor((Math.random() * 3) + 1); y = Math.floor((Math.random() * 3) + 1);}
    this.set(x, y, ((this.turn % 2 === 0) ? 1 : -1));
    this.turn++;
  };
  return this;
};

var tictactoe = new TicTacToe();
