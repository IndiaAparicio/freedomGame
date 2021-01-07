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
let SCENE_W = 4000;
let SCENE_H = 3000;
let EDGE_R = (SCENE_W/2)-50;
let EDGE_L = (-(SCENE_W/2))+50;
let EDGE_U = 0; //(-(SCENE_H/2))+50;
let EDGE_D = SCENE_H;
//images
let bgImg0, bgImg1, bgImg2, playerImg;

let birds;


function preload(){
  bgImg0 = loadImage("../img/BG-0.png");
  bgImg1 = loadImage("../img/BG-1.png");
  bgBigImg1 = loadImage("../img/BG-b1.png");
  bgImg2 = loadImage("../img/BG-2.png");
  playerImg = loadImage("../img/woman.png");
}



function setup() {

  createCanvas(windowWidth, windowHeight);

  bg = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H);
  bg.addImage(loadImage("../img/BG-b1.png"));

  player1 = createSprite(0,0);
  player1.addImage(loadImage("../img/woman.png"));
  
  //walls = new Group();
  //creating sprites for grounds //ACHTING sprites haben ankerpunkt in der Mitte
  ground = createSprite(0,SCENE_H,SCENE_W,50);
  middleGround = createSprite(0,(SCENE_H/3)*2,SCENE_W,20);
  clouds1 = createSprite(-(SCENE_W/2)+((SCENE_W/5)/2),(SCENE_H/3)*0.8,(SCENE_W/5),20);
  clouds2 = createSprite(SCENE_W/6,(SCENE_H/3)*0.8,(SCENE_W/3)*2,20);
  //clouds2 = createSprite(SCENE_W*0.9,(SCENE_H/3)*0.8,SCENE_W,20);

  birds = new Group();
  for (var i = 0; i < 10; i++) {
    var b = createSprite(
      random(width), random(height),
      random(10, 50), random(5, 25));
    b.shapeColor = color(255, 0, random(255));
    b.friction = random(0.97, 0.99);
    b.maxSpeed = random(1, 4);
    b.rotateToDirection = true;
    birds.add(b);
  }
}



function draw() {

   
  //BG AND CAMERA
  background(255);
  
  if(mouseIsPressed)
    camera.zoom = 0.2;
  else
    camera.zoom = 1;

  //limit camera movements on edges
  let ScreenPlayerRelation = width/2;
  let ScreenPlayerRelationH = height/2;
  if (player1.position.x >= EDGE_R - ScreenPlayerRelation){
    camera.position.x = camera.position.x;
  }else if(player1.position.x <= EDGE_L + ScreenPlayerRelation){
    camera.position.x = camera.position.x;
  }else{
    camera.position.x = player1.position.x;
  }
  console.log(player1.position.y);
  if (player1.position.y <= EDGE_U + ScreenPlayerRelationH){
    camera.position.y = camera.position.y;
  }else if(player1.position.y >= EDGE_D - ScreenPlayerRelationH){
    camera.position.y = camera.position.y;
  }else{
   camera.position.y = player1.position.y;
  }
  


 
  
  //PLAYER1 MOVEMENT
  if (keyIsDown(RIGHT_ARROW) && player1.position.x <= (SCENE_W/2)-100) {
    player1.position.x += 20;
    individualScore -= 1; 
    collectiveScore += 1;
  }
  if (keyIsDown(LEFT_ARROW) && player1.position.x >= (-(SCENE_W/2))+100) {
    player1.position.x -= 20;
    individualScore += 1; 
    collectiveScore -= 1;
  }

  //JUMPING
  player1.velocity.y += gravity; 
  if(player1.collide(ground) || player1.collide(middleGround) || player1.collide(clouds1) || player1.collide(clouds2)
  ) {
    player1.velocity.y = 0;
    //player1.changeAnimation('');
  }
  if(player1.position.y >= SCENE_H){
    player1.velocity.y = 0;
  }//stop player from falling
  
  //maybe condition if player is colliding with something only then jump
  if(keyWentDown(' ') && player1.position.y >= (EDGE_U + 50))
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




  



  
 
  for (var i = 0; i < birds.length; i++) {
    birds[i].attractionPoint(2, player1.position.x, player1.position.y);
  }
  

 
  
  drawSprites();  


  //ADDING INTERACTIONS
  creatingSingleContacts();


  //UI
  //always after all Sprites are drawn
  camera.off();//für unbewegliche UI Elementes

  //SCORING SYSTEM 
  textSize(40);
  text(individualScore, 0, 100);
  text(collectiveScore, 0, 200);



  //ENDINGS
  if (individualScore >= 30){
    text('Szenario 1', 200,200);
  }
  if (collectiveScore >= 300){
    text('Szenario 2', 200,200);
  }
  camera.on();
}



// SINGLE CONTACT
  //creating a Single Contact randomly if value is less than 0.5%
  function creatingSingleContacts () {
    if (random(1) < 0.005){
      let randomSize = random(10,20);
      singleContacts.push(new SingleContact(randomSize, SCENE_W, (((SCENE_H/3)*2) - randomSize) , random(5,10)) );
    }
    for (let s of singleContacts){
      s.move();
      s.show(); 
    }
  }
