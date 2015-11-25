var LOADJS =  function(des, out){
  des = (out) ? des : 'https://Pcat0.github.io/utilities/' + des;
  des = (des.includes('https://')) ? des : 'https://' + des;
  des = (des.endsWith('.js')) ? des : des + ".js";
  var s=document.createElement('script');s.setAttribute("type","text/javascript");s.setAttribute("src", des);document.body.appendChild(s);
}
