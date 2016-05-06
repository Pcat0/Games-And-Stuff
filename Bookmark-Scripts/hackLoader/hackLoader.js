(function(){
  var aimbot = 0; /*0=off, 1=auto shoot, 2=simi-auto, 3=click to shoot*/
  const loadCSS = function(){
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "/*window styles*/ div.windowBox_holder{ background-color:lightgray; min-height: 0px; min-width: 0px; position: static; width: 100%; height: 85%; resize: none; overflow: auto; } div.windowBox_topbar{ background-color: blue; position: static; min-height: 0px; min-width: 0px; width: 100%; height: 38px; resize: none; overflow: auto; } div.windowBox_window{ background-color:red; position: absolute; min-width: 150px; width: 150px; resize: none; } /*input style*/ /*sublist style*/ div.windowBox_subList { margin: 0px 0px 0px 10px; display:none; } input.windowBox_checkbox:checked + * + div.windowBox_subList[activate~=checked]{ display:block; } /*div.windowBox_checkbox_subList>input::before{ content:'├' padding }/**/ /*div.windowBox_checkbox_subList:last-child::before{ content:'└' }/**/ input.custom_button{ display:none; } div.custom_button_outer{ position: relative; display: inline-block; background-color: white; margin:2.5px; padding:0px; height: 15px; width: 15px; border: 1px solid black; overflow:hidden; -webkit-transition: .5s; transition: .5s; } div.custom_button_inner{ position: absolute; left:50%; top:50%; display: inline-block; background-color: black; border: 1px solid none; margin-left: 0px; margin-top: 0px; padding:0px; height: 0px; width: 0px; -webkit-transition: .5s; transition: .5s; } input.custom_button[round] + label div.custom_button_outer{ border-radius: 20px; } input.custom_button[round] + label div.custom_button_outer div.custom_button_inner{ border-radius: 20px; } input.custom_button + label:hover div.custom_button_outer{ background-color: rgba(192,192,192,0.8); } input.custom_button:checked[fill] + label div.custom_button_outer div.custom_button_inner{ height: 21px; width: 21px; margin-left: -10px; margin-top: -10px; } input.custom_button:checked + label div.custom_button_outer div.custom_button_inner{ height: 11px; width: 11px; margin-left: -5.5px; margin-top: -5.5px;}";
    document.body.appendChild(css);
  }
  const loadHTML = function(){
    var HTML = document.createElement('div');
    HTML.innerHTML='<div class="windowBox_window" id="windowBox_window"> <div class="windowBox_topbar"><div id="window_mover" style="position: absolute; width:10px; height:10px; resize:none; top:0px; background-color:gray;cursor:move;"></div></div> <div class="windowBox_holder"> <input class="custom_button windowBox_checkbox" type="checkbox" id="Aimbot" value="Aimbot"></input><label for="Aimbot"><div class="custom_button_outer"><div class="custom_button_inner"></div></div>Aimbot</label> <div class="windowBox_subList" activate="checked"> <input round class="custom_button" type="radio" id="auto" name="Aimbot" value=1 checked></input> <label class="windowBox_radio" for="auto"><div class="custom_button_outer"><div class="custom_button_inner"></div></div>Auto Shoot</label></br> <input round class="custom_button" type="radio" id="simi-auto" name="Aimbot" value=2></input> <label class="windowBox_radio" for="simi-auto"><div class="custom_button_outer"><div class="custom_button_inner"></div></div>Simi-Auto Shoot</label></br> <input round class="custom_button" type="radio" id="no-auto" name="Aimbot" value=3></input> <label class="windowBox_radio" for="no-auto"><div class="custom_button_outer"><div class="custom_button_inner"></div></div>Click To Shoot</label> </div> </br> <input class="custom_button windowBox_checkbox" type="checkbox" id="noSpread" value="Aimbot"></input><label for="noSpread"><div class="custom_button_outer"><div class="custom_button_inner"></div></div>No Spread</label></br> <input class="custom_button windowBox_checkbox" type="checkbox" id="enemyRadar" value="Aimbot"></input><label for="enemyRadar"><div class="custom_button_outer"><div class="custom_button_inner"></div></div>Enemy Radar</label></br> </div> </div> </div>';
    document.body.appendChild(HTML);
  }
  const loop = function() {
    aimbot = (!document.getElementById('Aimbot').checked) ? 0 : document.querySelector('input[name="Aimbot"]:checked').value;
    if (aimbot)
      for (var i = 0; i < gameObjects.length; ++i)
        if (gameObjects[i].type == "player" && gameObjects[i].onScreen && gameObjects[i].team != player.team) {
          target.f = Math.atan2(player.y - gameObjects[i].y, player.x - gameObjects[i].x);
          if(aimbot == 2 || aimbot == 3)showNotification("locked");
          if(aimbot == 1 || (keys.lm && aimbot == 2)) shootBullet(player, 1);
        }
    if (document.getElementById('noSpread').checked) getCurrentWeapon(player).spread=[0];
  }
  console.log('loading...');
  loadCSS();
  loadHTML();
  setInterval(loop,1);
  var move = ((e)=>{
      document.getElementById('windowBox_window').style.top = e.pageY-5+'px';
      document.getElementById('windowBox_window').style.left = e.pageX-5+'px';
    });
  
  document.getElementById('window_mover').onmousedown = function(e){
    document.addEventListener('mousemove', move)
  };
  document.addEventListener('mouseup', (e)=>{console.log('hi');document.removeEventListener('mousemove', move)});
  console.log('loaded');
}).call();
