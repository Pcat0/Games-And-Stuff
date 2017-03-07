if (confirm('Page Destroyer is ready to load (this will take a second) \nHey everyone, I finaly fixed it!')){
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
};

var stats = document.createElement('div');
document.body.style.margin = '0px';
stats.style.right= '5px';
stats.style.bottom= '5px';
stats.style.position= 'fixed';
var updateStats = function(){
  stats.innerHTML= 'Gravity: ' + ((gravity === 0) ? 'off': 'on') + '</br>' + 'Tool: ' + tool;
}

var keyListener = {
  98: _=>tool='bomb',
  103: _=>gravity=gravity?0:.75,
  104: _=>tool='hammer',
}
var boxSize_ = 15;
var physicsItem = function(item) {
  this.x = 0;
  this.y = 0;
  this.r = 0;
  this.vx = 0;
  this.vy = 0;
  this.frozen = true;
  this.data = {
    'vLoss': 0
  };
  this.setUp = function(){
    this.x = parseInt(item.style.left.split('p')[0]);
    this.y = parseInt(item.style.top.split('p')[0]);
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
    item.style.webkitTransform = "rotate("+(this.r+this.data.rOffset)+"deg)";
    return this.r;
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
  //init();
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
      var _i = items.push(new physicsItem(squ)) - 1;
      items[_i].setUp();
      squ.dataset.index = _i;
      document.body.appendChild(squ);
    }
    
  }
  setInterval(()=>{items.forEach(function(a){a.tick()}); updateStats()}, 1);
  
  document.body.appendChild(stats);
  
  onclick = function(e) {
    tools[tool](e);
  }
  onkeypress = function(e){
    console.log(e.keyCode);
    keyListener[e.keyCode]();
  }
}
var s = document.createElement("script");
s.src = "https://html2canvas.hertzen.com/build/html2canvas.js"; document.body.appendChild(s);
s.onload=()=>html2canvas(document.body, {onrendered:startUp, allowTaint:!0});
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-69409530-2', 'auto');
ga('send', 'pageview');
}
