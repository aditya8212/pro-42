
var mon, monkey_running
var banana ,bananaImage, ob, obstacleImage
var foode, obse,monke,ba
var score = 0;
var PLAY = 1;
var OVER = 0;
var gameState = PLAY;
var canvas;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  fin = loadAnimation("gameover.png");

  banan = loadImage("banana.png");
  obstac = loadImage("obstacle.png");
  gru = loadImage("ground2.png");
  main = loadImage("forest.png");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  
}

function setup() {
  canvas = createCanvas(displayWidth/2+30,displayHeight/2-50);
  
  keke = createGroup();

  /*maa = createSprite(300,150,1200,300);
  maa.addImage(main);
  maa.scale = 1.2;
  maa.velocityX = -6;
  maa.x = maa.width/2;*/

  ground = createSprite(0,290,3000,10);
  ground.addImage(gru);
  ground.velocityX = -6;
  ground.x = ground.width/2;
  keke.add(ground);
  //ground.visible = false;
  
  monke = createGroup();
  
    mon = createSprite(40,280,10,10);
    mon.addAnimation("running",monkey_running);
    mon.scale = 0.12;
    mon.velocityX = 1;
    monke.add(mon);
  
  obse = createGroup();
  foode = createGroup();
  
  
  
}

function draw() {
  background(main);
  
  console.log(camera.position.x);
  if(gameState === PLAY){
     bana();
     obsta();
     dark();

     stroke("darkblue");
     textSize(20);
     fill("red");
     text("score: " + score,camera.position.x,mon.y-100);

     if(ground.x < 0){
         ground.x = ground.width/2;
       }
     
     
     mon.velocityY = mon.velocityY + 0.8
  
    if(keyDown("space") && mon.y > 220){
        mon.velocityY = -13;
        jump.play();
    }
  
   if(foode.isTouching(monke)){
      foode.destroyEach();
      score = score+10;
      die.play();
   }

   if(monke.isTouching(obse)){
       
      mon.scale=0.12;
     // obse.destroyEach();
}
   
   if(monke.isTouching(obse) && mon.scale === 0.12){
      mon.scale = 0.1;

   }

   if(mon.scale === 0.1){
       gameState = OVER;

   }

  mon.collide(ground);

   camera.position.x = mon.x;
   camera.position.y = displayWidth/2-500
  
  }
  
  if(gameState === OVER){

     background("maroon");

     mon.addAnimation("running",fin);
     mon.scale = 0.9;

     obse.destroyEach();
     foode.destroyEach();

     ground.velocityX = 0;
     
  }
  
  drawSprites();
  

  

}

function bana(){
  if(camera.position.x%160 === 0){
     ba = createSprite(camera.position.x+350,Math.round(random(80,150)));
     ba.addImage(banan);
     ba.scale = 0.1;
     ba.velocityX = -5;
     ba.lifetime = 200;
     foode.add(ba);
  }
}

function obsta(){
  if(camera.position.x%200 === 0){
     ob = createSprite(camera.position.x+350,270,10,10);
     ob.addImage(obstac);
     ob.velocityX = -6;
     ob.scale = 0.1;
     obse.add(ob);
  
    }
}

function dark(){
switch (score) {

    case 10:mon.scale = 0.14;
      break;

    case 20:mon.scale = 0.16;
    break;
    
    case 30:mon.scale = 0.18;
    break;
    
    case 40:mon.scale = 0.20;
    break;

  default:
    break;
}


}

