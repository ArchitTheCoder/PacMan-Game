var pacman, pacmanIMG;

var ground, backgroundIMG;

var smileyIMG, smileyGroup;

var ghostIMG, ghost2IMG, ghostGroup;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOverIMG, restartIMG, restart, gameOver;

function preload() {
  
  backgroundIMG = loadImage("bakcground.jpg");
  
  pacmanIMG = loadImage("pacman.png");
  
  smileyIMG = loadImage("smiley.png");
  
  ghostIMG = loadImage("ghost.png");
  ghost2IMG = loadImage("ghost2.png");
  
  restartIMG = loadImage("restart.jpg");
  gameOverIMG = loadImage("go.png");
  
}


function setup() {
  createCanvas(600, 400);
  
  
  
  ground = createSprite(200, 200, 10, 10);
  ground.addImage(backgroundIMG);
  ground.scale = 2;
  
  pacman = createSprite(200,300,10,10);
  pacman.addImage(pacmanIMG);
  pacman.scale = 0.3;
  
  restart = createSprite(300,210,10,10);
  restart.addImage(restartIMG);
  restart.scale = 0.15;
  
  gameOver = createSprite(300,130,10,10);
  gameOver.addImage(gameOverIMG);
  
  smileyGroup = new Group();
  ghostGroup = new Group();
  
}

function draw() {
  background(220);
  
  
  if (gameState === PLAY) {
    
    gameOver.visible = false;
    restart.visible = false;
    
    
    pacman.x = mouseX;
  
    ground.velocityX = -3;
    if (ground.x < 50){
      ground.x = ground.width/2;
    }
  
  
    spawnSmiley();
    spawnGhosts();
    
    //Scoring
    if (pacman.isTouching(smileyGroup)) {
      score = score + 10;
      smileyGroup.destroyEach();
    }
    
    //End game
    
    if (ghostGroup.isTouching(pacman)) {
      gameState = END;
      ghostGroup.destroyEach();
      smileyGroup.destroyEach();
      pacman.x = 300;
    }
    
    
  } else if (gameState === END) {
    ground.velocityX = 0;
    
    gameOver.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)) {
      reset();
      gameState = PLAY;
    }
  }
  
  
  
  drawSprites();
  
  fill(255);
  textSize(20);
  text("Score : " +score, 500, 30);
}

function spawnSmiley() {
  
  if (frameCount % 60 === 0) {
    
    var smile = createSprite(Math.round(random(10,570)), 0, 10, 10);
    smile.addImage(smileyIMG);
    smile.velocityY = (6 + score/10);
    smile.lifetime = 66;
    smile.scale = 0.1;
    smileyGroup.add(smile);

    return smile;
  }
}

function spawnGhosts() {

  if (frameCount % 80 === 0) {
    
    var ghost = createSprite(Math.round(random(10,570)), 0, 10, 10);
    ghost.velocityY = (6 + score/30);

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ghost.addImage(ghostIMG);
              break;
      case 2: ghost.addImage(ghost2IMG);
              break;
      default: break;   
    }
    
    
    ghost.lifetime = 66;
    ghost.scale = 0.3;
    ghostGroup.add(ghost);

  }  
}
function reset() {
  
  gameOver.visible = false;
  restart.visible = false;
  
  score = 0;
  
}
