var x = 0;
var y = 0;
var height = screen.height;
var width = screen.width;
var blockX = Math.ceil(width / 50);
var blockY = Math.ceil(height / 50);
document.body.style.margin = '0px';
var fileref=document.createElement('script');
fileref.setAttribute("type","text/javascript");
fileref.setAttribute("src", 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js');
document.body.appendChild(fileref)
html2canvas(document.body, {onrendered: function(canvas) {
  document.body.innerHTML = "";
  document.body.style.backgroundColor = 'lightgrey';
    while (y < height) {
      while (x < width){
        ctx = canvas.getContext("2d");
        var squ = document.createElement('canvas');
        squ.width = blockX;
        squ.height = blockY;
        squ.style.top = y + 'px';
        squ.style.left = x + 'px';
        squ.style.position = 'absolute';
        squ.getContext("2d").putImageData(ctx.getImageData(x,y,x+blockX,y+blockY), 0, 0);
        document.body.appendChild(squ);
        x += blockX;
      }
      x = 0;
      y += blockY;
      var boxSize = 30;
      var all;
      onclick = function(e) {
        var i = 0;
        var all = document.getElementsByTagName("canvas");
        while (i < all.length) {
        i++;
        if (typeof all[i] !== 'undefined') {
          var box = all[i].getBoundingClientRect();
          if (box.left < (e.x + boxSize) && (box.left + box.width) > (e.x - boxSize) && box.top < (e.y + boxSize) && (box.top + box.height) > (e.y - boxSize)) {
              document.body.removeChild(all[i]);
              i -= 1;
            }
          }
        }
      }
    }
  }
});
var move(item) {
