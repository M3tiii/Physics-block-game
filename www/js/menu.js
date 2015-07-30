function mainMenu(){
	  ctxMenu.textAlign="center"; 
    ctxMenu.fillStyle = "#383838";
    ctxMenu.font=fontSize+"px Arial";

    ctxMenu.fillStyle = "#BCDE78";
    ctxMenu.fillRect(0,0,V.W,V.H);

    
    
    ctxMenu.font=fontSize+"px Arial";
    ctxMenu.fillStyle = "#383838";
    ctxMenu.fillText('F', V.W/2-2.2*fontSize, V.H/2+5);
    ctxMenu.fillText('ALLING', V.W/2-17, V.H/2);
    ctxMenu.fillText('BLOCKS', V.W/2+20, V.H/2+fontSize);
    ctxMenu.drawImage(
      okey,
      0,
      0,
      okey.width,
      okey.height,
      0,
      V.H/40,
      okey.width*1.5,
      okey.width*1.5
    );
    ctxMenu.drawImage(
      volumeon,
      0,
      0,
      volumeon.width,
      volumeon.height,
      V.W-volumeon.width*1.5,
      V.H/40,
      volumeon.width*1.5,
      volumeon.width*1.5
    );
}
function levelPackMenu(pack){
	  ctxMenu.textAlign="center"; 
    //ctxMenu.fillStyle = "#383838";
    //ctxMenu.fillStyle = "white";
    ctxMenu.font=fontSize+"px Arial";

    i = pack;
    ctxMenu.fillStyle = packs[i].colorBack;
    ctxMenu.fillRect(V.W,0,V.W,V.H);
    ctxMenu.fillStyle = "white";
    ctxMenu.fillText(packs[i].name, V.W*1.5, V.H/10);

    ctxMenu.font=fontSize/1.5+"px Arial"; 
    ctxMenu.strokeStyle = "white";
    ctxMenu.lineWidth = (V.W/7-V.W/8);
    var tmp = -1;
    packs[actualPack].levelComplete = 0;
    //ctxMenu.globalAlpha = 0.4;
    for(var n=0; n<20; n++){
      n % 4 ? tmp : tmp++;

      
      ctxMenu.strokeRect(V.W+V.W*0.1375+(n % 4)*V.W/5, V.H/5+tmp*V.W/5+V.W/8-5, V.W/8, 5);
      
      ctxMenu.fillStyle = packs[i].colorFront;
      //console.log(window.localStorage.getItem(actualPack*100+n+1));
      if(window.localStorage.getItem(actualPack*100+n) && !window.localStorage.getItem(actualPack*100+n+1))
        ctxMenu.strokeRect(V.W+V.W*0.1375+(n % 4)*V.W/5, V.H/5+tmp*V.W/5, V.W/8, V.W/8);
      if(window.localStorage.getItem(actualPack*100+n+1)){
        packs[actualPack].levelComplete++;
        ctxMenu.fillStyle = packs[i].colorBack;
      }

      ctxMenu.fillRect(V.W+V.W*0.1375+(n % 4)*V.W/5, V.H/5+tmp*V.W/5, V.W/8, V.W/8);

      ctxMenu.fillStyle = "white";
      ctxMenu.fillText(n+1, V.W+V.W*0.1375+V.W/16+(n % 4)*V.W/5, V.H/5+tmp*V.W/5+V.W/14+fontSize/4);
    }

    if(actualPack > 0 && packs[i-1].levelComplete >= 10){
      packs[i].enable = true;
    }
    if(!packs[i].enable){
      ctxMenu.globalAlpha = 0.8;
      ctxMenu.fillStyle = "black";
      ctxMenu.fillRect(V.W,0,V.W,V.H);
      ctxMenu.globalAlpha = 1;
      ctxMenu.fillStyle = "white";
      ctxMenu.fillText("Complete 10 levels", V.W*1.5, V.H/3);
      ctxMenu.fillText(packs[i-1].name, V.W*1.5, V.H/3+fontSize*2);
    }

    var path=new Path2D();
      path.moveTo(V.W+V.W/5,V.H-V.H/8);
      path.lineTo(V.W*2-V.W/5,V.H-V.H/8);
      path.lineTo(V.W+V.W/2,V.H-V.H/12);
      ctxMenu.fill(path);
}
function manageMenu(x, y){
	//MENU PAGE 0
	if(V.menuPage == 0 && y < V.H/40+volumeon.height*2){
      ctxMenu.fillStyle = "#BCDE78";
      if(x < V.W/2){
        ctxMenu.fillRect(0,V.H/5,V.W,V.H-V.H/5);
        V.info = !V.info;
        if(V.info){
          ctxMenu.fillStyle = "#383838";
          ctxMenu.font="20px Arial"; 
          ctxMenu.fillText('INFO O GRZE', V.W/2, V.H/2);
          ctxMenu.fillText('INFO O GRZE', V.W/2, V.H/2+30);
          ctxMenu.fillText('INFO O GRZE', V.W/2, V.H/2+60);
        }else{
          ctxMenu.fillStyle = "#383838";
          ctxMenu.font=fontSize+"px Arial"; 
          ctxMenu.fillText('F', V.W/2-2.5*fontSize, V.H/2+5);
          ctxMenu.fillText('ALLING', V.W/2-17, V.H/2);
          ctxMenu.fillText('BLOCKS', V.W/2+20, V.H/2+fontSize);
        }
        //MUSIC ON OFF
      }else{
        ctxMenu.fillRect(V.W-volumeon.width*1.5,V.H/40,volumeon.width*1.5,volumeon.height*1.5);
        V.volume = !V.volume;
        var voulme;
        V.volume ? volume = volumeon : volume = volumeoff;
        ctxMenu.drawImage(
          volume,
          0,
          0,
          volume.width,
          volume.height,
          V.W-volume.width*1.5,
          V.H/40,
          volume.width*1.5,
          volume.width*1.5
        );
        
        if(V.volume){
          theme.play();
        }else
          theme.stop();
      }

    //MENU PAGE 1 MORE COMING SOON && CHANGE PACK
    }else if(V.menuPage == 1 && y>V.H-V.H/8){
      actualPack == packs.length-1 ? actualPack = 0 : actualPack++;
      levelPackMenu(actualPack);
      //levelPackMenu(actualPack == 0 ? actualPack = 1 : actualPack = 0);
   
    //MENU PAGE CHOOSE LEVEL
    }else if(V.menuPage == 1 && y>V.H/5 && y < V.H/5+4*V.W/5+V.W/8 && x>V.W/10 && x<V.W-V.W/10){
      b = Math.floor( (y - V.H/5) / (V.W/5) );
     // a = Math.round( (x - V.W*0.1375)/ 4 / (V.W/16) );
      a = Math.floor( (x - V.W/10) /(V.W/5) );
      c = a+(b*4)+1;
      //console.log(a, b, "poziom ", c);
      //console.log(window.localStorage.getItem(actualPack*100+c-1) );
      if(window.localStorage.getItem(actualPack*100+c-1)){
        Game.play(c)
        canvasMenu.style.display = "none";
      }
    
    //MENU ANIM SCROLING
    }else if(allowMove){
      animMoveMenu();
    }
}
function animTapMenu(){
	  ctxMenu.font=20+"px Arial"; 
    ctxMenu.fillText('TAP TO PLAY', V.W/2, V.H-V.H/20);
    var speed = 0;
    var resize = 1;
    var i = 20;
    var tmp = "";
    var timer = setInterval(function () {myTimer()}, 165);
    function myTimer() {
        speed+=1;
        if(i >= 20 || i <= 18)
          speed=1;
        i+=speed*resize;
        tmp = i +"px Arial";

        if(i >= 20){
          resize = -1;
          //tmp = "20px Arial";   
          //window.clearTimeout(timer)
        }
        if(i <= 18)
          resize = 1;

        ctxMenu.fillStyle = "#BCDE78";
        ctxMenu.fillRect(0,V.H-V.H/20-20,V.W,40);
        ctxMenu.font=tmp; 
        ctxMenu.fillStyle = "#383838";
        ctxMenu.fillText('TAP TO PLAY', V.W/2, V.H-V.H/20);
    }
}
function animMoveMenu(){
  allowMove = false;
  var direction;
  V.menuPage == 1 ? direction = -1 : direction = 1;
  var speed = 0;
  var i = 0;
  var tmp = "";
  var timer = setInterval(function () {myTimer()}, 10);
  function myTimer() {
      speed-=1*direction;
      if(Math.abs(i) >= V.W/4){
        speed+=2*direction;
        Math.abs(speed) < 1 ? speed = 1*direction*(-1) : speed;
      }
      
      i+=speed
      tmp = i-V.menuPage*V.W/2 + "px";
      //console.log(speed,"i", i ,V.W/2);
      if(Math.abs(i) >= V.W/2){
        tmp = -V.W/2*direction-V.menuPage*V.W/2 + "px";   
        allowMove = true;
        window.clearTimeout(timer)
        
        V.menuPage == 1 ? V.menuPage = 0 : V.menuPage = 1;
      }
      canvasMenu.style.left = tmp;
  }
}