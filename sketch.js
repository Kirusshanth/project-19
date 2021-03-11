var dog,dog_running
var bone, boneImage, obstacle, obstacleImage;
var boneGroup, obstacleGroup;
var ground, invisibleGround;
var GameState;
var PLAY, END;

function preload() {
 dog = loadAnimation("dog1.png","dog2.png")

  boneImage = loadImage("bone.png");
  obstacleImage = loadImage("obstacles.png");

}

function setup() {
  createCanvas(600, 600);

  PLAY = 1;
  END = 0;
  GameState = PLAY;
  //Creating groups
  boneGroup = new Group();
  obstacleGroup = new Group();
  //Creating sprites
  dog = createSprite(170, 470, 50, 50);
  dog.addAnimation("runningDog", dog_running);
  dog.scale = 0.1;

  ground = createSprite(350, 505, 800, 10);
  ground.x = ground.width / 2;
  
  invisibleGround = createSprite(350, 510, 800, 10);
  invisibleGround.x = ground.width / 2;
}


function draw() {
  background("white");

  if (GameState === PLAY) {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space")&&dog.y>100) {
      dog.velocityY = -20;
    }  
    //Adding score
    score = Math.round(frameCount / 3);
    
    if (dog.isTouching(boneGroup)) {
    boneGroup.destroyEach();
  }
   //Calling the functions here
   bone();
   obstacle();
    //If dog hits the rock, gamestate should change to end
    if (dog.isTouching(obstacleGroup)) {
      GameState = END;
    }
} 
  
  if (GameState === END) {
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    boneGroup.setVelocityXEach(0);
    
    boneGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }


  dog.velocityY = monkey.velocityY + 0.9;
  dog.collide(invisibleGround);
  //Displaying the score
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:" + score, 500, 150);
  
  drawSprites();
}

function food() {

  if (frameCount % 80 === 0) {
    var bone = createSprite(600, 110, 10, 20);
    bone.addImage("bne", boneImage);
    bone.velocityX = -5;
    bone.y = Math.round(random(120, 200));
    bone.scale = 0.1;
    boneGroup.add(bone);
    boneGroup.setLifetimeEach(100);
    bone.setCollider("rectangle", 0, 0, 400, 400);

  }

}

function obstacle() {

  if (frameCount % 160 === 0) {
    var obstacle = createSprite(600, 465, 23, 32);
    obstacle.velocityX = -6
    obstacle.addImage("obstacles", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle", 0, 0, 200)
  }

}