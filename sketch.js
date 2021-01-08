//colliders
let ground;

//interactions
let singleContacts = [];
let maskOn = false;
let maskGroundCheck = true;
let teleportColliderSize = 400;
let directionSingle = 5;

//distancing
let distanceCharacter;
let attraction1 = []; //der Punkt, dem die Dinger folgen sollen
let direction = 90;
let directionOfAttractionX = 2;
let directionOfAttractionY = 2;


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




function preload(){
  bgImg0 = loadImage("../img/BG-0.png");
  bgImg1 = loadImage("../img/BG-1.png");
  bgBigImg1 = loadImage("../img/BG-b1.png");
  bgImg2 = loadImage("../img/BG-2.png");
  playerImg = loadImage("../img/woman.png");
  playerMaskImg = loadImage("../img/mask.png");
}



function setup() {

  createCanvas(windowWidth, windowHeight);

  bg = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H);
  bg.addImage(bgBigImg1);

  player1 = createSprite(0,0);
  player1.addImage(playerMaskImg);
  player1.addImage(playerImg);
  
  
  //creating sprites for grounds //ACHTING sprites haben ankerpunkt in der Mitte
  ground = createSprite(0,SCENE_H,SCENE_W,50);
  middleGround = createSprite(0,(SCENE_H/3)*2,SCENE_W,20);
  clouds1 = createSprite(-(SCENE_W/2)+((SCENE_W/5)/2),(SCENE_H/3)*0.8,(SCENE_W/5),20);
  clouds2 = createSprite(SCENE_W/6,(SCENE_H/3)*0.8,(SCENE_W/3)*2,20);
  
  //TELEPORT
  teleportArea = createSprite(EDGE_R-(SCENE_W/4),EDGE_D-(SCENE_H*0.55),teleportColliderSize,teleportColliderSize);
  teleportArea1 = createSprite(EDGE_R-(SCENE_W/4),EDGE_D-(SCENE_H*0.2),teleportColliderSize,teleportColliderSize);
  teleportArea.visible = false;
  teleportArea1.visible = false;

  //MASK 
  maskPosition = createSprite(0,SCENE_H/2,2000,200);
  maskPosition.addImage(playerMaskImg);
  maskPosition.setCollider("circle",0,0,100);
  invisibleGroundCheck = createSprite(0,(SCENE_H/3)*2,SCENE_W,30);  
  invisibleGroundCheck.visible = false;//for collision with middleGround for maskCheck

  //HYGIENE
  hygieneArea = createSprite((EDGE_R)-((SCENE_W/6)/2)+50,SCENE_H/2,(SCENE_W/6),SCENE_H);
  hygieneArea.visible = false;

  //ZOOM
  zoomArea = createSprite(-(SCENE_W/10),SCENE_H-(SCENE_H/4),SCENE_W/3,SCENE_H/2);
  zoomArea.visible = false;

  //ISOLATION
  isolationArea = createSprite(0,SCENE_H-(SCENE_H/6),SCENE_W,SCENE_H/3);
  isolationArea.visible = false;

  //SINGLE CONTACTS
  singlepeople = new Group();
  for (let i = 0; i < 10; i++){
    s1 = createSprite(random(SCENE_W)-(SCENE_W/2),1000,200,100);
    s1.friction = random(0.05, 0.15);
    singlepeople.add(s1);
  }

  //DISTANCING
   //creating the attraction point as a moving sprite and making it invisible
    attraction1 = createSprite(random(width),height/2,20,20);
    //attraction1.visible = false; //COMMENT OUT TO SEE THE POINT  
   distanceCharacter = new Group();
   

    for (let i = 0; i < 20; i++ ){
      c1 = createSprite(random(width), random(height), random(20,50), 20);
      c1.shapeColor = color(20,20,20);
      c1.maxSpeed = 12;
      //camera.setSpeed = random(1,15);
      c1.friction = random(0.05, 0.15);
      c1.rotateToDirection = true;
      distanceCharacter.add(c1);
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
  player1.setCollider('rectangle', 0, 0, 64,64);
  //if defined, the collider will be used for mouse events: https://molleindustria.github.io/p5.play/examples/index.html?fileName=keyPresses.js
  //player1.collide(walls);




  



  
 


 
  //DEBUGGING
  maskPosition.debug = mouseIsPressed;
  player1.debug = mouseIsPressed;
  console.log(player1.position.y);

  drawSprites();  
  

  //ADDING INTERACTIONS
  teleporting();
  maskOnOff();
  hygieneScore();
  zoomScore();
  isolationScore();
  singlePeopleWalking ();
  creatingSingleContacts();
  distancingFunction();


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





//MASK
function maskOnOff(){
   //maske anziehen
  if(player1.overlap(maskPosition) && maskOn === false && maskGroundCheck){
    console.log("OVERLAP");
    player1.addImage(playerMaskImg);
    maskGroundCheck = false;
    maskOn = true; 
  }
//auf dem Boden gewesen 
  else if(player1.overlap(invisibleGroundCheck) && maskOn && maskGroundCheck === false){
    console.log("OVERLAP GROUND");
    maskGroundCheck = true;
  } 
//maske ausziehen
  if (player1.overlap(maskPosition) && maskOn && maskGroundCheck){
    console.log("OVERLAP");
    player1.addImage(playerImg);
    maskGroundCheck = false;
    maskOn = false;
}
//auf dem Boden gewesen
else if(player1.overlap(invisibleGroundCheck) && maskOn === false && maskGroundCheck === false){
    console.log("OVERLAP GROUND2");
    maskGroundCheck = true;
}
}


//HYGIENE
function hygieneScore() {
  if (player1.overlap(hygieneArea)){
    collectiveScore += 20;
  }
}

//ZOOM
function zoomScore() {
  if (player1.overlap(zoomArea)){
    individualScore += 20;
  }
}

//ISOLATION
function isolationScore(){
  if (player1.overlap(isolationArea)){
    individualScore += 20;
  }
}

//TELEPORTING
function teleporting(){
  if (player1.overlap(teleportArea)){
    player1.position.y = EDGE_D;
    camera.position.y = player1.position.y - (height/2);
  }else if (player1.overlap(teleportArea1)){
    player1.position.y = ((SCENE_H/3)*2);
  }
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

  function singlePeopleWalking () {
    

      for (let i = 0; i < singlepeople.length; i++){
        
        if (singlepeople[i].position.x >= EDGE_R){
          directionSingle = -5;
          console.log("SMALLER R");
        }else if (singlepeople[i].position.x <= EDGE_L){
          directionSingle = 5;
          console.log("BIGGER L");
        }
        singlepeople[i].position.x += directionSingle;
        
        
      }

    
  }


//DISTANCING
function distancingFunction(){

  //setting the point of attraction inside a certain area
  if (attraction1.position.x  > EDGE_R){
    directionOfAttractionX = random(-4,-1);
  }else if (attraction1.position.x <= EDGE_L){
    directionOfAttractionX = random(1,4);
  }
  if (attraction1.position.y > height){
    directionOfAttractionY = random(-4,-1);   
  }else if (attraction1.position.y < 0){
    directionOfAttractionY = random(1,4);
  }
  attraction1.position.x += directionOfAttractionX;
  attraction1.position.y += directionOfAttractionY;


  //direction and speed of attraction character
  direction += random(1,5); 
  attraction1.setSpeed(random(2,3), direction); //speed und angle von dem Punkt wo sprite erstellt wurde

  
  for (let i = 0; i < distanceCharacter.length; i++ ){
      distanceCharacter[i].attractionPoint(0.12, attraction1.position.x, attraction1.position.y);
      //maxSpeed für wenn die Dinger weiter weg sind. Hier bei ghost: https://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite4.js
      distanceCharacter[i].setCollider("circle", 0, 0, 20);
      distanceCharacter.collide(distanceCharacter[i]); //setting a collider so they won't end up beeing one rectangle
   } 

   
 
   
  
  
  
  
}