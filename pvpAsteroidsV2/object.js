var object = function() {
  this.data = {
    'icon': undefined,
    'sizeX': undefined,
    'sizeY': undefined,
    'vLoss': 0,
    'rOffset': 0,
    'maxAge': undefined,
    'maxHelth': undefined,
    'text': undefined,
    'topSpeed': undefined, 
    'oncollision': undefined
  };
  this.x = 0;
  this.y = 0;
  this.r = 0;
  this.vx = 0;
  this.vy = 0;
  this.age = 0;
  this.helth = 0;
  this.draw = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = document.createElement("div");
    this.sprite.style.width = this.data.sizeX;
    this.sprite.style.height = this.data.sizeY;
    this.sprite.style.position = 'absolute'
    this.sprite.style.top = this.y + 'px';
    this.sprite.style.left = this.x + 'px';
    document.body.appendChild(this.sprite);
    this.sprite.innerHTML = '<img src="' + ((typeof this.data.icon == "object") ? this.data.icon[0] : this.data.icon) + '" style="height: '+this.data.sizeY+'px; width: '+this.data.sizeX+'px; transform: rotate('+this.data.rOffset+'deg);">'
    if (this.data.text != undefined){
      this.sprite.innerHTML = this.sprite.innerHTML + '</br>'
      this.text = document.createElement("div");
      this.text.innerHTML = this.data.text;
      this.sprite.appendChild(this.text);
    }
  };
  this.remove = function(){
    document.body.removeChild(this.sprite);
  };
  this.move = function(x, y, type) {
    this.x = (type) ? (this.x + x): x;
    this.y = (type) ? (this.y + y): y;
    if (this.x < 0){this.x = 0; this.helth += -this.vx * 10; this.vx = 0;}
    if (this.y < 0){this.y = 0; this.helth += -this.vy * 10; this.vy = 0;}
    if (this.x > 2000){this.x = 2000; this.helth += this.vx * 10; this.vx = 0;}
    if (this.y > 2000){this.y = 2000; this.helth += this.vy * 10; this.vy = 0;}
    this.sprite.style.top = this.y + 'px';
    this.sprite.style.left = this.x + 'px';
  };
  this.rotate = function(r, type) {
    this.r = (type) ? (this.r + r): r;
    this.sprite.children.item(0).style.webkitTransform = "rotate("+(this.r + this.data.rOffset)+"deg)";
    return this.r;
  };
  this.vSet = function(power) {
    //if (Math.sqrt(Math.pow(power*Math.cos(this.r*0.0174533) + this.vx, 2) + Math.pow(power*Math.sin(this.r*0.0174533) + this.vy, 2)) < this.data.topSpeed && Math.sqrt(Math.pow(power*Math.cos(this.r*0.0174533) + this.vx, 2) + Math.pow(power*Math.cos(this.r*0.0174533) + this.vx, 2)) > 0 - this.data.topSpeed) {
      this.vx += power*Math.cos(this.r*0.0174533);
      this.vy += power*Math.sin(this.r*0.0174533);
    //}
  };
  this.changeicon = function(iconIndex){
    this.sprite.children[0].src = this.data.icon[iconIndex];
  }
  this.tick = function() {
    this.vx = this.vx- this.data.vLoss;
    this.vy = this.vy- this.data.vLoss;
    this.move(this.vx, this.vy, true);
    if (this.age%50 == 0) {
      this.helth = (this.helth > 0) ? (this.helth - .1): this.helth;
      this.helth = (this.helth < 0) ? 0: this.helth;
    }
    //console.log(this.age);
    this.age++;
    if (this.data.text == 'helth'){
    	this.sprite.children.item(2).innerHTML = +((this.data.maxHelth - this.helth)/this.data.maxHelth * 100).toFixed(2)  + "%"
    }
    if (this.helth >= this.data.maxHelth && this.data.maxHelth != undefined){
    	return true;
    }
    if (this.age >= this.data.maxAge && this.data.maxAge != undefined){
    	return true;
    }
  };
};
