let running = true;
//colliders
let ground;
let leftEdgeCollider;
let rightEdgeCollider;
let stairs_1;


let rain = [];
//kann ich hier oben löschen - ist nur für debugging
let teleportArea, teleportArea1;

//interactions
let maskOn = false;
let maskGroundCheck = true;
let teleportColliderSize = 400;
let directionSingle = 5;


//distancing
let distanceCharacter;
let attraction1 = []; //der Punkt, dem die Dinger folgen sollen
let attraction_points = [];
let distancing_groups = [];
let total_number_of_groups = 6;
let direction = 90;
let directionOfAttractionX = 2;
let directionOfAttractionY = 2;
let directionX = 2;
let directionY = 2;

//player
let player1;

//gravity (https://www.youtube.com/watch?v=StoBCNiQakM)
let gravity = 1;
let jump = 20;
let jumpHeight = 300; // Für alle Dinge, auf die der Player springen muss
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

//buttons
let buttonPlay;



//SingleContact
let heightSinglePerson = (SCENE_H/5)*3;




function preload(){
  //background images
  bgImg1 = loadImage("../img/bg-test-1.png");
  bgImg2 = loadImage("../img/bg-test-2.png");
  bgImg3 = loadImage("../img/bg-test-3.png");
  bgImg4 = loadImage("../img/bg-test-4.png");
  bgImg5 = loadImage("../img/bg-test-5.png");
  bgImg6 = loadImage("../img/bg-test-6.png");
  bgImg7 = loadImage("../img/bg-test-9.png");
  bgImg8 = loadImage("../img/bg-test-8.png");

  playerImg = loadImage("../img/woman.png");
  playerMaskImg = loadImage("../img/mask.png");
  individualScoreImg = loadImage("../img/scoreContainerI.png");
  collectiveScoreImg= loadImage("../img/scoreContainerC.png");
}



function setup() {

  createCanvas(windowWidth, windowHeight);

  bg_back = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H); //Hintergrund, der sich anders bewegt (muss ein größeres Bild sein)
  bg = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H); //Vrdergrund 
  

  

  //bg.addImage(bgBigImg1);

  
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
  //flyingEntryArea = createSprite(-(SCENE_W/4),(SCENE_H/3)-(SCENE_H/24),300,SCENE_H/12);
  gravityArea = createSprite(0,(SCENE_H)-(SCENE_H/3),SCENE_W,SCENE_H/1.5);
  gravityArea.visible = false;


  // STAIRS
  //stair_1 = createSprite(100, ((SCENE_H/3)*2)-(jumpHeight/2) , 300, jumpHeight);
  stairs_1 = new Group();
  for (let i = 0; i < (jumpHeight*3); i+=jumpHeight/1.5){
    let stairHeight = 30;
    let stair = createSprite(-(SCENE_W/4)-i,(SCENE_H/3)+i, 300, stairHeight);
    stair.setCollider("rectangle", 0, -(stairHeight/2)+1, 250, 0); //making the collider only on top of stair, so player can still jump an walk infront of it 
    stairs_1.add(stair);
  }
  for (let i = 0; i < (jumpHeight); i+=jumpHeight/3){
    let stairHeight = 30;
    let stairWidth = 150;
    let stair = createSprite((SCENE_W/5)+(1.5*i),((SCENE_H/3)*1.6)+i,stairWidth,stairHeight);
    stair.setCollider("rectangle",0,-(stairHeight/2)+1,stairWidth-10,0);
    stairs_1.add(stair);
  }
  for (let i = 0; i < (jumpHeight); i+=jumpHeight/3){
    let stairHeight = 30;
    let stairWidth = 150;
    let stair = createSprite((SCENE_W/5)+(1.5*i),((SCENE_H/3)*2.6)+i,stairWidth,stairHeight);
    stair.setCollider("rectangle",0,-(stairHeight/2)+1,stairWidth-10,0);
    stairs_1.add(stair);
  }













  //TELEPORT
  teleportArea = createSprite(EDGE_R-(SCENE_W/4),EDGE_D-(SCENE_H*0.55),teleportColliderSize,teleportColliderSize);
  teleportArea.setCollider("circle", 0,0,50,50);
  teleportArea1 = createSprite(EDGE_R-(SCENE_W/4),EDGE_D-(SCENE_H*0.2),teleportColliderSize,teleportColliderSize);
  teleportArea1.setCollider("circle", 0,0,50,50);
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

  for (let i = 0; i < total_number_of_groups; i++){
    distancing_groups[i] = new Group();
    attraction_points[i] = createSprite(random(width),height/2,20,20);
    createSwarm(distancing_groups[i], attraction_points[i])
  }
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

   
      buttonZoom = createButton('Zoom out');
      buttonZoom.position(20, 20);

      buttonPlay = createButton('Play/Pause');
      buttonPlay.position(20, 40);



      //Player zum Schluss, damit er immer vorne ist
    player1 = createSprite(0,SCENE_H/2);
    player1.addImage(playerMaskImg);
    player1.addImage(playerImg);
  
    
    for (let i = 0; i < 1000; i++){
      rain[i] = new Rain (random((EDGE_R)-(SCENE_W/6),SCENE_W/2), random (0,SCENE_H), random(15,50));
    }
}



function draw() {







 




if (running){//if game is not on pause

  //BG AND CAMERA
  background(70); //BG outside of frame 

  // B A C K G R O U N D S 
  //based on collectiveScore
  bg_back.addImage(bgImg8);
  if (collectiveScore < 17){
    bg.addImage(bgImg7);
  }else if (collectiveScore > 16 && collectiveScore < 33){
    bg.addImage(bgImg2);
  }else if (collectiveScore > 32 && collectiveScore < 50){
    bg.addImage(bgImg3);
  } else if (collectiveScore > 49 && collectiveScore < 66){
    bg.addImage(bgImg4);
  }else if(collectiveScore > 65 && collectiveScore < 82){
    bg.addImage(bgImg5);
  }else{
    bg.addImage(bgImg7);
  }
  
  //back - background mapped to playermovement 
  for(let i = -1910 ; i < player1.position.x; i++){
    bg_back.position.x = -(i/10);
  }
  
  
  
  //console.log(bg_back.position.x);
  //console.log(player1.position.x);

  // Z O O M
  buttonZoom.mousePressed(zoom);
  function zoom(){
    if (camera.zoom > 0.5){
      camera.zoom = 0.2;
    }else if (camera.zoom < 0.5){
      camera.zoom = 1;
    }
    
  }
  buttonPlay.mousePressed(playAndPause);
  function playAndPause(){
   
  }
  
  
  if(mouseIsPressed)
   camera.zoom = 0.2;
  else
    camera.zoom = 1;


  //----- C A M E R A -------  
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

console.log(camera.position.y + "CAMERA");
console.log(player1.position.y + "PLAYER");

  if(player1.overlap(flyingArea)){
    while (camera.position.y < player1.position.y){
      camera.position.y += 1;
    
    }
  }else if(player1.overlap(gravityArea)){
    camera.position.y = player1.position.y - (windowHeight/4);
  }
  //camera.position.y = player1.position.y - (windowHeight/4);


 
  
  // ------ P L A Y E R 1  M O V E M E N T-------


  //GRAVITY AREA
  if (player1.overlap(gravityArea)){
    playerMovement();
  }else if (player1.overlap(flyingArea)){
    flying();
  }
  

  maskPosition.debug = mouseIsPressed; //so werden die collider visualisiert
  stairs_1.debug = mouseIsPressed;
  player1.debug = mouseIsPressed;
  teleportArea.debug = mouseIsPressed;
  teleportArea1.debug = mouseIsPressed;
  

  



  drawSprites();  
  




  // ---------- A D D I N G --- I N T E R A C T I O N S -----------
  
  teleporting();
  maskOnOff();
  hygieneScore();
  zoomScore();
  isolationScore();
  singlePeopleWalking ();
  distancingFunction();

  for (let i = 0; i < total_number_of_groups; i++){
    movingAttractionPoints(attraction_points[i]);
    swarmFollowAttraction(distancing_groups[i], attraction_points[i]);
  }
  
  for (i = 0; i < rain.length; i++) {
    rain[i].dropRain();
    rain[i].splash();
  }
  


  // --------- G U I ---------------

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
}//end draw


//function mousePressed() {

  //  running = !running; // flip the boolean
 
//}



/* ------------------- I N T E R A T C T I O N S --------------------- */


// ---- PLAYER1 MOVEMENT -----
function playerMovement(){
  
  gravity = 1;
    
    //left right
    if (keyIsDown(RIGHT_ARROW) && player1.position.x <= (SCENE_W/2)-100) {
      player1.position.x += 10;
    }
    if (keyIsDown(LEFT_ARROW) && player1.position.x >= (-(SCENE_W/2))+100) {
      player1.position.x -= 10;
    }
    //how to make player facing right direction // different animations?
    //MAYBE DOING THIS BUT WITH ATTRACTION POINT LIKE TO THE RIGHT wie: attractionPoint.x = player1.position.x + 2
    //if (player1.overlap(flyingArea)){
    //  player1.rotateToDirection = true;
    //}



    //JUMPING
    player1.velocity.y += gravity; 
    if(player1.collide(ground) || player1.collide(middleGround) || player1.collide(stairs_1)) {
      player1.velocity.y = 0;
    //player1.changeAnimation('');
    }
    if(player1.position.y >= SCENE_H){
      player1.velocity.y = 0;
    }//stop player from falling


    //wenn space, innerhalb gravity area und gerade am Boden war, dann jumpen
    if(keyWentDown(' ') && playerGroundCheck && player1.overlap(gravityArea))
    {
    //player1.changeAnimation('stretch');
    //player1.animation.rew ind();
      player1.velocity.y = -jump;
      playerGroundCheck = false;
    }

    //GROUND CHECK
    //wenn player boden berührt hat, dann ist der Ground check true
    if(player1.overlap(middleGround) || player1.overlap(ground)){
      playerGroundCheck = true;
    }



    //DEBUGGING

    //necessary for debugging when player sticks to something
    if (keyIsDown(DOWN_ARROW)){
      player1.position.y += 1;
    }
    player1.position.y += 1;  //OHNE VIBRIERT DAS BILD WIESO AUCH IMMER -> ich glaube wegen overlap bei groundcheck

    if(player1.overlap(stairs_1)){
      //console.log("GROUND CHECK");
      playerGroundCheck = true;
    }//das muss einzeln hinter dem debug hier drüber, damit ein GroundCheck stattfindet

   
  //PLAYER Collisions
  //player1.setCollider('rectangle', 0, 0, 64,64);
  //if defined, the collider will be used for mouse events: https://molleindustria.github.io/p5.play/examples/index.html?fileName=keyPresses.js
  
}



// ---- FLYING ----
function flying(){
  gravity = 0; 
  player1.velocity.y = 0.5;
  player1.velocity.y += gravity;

  if (keyIsDown(RIGHT_ARROW)) {
    player1.position.x += 7;
  }
  if (keyIsDown(LEFT_ARROW)) {
    player1.position.x -= 7;
  }
  if (keyIsDown(UP_ARROW)) {
    player1.position.y -= 7;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player1.position.y += 7;
  }

}

// ---- TELEPORTING ----
function teleporting(){
  if (player1.overlap(teleportArea)){
    player1.position.y = EDGE_D - 100;
    camera.position.y = player1.position.y - (windowHeight/2);
  }else if (player1.overlap(teleportArea1)){
    player1.position.y = ((SCENE_H/3)*2);
  }
}




// ---- MASK ----
function maskOnOff(){
   //maske anziehen
  if(player1.overlap(maskPosition) && maskOn === false && maskGroundCheck){
    //console.log("OVERLAP");
    player1.addImage(playerMaskImg);
    maskGroundCheck = false;
    maskOn = true; 
  }
//auf dem Boden gewesen 
  else if(player1.overlap(invisibleGroundCheck) && maskOn && maskGroundCheck === false){
    //console.log("OVERLAP GROUND");
    maskGroundCheck = true;
  } 
//maske ausziehen
  if (player1.overlap(maskPosition) && maskOn && maskGroundCheck){
    //console.log("OVERLAP");
    player1.addImage(playerImg);
    maskGroundCheck = false;
    maskOn = false;
}
//auf dem Boden gewesen
else if(player1.overlap(invisibleGroundCheck) && maskOn === false && maskGroundCheck === false){
   // console.log("OVERLAP GROUND2");
    maskGroundCheck = true;
}
}


// ----- HYGIENE -----
function hygieneScore() {
  if (player1.overlap(hygieneArea) && collectiveScore < 100){
    collectiveScore += 1;
  }
}

// ---- ZOOM ----
function zoomScore() {
  if (player1.overlap(zoomArea) && individualScore < 100){
    individualScore += 1;
  }
}

// --- ISOLATION ----
function isolationScore(){
  if (player1.overlap(isolationArea) && individualScore < 100){
    individualScore += 1;
  }
}


// ---- SINGLE CONTACT ----


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


// ---- DISTANCING ----

function createSwarm(distancing_group, attraction_point){
  for (let e = 0; e < 20; e++ ){
    c1 = createSprite(random(width), random(height), random(20,50), 20);
    c1.shapeColor = color(random(0,200),20,random(0,200));
    c1.maxSpeed = 12;
    //camera.setSpeed = random(1,15);
    c1.friction = random(0.05, 0.15);
    c1.rotateToDirection = true;
    c1.attractionPoint(0.9, attraction_point.position.x, attraction_point.position.y);
    distancing_group.add(c1);
}

}

function movingAttractionPoints(attraction_point){
  
  //ALLE BEWEGEN SICH JETZT GLEICH

  if (attraction_point.position.x > EDGE_R){
    directionX = random(-4,-1);
  }else if (attraction_point.position.x <= EDGE_L){
    directionX = random(1,4);
  }
  if(attraction_point.position.y > height){
    directionY = random(-4,-1);
  }else if (attraction_point.position.y < 0){
    directionY = random (1,4);
  }
  
  attraction_point.position.x += directionX;
  attraction_point.position.y += directionY;

  direction += random(1,5); 
  attraction_point.setSpeed(random(2,3), direction); 
}



function swarmFollowAttraction(distancing_group, attraction_point){
  //scheint nicht zu gehen weil das du auf einzelne sprites angewendet werden kann
  for (let i = 0; i < 20; i++){
    distancing_group[i].attractionPoint(random(0.08, 0.2), attraction_point.position.x, attraction_point.position.y);
    distancing_group[i].setCollider("circle", 0, 0, 20);
      distancing_group.collide(distancing_group[i]);
  }
  //distancing_group.attractionPoint(0.12, attraction_point.position.x, attraction_point.position.y);
}





//VORHER BEISPIEL
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


   //distancing_groups.attractionPoint(0.12, attraction1.position.x, attraction1.position.y);

   
}



function Rain(x,y){
  this.x = x;
  this.y = y;
  //this.gravity = 9.8;
  this.length = 30;
  this.r = 0;
  this.opacity = 200;

  this.dropRain = function(){
    noStroke();
    let c =color('rgba(255,255,255,0.5)')
    fill(c);
    ellipse(this.x, this.y, 3, this.length);
    this.y = this.y + random(6,20) //+ frameCount/60;
    
    //making drops disappear
    if (this.y > SCENE_H-100) {
      this.length = this.length - 12;
    }
    if (this.length < 0) {
      this.length = 0;
    }

    this.splash = function() {
      strokeWeight(2);
      //stroke(245, 200/frameCount);
      stroke(245, this.opacity);
      noFill();
      if (this.y > SCENE_H-100) {
        ellipse(this.x, SCENE_H-70, this.r * 2, this.r / 2);
        this.r += 1;
        this.opacity = this.opacity - 10;
  
        //keep the rain dropping
        if (this.opacity < 0) {
          this.y = random(0, -100);
          this.length = 30;
          this.r = 0;
          this.opacity = 200;
        }
      }
    }

  }
  }