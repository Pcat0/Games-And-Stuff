if (confirm('Page Destroyer is ready to load (this will take a second) \n I working on it right now so expert some errors') == true){
var x = 0;
var y = 0;
var height = screen.height;
var width = screen.width;
var blockX = Math.ceil(width / 50);
var blockY = Math.ceil(height / 50);
var items = [];
var index = {};
var tool = 'hammer';
var gravity = 3;
var boxSize = 30;
var target;
var s=document.createElement('script');s.setAttribute("type","text/javascript");s.setAttribute("src", 'https://Pcat0.github.io/utilities/scriptLoader.js');document.body.appendChild(s);
var stats = document.createElement('div');
document.body.style.margin = '0px';
stats.style.right= '5px';
stats.style.bottom= '5px';
stats.style.position= 'fixed';
var updateStats = function(){
  stats.innerHTML= 'Gravity: ' + ((gravity === 0) ? 'off': 'on') + '</br>' + 'Tool: ' + tool;
}
updateStats();
s.onload = function(){
LOADJS('keyCodes', false, function() {onkeydown = function(e){
  if(keyCodes[e.keyCode] === 'h'){tool = 'hammer'; boxSize = 30;updateStats();}
  if(keyCodes[e.keyCode] === 'b'){tool = 'bomb'; boxSize = 60;updateStats();}
  if(keyCodes[e.keyCode] === 'g'){gravity = (gravity === 0) ? .5: 0;updateStats();}
  if(keyCodes[e.keyCode] === 'k'){alert('Hotkeys:\n"h" -Select tool hammer.\n"b" -Select tool bomb.\n"g" -Toggle gravity.\n"k" -Hotkeys help.')}
}});
LOADJS('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js', true, function(){html2canvas(document.body, {onrendered: function(canvas) {
  document.body.innerHTML = "";
  document.body.style.backgroundColor = 'lightgrey';
    while ((y + 1) * blockY < height) {
      while ((x + 1) * blockX < width){
        ctx = canvas.getContext("2d");
        var squ = document.createElement('canvas');
        squ.width = blockX;
        squ.height = blockY;
        squ.style.top = y * blockY + 'px';
        squ.style.left = x * blockX + 'px';
        squ.style.position = 'absolute';
        squ.id = x + ',' + y;
        squ.getContext("2d").putImageData(ctx.getImageData(x * blockX,y * blockY,(x + 1) * blockX,(y + 1) * blockY), 0, 0);
        var _i = items.push(new move(squ)) - 1;
        items[_i].setUp();
        squ.dataset.index = _i;
        document.body.appendChild(squ);
        x++;
      }
      x = 0;
      y++;
    }
    var all;
    setInterval(function(){items.forEach(function(a){a.tick()})}, 5);
    //alert('Page Destroyer loaded.');
    document.body.appendChild(stats);
    onclick = function(e) {
      var i = 0;
      var all = document.getElementsByTagName("canvas");
      if (tool == 'repair') {
        var target = items[index[Math.floor(e.pageX/blockX) + ',' + Math.floor(e.pageY/blockY)]];
        console.log(index[Math.floor(e.pageX/blockX) + ',' + Math.floor(e.pageY/blockY)]);
        target.r = Math.atan2(target.x - e.pageY,target.y - e.pageX) * 180 / Math.PI;
        target.vSet((target.r == Math.abs(target.r)) ? -6 : 6);
      }
      while (i < all.length && (tool == 'hammer' || tool == 'bomb')) {
        if (typeof all[i] !== 'undefined') {
          var box = all[i].getBoundingClientRect();
          if (box.left < (e.x + boxSize) && (box.left + box.width) > (e.x - boxSize) && box.top < (e.y + boxSize) && (box.top + box.height) > (e.y - boxSize)) {
            //document.body.removeChild(all[i]);
            all[i].style.zIndex = '9001';
            /*var _i = items.push(new move(all[i])) - 1;
            //items[_i] = new move(all[i]);
            items[_i].setUp();*/
            var _i = all[i].dataset.index;
            items[_i].gravity = true;
            items[_i].r = Math.atan2(box.top - e.y,box.left - e.x) * 180 / Math.PI;
            if (tool == 'hammer'){
              items[_i].vSet(6);
            }
            if (tool == 'bomb'){
              items[_i].vSet(Math.floor(7 * (Math.random()+1)));
            }
            
          }
        }
      i++;
      }
    }
  }
});});
}
var move = function(item) {
  this.x = 0;
  this.y = 0;
  this.r = 0;
  this.vx = 0;
  this.vy = 0;
  this.gravity = false;
  this.data = {
    'vLoss': 0
  };
  this.tick = function() {
    this.vx = this.vx- this.data.vLoss;
    this.vy = this.vy- this.data.vLoss + (this.gravity)? gravity: 0;
    this.move(this.vx, this.vy, true);
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
    if (this.x > width){this.x = width; this.vx = 0;}
    if (this.y > height){this.y = height; this.vy = 0;}
  };
};
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-69409530-2', 'auto');
ga('send', 'pageview');
}
