var x = 0;
var y = 0;
var height = screen.height;
var width = screen.width;
var blockX = Math.ceil(width / 50);
var blockY = Math.ceil(height / 50);
document.body.style.margin = '0px';
html2canvas(document.body, {
  onrendered: function(canvas) {
    document.body.innerHTML = "";
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
      onclick = function(e) {
        var all = document.getElementsByTagName("*");
        for (var i=0, max=all.length; i < max; i++) {
          var box = all[i].getBoundingClientRect();
          if (all[i].childElementCount === 0 && all[i].tagName != 'IFRAME' && all[i].tagName != 'SCRIPT' && box.top != 0 && box.width != 0){
            if (box.left < (e.pageX + 100) && (box.left + box.width) > (e.pageX - 100) && box.top < (e.pageY + 100) && (box.top + box.height) > (e.pageY - 100)) {
             console.log('~~~~~~~true~~~~~~');
              all[i].parentNode.removeChild(all[i]);
            }
          }
        }
      }
    }
  }
});
//<script src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js'></script>
