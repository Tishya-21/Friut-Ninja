
var knife,knifeimg,monster;
var PLAY=1;
var END=0;
var gameState=1;
var score=0;

function preload(){
  
 knifeimg=loadImage("sword.png");
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  alienimg=loadAnimation("alien1.png","alien2.png");
  gameoverimg=loadImage("gameover.png");
  gameoversound=loadSound("gameover.mp3");
  swoosh=loadSound("knifeSwooshSound.mp3");

}

function setup(){
  
  createCanvas(600,600);
  knife=createSprite(300,300,20,20);
  knife.addImage(knifeimg);
  fruitGroup=new Group();
  aliengroup=new Group();
}


function draw(){
  background(0, 255, 242);
  drawSprites();
  if (gameState===PLAY){
    fruits();
    enemy();
    knife.x=World.mouseX;
    knife.y=World.mouseY;
    if(fruitGroup.isTouching(knife)){
      swoosh.play();
      score=score+1;
      fruitGroup.destroyEach();
       }
    else {
      if(aliengroup.isTouching(knife)){
        gameState=END;
        aliengroup.destroyEach();
        fruitGroup.destroyEach();
        knife.addImage(gameoverimg);
        knife.x=300;
        knife.y=300;
        gameoversound.play();
      }
    }
  }
  textSize(25);
  text("Score:"+score,270,50);
  
  
  
}

function fruits(){
  
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(500,200,20,20);
    fruit.scale=0.2;
    if(position===1){
      fruit.x=500;
      fruit.velocityX=-(7+(score/4));
    }
    else {
      
        fruit.x=200;
        fruit.velocityX=7+score/4
      
    }
    r=Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1);
    } else if(r == 2){
      fruit.addImage(fruit2);
  } else if(r == 3){
      fruit.addImage(fruit3);
  } else  {
      fruit.addImage(fruit4);
  
  }

  fruit.y=Math.round(random(50,340));
  
  fruit.velocityX=-7;
  fruit.setLifetime=100;
   
   
  fruitGroup.add(fruit);

}}

  function enemy(){
    
    if(World.frameCount%200===0){
      alien=createSprite(500,300,30,30);
      alien.addAnimation("enemy",alienimg);
      alien.y=Math.round(random(50,340));
      alien.velocityX=-7;
      alien.setLifetime=100;
      aliengroup.add(alien);
    }
    
  }




