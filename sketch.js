//colliders
let walls, ground;

//interactions
let singleContacts = [];

//player
let player1;
//gravity (https://www.youtube.com/watch?v=StoBCNiQakM)
let gravity = 1;
let jump = 15;

//scores
let individualScore = 0;
let collectiveScore = 0;

//camera and bg
let bg;
let SCENE_W = 3000;
let SCENE_H = 2200;

//images
let bgImg0, bgImg1, bgImg2, playerImg;

function preload(){
  bgImg0 = loadImage("../img/BG-0.png");
  bgImg1 = loadImage("../img/BG-1.png");
  bgBigImg1 = loadImage("../img/BG-b1.png");
  bgImg2 = loadImage("../img/BG-2.png");
  playerImg = loadImage("../img/woman.png");
}



function setup() {

  createCanvas(windowWidth, windowHeight);

  bg = createSprite(0, height, SCENE_W, SCENE_H);
  bg.addImage(loadImage("../img/BG-b1.png"));

  player1 = createSprite(100,1000);
  player1.addImage(loadImage("../img/woman.png"));
  
  //walls = new Group();
  //creating sprites for grounds
  ground = createSprite(0,SCENE_H,SCENE_W,50);
  middleGround = createSprite(0,(SCENE_H/3)*2,SCENE_W,20);
  clouds1 = createSprite(0,(SCENE_H/3)*0.8,SCENE_W,20);
  //clouds2 = createSprite(SCENE_W*0.9,(SCENE_H/3)*0.8,SCENE_W,20);
}



function draw() {
  
  //BG AND SCORE
  background(255);

  if(mouseIsPressed)
    camera.zoom = 0.7;
  else
    camera.zoom = 1;

  camera.position.x = player1.position.x;
  camera.position.y = player1.position.y;

  //limit the ghost movements


   

 //draw the scene
 //drawSprites(bg);

  textSize(40);
  text(individualScore, windowWidth, windowHeight);
  text(collectiveScore, 800, 30);

  //PLAYER1 MOVEMENT
  if (keyIsDown(RIGHT_ARROW)) {
    player1.position.x += 1;
    individualScore -= 1; 
    collectiveScore += 1;
  }
  if (keyIsDown(LEFT_ARROW)) {
    player1.position.x -= 1;
    individualScore += 1; 
    collectiveScore -= 1;
  }

  //jumping

  player1.velocity.y += gravity; 
  if(player1.collide(ground) || player1.collide(middleGround) || player1.collide(clouds1)) {
    player1.velocity.y = 0;
    //player1.changeAnimation('');
  }
  //maybe condition if player is colliding with something only then jump
  if(keyWentDown(' ') || mouseWentDown(LEFT))
  {
    player1.changeAnimation('stretch');
    //player1.animation.rewind();
    player1.velocity.y = -jump;
  }
  //necessary for debugging when player sticks to something
  if (keyIsDown(DOWN_ARROW)){
    player1.position.y += 1;
  }
  //OHNE VIBRIERT DAS BILD WIESO AUCH IMMER
  player1.position.y += 1;

  //PLAYER Collisions
  player1.setCollider('circle', 0, 0, 30);
  //if defined, the collider will be used for mouse events: https://molleindustria.github.io/p5.play/examples/index.html?fileName=keyPresses.js
  //player1.collide(walls);


  //ENDINGS
  if (individualScore >= 30){
    text('Szenario 1', 200,200);
  }
  if (collectiveScore >= 300){
    text('Szenario 2', 200,200);
  }


  // SINGLE CONTACT
  //creating a Single Contact randomly if value is less than 0.5%
  if (random(1) < 0.005){
    singleContacts.push(new SingleContact() );
  }
  for (let s of singleContacts){
    s.move();
    s.show(); 
  }

  

  drawSprites();   
  //camera.off();
}


