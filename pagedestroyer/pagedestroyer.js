var boxsize = {x:Math.ceil(screen.width/ 50), y:Math.ceil(screen.height/ 50)};
var items = [];
var gravity = .75;
var tool = 'hammer';
var tools = {
  hammer:function(e){
    var i = 0;
    var all = document.getElementsByTagName("canvas");
    while (i < all.length) {
      if (typeof all[i] !== 'undefined') {
        var box = all[i].getBoundingClientRect();
        if (box.left<e.x+15 && box.left+box.width>e.x-15 && box.top<e.y+15 && box.top+box.height>e.y-15) {
          all[i].style.zIndex = '9001';
          var _i = all[i].dataset.index;
          items[_i].frozen = false;
          items[_i].r = Math.atan2(box.top - e.y, box.left - e.x)*180/Math.PI;
          items[_i].vSet(6);
        }
      }
      i++;
    }
  },
  bomb:function(e){
    var i = 0;
    var all = document.getElementsByTagName("canvas");
    while (i < all.length) {
      if (typeof all[i] !== 'undefined') {
        var box = all[i].getBoundingClientRect();
        if (box.left<e.x+30 && box.left+box.width>e.x-30 && box.top<e.y+30 && box.top+box.height>e.y-30) {
          all[i].style.zIndex = '9001';
          var _i = all[i].dataset.index;
          items[_i].frozen = false;
          items[_i].r = Math.atan2(box.top - e.y, box.left - e.x)*180/Math.PI;
          items[_i].vSet(Math.floor(7 * (Math.random() + 1)));
        }
      }
      i++;
    }
  }
}
var boxSize_ = 15;
var move = function(item) {
  this.x = 0;
  this.y = 0;
  this.r = 0;
  this.vx = 0;
  this.vy = 0;
  this.frozen = true;
  this.data = {
    'vLoss': 0
  };
  this.tick = function() {
    //this.vx = this.vx;
    this.vy += gravity;
    if(this.frozen){
      this.vy = 0;
      this.vx = 0;
    }else{
      this.move(this.vx, this.vy, true);
    }
  };
  this.vSet = function(power) {
    this.vx += power*Math.cos(this.r*0.0174533);
    this.vy += power*Math.sin(this.r*0.0174533);
   };
   this.rotate = function(r, type) {
    this.r = (type) ? (this.r + r): r;
    item.style.webkitTransform = "rotate("+(this.r + this.data.rOffset)+"deg)";
    return this.r;
   };
   this.setUp = function(){
     this.x = parseInt(item.style.left.split('p')[0]);
     this.y = parseInt(item.style.top.split('p')[0]);
   };
   this.move = function(x, y, type) {
    this.x = (type) ? (this.x + x): x;
    this.y = (type) ? (this.y + y): y;
    item.style.top = this.y + 'px';
    item.style.left = this.x + 'px';
    if (this.x < 0){this.x = 0; this.vx = 0;}
    if (this.y < 0){this.y = 0; this.vy = 0;}
    if (this.x > screen.width){this.x = screen.width; this.vx = 0;}
    if (this.y > screen.height){this.y = screen.height; this.vy = 0;}
  };
};
function startUp(canvas){
  var ctx = canvas.getContext("2d");
  document.body.innerHTML = "";
  document.body.style.backgroundColor = 'lightgrey';
  for(var y=0; (y+1)*boxsize.y<=screen.height; y++){
    for(var x=0; (x+1)*boxsize.x<=screen.width; x++){
      //console.log(x+','+y);
      var squ = document.createElement('canvas');
      squ.width = boxsize.x;
      squ.height = boxsize.y;
      squ.style.top = y * boxsize.y + 'px';
      squ.style.left = x * boxsize.x + 'px';
      squ.style.position = 'absolute';
      squ.id = x+','+y;
      squ.getContext("2d").putImageData(ctx.getImageData(x*boxsize.x, y*boxsize.y, (x+1)*boxsize.x, (y+1)*boxsize.y), 0, 0);
      var _i = items.push(new move(squ)) - 1;
      items[_i].setUp();
      squ.dataset.index = _i;
      document.body.appendChild(squ);
    }
  }
  setInterval(function(){items.forEach(function(a){a.tick()})}, 1);
  onclick = function(e) {
    tools[tool](e);
    /*
    var i = 0;
    var all = document.getElementsByTagName("canvas");
    while (i < all.length && (tool == 'hammer' || tool == 'bomb')) {
      if (typeof all[i] !== 'undefined') {
        var box = all[i].getBoundingClientRect();
        if (box.left < (e.x + boxSize_) && (box.left + box.width) > (e.x - boxSize_) && box.top < (e.y + boxSize_) && (box.top + box.height) > (e.y - boxSize_)) {
          all[i].style.zIndex = '9001';
          var _i = all[i].dataset.index;
          items[_i].frozen = false;
          items[_i].r = Math.atan2(box.top - e.y, box.left - e.x) * 180 / Math.PI;
          
          if (tool == 'hammer') {
            items[_i].vSet(6);
          }
          if (tool == 'bomb') {
            items[_i].vSet(Math.floor(7 * (Math.random() + 1)));
          }
          
        }
      }
      i++;
    }
  */
  }
}
var s = document.createElement("script");
s.src = "https://html2canvas.hertzen.com/build/html2canvas.js"; document.body.appendChild(s);
s.onload=()=>html2canvas(document.body, {onrendered:startUp});
