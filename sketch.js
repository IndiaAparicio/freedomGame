let running = true;


//player
let player1;


//Animation
let s1, s2, distance1;
let isJumping = true;

//Sound-Checks
let middleAreaSoundOn = false;
let flyingAreaSoundOn = false;
let isolationAreaSoundOn = false;
let hygieneAreaSoundOn = false;
let zoomAreaSoundOn = false;
let teleportAreaSoundOn = false;
let teleportArea1SoundOn = false;
let maskSoundOn = false;
let distancingSoundOn = false;
let singleContactSoundOn = false;

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
let fbS_I_r = 255; //feedback Score Individual color red
let fbS_I_g = 255; //feedback Score Individual color green
let fbS_I_b = 255; //feedback Score Individual color blue
let fbS_C_r = 255; //feedback Score Collective color red
let fbS_C_g = 255; //feedback Score Collective color green
let fbS_C_b = 255; //feedback Score Collective color bliue


//camera and bg
let bg;
let SCENE_W = 4000;
let SCENE_H = 3000;
let EDGE_R = (SCENE_W/2)-50;
let EDGE_L = (-(SCENE_W/2))+50;
let EDGE_U = 0; //(-(SCENE_H/2))+50;
let EDGE_D = SCENE_H;


//colliders
let ground;
let leftEdgeCollider;
let rightEdgeCollider;
let stairs_1;
let rain = [];
let teleportArea, teleportArea1;
let middleArea;


//interactions
let maskOn = true;
let maskGroundCheck = true;
let teleportColliderSize = 400;
let directionSingle = 5;
let movingHygieneA = 800;
let movingHygieneB = 800+SCENE_W/6;
let hDir = 1;
let hDir2 = 1;

//Bildschirme in ZoomArea
let zoomScreenMiddle;
let zoomScreenGround;
let move1 = 50;

//SingleContact
let heightSinglePerson = (SCENE_H/5)*3.15;

//distancing
let distanceCharacter;
let distancing_groups = [];
let total_number_of_groups = 4;
let amount_of_characters = 25;
let att_points = [];
let minSpeed = 2;//min and max speed of attraction points
let maxSpeed = 3;

//Text Information 
let updateUserInfo = 'Welcome to the game';


function preload(){
  
  jump_sound = loadSound('../audio/jump.mp3');
  distancing_sound = loadSound('../audio/swoosh.mp3');
  singleContact_sound = loadSound('../audio/swoosh.mp3');
  hygiene_sound = loadSound('../audio/rain.mp3');
  zoom_sound = loadSound('../audio/electricity.mp3');
  mask_sound = loadSound('../audio/maske.mp3');
  teleport_sound = loadSound('../audio/teleport.mp3');
  button_sound = loadSound('../audio/button.mp3');

  flyingArea_sound = loadSound('../audio/gone_short_audiohub.mp3');
  isolationArea_sound = loadSound('../audio/morning-memory-short-audiohub.mp3');
  middleArea_sound = loadSound('../audio/heartbeat-short-audiohub.mp3');
  
  
  // middleCity = loadImage("../img/middleCity.png"); // middleCity


  clouds1 = loadImage("../img/wolken-highR.png");

  bg_vorne_1 = loadImage('../img/bg-vorne-1.png');
  bg_hinten_1 = loadImage('../img/bg-hinten-1.png');
  bg_vorne_2 = loadImage('../img/bg-vorne-2.png');
  bg_hinten_2 = loadImage('../img/bg-hinten-2.png');
  bg_vorne_3 = loadImage('../img/bg-vorne-3.png');
  bg_hinten_3 = loadImage('../img/bg-hinten-3.png');
  bg_vorne_4 = loadImage('../img/bg-vorne-4.png');
  bg_hinten_4 = loadImage('../img/bg-hinten-4.png');
  bg_vorne_5 = loadImage('../img/bg-vorne-5.png');
  bg_hinten_5 = loadImage('../img/bg-hinten-5.png');

  schnur_Mask_img = loadImage("../img/schnur/schnur-maske-7.png");
  schnur_img = loadImage("../img/schnur/schnur-7.png");

  // test1 = loadImage('../img/testtst.png');
  // test2 = loadImage('../img/testtest.png');

  //  A N I M A T I O N S
  //Player:
  player1 = createSprite(400,1500);

  player1.addAnimation('player_1_jump_animate', '../img/player/Player-SW-Jump-1.png','../img/player/Player-SW-Jump-11.png');
  player1.addAnimation('player_1_ground_animate','../img/player/Player-SW-Ground-1.png','../img/player/Player-SW-Ground-11.png');
  player1.addAnimation('player_1_mask_jump_animate','../img/player/Player-SW-Maske-Ground-1.png','../img/player/Player-SW-Maske-Ground-11.png');
  player1.addAnimation('player_1_mask_ground_animate','../img/player/Player-SW-Maske-Jump-1.png','../img/player/Player-SW-Maske-Jump-11.png');

  player1.addAnimation('player_2_jump_animate','../img/player/Player-Ausgeblichen-Jump-1.png','../img/player/Player-Ausgeblichen-Jump-11.png');
  player1.addAnimation('player_2_ground_animate','../img/player/Player-Ausgeblichen-Ground-1.png','../img/player/Player-Ausgeblichen-Ground-11.png');
  player1.addAnimation('player_2_mask_jump_animate','../img/player/Player-Ausgeblichen-Maske-Jump-1.png','../img/player/Player-Ausgeblichen-Maske-Jump-11.png');
  player1.addAnimation('player_2_mask_ground_animate','../img/player/Player-Ausgeblichen-Maske-Ground-1.png','../img/player/Player-Ausgeblichen-Maske-Ground-11.png');

  player1.addAnimation('player_3_jump_animate','../img/player/Player-Bunt-Jump-1.png','../img/player/Player-Bunt-Jump-11.png');
  player1.addAnimation('player_3_ground_animate','../img/player/Player-Bunt-Ground-1.png','../img/player/Player-Bunt-Ground-11.png');
  player1.addAnimation('player_3_mask_jump_animate','../img/player/Player-Bunt-Maske-Jump-1.png','../img/player/Player-Bunt-Maske-Jump-11.png');
  player1.addAnimation('player_3_mask_ground_animate','../img/player/Player-Bunt-Maske-Ground-1.png','../img/player/Player-Bunt-Maske-Ground-11.png');

  player1.addAnimation('player_4_jump_animate','../img/player/Player-Halb-Jump-1.png','../img/player/Player-Halb-Jump-11.png');
  player1.addAnimation('player_4_ground_animate','../img/player/Player-Halb-Ground-1.png','../img/player/Player-Halb-Ground-11.png');
  player1.addAnimation('player_4_mask_jump_animate','../img/player/Player-Halb-Maske-Jump-1.png','../img/player/Player-Halb-Maske-Jump-11.png');
  player1.addAnimation('player_4_mask_ground_animate','../img/player/Player-Halb-Maske-Ground-1.png','../img/player/Player-Halb-Maske-Ground-11.png');

  player1.addAnimation('player_5_jump_animate','../img/player/Player-Detail-Jump-1.png','../img/player/Player-Detail-Jump-11.png');
  player1.addAnimation('player_5_ground_animate','../img/player/Player-Detail-Ground-1.png','../img/player/Player-Detail-Ground-11.png');
  player1.addAnimation('player_5_mask_jump_animate','../img/player/Player-Detail-Maske-Jump-1.png','../img/player/Player-Detail-Maske-Jump-11.png');
  player1.addAnimation('player_5_mask_ground_animate','../img/player/Player-Detail-Maske-Ground-1.png','../img/player/Player-Detail-Maske-Ground-11.png');
  



  //Distancing

  distancing_1_img = loadImage('../img/Distancing/Distancing-SW-2.png');
  distancing_2_col1_img = loadImage('../img/Distancing/Distancing-Ausgeblichen-ColorA-2.png');
  distancing_2_col2_img = loadImage('../img/Distancing/Distancing-Ausgeblichen-ColorB-2.png');
  distancing_2_col3_img = loadImage('../img/Distancing/Distancing-Ausgeblichen-ColorC-2.png');
  distancing_3_col1_img = loadImage('../img/Distancing/Distancing-Bunt-ColorA-2.png');
  distancing_3_col3_img = loadImage('../img/Distancing/Distancing-Bunt-ColorB-2.png');
  distancing_3_col3_img = loadImage('../img/Distancing/Distancing-Bunt-ColorC-2.png');
  distancing_4_col1_img = loadImage('../img/Distancing/Distancing-Halb-ColorA-2.png');
  distancing_4_col2_img = loadImage('../img/Distancing/Distancing-Halb-ColorB-2.png');
  distancing_4_col3_img = loadImage('../img/Distancing/Distancing-Halb-ColorC-2.png');
  distancing_5_col1_img = loadImage('../img/Distancing/Distancing-Detail-ColorA-2.png');
  distancing_5_col2_img = loadImage('../img/Distancing/Distancing-Detail-ColorB-2.png');
  distancing_5_col3_img = loadImage('../img/Distancing/Distancing-Detail-ColorC-2.png');

  //playerAnimation = loadAnimation('../img/Detailbubble-1.png','../img/Detailbubble-11.png');
  //distancingAnimation = loadAnimation('../img/Distancing/DistancingDetail-1.png','../img/Distancing/DistancingDetail-7.png');
  //singlePeopleAnimation = loadAnimation('../img/SingleContact-1.png','../img/SingleContact-10.png');
}

/*
//ANIMATIONS:
[fertig gemalt] [eingepflegt]
- Player (Maße: 199 x 322 px)
  - [] [] Detailed mask
  - [] [] Detailed
  - [] [] halb Detailed mask
  - [] [] halb Detailed
  - [] [] bunt mask
  - [] [] bunt 
  - [] [] azsgeblichen mask
  - [] [] ausgeblichen 
  - [] [] S/W mask
  - [] [] S/W 
- Distancing (Maße: 44 x 34 px)
  - [] [] detailed Color1
  - [] [] detailed Color2
  - [] [] detailed Color3
  - [] [] bunt Color1
  - [] [] bunt Color2
  - [] [] bunt Color3
  - [] [] S/W Color1
  - [] [] S/W Color2
  - [] [] S/W Color3
- Single Contact (Maße: 133 x 178 px) TESTEN
  - [] [] detailed R Color1
  - [] [] detailed R Color2
  - [] [] detailed R Color3
  - [] [] detailed L Color1
  - [] [] detailed L Color2
  - [] [] detailed L Color3
  - [] [] bunt R Color1
  - [] [] bunt R Color2
  - [] [] bunt R Color3
  - [] [] bunt L Color1
  - [] [] bunt L Color2
  - [] [] bunt L Color3
  - [] [] S/W R Color1
  - [] [] S/W R Color2
  - [] [] S/W R Color3
  - [] [] S/W L Color1
  - [] [] S/W L Color2
  - [] [] S/W L Color3
- BG
  - [] [] detailed
  - [] [] halb
  - [] [] bunt
  - [] [] ausgeblichen
  - [] [] S/W


*/

/* ----------- S E T  U P ------------- */


function setup() {

  createCanvas(windowWidth, windowHeight);


  // B A C K G R O U N D

  
  bg_back = createSprite(0, SCENE_H/2, SCENE_W+300, SCENE_H); //Hintergrund, der sich anders bewegt (muss ein größeres Bild sein)
  //bg_middle = createSprite(0, SCENE_H/2, SCENE_W+300, SCENE_H); //Vrdergrund 
  bg = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H); //Vrdergrund 
  bg_clouds1 = createSprite(SCENE_W/2, SCENE_H/2, SCENE_W, SCENE_H);
  bg_clouds2 = createSprite(-SCENE_W/2, SCENE_H/2, SCENE_W, SCENE_H);

  //bg_back.addImage(bgImg8);
  //bg_middle.addImage(middleCity);
  bg_clouds1.addImage(clouds1);
  bg_clouds2.addImage(clouds1);
  
  // hier müssen die transparenzen auferufen werden, weil es in draw zu lange laden muss
  // Tipp: https://forum.processing.org/two/discussion/19438/image-transparency-alpha-via-tint-is-very-slow
  // const pg = createGraphics(bgImg1.width, bgImg1.height);
  // pg.tint(0, 153, 204, 126);
  // pg.image(bgImg1, 0,0);
  // transp = pg.get();




  // C O L L I D E R S

  // GROUNDS
  //creating sprites for grounds //ACHTING sprites haben ankerpunkt in der Mitte
  ground = createSprite(0,SCENE_H,SCENE_W,250);
  ground.visible = false;
  middleGround = createSprite(0,(SCENE_H/3)*2,SCENE_W,60);
  middleGround.visible = false;
  leftEdgeCollider = createSprite((-(SCENE_W/2)-200),(SCENE_H/2),100,SCENE_H); //für singleContact
  leftEdgeCollider.visible = false;
  rightEdgeCollider = createSprite(SCENE_W/2+200,(SCENE_H/2),100,SCENE_H); //für singleCotact
  rightEdgeCollider.visible = false;

  //Bildschirm 
  podest1 = createSprite(-400, 1300, 1200, 30);
  podest1.visible = false;

  // FLYING AND GRAVITY AREA 
  flyingArea = createSprite(0,(SCENE_H/6),SCENE_W,SCENE_H/3);
  flyingArea.visible = false;
  middleArea = createSprite(0,SCENE_H/2,SCENE_W,SCENE_H/3);
  middleArea.visible = false;
  gravityArea = createSprite(0,(SCENE_H)-(SCENE_H/3),SCENE_W,SCENE_H/1.5);
  gravityArea.visible = false;

  // STAIRS
  stairs_1 = new Group();
  for (let i = 0; i < (jumpHeight*3); i+=jumpHeight/1.5){
    let stairHeight = 30;
    let stair = createSprite(-(SCENE_W/4)-i,(SCENE_H/3)+i, 300, stairHeight);
    stair.setCollider("rectangle", 0, -(stairHeight/2)+1, 250, 0); //making the collider only on top of stair, so player can still jump an walk infront of it 
    stair.visible = false;
    stairs_1.add(stair);
  }
  for (let i = 0; i < (jumpHeight); i+=jumpHeight/3){
    let stairHeight = 30;
    let stairWidth = 150;
    let stair = createSprite((SCENE_W/5)+(1.5*i),((SCENE_H/3)*1.6)+i,stairWidth,stairHeight);
    stair.setCollider("rectangle",0,-(stairHeight/2)+1,stairWidth-10,0);
    stair.visible = false;
    stairs_1.add(stair);
  }
  for (let i = 0; i < (jumpHeight); i+=jumpHeight/3){
    let stairHeight = 30;
    let stairWidth = 150;
    let stair = createSprite((SCENE_W/5)+(1.5*i),((SCENE_H/3)*2.57)+(i*0.8),stairWidth,stairHeight);
    stair.setCollider("rectangle",0,-(stairHeight/2)+1,stairWidth-10,0);
    stair.visible = false;
    stairs_1.add(stair);
  }

  //TELEPORT
  teleportArea = createSprite(EDGE_R-(SCENE_W/4),EDGE_D-(SCENE_H*0.55),teleportColliderSize,teleportColliderSize);
  teleportArea.setCollider("circle", 0,0,50,50);
  teleportArea1 = createSprite(EDGE_R-(SCENE_W/4),EDGE_D-(SCENE_H*0.2),teleportColliderSize,teleportColliderSize);
  teleportArea1.setCollider("circle", 0,0,50,50);
  teleportArea.visible = false;
  teleportArea1.visible = false;


  //creating black boxes around Scene, so player doesnt see objects leaving Scene
  let blackbox_L, blackbox_R, blackbox_U, blackbox_D;
  blackbox_L = createSprite(-SCENE_W/2-500,SCENE_H/2,1000,5000);
  blackbox_R = createSprite(SCENE_W/2+500,SCENE_H/2,1000,5000);
  blackbox_U = createSprite(0,-500,6000,1000);
  blackbox_D = createSprite(0,SCENE_H+500,6000,1000);
  blackbox_L.shapeColor = color(0,0,0);
  blackbox_R.shapeColor = color(0,0,0);
  blackbox_U.shapeColor = color(0,0,0);
  blackbox_D.shapeColor = color(0,0,0);


// I N T E R A C T I O N S

  //MASK 
  maskPosition = createSprite(400,1400,211,541);
  //maskPosition.addAnimation('schnur-maske', '..img/schnur/schnur-maske-1.png', '..img/schnur-maske-12.png');
  //maskPosition.addAnimation('schnur-maske', '..img/schnur/schnur-1.png', '..img/schnur-12.png');
  maskPosition.addImage(schnur_Mask_img);
  
  maskPosition.setCollider("rectangle",0,150,100,200);
  invisibleGroundCheck = createSprite(0,(SCENE_H/3)*2,SCENE_W,60);  
  invisibleGroundCheck.visible = false;//for collision with middleGround for maskCheck

  //HYGIENE
  hygieneArea = createSprite(movingHygieneB-(SCENE_W/12),SCENE_H/2,(SCENE_W/6),SCENE_H);
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
  
    s1 = createSprite(random(SCENE_W)-(SCENE_W/2),heightSinglePerson,200,100);
    s1.friction = random(0.001, 0.05);
    s1.maxSpeed = 12;
    //ANIMARE
    s1.addAnimation('singleContact_1_R_animate', '../img/SingleContact/SingleContact-SW-R-1.png','../img/SingleContact/SingleContact-SW-R-10.png');
    s1.addAnimation('singleContact_2_R_animate', '../img/SingleContact/SingleContact-Verblichen-R-1.png','../img/SingleContact/SingleContact-Verblichen-R-10.png');
    s1.addAnimation('singleContact_3_R_animate', '../img/SingleContact/SingleContact-Bunt-R-1.png','../img/SingleContact/SingleContact-Bunt-R-10.png');
    s1.addAnimation('singleContact_4_R_animate', '../img/SingleContact/SingleContact-Halb-R-1.png','../img/SingleContact/SingleContact-Halb-R-10.png');
    s1.addAnimation('singleContact_5_R_animate', '../img/SingleContact/SingleContact-Detail-R-1.png','../img/SingleContact/SingleContact-Detail-R-10.png');
    singlepeople.add(s1);

    s2 = createSprite(random(SCENE_W)-(SCENE_W/2),heightSinglePerson,200,100);
    s2.friction = random(0.001, 0.03);
    s2.maxSpeed = 12;
    s2.addAnimation('singleContact_1_L_animate', '../img/SingleContact/SingleContact-SW-L-1.png','../img/SingleContact/SingleContact-SW-L-10.png');
    s2.addAnimation('singleContact_2_L_animate', '../img/SingleContact/SingleContact-Verblichen-L-1.png','../img/SingleContact/SingleContact-Verblichen-L-10.png');
    s2.addAnimation('singleContact_3_L_animate', '../img/SingleContact/SingleContact-Bunt-L-1.png','../img/SingleContact/SingleContact-Bunt-L-10.png');
    s2.addAnimation('singleContact_4_L_animate', '../img/SingleContact/SingleContact-Halb-L-1.png','../img/SingleContact/SingleContact-Halb-L-10.png');
    s2.addAnimation('singleContact_5_L_animate', '../img/SingleContact/SingleContact-Detail-L-1.png','../img/SingleContact/SingleContact-Detail-L-10.png');
    singlepeople2.add(s2);
  


  //DISTANCING
  //making the swarm and attraction points
  for (let i = 0; i < total_number_of_groups; i++){
    distancing_groups[i] = new Group();
    att_points[i] = new Attraction_points(random(-SCENE_W/2, SCENE_W/2), random(SCENE_H/3), random(-2,2), random(-2,2));
    createSwarm(distancing_groups[i], att_points[i].positionX, att_points[i].positionY);
  }

  
  
  zoomScreenMiddle = createGraphics(1200,480);
  zoomScreenGround = createGraphics(125,125);
  zoomScreenGroundBig = createGraphics(800,425);
  
// P L A Y E R 

  //Player zum Schluss, damit er immer vorne ist
  // player1 = createSprite(400,1500);
  // player1.addAnimation('player_1_ground_animate','../img/player/Player-SW-Ground-1.png','../img/player/Player-SW-Ground-11.png');
  // player1.addAnimation('player_2_ground_animate','../img/player/Player-Ausgeblichen-Ground-1.png','../img/player/Player-Ausgeblichen-Ground-11.png');
  // player1.addAnimation('player_3_ground_animate','../img/player/Player-Bunt-Ground-1.png','../img/player/Player-Bunt-Ground-11.png');
  // player1.addAnimation('player_4_ground_animate','../img/player/Player-Halb-Ground-1.png','../img/player/Player-Halb-Ground-11.png');
  // player1.addAnimation('player_5_ground_animate','../img/player/Player-Detail-Ground-1.png','../img/player/Player-Detail-Ground-11.png');
  //ANIMARE
  //player1.addAnimation('playerAnimation', '../img/Detailbubble-1.png','../img/Detailbubble-11.png');
  
  //ADD ALL PLAYER ANIMATIONS FITST HERE
  //player1.addAnimation('playerAnimation', '../img/Detailbubble-1.png','../img/Detailbubble-11.png');
  player1.setCollider("rectangle",0,50,65,115);


} // end Set up


// PAUSE FUNCTION
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
  if(mouseX > windowWidth - windowWidth/10 && mouseY < 20 + windowWidth/15){
    running = !running; // flip the boolean
    fill('rgba(0,0,0,0.9)');
    rect(0,0,SCENE_W,SCENE_H);
    fill(255);
    textAlign(CENTER);
    textSize(windowHeight/10);
    text("Erklärung", windowWidth/2, windowHeight/2);
  }
 
}


/* ----------------- D R A W ------------------- */ 

function draw() {

if (running){//if game is not on pause

  

  //----- B G  A N D  C A M E R A ------
  background(0); //BG outside of frame 
 

 

  // B A C K G R O U N D S 
  //based on collectiveScore
  push();
  
  //ANIMARE
  //ICKB
  if (collectiveScore < 20){ 
    bg_back.addImage(bg_hinten_1);
    bg.addImage(bg_vorne_1);
    s1.changeAnimation('singleContact_1_R_animate');
    s2.changeAnimation('singleContact_1_L_animate');
  }else if (collectiveScore > 20 && collectiveScore < 40){
    bg_back.addImage(bg_hinten_2);
    bg.addImage(bg_vorne_2);
    s1.changeAnimation('singleContact_2_R_animate');
    s2.changeAnimation('singleContact_2_L_animate');
  }else if (collectiveScore > 40 && collectiveScore < 60){
    bg_back.addImage(bg_hinten_3);
    bg.addImage(bg_vorne_3);
    s1.changeAnimation('singleContact_3_R_animate');
    s2.changeAnimation('singleContact_3_L_animate');
  } else if (collectiveScore > 60 && collectiveScore < 80){
    bg_back.addImage(bg_hinten_4);
    bg.addImage(bg_vorne_4);
    s1.changeAnimation('singleContact_4_R_animate');
    s2.changeAnimation('singleContact_4_L_animate');
  }else if(collectiveScore > 80 && collectiveScore < 100){
    bg_back.addImage(bg_hinten_5);
    bg.addImage(bg_vorne_5);
    s1.changeAnimation('singleContact_5_R_animate');
    s2.changeAnimation('singleContact_5_L_animate');
   
  }

  if(individualScore < 20){
    if(maskOn && playerGroundCheck){
      player1.changeAnimation('player_1_mask_jump_animate');
    }else if(maskOn && !isJumping){
      player1.changeAnimation('player_1_mask_ground_animate');
    }else if(!maskOn && isJumping){
      player1.changeAnimation('player_1_jump_animate');
    }else if(!maskOn && !isJumping){
      player1.changeAnimation('player_1_ground_animate');
    }
  }else if(individualScore > 20 && individualScore < 40){
    if(maskOn && isJumping){
      player1.changeAnimation('player_2_mask_jump_animate');
    }else if(maskOn && !isJumping){
      player1.changeAnimation('player_2_mask_ground_animate');
    }else if(!maskOn && isJumping){
      player1.changeAnimation('player_2_jump_animate');
    }else if(!maskOn && !isJumping){
      player1.changeAnimation('player_2_ground_animate');
    }
  }else if(individualScore > 40 && individualScore < 60){
    if(maskOn && isJumping){
      player1.changeAnimation('player_3_mask_jump_animate');
    }else if(maskOn && !isJumping){
      player1.changeAnimation('player_3_mask_ground_animate');
    }else if(!maskOn && isJumping){
      player1.changeAnimation('player_3_jump_animate');
    }else if(!maskOn && !isJumping){
      player1.changeAnimation('player_3_ground_animate');
    }
  }else if(individualScore > 60 && individualScore < 80){
    if(maskOn && isJumping){
      player1.changeAnimation('player_4_mask_jump_animate');
    }else if(maskOn && !isJumping){
      player1.changeAnimation('player_4_mask_ground_animate');
    }else if(!maskOn && isJumping){
      player1.changeAnimation('player_4_jump_animate');
    }else if(!maskOn && !isJumping){
      player1.changeAnimation('player_4_ground_animate');
    }
  }else if(individualScore > 80){
    if(maskOn && isJumping){
      player1.changeAnimation('player_5_mask_jump_animate');
    }else if(maskOn && !isJumping){
      player1.changeAnimation('player_5_mask_ground_animate');
    }else if(!maskOn && isJumping){
      player1.changeAnimation('player_5_jump_animate');
    }else if(!maskOn && !isJumping){
      player1.changeAnimation('player_5_ground_animate');
    }
  }


  if(maskOn){
    maskPosition.addImage(schnur_img);
  }else{
    maskPosition.addImage(schnur_Mask_img);
  }

  
  pop();

  // ADDING SOUNDS
  if(player1.overlap(middleArea) && !middleAreaSoundOn){
    middleAreaSoundOn = true;
    flyingAreaSoundOn = false;
    isolationAreaSoundOn = false;
    middleArea_sound.play();
    middleArea_sound.loop();
    middleArea_sound.setVolume(0.6);
    flyingArea_sound.stop();
    isolationArea_sound.stop();
  }else if(player1.overlap(flyingArea) && !flyingAreaSoundOn){
    middleAreaSoundOn = false;
    flyingAreaSoundOn = true;
    middleArea_sound.stop();
    flyingArea_sound.play();
    flyingArea_sound.loop();
    middleArea_sound.setVolume(0.6);
  }else if(player1.overlap(isolationArea) && !isolationAreaSoundOn){
    middleAreaSoundOn = false;
    isolationAreaSoundOn = true;
    middleArea_sound.stop();
    isolationArea_sound.play();
    isolationArea_sound.loop();
    isolationArea_sound.setVolume(0.6);
  }

  if(player1.overlap(hygieneArea) && !hygieneAreaSoundOn){
    hygieneAreaSoundOn = true;
    hygiene_sound.play();
    isolationArea_sound.setVolume(0.6);
  }else if(player1.overlap(hygieneArea) === false){
    hygieneAreaSoundOn = false;
    hygiene_sound.stop();
  }

  if(player1.overlap(zoomArea) && !zoomAreaSoundOn){
    zoomAreaSoundOn = true;
    zoom_sound.play();
    zoom_sound.loop();
    zoom_sound.setVolume(0.2);
  }else if(player1.overlap(zoomArea) === false){
    zoom_sound.stop();
    zoomAreaSoundOn = false;
  }
  
  if(player1.overlap(teleportArea) && !teleportAreaSoundOn){
    teleportAreaSoundOn = true;
    teleport_sound.play();
  }else if(player1.overlap(teleportArea) === false){
    teleportAreaSoundOn = false;
  }
  if(player1.overlap(teleportArea1) && !teleportAreaSoundOn){
    teleportArea1SoundOn = true;
    teleport_sound.play();
  }else if(player1.overlap(teleportArea1) === false){
    teleportArea1SoundOn = false;
  }

  if(player1.overlap(maskPosition) && !maskSoundOn){
    mask_sound.play();
    maskSoundOn = true;
  }else if(player1.overlap(maskPosition) && !maskSoundOn){
    mask_sound.play();
    maskSoundOn = true;
  }else if(player1.overlap(maskPosition)=== false){
    maskSoundOn = false;
  }

  // if(player1.overlap(singlepeople2) && !singleContactSoundOn){
  //   singleContact_sound.play();
  //   singleContactSoundOn = true;
  //   console.log('HEJSKUDHSKJBKA')
  // }else if(player1.overlap(singlepeople2) === false){
  //   singleContactSoundOn = false;
  // }
  // if(player1.overlap(singlepeople) && !singleContactSoundOn){
  //   singleContact_sound.play();
  //   singleContactSoundOn = true;
  // }else if(player1.overlap(singlepeople) === false){
  //   singleContactSoundOn = false;
  // }

  // if(player1.overlap(distancing_group)){

  // }



  //back - background mapped to playermovement 
  for(let i = -1910 ; i < player1.position.x; i++){
    bg_back.position.x = -(i/10);
    //bg_middle.position.x = -(i/20);

  }

  //lässt Wolken wieder bei 0 starteb, nachdem sie aus dem Bild sind
  if(bg_clouds1.position.x < -SCENE_W-50){
    bg_clouds1.position.x = SCENE_W+50; 
  }
  if(bg_clouds2.position.x < -SCENE_W-50){
    bg_clouds2.position.x = SCENE_W+50; 
  } 
  bg_clouds1.position.x += -0.5;
  bg_clouds2.position.x += -0.5;


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


  
  //zoom changing on Button zoom
  if(mouseX > 40 + windowWidth/10 && mouseX < 40 + windowWidth/5 && mouseY > windowHeight - (windowHeight/10) && mouseY < windowHeight - (windowHeight/20)) { 
    zoomInOut();
  } 

  //NOCHMAL PRÜFEN  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  if(player1.overlap(gravityArea)){
    player1.rotation = 0;
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
  invisibleGroundCheck.debug = mouseIsPressed;
  stairs_1.debug = mouseIsPressed;
  player1.debug = mouseIsPressed;
  teleportArea.debug = mouseIsPressed;
  teleportArea1.debug = mouseIsPressed;
  
 


  // ALLLES WAS DANACH KOMMT WIRD GEHÖRT NICHT IN DIE WELT
 drawSprites();  
  

  

  // SCREENS DIE ANIMATIONEN MACHEN IN ZOOM BEREICHEN
  let att_animation_middle = map(player1.position.x, -1060, 140, 600, 1800);
  let att_animation_ground = map(player1.position.x, -840, -100, 600, 1000);


  graphicsScreen(zoomScreenMiddle, -1080, SCENE_H/2-100, att_animation_middle, 480, 200, 250, 0, 50);
  graphicsScreen(zoomScreenGroundBig, -870, 2215, att_animation_ground, 425, 0, 0, 100, 150);



  for(let i = 0; i<301; i += 150){
    for(let y = 0; y < 1000; y += 980){
      graphicsScreen(zoomScreenGround, -1015+y, 2215+i, 125, 125,0, 0, 100, 150);
    }
  }

  
 
  // damit der Player vor den Screens bleibt (es muss noch die einzelnen Distancing Personen hinzugefügt werden)
  
  drawSprites(singlepeople);
  drawSprites(singlepeople2);
  drawSprite(player1);

  // ---------- A D D I N G --- I N T E R A C T I O N S -----------
  
  teleporting();
  maskOnOff();
  movingHygieneArea();
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


  //debugging
  // textSize(40);
  // text(individualScore, 0, 100);
  // text(collectiveScore, 0, 200);

  push();

  // DISPLAYING SCORES 

  let r = 10; //radius Scores
  const widthScoreDisplay = windowWidth/5;
  const heightScoreDisplay = windowHeight/14;

  // mapping für die Farbe und Länge der Balken in den Scores
  let m = map(individualScore, 0, 100, 20, widthScoreDisplay);
  let c1 = map(individualScore, 0, 100, 250, 0);
  let c2 = map(individualScore, 0, 100, 0, 200);
  let c3 = map(individualScore,0, 100, 100, 150);

  let m2 = map(collectiveScore, 0, 100, 20, widthScoreDisplay);
  let c4 = map(collectiveScore, 0, 100, 230, 0);
  let c5 = map(collectiveScore, 0, 100, 0, 200);
  let c6 = map(collectiveScore,0, 100, 100, 150);


  // inneres
  noStroke();
  fill(c1,c2,c3);
  rect(20,20, m, heightScoreDisplay, r); //individual 
  fill(c4,c5,c6);
  rect(20,40 + heightScoreDisplay, m2, heightScoreDisplay, r); //collective

  //äußeres
  stroke(fbS_I_r, fbS_I_g, fbS_I_b);
  strokeWeight(4);
  noFill();
  rect(20,20, widthScoreDisplay, heightScoreDisplay, r); //individual
  strokeWeight(1.5);
  line(20+(widthScoreDisplay*0.9),20, 20+(widthScoreDisplay*0.9),20+heightScoreDisplay);
  line(20+(widthScoreDisplay*0.1),20, 20+(widthScoreDisplay*0.1),20+heightScoreDisplay);

  strokeWeight(4);
  stroke(fbS_C_r, fbS_C_g, fbS_C_b);
  rect(20, 40 + heightScoreDisplay, widthScoreDisplay, heightScoreDisplay,r ); //collective
  strokeWeight(1.5);
  line(20+(widthScoreDisplay*0.1),40 + heightScoreDisplay, 20+(widthScoreDisplay*0.1),40 + (heightScoreDisplay*2));
  line(20+(widthScoreDisplay*0.9),40 + heightScoreDisplay, 20+(widthScoreDisplay*0.9),40 + (heightScoreDisplay*2));


  //text
  noStroke();
  fill(fbS_I_r, fbS_I_g, fbS_I_b);
  textAlign(CENTER);
  textSize(windowHeight/40);
  text("Individual", 20 + windowWidth/10, 20+(heightScoreDisplay/2)+(windowHeight/120));

  fill(fbS_C_r, fbS_C_g, fbS_C_b);
  text("Collective", 20 + windowWidth/10, 40+(heightScoreDisplay*1.5)+(windowHeight/120));



  // INFORMATION ABOUT AREA
  textSize(windowHeight/40);
  fill(255);
  text(updateUserInfo, windowWidth/2, 20+(heightScoreDisplay/2)+(windowHeight/120));
  if(maskOn){
    updateUserInfo='You are wearing a mask';
  }else{
    updateUserInfo='You are not wearing a mask';
  }
  
  if(touchedPerson){
    updateUserInfo='You met somebody';
  }else if(player1.overlap(hygieneArea)){
    updateUserInfo='You are desinfected';
  }else if(touchedGroup){
    updateUserInfo='You met a group of people';
  }else if(player1.overlap(zoomArea)){
    updateUserInfo='You are using digital media';
  }else if(player1.overlap(flyingArea)){
    updateUserInfo='Feel free to fly';
  }else if(player1.overlap(isolationArea)){
    updateUserInfo='You entered your home';
  }


  // BUTTONS

  //Shadows Buttons
  push();
    translate(3, 3);
    noStroke();
    fill('rgba(0,0,0,0.5)');
    rect(20 ,windowHeight - (windowHeight/10), windowWidth/10, windowHeight/20, 20);
    rect(40 + windowWidth/10 ,windowHeight - (windowHeight/10), windowWidth/10, windowHeight/20, 20);
    rect(windowWidth - windowWidth/20 - 20 ,windowHeight - (windowHeight/10), windowWidth/20, windowHeight/20, 20);
    ellipse(windowWidth - windowWidth/20, 20 + windowWidth/35, windowWidth/20);
  pop();


  //Buttons
  fill(255);
  noStroke();
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

  if (individualScore < 10 && collectiveScore > 90){
    running = !running;
    fill(0,0,200);
    rect(0, 0, windowWidth, windowHeight);
  }
  if (individualScore > 90 && collectiveScore < 10){
    running = !running;
    fill(0,0,200);
    rect(0, 0, windowWidth, windowHeight);
  }
  if (individualScore < 10 && collectiveScore < 10){
    running = !running;
    fill(0,0,200);
    rect(0, 0, windowWidth, windowHeight);
  }
  if (individualScore > 90 && collectiveScore > 90){
    running = !running;
    fill(0,0,200);
    rect(0, 0, windowWidth, windowHeight);
  }

  



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
      player1.rotation = -5;
    }
    if (keyIsDown(LEFT_ARROW) && player1.position.x >= (-(SCENE_W/2))+100) {
      player1.position.x -= 10;
      player1.rotation = 5;
    }
    
    //how to make player facing right direction // different animations?
    //MAYBE DOING THIS BUT WITH ATTRACTION POINT LIKE TO THE RIGHT wie: attractionPoint.x = player1.position.x + 2
    //if (player1.overlap(flyingArea)){
    //  player1.rotateToDirection = true;
    //}



    //JUMPING
    player1.velocity.y += gravity; 
    if(player1.collide(ground) || player1.collide(middleGround) || player1.collide(stairs_1) || player1.collide(podest1)) {
      player1.velocity.y = 0;
      //isJumping = false;
    }else{
      isJumping = true;
    }
    if(player1.position.y >= SCENE_H){
      player1.velocity.y = 0;
    }//stop player from falling


    //wenn space, innerhalb gravity area und gerade am Boden war, dann jumpen
    if(keyWentDown(' ') && playerGroundCheck && player1.overlap(gravityArea))
    {
      jump_sound.play();
      player1.velocity.y = -jump;
      playerGroundCheck = false;
    }
    // if(keyWentDown(' ')){
    //   isJumping = true;
    // }

    //GROUND CHECK
    //wenn player boden berührt hat, dann ist der Ground check true
    if(player1.overlap(middleGround) || player1.overlap(ground)){
      playerGroundCheck = true;
      isJumping = false;
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
  isJumping = true;


  if (keyIsDown(RIGHT_ARROW) && player1.position.x <= (SCENE_W/2)-100) {
    player1.position.x += 7;
    if(player1.rotation <= 90 && player1.rotation >= 0){
      player1.rotation += 3.5;
    }else if(player1.rotation <= 0 && player1.rotation > -90){
      player1.rotation += 3.5;
    }else if(player1.rotation >= 90 && player1.rotation < 180){
      player1.rotation -= 3.5;
    }else if(player1.rotation <= -90 && player1.rotation > -180){
      player1.rotation -= 3.5;
      if(player1.rotation <= -180){player1.rotation = 179}
    }
  }
  if (keyIsDown(LEFT_ARROW) && player1.position.x >= (-(SCENE_W/2))+100) {
    player1.position.x -= 7;
    if(player1.rotation <= 90 && player1.rotation >= 0){
      player1.rotation -= 3.5;
    }else if(player1.rotation <= 0 && player1.rotation > -90){
      player1.rotation -= 3.5;
    }else if(player1.rotation <= -90 && player1.rotation > -180){
      player1.rotation += 3.5;
    }else if(player1.rotation >= 90 && player1.rotation < 180){
      player1.rotation += 3.5;
      if(player1.rotation >= 180){player1.rotation = -179}
    }
    
  }
  if (keyIsDown(UP_ARROW) && player1.position.y > 50) {
    player1.position.y -= 7;
    if(player1.rotation < 180 && player1.rotation > 0){
      player1.rotation -= 2.6;
    }else if(player1.rotation > -180 && player1.rotation < 0){
      player1.rotation += 2.6;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    player1.position.y += 7;
    if(player1.rotation < 180 && player1.rotation > 0){
      player1.rotation += 2.6;
    }else if(player1.rotation > -180 && player1.rotation < 0){
      player1.rotation -= 2.6;
    }
  }

}

// ---- TELEPORTING ----
function teleporting(){
  if (player1.overlap(teleportArea)){
    player1.position.y = EDGE_D - 100;
    camera.position.y = player1.position.y - (windowHeight/2);
  }else if (player1.overlap(teleportArea1)){
    player1.position.y = ((SCENE_H/3)*1.8);
  }
}



// SCORE FEEDBACK
function feedbackUpScoreI(){
  //maskFback = createSprite(20,20, windowWidth/5, (windowWidth/5)/4);
  // Add Animation
  //setTimeout(function(){maskFback.remove()}, 500);
  fbS_I_g = 200;
  fbS_I_b = 150;
  setTimeout(function(){fbS_I_g = 255; fbS_I_b = 255;}, 500);
}

function feedbackDownScoreI(){
  fbS_I_r = 220;
  fbS_I_b = 60;
  setTimeout(function(){fbS_I_r = 255; fbS_I_b = 255;}, 500);
}
function feedbackUpScoreC(){
  fbS_C_g = 200;
  fbS_C_b = 150;
  setTimeout(function(){fbS_C_g = 255; fbS_C_b = 255;}, 500);
}
function feedbackDownScoreC(){
  fbS_C_r = 220;
  fbS_C_b = 60;
  setTimeout(function(){fbS_C_r = 255; fbS_C_b = 255;}, 500);
}



// ---- MASK ----

let maskOnInterval, maskOffInterval;
  function setMaskOnInterval (){
  // if( maskOnInterval !== null){return}
     maskOnInterval = setInterval(function(){
      // SCORE CHANGE WHILE MASK IS ON
      collectiveScore += 0.1;
      individualScore -= 0.1;
    },500);//every 1000 milliseconds
  }
  function setMaskOffInterval (){
    //if( maskOffInterval !== null){return}
    maskOffInterval = setInterval(function(){
      // SCORE CHANGE WHILE MASK IS OFF
      individualScore += 0.1; 
      collectiveScore -= 0.1;
    },500);//every 1000 milliseconds
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
    //player1.addImage(playerMaskImg);
    console.log('OVERLAP');
    feedbackUpScoreC();
    feedbackDownScoreI();
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
    //player1.addImage(playerImg);
    console.log('OVERLAP');
    feedbackUpScoreI();
    feedbackDownScoreC();
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

function movingHygieneArea(){
   //rain
  for (let i = 0; i < 1000; i++){
    rain[i] = new Rain (random(movingHygieneA,movingHygieneB), random (0,SCENE_H), random(15,50));
  }


  //smallest for random in rain
  if (movingHygieneA >= SCENE_W/2){
    hDir = -1;
  }else if (movingHygieneA <= -SCENE_W/2){
    hDir = 1;
  }
  movingHygieneA += hDir;
  hygieneArea.position.x += hDir;

  //highest for random in rain
  if (movingHygieneB >= SCENE_W/2){
    hDir2 = -1;
  }else if (movingHygieneB <= -SCENE_W/2){
    hDir2 = 1;
  }
  movingHygieneB += hDir;
  
}

function hygieneScore() {
  if(clean >= 10){ clean = 10; }else if(clean <= 1){clean = 1;}
  
  if (player1.overlap(hygieneArea) && boostHygine === false){
      clean = 1;
      boostHygine = true;
      feedbackUpScoreC();
      feedbackDownScoreI();
      collectiveScore += 20;
      individualScore -= 10;
  }else if (player1.overlap(hygieneArea) === false && boostHygine && !hasStartedTimeoutH){
      hygieneBoostIntervall = setTimeout(function(){boostHygine = false; hasStartedTimeoutH = false;}, 20000); //wenn in der letzten Sekunde ein boost war
      hasStartedTimeoutH = true;
    }
  
  
  //clean

  if(player1.overlap(hygieneArea) === false){
    //clean *= 1.001; // wie schnell der Wert zurück au 10 fällt 
    //collectiveScore -= clean * 0.001; // wie starken Impact clean auf den Score hat
  }

}

// ---- ZOOM ----
let boring = 10; //10 fun // 0 boring
let maxZoomC = 1;
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

      

      //10 = not boring, 1 = boring
      boring *= 0.999; //es wird immer langweiliger
      maxZoomC += 0.01; //maximale Zunahme des collective Werts für den Bereich

      if(maxZoomC < 20){
        collectiveScore += 0.01;
        feedbackUpScoreC();
      }else{
        collectiveScore += 0;
      }
      
      if(boring > 5){
        individualScore += boring * 0.001;
        feedbackUpScoreI();
      }else{
        individualScore += boring * -0.005;
        feedbackDownScoreI();
      }
  }else{
        
      boring *= 1.001; //lässt boring wieder hoch gehen
      maxZoomC -= 0.01; //lässt maxZoom wieder runter gehen
  }
  // console.log("boring" + boring);
  // console.log("maxZoom" + maxZoomC);
  
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
    feedbackDownScoreI();
    lonely *= 1.001;
    individualScore -= lonely * 0.001;
    collectiveScore += lonely * 0.001;
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
        singleContact_sound.play();
        setTimeout(function(){touchedPerson = false;},5000);
        feedbackUpScoreI();
        feedbackDownScoreC();
        individualScore += 5 ;
        collectiveScore -= 3;
      }
      
    
  }}


// ---- DISTANCING ----

//ICKBIN
// CREATING SWARM
function createSwarm(distancing_group, attraction_pointX, attraction_pointY){
  for (let e = 0; e < amount_of_characters; e++ ){
    distance1 = createSprite(random(-SCENE_W/2, SCENE_W/2), random(SCENE_H/3), 44, 34);
    distance1.shapeColor = color(random(0,200),20,random(0,200));

    let cntRandom = random(1);
    //ANIMARE 
    //hier die animationen dem Sprite hinzufügen und bei draw mit change animation ändern
    
    // distance1.addImage(distancing_1_img);
    // distance1.addImage(distancing_2_col1_img);
    // distance1.addImage(distancing_3_col1_img);
    // distance1.addImage(distancing_4_col1_img);
    // distance1.addImage(distancing_5_col1_img);

    //c1.addAnimation('distancing_1_animate', '../img/Distancing/Distancing-SW-1.png','../img/Distancing/Distancing-SW-7.png');
    
      

    // c1.addAnimation('distancing_2_col1_animate', '../img/Distancing/Distancing-Ausgeblichen-ColorA-1.png','../img/Distancing/Distancing-Ausgeblichen-ColorA-7.png');
    // c1.addAnimation('distancing_3_col1_animate', '../img/Distancing/Distancing-Bunt-ColorA-1.png','../img/Distancing/Distancing-Bunt-ColorA-7.png');
    // c1.addAnimation('distancing_4_col1_animate', '../img/Distancing/Distancing-Halb-ColorA-1.png','../img/Distancing/Distancing-Halb-ColorA-7.png');
    // c1.addAnimation('distancing_5_col1_animate', '../img/Distancing/Distancing-Detail-ColorA-1.png','../img/Distancing/Distancing-Detail-ColorA-7.png');   
    //  c1.addAnimation('distancing_2_col2_animate', '../img/Distancing/Distancing-Ausgeblichen-ColorB-1.png','../img/Distancing/Distancing-Ausgeblichen-ColorB-7.png');
    //  c1.addAnimation('distancing_3_col2_animate', '../img/Distancing/Distancing-Bunt-ColorB-1.png','../img/Distancing/Distancing-Bunt-ColorB-7.png'); 
    //  c1.addAnimation('distancing_4_col2_animate', '../img/Distancing/Distancing-Halb-ColorB-1.png','../img/Distancing/Distancing-Halb-ColorB-7.png');
    //  c1.addAnimation('distancing_5_col2_animate', '../img/Distancing/Distancing-Detail-ColorB-1.png','../img/Distancing/Distancing-Detail-ColorB-7.png'); 
    //  c1.addAnimation('distancing_2_col3_animate', '../img/Distancing/Distancing-Ausgeblichen-ColorC-1.png','../img/Distancing/Distancing-Ausgeblichen-ColorC-7.png'); 
    //  c1.addAnimation('distancing_3_col3_animate', '../img/Distancing/Distancing-Bunt-ColorC-1.png','../img/Distancing/Distancing-Bunt-ColorC-7.png');
    //  c1.addAnimation('distancing_4_col3_animate', '../img/Distancing/Distancing-Halb-ColorC-1.png','../img/Distancing/Distancing-Halb-ColorC-7.png');
    //  c1.addAnimation('distancing_5_col3_animate', '../img/Distancing/Distancing-Detail-ColorC-1.png','../img/Distancing/Distancing-Detail-ColorC-7.png');
    
    
  
    //c1.maxSpeed = 15;
    //camera.setSpeed = random(1,15);
    distance1.friction = random(0.07, 0.18);
    distance1.rotation = 180;
    distance1.rotateToDirection = true;
    distance1.attractionPoint(29, attraction_pointX, attraction_pointY);
    distancing_group.add(distance1);
  }
}

// SWARM FOLLOWS ATTRACTION POINT
let touchedGroup = false;
let hasStartedTimeoutS = false;
function swarmFollowAttraction(distancing_group, attraction_pointX, attraction_pointY){
  
  for (let i = 0; i < amount_of_characters; i++){
    distancing_group[i].attractionPoint(random(0.08, 0.2), attraction_pointX, attraction_pointY);
    distancing_group[i].setCollider("circle", 0, 0, 20);

    if(collectiveScore < 20){
      distancing_group[i].addImage(distancing_1_img);
    }else if(collectiveScore > 20 && collectiveScore < 40){
      distancing_group[i].addImage(distancing_2_col1_img);
    }else if(collectiveScore > 40 && collectiveScore < 60){
      distancing_group[i].addImage(distancing_3_col1_img); 
    }else if(collectiveScore > 60 && collectiveScore < 80){
      distancing_group[i].addImage(distancing_4_col1_img);
    }else if(collectiveScore > 80){
      distancing_group[i].addImage(distancing_5_col1_img); 
    }


    
    distancing_group.collide(distancing_group[i]);
  }

  if(player1.overlap(distancing_group) && touchedGroup === false){
    feedbackUpScoreI();
    feedbackDownScoreC();
    distancing_sound.play();
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



  function graphicsScreen(graphics, x, y, w, h, bg, r, g, b){


      graphics.background(bg);
      graphics.noFill();
      graphics.stroke(r,g,b);
      graphics.strokeWeight(5);
      graphics.rectMode(CENTER);

      if(move1 <= 500){
          for(let i = 0; i < 600; i+=50){
            graphics.rect(w/2,h/2,move1-i,move1-i); ////hier statt 250 die Hälfte von er graphics Größe
          }
          for(let i = 0; i < 500; i+=50){
          graphics.rect(w/2,h/2,move1+i,move1+i);
          }
      }else{
        move1 = 50;
      }
      
      move1 += 1;
      image(graphics, x, y);//Ort
  }





  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  //wenn irgendein key gedrückt wird add 0.01 für den movement dings
  //wenn key gedrückt +individual, -collective
  //wenn kein key gedrückt -individual, +collective 
  //so kann der wert durch nichts drücken nicht auf 0 sinken


  //test mit der Transparenz der Bilder, damit weniger geladen werden muss