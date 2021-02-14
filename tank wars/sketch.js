var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg,bg1Img,bg1;
var bgImage;
var player, player_running,player_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var Bullet,bullet1img,tempBullet,BulletG


function preload(){
player_running =  loadAnimation("helicopter-0.png","helicopter-1.png","helicopter-4.png",
"helicopter-7.png","helicopter-8.png");
 player_collided = loadAnimation("rd.png");
 bgImage = loadImage("city0.jpg")
 groundImage = loadImage("race.png");
 cloudImage = loadImage("air villan-6.png")     
 obstacle1 = loadImage("villan2-15.png");
 obstacle2 = loadImage("villan4-2.png");
 obstacle3 = loadImage("villan4-3.png");
 obstacle4 = loadImage("villan2-14.png");
 obstacle5 = loadImage("air 2-14.png");
 obstacle6 = loadImage("air 2-3.png");
 restartImg = loadImage("res.png")
 gameOverImg = loadImage("go.png")
 bg1Img=loadImage("bullet2.png")  
 jumpSound = loadSound("jump.mp3")
 dieSound = loadSound("die.mp3")
 checkPointSound = loadSound("checkPoint.mp3")

}
function setup() {
 createCanvas(600, 200);
 var message = "This is a message";
 console.log(message)
 bg = createSprite(300,130,600,200);
 player = createSprite(50,160,20,50);
 player.addAnimation("running", player_running);
 player.addAnimation("collided", player_collided);
 
 bg.addImage("bg",bgImage)
 bg.scale =0.7
 
 player.scale = 0.4;
 
 ground = createSprite(200,300,400,20);
 ground.addImage("ground",groundImage);
 ground.x = ground.width /2;
  
 gameOver = createSprite(300,60);
 gameOver.addImage(gameOverImg);
  
 restart = createSprite(300,160);
 restart.addImage(restartImg);
  
 gameOver.scale = 0.6;
 restart.scale = 0.1;
  
 invisibleGround = createSprite(200,190,400,10);
 invisibleGround.visible = false;

 obstaclesGroup = new Group();
 cloudsGroup = new Group();
 BulletG = new Group();
 player.setCollider("rectangle",0,0,100,300);
  
 score = 0; 

}
function draw() {
  
  background("white"); 
  player.y=World.mouseY         
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)

    score = score + Math.round(frameRate()/60);

    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    player.depth = ground.depth+1

    if(keyDown("space")) {
    SpawnBullet();
    jumpSound.play();
}

  player.velocityY =player.velocityY + 0.4           
    spawnClouds();
    spawnObstacles();
  if(BulletG.isTouching(cloudsGroup)){ 
    BulletG.destroyEach();
    cloudsGroup.destroyEach()
    score=score+2;
    
    }

  if(BulletG.isTouching(obstaclesGroup)){ 
    BulletG.destroyEach();
    obstaclesGroup.destroyEach()
    score=score+2;
    
    }
  
  if(obstaclesGroup.isTouching(player)){
    jumpSound.play();
    gameState = END;
    dieSound.play()     
 }

 
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  player.changeAnimation("collided", player_collided);
  player.x = player.x+5;
  player.y = player.y + 5     
  ground.velocityX = 0;
  player.velocityY = 0

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);    
 }
  
 player.collide(invisibleGround);
  
 if(mousePressedOver(restart)&&gameState === END) {
    gameState = PLAY
    obstaclesGroup.setLifetimeEach(0);
    cloudsGroup.setLifetimeEach(0);
    score = 0;
    player.x = 50;
    player.y = 160;
    player.changeAnimation("running", player_running);

  }
 
drawSprites();
  fill("blue")
  text("Score: "+ score, 500,25);
  text("TANK WARS🔥🔥",40,10,200,50);

}

function reset(){  
}
function spawnObstacles(){
 if (frameCount % 50 === 0){
   var obstacle = createSprite(600,170,10,40);
   obstacle.velocityX = -(6 + score/50);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }             
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;

   obstacle.setCollider("rectangle",0,0,200,400)
    obstaclesGroup.add(obstacle);
 }
}
function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.6;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = player.depth;
    player.depth = player.depth + 1;

    cloudsGroup.add(cloud);
  }
}
function SpawnBullet(){ 
  Bullet=createSprite(50,160,20,50) 
  Bullet.addImage(bg1Img)
  Bullet.x=50
  Bullet.y = player.y 
  Bullet.velocityX=6
  Bullet.scale= 0.4;
  Bullet.lifetime = 56;
  BulletG.add(Bullet)
   console.log(Bullet.y) }