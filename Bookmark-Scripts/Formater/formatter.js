var a = prompt('"crtl"+"c" to copy',format(prompt('Text to format\ninf=∞\n+/-=±\n^i=ⁱ\nroot(i)=ⁱ√'),'Text'));
function format(str){
    var ex = ['⁰','²','³','⁴','⁵','⁶','⁷','⁸','⁹'];
    (str.match(/\^([0-9]+)/g)||[]).forEach(function(a,b,c){
        a = a.replace('\^', '');
        ex.forEach(function(d,e){a = a.replace(new RegExp(e + 1, 'g'), d);});
        str=str.replace(c[b],a);
    });
    (str.match(/root\([0-9]*\)/g)||[]).forEach(function(a,b,c){
        a = a.slice(5,-1);
        ex.forEach(function(d,e){a=a.replace(new RegExp(e + 1, 'g'), d);});
        str=str.replace(c[b], a+'√');
    });
    str = str.replace(/\+\/-/g, '±');
    str = str.replace(/sq/g, '√');
    str = str.replace(/inf/g, '∞');
    return str;
}
