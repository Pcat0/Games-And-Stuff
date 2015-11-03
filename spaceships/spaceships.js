var div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
div.innerHTML = "Hello";
document.body.appendChild(div);
var Objects = function() {
  this.data = {
    'icon': 'http://www.planwallpaper.com/static/images/Winter-Tiger-Wild-Cat-Images.jpg',
    'sizeX': null,
    'sizeY': null
  }
  this.draw = function() {
    this.self = document.createElement("div");
    this.self.style.width = this.data.sizeX;
    this.self.style.height = this.data.sizeY;
    this.self.innerHTML = "Hello";
    document.body.appendChild(this.self);
    this.img = document.createElement("img");
    this.img.src = this.data.icon;
    this.self.appendChild(this.img);
  };
};
