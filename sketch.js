let running = true;


//player
let player1;

//gravity (https://www.youtube.com/watch?v=StoBCNiQakM)
let gravity = 1;
let jump = 20;
let jumpHeight = 300; // Für alle Dinge, auf die der Player springen muss
let playerGroundCheck = true;
let enteringFlyingArea = true;
let enteringGravityArea = false;

//scores
let individualScore = 50;
let collectiveScore = 50;


//camera and bg
let bg;
let SCENE_W = 4000;
let SCENE_H = 3000;
let EDGE_R = (SCENE_W/2)-50;
let EDGE_L = (-(SCENE_W/2))+50;
let EDGE_U = 0; //(-(SCENE_H/2))+50;
let EDGE_D = SCENE_H;
let transp;

//colliders
let ground;
let leftEdgeCollider;
let rightEdgeCollider;
let stairs_1;
let rain = [];
let teleportArea, teleportArea1;


//interactions
let maskOn = false;
let maskGroundCheck = true;
let teleportColliderSize = 400;
let directionSingle = 5;

//SingleContact
let heightSinglePerson = (SCENE_H/5)*3;

//distancing
let distanceCharacter;
let distancing_groups = [];
let total_number_of_groups = 6;
let amount_of_characters = 40;
let att_points = [];
let minSpeed = 2;//min and max speed of attraction points
let maxSpeed = 3;



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
  //individualScoreImg = loadImage("../img/scoreContainerI.png");
  //collectiveScoreImg= loadImage("../img/scoreContainerC.png");
}



/* ----------- S E T  U P ------------- */


function setup() {

  createCanvas(windowWidth, windowHeight);


  // B A C K G R O U N D

  bg_back = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H); //Hintergrund, der sich anders bewegt (muss ein größeres Bild sein)
  bg = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H); //Vrdergrund 
  
  
  // hier müssen die transparenzen auferufen werden, weil es in draw zu lange laden muss
  // Tipp: https://forum.processing.org/two/discussion/19438/image-transparency-alpha-via-tint-is-very-slow
  const pg = createGraphics(bgImg1.width, bgImg1.height);
  pg.tint(0, 153, 204, 126);
  pg.image(bgImg1, 0,0);
 
  transp = pg.get();

  

  
  //bg.addImage(bgBigImg1);
  


  // C O L L I D E R S

  // GROUNDS
  //creating sprites for grounds //ACHTING sprites haben ankerpunkt in der Mitte
  ground = createSprite(0,SCENE_H,SCENE_W,50);
  middleGround = createSprite(0,(SCENE_H/3)*2,SCENE_W,20);
  //clouds1 = createSprite(-(SCENE_W/2)+((SCENE_W/5)/2),(SCENE_H/3)*0.8,(SCENE_W/5),20);
  //clouds2 = createSprite(SCENE_W/6,(SCENE_H/3)*0.8,(SCENE_W/3)*2,20);
  leftEdgeCollider = createSprite((-(SCENE_W/2)-200),(SCENE_H/2),100,SCENE_H); //für singleContact
  leftEdgeCollider.visible = false;
  rightEdgeCollider = createSprite(SCENE_W/2+200,(SCENE_H/2),100,SCENE_H); //für singleCotact
  rightEdgeCollider.visible = false;

  // FLYING AND GRAVITY AREA 
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



// I N T E R A C T I O N S

  //MASK 
  maskPosition = createSprite(0,SCENE_H/2,2000,200);
  maskPosition.addImage(playerMaskImg);
  maskPosition.setCollider("circle",0,0,100);
  invisibleGroundCheck = createSprite(0,(SCENE_H/3)*2,SCENE_W,30);  
  invisibleGroundCheck.visible = false;//for collision with middleGround for maskCheck

  //HYGIENE
  hygieneArea = createSprite((EDGE_R)-((SCENE_W/6)/2)+50,SCENE_H/2,(SCENE_W/6),SCENE_H);
  hygieneArea.visible = false;
  //rain
  for (let i = 0; i < 1000; i++){
    rain[i] = new Rain (random((EDGE_R)-(SCENE_W/6),SCENE_W/2), random (0,SCENE_H), random(15,50));
  }

  //ZOOM
  zoomArea = createSprite(-(SCENE_W/10),SCENE_H-(SCENE_H/4),SCENE_W/3,SCENE_H/2);
  zoomArea.visible = false;

  //ISOLATION
  isolationArea = createSprite(0,SCENE_H-(SCENE_H/6),SCENE_W,SCENE_H/3);
  isolationArea.visible = false;


  //SINGLE CONTACTS
  singlepeople = new Group(); //die nach rechts gehen
  singlepeople2 = new Group(); //die nach links gehen
  for (let i = 0; i < 3; i++){//Menge an single Contacs definieren
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
  //making the swarm and attraction points
  for (let i = 0; i < total_number_of_groups; i++){
    distancing_groups[i] = new Group();
    att_points[i] = new Attraction_points(random(-SCENE_W/2, SCENE_W/2), random(SCENE_H/3), random(-2,2), random(-2,2));
    createSwarm(distancing_groups[i], att_points[i].positionX, att_points[i].positionY);
  }


// P L A Y E R 

  //Player zum Schluss, damit er immer vorne ist
  player1 = createSprite(0,SCENE_H/2);
  player1.addImage(playerMaskImg);
  player1.addImage(playerImg);
  
    
    
} // end Set up



function mousePressed(){
  if(mouseX > 20 && mouseX < 20 + windowWidth/10 && mouseY > windowHeight - (windowHeight/10) && mouseY < windowHeight - (windowHeight/20)) {
    running = !running; // flip the boolean
    fill('rgba(0,0,0,0.9)');
    rect(0,0,SCENE_W,SCENE_H);
    fill(200,0,50);
    rect(20 ,windowHeight - (windowHeight/10), windowWidth/10, windowHeight/20, 20);
    fill(0);
    textAlign(CENTER);
    textSize(windowHeight/40);
    text("Continue", 20 + windowWidth/20, windowHeight - (windowHeight/15));
}
}


/* ----------------- D R A W ------------------- */ 

function draw() {

if (running){//if game is not on pause



  //----- B G  A N D  C A M E R A ------
  background(70); //BG outside of frame 

  // B A C K G R O U N D S 
  //based on collectiveScore
  push();
  bg_back.addImage(bgImg8);
  if (collectiveScore < 17){ 
    bg.addImage(transp);
  }else if (collectiveScore > 16 && collectiveScore < 33){
    bg.addImage(transp );
  }else if (collectiveScore > 32 && collectiveScore < 50){
    bg.addImage(bgImg3);
  } else if (collectiveScore > 49 && collectiveScore < 66){
    bg.addImage(bgImg4);
  }else if(collectiveScore > 65 && collectiveScore < 82){
    bg.addImage(bgImg5);
  }else{
    bg.addImage(bgImg7);
  }
  pop();
  
  //back - background mapped to playermovement 
  for(let i = -1910 ; i < player1.position.x; i++){
    bg_back.position.x = -(i/10);
  }

  // C A M E R A 
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


  

  if(mouseX > 40 + windowWidth/10 && mouseX < 40 + windowWidth/5 && mouseY > windowHeight - (windowHeight/10) && mouseY < windowHeight - (windowHeight/20)) { 
    zoomInOut();
  } 

  //NOCHMAL PRÜFEN  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  if(player1.overlap(gravityArea)){
    enteringFlyingArea = true;
    if (player1.overlap(gravityArea) && enteringGravityArea === false){
      camera.position.y = player1.position.y - (windowHeight/4);
    }
    if(camera.position.y >= player1.position.y && enteringGravityArea){
      while (camera.position.y > player1.position.y - (windowHeight/4)){
        camera.position.y -= 1;
      }
    } 
    if(camera.position.y = player1.position.y - (windowHeight/4)){
      camera.position.y = player1.position.y - (windowHeight/4);
      //enteringGravityArea = false;
    }
  }

  if(player1.overlap(flyingArea)){
    enteringGravityArea = true;
    if(camera.position.y < player1.position.y-5 && enteringFlyingArea){//wenn camera kleiner und entering
      while (camera.position.y < height/2){
        camera.position.y += 1;
      }
    }else if (camera.position.y < player1.position.y-5 && enteringFlyingArea === false){//wenn camera kleiner aber nicht entering
      camera.position.y = player1.position.y;
    }
    if(camera.position.y >= player1.position.y){//wenn camera gleich, verfolge Player und entering falsch
      camera.position.y = player1.position.y;
      enteringFlyingArea = false;
    }
    
    //can only go to edge
    if (player1.position.y <= ScreenPlayerRelationH ){
      camera.position.y = ScreenPlayerRelationH;
    }
    
    
    
  }
  
  
  //camera.position.y = player1.position.y - (windowHeight/4);
  // windowHeight/4 = 777


 
  
  // ------ P L A Y E R 1  M O V E M E N T -------


  //GRAVITY AREA
  if (player1.overlap(gravityArea)){
    playerMovement();
  }else if (player1.overlap(flyingArea)){
    flying();
  }
  

  // debugging
  maskPosition.debug = mouseIsPressed; //so werden die collider visualisiert
  stairs_1.debug = mouseIsPressed;
  player1.debug = mouseIsPressed;
  teleportArea.debug = mouseIsPressed;
  teleportArea1.debug = mouseIsPressed;
  

  


  // ALLLES WAS DANACH KOMMT WIRD GEHÖRT NICHT IN DIE WELT
 drawSprites();  
  




  // ---------- A D D I N G --- I N T E R A C T I O N S -----------
  
  teleporting();
  maskOnOff();
  hygieneScore();
  zoomScore();
  isolationScore();
  singlePeopleWalking ();

  
  //DISTANCING 
  for (let i = 0; i < total_number_of_groups; i++){
    att_points[i].move();
    //att_points[i].show();
    swarmFollowAttraction(distancing_groups[i], att_points[i].positionX, att_points[i].positionY);
  }
  
  for (i = 0; i < rain.length; i++) {
    rain[i].dropRain();
    rain[i].splash();
  }
  


  // --------- G U I ---------------

  //always after all Sprites are drawn
  camera.off();//für unbewegliche UI Elemente


  // ----  SCORING SYSTEM ----  


  //setting min and max Score
  if (individualScore <= 0){
    individualScore = 0;
  }else if(individualScore >= 100){
    individualScore = 100;
  }
  if (collectiveScore <= 0){
    collectiveScore = 0;
  }else if(collectiveScore >= 100){
    collectiveScore = 100;
  }

  textSize(40);
  text(individualScore, 0, 100);
  text(collectiveScore, 0, 200);

  // mapping für die Farbe und Länge der Balken in den Scores
  let m = map(individualScore, 0, 100, 20, windowWidth/5);
  let c1 = map(individualScore, 0, 100, 200, 255);
  let c2 = map(individualScore, 0, 100, 0, 255);
  let c3 = map(individualScore,0, 100, 50, 255);

  let m2 = map(collectiveScore, 0, 100, 20, windowWidth/5);
  let c4 = map(collectiveScore, 0, 100, 200, 255);
  let c5 = map(collectiveScore, 0, 100, 0, 255);
  let c6 = map(collectiveScore,0, 100, 50, 255);



  push();

  // DISPLAYING SCORES 

  let r = 10; //radius Scores
  // inneres
  noStroke();
  fill(c1,c2,c3);
  rect(20,20, m, (windowWidth/5)/4, r); //individual 
  fill(c4,c5,c6);
  rect(40 + windowWidth/5,20, m2, (windowWidth/5)/4, r); //collective

  //äußeres
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(20,20, windowWidth/5, (windowWidth/5)/4, r); //individual
  rect(40 + windowWidth/5, 20, windowWidth/5, (windowWidth/5)/4,r ); //collective

  //text
  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(windowHeight/40);
  text("Individual", 20 + windowWidth/10, 20 + windowWidth/35);
  text("Collective", 40 + windowWidth/5 + windowWidth/10, 20 + windowWidth/35);

  
  
  
  // BUTTONS

  //Shadows Buttons
  push();
    translate(3, 3);
    fill('rgba(0,0,0,0.5)');
    rect(20 ,windowHeight - (windowHeight/10), windowWidth/10, windowHeight/20, 20);
    rect(40 + windowWidth/10 ,windowHeight - (windowHeight/10), windowWidth/10, windowHeight/20, 20);
    rect(windowWidth - windowWidth/20 - 20 ,windowHeight - (windowHeight/10), windowWidth/20, windowHeight/20, 20);
    ellipse(windowWidth - windowWidth/20, 20 + windowWidth/35, windowWidth/20);
  pop();


  //Buttons
  fill(255);
  //pause
  rect(20 ,windowHeight - (windowHeight/10), windowWidth/10, windowHeight/20, 20);
  //funktion ist am anfang von draw
 

  //zoom
  rect(40 + windowWidth/10 ,windowHeight - (windowHeight/10), windowWidth/10, windowHeight/20, 20);
  
  
  //sound
  rect(windowWidth - windowWidth/20 - 20 ,windowHeight - (windowHeight/10), windowWidth/20, windowHeight/20, 20);

  //questionmark
  ellipse(windowWidth - windowWidth/20, 20 + windowWidth/35, windowWidth/20);
  
  //text buttons
  fill(0);
  textAlign(CENTER);
  textSize(windowHeight/40);
  text("Sound", windowWidth - windowWidth/20, windowHeight - (windowHeight/15));
  text("Pause", 20 + windowWidth/20, windowHeight - (windowHeight/15));
  text("Zoom", 40 + windowWidth/10 + windowWidth/20, windowHeight - (windowHeight/15));
  text("?", windowWidth - windowWidth/20, 20 + windowWidth/30)

  pop();


  //ENDINGS
  



  camera.on();

}//end running
}//end draw





/* ------------------- I N T E R A T C T I O N S --------------------- */

function zoomInOut(){
  if(mouseIsPressed){
    camera.zoom = windowWidth/SCENE_H;
  }else{
    camera.zoom = 1;
  }
}

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

  if (keyIsDown(RIGHT_ARROW) && player1.position.x <= (SCENE_W/2)-100) {
    player1.position.x += 7;
  }
  if (keyIsDown(LEFT_ARROW) && player1.position.x >= (-(SCENE_W/2))+100) {
    player1.position.x -= 7;
  }
  if (keyIsDown(UP_ARROW) && player1.position.y > 50) {
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

let maskOnInterval, maskOffInterval;
  function setMaskOnInterval (){
  if( maskOnInterval !== null){return}
     maskOnInterval = setInterval(function(){
      // SCORE CHANGE WHILE MASK IS ON
      collectiveScore += 0.3;
      individualScore -= 0.3;
    },1000);//every 1000 milliseconds
  }
  function setMaskOffInterval (){
    if( maskOffInterval !== null){return}
    maskOffInterval = setInterval(function(){
      // SCORE CHANGE WHILE MASK IS OFF
      individualScore += 0.3; 
      collectiveScore -= 0.3;
    },1000);//every 1000 milliseconds
  }
  function stopMaskOnInterval(){
    clearInterval(maskOnInterval);
  }
  function stopMaskOffInterval(){
    clearInterval(maskOffInterval);
  }

function maskOnOff(){
  
   //maske anziehen
  if(player1.overlap(maskPosition) && maskOn === false && maskGroundCheck){
    player1.addImage(playerMaskImg);
    maskGroundCheck = false;
    maskOn = true; 
  
    setMaskOnInterval();
    stopMaskOffInterval();
  }
//auf dem Boden gewesen 
  else if(player1.overlap(invisibleGroundCheck) && maskOn && maskGroundCheck === false){
    maskGroundCheck = true;
  } 
//maske ausziehen
  if (player1.overlap(maskPosition) && maskOn && maskGroundCheck){
    player1.addImage(playerImg);
    maskGroundCheck = false;
    maskOn = false;
    setMaskOffInterval();
    stopMaskOnInterval();
}
//auf dem Boden gewesen
else if(player1.overlap(invisibleGroundCheck) && maskOn === false && maskGroundCheck === false){
    maskGroundCheck = true;
}
}


// ----- HYGIENE -----
let boostHygine = false;
let hygieneBoostIntervall;
let hasStartedTimeoutH = false;
let clean = 5; //je nach dem wie Clean jemand ist (0 voll / 10 null)

function hygieneScore() {
  if(clean >= 10){ clean = 10; }else if(clean <= 1){clean = 1;}
  //console.log(boostHygine);
  if (player1.overlap(hygieneArea) && boostHygine === false){
      clean = 1;
      boostHygine = true;
      collectiveScore += 20;
      individualScore -= 10;
  }else if (player1.overlap(hygieneArea) === false && boostHygine && !hasStartedTimeoutH){
      hygieneBoostIntervall = setTimeout(function(){boostHygine = false; hasStartedTimeoutH = false;}, 10000); //wenn in der letzten Sekunde ein boost war
      hasStartedTimeoutH = true;
    }
  //console.log(hasStartedTimeoutH);
  
  //clean

  if(player1.overlap(hygieneArea) === false){
    clean *= 1.001; // wie schnell der Wert zurück au 10 fällt 
    collectiveScore -= clean * 0.001; // wie starken Impact clean auf den Score hat
  }

}

// ---- ZOOM ----
let boring = 10; //10 fun // 0 boring
function zoomScore() {
  let insideZoomArea;
  if (boring <= 1){boring = 1;}else if(boring >= 10){boring = 10;}
  //console.log(boring + "BORING")
  if (player1.overlap(zoomArea)){
    if (player1.overlap(zoomArea)){
      insideZoomArea = true;
    }else{
      insideZoomArea = false;
    }
  }

  if(insideZoomArea){
      //ADD ANIMATION
      boring *= 0.999; //es wird immer langweiliger
      individualScore += boring * 0.001;
  }else{
      boring *= 1.001; //lässt boring wieder hoch gehen
  }

    //individualScore += 1;
  
}

// --- ISOLATION ----
let lonely = 1; //1= not lonely ; 10 = very lonely
function isolationScore(){
  //console.log(lonely + "LONELY")
  let insideIsolationArea;
  if (lonely <= 1){lonely = 1;}else if(lonely >= 10){lonely = 10;}
  if (player1.overlap(isolationArea)){
    insideIsolationArea = true;
  }else{
    insideIsolationArea = false;
  }

  if (insideIsolationArea){
    lonely *= 1.001;
    individualScore -= lonely * 0.001;
  }else{
    lonely *= 0.999; //lässt außerhalb lonely wieder runter gehen
  }


}


// ---- SINGLE CONTACT ----
let touchedPerson = false;
  function singlePeopleWalking () {
    if(running){
    
      directionSingle = [3,6,9];
      for (let i = 0; i < singlepeople.length; i++){
       
        //singlepeople[i].attractionPoint(0.12, SCENE_W, heightSinglePerson); 
        //singlepeople2[i].attractionPoint(0.12, -SCENE_W, heightSinglePerson); 

        singlepeople[i].position.x += directionSingle[i];
        singlepeople2[i].position.x -= directionSingle[i];

        if (singlepeople[i].overlap(rightEdgeCollider)){
          singlepeople[i].position.x = -(SCENE_W/2); 
        }
        if (singlepeople2[i].overlap(leftEdgeCollider)){
          singlepeople2[i].position.x = SCENE_W/2;
        }
      }

      if (player1.overlap(singlepeople2) && !touchedPerson || player1.overlap(singlepeople) && !touchedPerson){
        touchedPerson = true;
        setTimeout(function(){touchedPerson = false;},5000);
        individualScore += 5 ;
        collectiveScore -= 3;
      }
      
    
  }}


// ---- DISTANCING ----

// CREATING SWARM
function createSwarm(distancing_group, attraction_pointX, attraction_pointY){
  for (let e = 0; e < amount_of_characters; e++ ){
    c1 = createSprite(random(-SCENE_W/2, SCENE_W/2), random(SCENE_H/3), random(20,50), 20);
    c1.shapeColor = color(random(0,200),20,random(0,200));
    //c1.maxSpeed = 15;
    //camera.setSpeed = random(1,15);
    c1.friction = random(0.07, 0.18);
    c1.rotateToDirection = true;
    c1.attractionPoint(29, attraction_pointX, attraction_pointY);
    distancing_group.add(c1);
  }
}

// SWARM FOLLOWS ATTRACTION POINT
let touchedGroup = false;
let hasStartedTimeoutS = false;
function swarmFollowAttraction(distancing_group, attraction_pointX, attraction_pointY){
  
  for (let i = 0; i < amount_of_characters; i++){
    distancing_group[i].attractionPoint(random(0.08, 0.2), attraction_pointX, attraction_pointY);
    distancing_group[i].setCollider("circle", 0, 0, 20);
    distancing_group.collide(distancing_group[i]);
  }

  if(player1.overlap(distancing_group) && touchedGroup === false){
    individualScore += 10;
    collectiveScore -= 10;
    touchedGroup = true;
  }
  if(player1.overlap(distancing_group) === false && touchedGroup && !hasStartedTimeoutS){
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setTimeout(function (){touchedGroup = false; hasStartedTimeoutS = false;},10000) // 10000 macht problem aber 1000 nicht
    hasStartedTimeoutS = true;
  }
  //console.log(touchedGroup);
  //distancing_group.attractionPoint(0.12, attraction_point.position.x, attraction_point.position.y);
}

// CREATING AND MOVING ATTRACTION POINTS
class Attraction_points {
  constructor(posX, posY, speedX, speedY){
      this.posX = posX;
      this.posY = posY;
      this.speedX = speedX;
      this.speedY = speedY;
  }

  get positionX (){
    return this.posX;
  }
  get positionY (){
    return this.posY;
  }

  move(){
      if(this.posX <= -(SCENE_W/2)){
          this.speedX = random(minSpeed,maxSpeed);
      }else if(this.posX >= SCENE_W/2){
          this.speedX = random(-maxSpeed,-minSpeed);
      }

      if(this.posY <= 0){
        this.speedY = random(minSpeed,maxSpeed); 
      }else if(this.posY >= SCENE_H/3){
        this.speedY = random(-maxSpeed,-minSpeed);
  
      }

      this.posX += this.speedX;
      this.posY += this.speedY;

  }
  //ONLY FOR DEBUGGING
  show(){
    fill(200,0,0);
      rect(this.posX, this.posY, 100,100);
  }
}


// R A I N
//https://editor.p5js.org/monicawen/sketches/HkU-BCJqm
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




  //wenn irgendein key gedrückt wird add 0.01 für den movement dings
  //wenn key gedrückt +individual, -collective
  //wenn kein key gedrückt -individual, +collective 
  //so kann der wert durch nichts drücken nicht auf 0 sinken


  //test mit der Transparenz der Bilder, damit weniger geladen werden muss