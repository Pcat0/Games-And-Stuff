var Objects = function() {
  this.data = {
    'icon': null,
    'sizeX': null,
    'sizeY': null
  };
  this.x = null;
  this.y = null;
  this.r = null;
  this.draw = function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.selfI = document.createElement("div");
    this.selfI.style.width = this.data.sizeX;
    this.selfI.style.height = this.data.sizeY;
    this.selfI.style.position = 'absolute'
    this.selfI.style.top = this.y + 'px';
    this.selfI.style.left = this.x + 'px';
    document.body.appendChild(this.selfI);
    this.img = document.createElement("img");
    this.img.src = this.data.icon;
    this.img.style.width = this.data.sizeX;
    this.img.style.height = this.data.sizeY;
    this.selfI.appendChild(this.img);
  };
  this.remove = function(){
    document.body.removeChild(this.selfI);
  }
  this.move = function(x, y, type) {
    this.x = type ? (this.x + x): x;
    this.y = type ? (this.y + y): y;
    this.selfI.style.top = this.y + 'px';
    this.selfI.style.left = this.x + 'px';
  }
  this.rotate = function(deg, type) {
    this.r = type ? (this.r + r): r;
    this.selfI.style.webkitTransform = "rotate("+r+"deg)";
  }
};
//
var SpaceShip = function() {
  Objects.call(this);
  this.data.icon = 'http://opengameart.org/sites/default/files/styles/watermarked/public/spaceship1_1.png';
  this.data.sizeX = '60px';
  this.data.sizeY = '60px';
}
