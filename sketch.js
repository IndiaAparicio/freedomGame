//colliders
let ground;
let leftEdgeCollider;
let rightEdgeCollider;

//interactions
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
let jump = 20;
let playerGroundCheck = true;

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

//SingleContact
let heightSinglePerson = (SCENE_H/5)*3;




function preload(){
  bgImg0 = loadImage("../img/BG-0.png");
  bgImg1 = loadImage("../img/BG-1.png");
  bgBigImg1 = loadImage("../img/BG-b1.png");
  bgImg2 = loadImage("../img/BG-2.png");
  playerImg = loadImage("../img/woman.png");
  playerMaskImg = loadImage("../img/mask.png");
  individualScoreImg = loadImage("../img/scoreContainerI.png");
  collectiveScoreImg= loadImage("../img/scoreContainerC.png");
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
  leftEdgeCollider = createSprite((-(SCENE_W/2)-200),(SCENE_H/2),100,SCENE_H); //für singleContact
  leftEdgeCollider.visible = false;
  rightEdgeCollider = createSprite(SCENE_W/2+200,(SCENE_H/2),100,SCENE_H); //für singleCotact
  rightEdgeCollider.visible = false;

  flyingArea = createSprite(0,(SCENE_H/6),SCENE_W,SCENE_H/3);
  flyingArea.visible = false;
  gravityArea = createSprite(0,(SCENE_H)-(SCENE_H/3),SCENE_W,SCENE_H/1.5);
  gravityArea.visible = false;

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
  singlepeople = new Group(); //die nach rechts gehen
  singlepeople2 = new Group(); //die nach links gehen
  for (let i = 0; i < 5; i++){//Menge an single Contacs definieren
    s1 = createSprite(random(SCENE_W)-(SCENE_W/2),heightSinglePerson,200,100);
    s1.friction = random(0.001, 0.05);
    s1.shapeColor = color(200,0,50);
    s1.maxSpeed = 12;
    singlepeople.add(s1);
    s2 = createSprite(random(SCENE_W)-(SCENE_W/2),heightSinglePerson,200,100);
    s2.friction = random(0.001, 0.03);
    s2.shapeColor = color(0,0,50);
    s2.maxSpeed = 12;
    singlepeople2.add(s2);
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
  }else if(player1.overlap(flyingArea)){
    camera.position.y = player1.position.y;
  }else{
   camera.position.y = player1.position.y - (windowHeight/4);
  }
  


 
  
  //PLAYER1 MOVEMENT
  if (keyIsDown(RIGHT_ARROW) && player1.position.x <= (SCENE_W/2)-100) {
    player1.position.x += 20;
  }
  if (keyIsDown(LEFT_ARROW) && player1.position.x >= (-(SCENE_W/2))+100) {
    player1.position.x -= 20;
  }
  //MAYBE DOING THIS BUT WITH ATTRACTION POINT LIKE TO THE RIGHT wie: attractionPoint.x = player1.position.x + 2
  //if (player1.overlap(flyingArea)){
  //  player1.rotateToDirection = true;
  //}

  //JUMPING
  player1.velocity.y += gravity; 
  if(player1.collide(ground) || player1.collide(middleGround)) {
    player1.velocity.y = 0;
    console.log("GROUND CHECK");
    //player1.changeAnimation('');
  }
  if(player1.position.y >= SCENE_H){
    player1.velocity.y = 0;
  }//stop player from falling
  
  
 
  if(keyWentDown(' ') && player1.position.y >= (EDGE_U + 50) && playerGroundCheck && player1.overlap(gravityArea))
  {
    //player1.changeAnimation('stretch');
    //player1.animation.rewind();
    player1.velocity.y = -jump;
    playerGroundCheck = false;
  }
  //ONLY SINGLE JUMP / GROUNDCHECK
  if(player1.overlap(middleGround) || player1.overlap(ground)){
    console.log("GROUND CHECK2");
    playerGroundCheck = true;
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





  



  
 


 
  //DEBUGGING
  maskPosition.debug = mouseIsPressed;
  player1.debug = mouseIsPressed;
  console.log(player1.position.y);

  drawSprites();  
  

  //ADDING INTERACTIONS
  if (player1.overlap(flyingArea)){
    flying();
  }else{
    gravity = 1;
  }
  teleporting();
  maskOnOff();
  hygieneScore();
  zoomScore();
  isolationScore();
  singlePeopleWalking ();
  distancingFunction();
  


  //UI
  //always after all Sprites are drawn
  camera.off();//für unbewegliche UI Elementes

  //SCORING SYSTEM 

  textSize(40);
  text(individualScore, 0, 100);
  text(collectiveScore, 0, 200);

  //displaying Scores

  let m = map(individualScore, 0, 100, 20, windowWidth/5);
  rect(20,20, m, (windowWidth/5)/4)
  image(individualScoreImg, 20, 20, windowWidth/5, (windowWidth/5)/4);
  let m2 = map(collectiveScore, 0, 100, 20, windowWidth/5);
  rect(40 + windowWidth/5,20, m2, (windowWidth/5)/4)
  image(collectiveScoreImg, 40 + windowWidth/5, 20, windowWidth/5, (windowWidth/5)/4);



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
  if (player1.overlap(hygieneArea) && collectiveScore < 100){
    collectiveScore += 1;
  }
}

//ZOOM
function zoomScore() {
  if (player1.overlap(zoomArea) && individualScore < 100){
    individualScore += 1;
  }
}

//ISOLATION
function isolationScore(){
  if (player1.overlap(isolationArea) && individualScore < 100){
    individualScore += 1;
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


  function singlePeopleWalking () {
    
      directionSingle = random(1,10)
      for (let i = 0; i < singlepeople.length; i++){
        singlepeople[i].attractionPoint(0.12, SCENE_W, heightSinglePerson); 
        singlepeople2[i].attractionPoint(0.12, -SCENE_W, heightSinglePerson); 
       
        
        if (singlepeople[i].overlap(rightEdgeCollider)){
          singlepeople[i].position.x = -(SCENE_W/2); 
        }
        if (singlepeople2[i].overlap(leftEdgeCollider)){
          singlepeople2[i].position.x = SCENE_W/2;
        }
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

function flying(){
  gravity = 0; 

  if (keyIsDown(RIGHT_ARROW)) {
    player1.position.x += 10;
  }
  if (keyIsDown(LEFT_ARROW)) {
    player1.position.x -= 10;
  }
  if (keyIsDown(UP_ARROW)) {
    player1.position.y -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player1.position.y += 10;
  }

}