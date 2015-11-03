var div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
div.innerHTML = "Hello";
document.body.appendChild(div);
var Objects = function() {
  this.data = {
    'icon': null,
    'sizeX': null,
    'sizeY': null
  };
  this.x = null;
  this.y = null;
  this.draw = function(x, y) {
    this.x = x;
    this.y = y;
    this.self = document.createElement("div");
    this.self.style.width = this.data.sizeX;
    this.self.style.height = this.data.sizeY;
    this.self.style.top = this.y;
    this.self.style.left = this.x;
    document.body.appendChild(this.self);
    this.img = document.createElement("img");
    this.img.src = this.data.icon;
    this.self.appendChild(this.img);
  };
};
var SpaceShip = function() {
  Objects.call(this);
  this.data.icon = 'http://opengameart.org/sites/default/files/styles/watermarked/public/spaceship1_1.png';
  this.data.sizeX = '10px';
  this.data.sizeY = '10px';
}
