// V A R I A B L E S


//Gameplay
let running = false;
let startingPage = true;
let explainPage = false;
let mouseClickCheck = true; // StartingPage
let ending_1 = false;
let ending_2 = false;
let ending_3 = false;
let ending_4 = false;


//player
let player1;

//player movement
let gravity = 1;
let jump = 20;
let jumpHeight = 300; // Für alle Dinge, auf die der Player springen muss
let playerGroundCheck = true;
let enteringFlyingArea = true;
let enteringGravityArea = false;

//Animation
let s1, s2, distance1;
let isJumping = true;

//Sound-Checks
let muted = false;
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

//Scores
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
let hDir = 1; // for hygiene
let hDir2 = 1; // for hygiene
let zoomScreenMiddle;
let zoomScreenGround;
let move1 = 5; // for zoom
let heightSinglePerson = (SCENE_H/5)*3.15; //SingleContact

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

  // S O U N D S
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
      middleArea_sound = loadSound('../audio/middleSoundMusic.mp3');
      
      
  // I C O N S
      sound_icon = loadImage('../img/icons/volume.svg');
      sound_hover_icon = loadImage('../img/icons/volume-hover.svg');
      play_icon = loadImage('../img/icons/play.svg');
      play_hover_icon = loadImage('../img/icons/play-hover.svg');
      pause_icon = loadImage('../img/icons/pause.svg');
      pause_hover_icon = loadImage('../img/icons/pause-hover.svg');
      zoom_icon = loadImage('../img/icons/zoom.svg');
      zoom_hover_icon = loadImage('../img/icons/zoom-hover.svg');
      arrow_up_icon = loadImage('../img/icons/arrow-up.svg');
      arrow_down_icon = loadImage('../img/icons/arrow-down.svg');


  // I M A G E S 
      //Startingpage
          docu_img = loadImage('../img/explain.png');
          docu_bg_img = loadImage('../img/docu_bg.png');
          docu_clouds_img = loadImage('../img/docu_clouds.png');

      //Environment
          clouds_1_img = loadImage("../img/clouds-1.png");
          clouds_2_img = loadImage("../img/clouds-2.png");
          clouds_3_img = loadImage("../img/clouds-3.png");
          clouds_4_img = loadImage("../img/clouds-4.png");
          clouds_5_img = loadImage("../img/clouds-5.png");

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

          lights_oben_img = loadImage("../img/lights-oben.png");
          lights_unten_img = loadImage("../img/lights-unten.png");
          lights_oben_2_img = loadImage("../img/lights-oben-2.png");
          lights_unten_2_img = loadImage("../img/lights-unten-2.png");


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

}// end Preload



/* ----------- S E T  U P ------------- */


function setup() {

  //C A N V A S 
      createCanvas(windowWidth, windowHeight);

  // D O C U // STARTING PAGE
      docu_clouds = createSprite(0,0,windowWidth,windowHeight);
      docu_clouds.addImage(docu_clouds_img);
      docu = createSprite(windowWidth/2,windowHeight/2,800,600);
      docu.addImage(docu_img);


  // B A C K G R O U N D
      bg_back = createSprite(0, SCENE_H/2, SCENE_W+300, SCENE_H); //Hintergrund, der sich anders bewegt (muss ein größeres Bild sein)
      bg = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H); //Vrdergrund 
      bg_clouds1 = createSprite(SCENE_W/2, SCENE_H/2, SCENE_W, SCENE_H);
      bg_clouds2 = createSprite(-SCENE_W/2, SCENE_H/2, SCENE_W, SCENE_H);


  // C O L L I D E R S

      //GROUNDS
            ground = createSprite(0,SCENE_H,SCENE_W,250);
            ground.visible = false;
            middleGround = createSprite(0,(SCENE_H/3)*2,SCENE_W,60);
            middleGround.visible = false;
            leftEdgeCollider = createSprite((-(SCENE_W/2)-200),(SCENE_H/2),100,SCENE_H); //für singleContact
            leftEdgeCollider.visible = false;
            rightEdgeCollider = createSprite(SCENE_W/2+200,(SCENE_H/2),100,SCENE_H); //für singleCotact
            rightEdgeCollider.visible = false;
            podest1 = createSprite(-400, 1300, 1200, 30);
            podest1.visible = false;

      //FLYING/GRAVITYAREA
            flyingArea = createSprite(0,(SCENE_H/6),SCENE_W,SCENE_H/3);
            flyingArea.visible = false;
            middleArea = createSprite(0,SCENE_H/2,SCENE_W,SCENE_H/3);
            middleArea.visible = false;
            gravityArea = createSprite(0,(SCENE_H)-(SCENE_H/3),SCENE_W,SCENE_H/1.5);
            gravityArea.visible = false;

      //STAIRS
            stairs_1 = new Group();
            for (let i = 200; i < (jumpHeight*3); i+=jumpHeight/1.5){
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

      //BLACKBOXES
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
            maskPosition.addImage(schnur_Mask_img);
            maskPosition.setCollider("rectangle",0,150,100,200);
            invisibleGroundCheck = createSprite(0,(SCENE_H/3)*2,SCENE_W,60);  
            invisibleGroundCheck.visible = false;//for collision with middleGround for maskCheck

       //HYGIENE
            hygieneArea = createSprite(movingHygieneB-(SCENE_W/12),SCENE_H/2,(SCENE_W/6),SCENE_H);
            hygieneArea.visible = false;

      //ZOOM
            zoomArea = createSprite(-(SCENE_W/8.5),SCENE_H-(SCENE_H/4),SCENE_W/3.3,SCENE_H/2);
            zoomArea.visible = false;
            zoomScreenMiddle = createGraphics(1200,480);
            zoomScreenGround = createGraphics(125,125);
            zoomScreenGroundBig = createGraphics(800,425);

      //ISOLATION
            isolationArea = createSprite(0,SCENE_H-(SCENE_H/6),SCENE_W,SCENE_H/3);
            isolationArea.visible = false;

      //SINGLE CONTACTS
            singlepeople = new Group(); //die nach rechts gehen
            singlepeople2 = new Group(); //die nach links gehen
            
              s1 = createSprite(random(SCENE_W)-(SCENE_W/2),heightSinglePerson,200,100);
              s1.friction = random(0.001, 0.05);
              s1.maxSpeed = 12;
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
            //Creating swarms and attraction points
            for (let i = 0; i < total_number_of_groups; i++){
              distancing_groups[i] = new Group();
              att_points[i] = new Attraction_points(random(-SCENE_W/2, SCENE_W/2), random(SCENE_H/3), random(-2,2), random(-2,2));
              createSwarm(distancing_groups[i], att_points[i].positionX, att_points[i].positionY);
            }
  
// P L A Y E R 
      //Player is last, so it stays in front
      player1.setCollider("rectangle",0,50,65,115);


} // end Set up



/* ----------------- D R A W ------------------- */ 


function draw() {

  //STARTING PAGE 
  if(startingPage){

      //play music
      if(!middleAreaSoundOn){
          middleAreaSoundOn = true;
          middleArea_sound.play();
      }
      
      //starting screen
      push();
        background(docu_bg_img);
      
        fill(255);
        textFont('Avenir');
        textAlign(CENTER);
        textSize(windowHeight/3);
        text("FREEDOM", windowWidth/2,windowHeight/2);

        textSize(windowHeight/40);
        text("Click to start", windowWidth/2,windowHeight/2+100);

        //moving clouds
        docu_clouds.position.y = windowHeight/2;
          if (docu_clouds.position.x <= -900){
              docu_clouds.position.x = 2300;
          }
        docu_clouds.position.x -= 0.5;
        drawSprite(docu_clouds);
      pop();

      //next page
      if(mouseIsPressed && mouseClickCheck){
          mouseClickCheck = false;
          setTimeout(function(){startingPage = false;explainPage = true;}, 100);
          setTimeout(function(){mouseClickCheck = true;}, 500);
      }
  }

  // INFOPAGE
  if(explainPage){
      push();
        //infopage (docu)
        background(docu_bg_img);

        if (docu_clouds.position.x <= -900){
          docu_clouds.position.x = 2300;
        }
        docu_clouds.position.x -= 0.5;

        drawSprite(docu_clouds);
        drawSprite(docu);
      pop();

      //next page
      if(mouseIsPressed && mouseClickCheck){
        mouseClickCheck = false;
        explainPage = false;
        running = true;
        //setTimeout(function(){mouseClickCheck = true;}, 500);
      }
  }


  //RUNNING
  if (running){
      
      // B A C K G R O U N D S 
      background(0); //Black BG outside of frame 
      removeSprite(docu); //remove last page
      removeSprite(docu_clouds);
      

      push();
              
      //BACKGROUND CHANGE COLLECTIVE 
          if (collectiveScore < 10){ 
                bg_back.addImage(bg_hinten_1);
                bg.addImage(bg_vorne_1);
                bg_clouds1.addImage(clouds_1_img);
                bg_clouds2.addImage(clouds_1_img);
                s1.changeAnimation('singleContact_1_R_animate');
                s2.changeAnimation('singleContact_1_L_animate');
          }else if (collectiveScore > 10 && collectiveScore < 35){
                bg_back.addImage(bg_hinten_2);
                bg.addImage(bg_vorne_2);
                bg_clouds1.addImage(clouds_2_img);
                bg_clouds2.addImage(clouds_2_img);
                s1.changeAnimation('singleContact_2_R_animate');
                s2.changeAnimation('singleContact_2_L_animate');
          }else if (collectiveScore > 35 && collectiveScore < 65){
                bg_back.addImage(bg_hinten_3);
                bg.addImage(bg_vorne_3);
                bg_clouds1.addImage(clouds_3_img);
                bg_clouds2.addImage(clouds_3_img);
                s1.changeAnimation('singleContact_3_R_animate');
                s2.changeAnimation('singleContact_3_L_animate');
          }else if (collectiveScore > 65 && collectiveScore < 90){
                bg_back.addImage(bg_hinten_4);
                bg.addImage(bg_vorne_4);
                bg_clouds1.addImage(clouds_4_img);
                bg_clouds2.addImage(clouds_4_img);
                s1.changeAnimation('singleContact_4_R_animate');
                s2.changeAnimation('singleContact_4_L_animate');
          }else if(collectiveScore > 90 && collectiveScore < 100){
                bg_back.addImage(bg_hinten_5);
                bg.addImage(bg_vorne_5);
                bg_clouds1.addImage(clouds_5_img);
                bg_clouds2.addImage(clouds_5_img);
                s1.changeAnimation('singleContact_5_R_animate');
                s2.changeAnimation('singleContact_5_L_animate');
          }

      //PLAYER CHANGE INDIVIDUAL 
          if(individualScore < 10){
                if(maskOn && playerGroundCheck){
                  player1.changeAnimation('player_1_mask_jump_animate');
                }else if(maskOn && !isJumping){
                  player1.changeAnimation('player_1_mask_ground_animate');
                }else if(!maskOn && isJumping){
                  player1.changeAnimation('player_1_jump_animate');
                }else if(!maskOn && !isJumping){
                  player1.changeAnimation('player_1_ground_animate');
                }
          }else if(individualScore > 10 && individualScore < 35){
                if(maskOn && isJumping){
                  player1.changeAnimation('player_2_mask_jump_animate');
                }else if(maskOn && !isJumping){
                  player1.changeAnimation('player_2_mask_ground_animate');
                }else if(!maskOn && isJumping){
                  player1.changeAnimation('player_2_jump_animate');
                }else if(!maskOn && !isJumping){
                  player1.changeAnimation('player_2_ground_animate');
                }
          }else if(individualScore > 35 && individualScore < 65){
                if(maskOn && isJumping){
                  player1.changeAnimation('player_3_mask_jump_animate');
                }else if(maskOn && !isJumping){
                  player1.changeAnimation('player_3_mask_ground_animate');
                }else if(!maskOn && isJumping){
                  player1.changeAnimation('player_3_jump_animate');
                }else if(!maskOn && !isJumping){
                  player1.changeAnimation('player_3_ground_animate');
                }
          }else if(individualScore > 65 && individualScore < 90){
                if(maskOn && isJumping){
                  player1.changeAnimation('player_4_mask_jump_animate');
                }else if(maskOn && !isJumping){
                  player1.changeAnimation('player_4_mask_ground_animate');
                }else if(!maskOn && isJumping){
                  player1.changeAnimation('player_4_jump_animate');
                }else if(!maskOn && !isJumping){
                  player1.changeAnimation('player_4_ground_animate');
                }
          }else if(individualScore > 90){
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

      //MASK CHANGE
          if(maskOn){
            maskPosition.addImage(schnur_img);
          }else{
            maskPosition.addImage(schnur_Mask_img);
          }

      pop();


    
    //M U S I C  C H A N G E
          if(player1.overlap(middleArea) && !middleAreaSoundOn){
              middleAreaSoundOn = true;
              flyingAreaSoundOn = false;
              isolationAreaSoundOn = false;
              middleArea_sound.play();
              middleArea_sound.loop();
              middleArea_sound.setVolume(0.6,0.05);
              flyingArea_sound.stop();
              isolationArea_sound.stop();
          }else if(player1.overlap(flyingArea) && !flyingAreaSoundOn){
              middleAreaSoundOn = false;
              flyingAreaSoundOn = true;
              middleArea_sound.stop();
              flyingArea_sound.play();
              flyingArea_sound.loop();
              middleArea_sound.setVolume(0.6,5);
          }else if(player1.overlap(isolationArea) && !isolationAreaSoundOn){
              middleAreaSoundOn = false;
              isolationAreaSoundOn = true;
              middleArea_sound.stop();
              isolationArea_sound.play();
              isolationArea_sound.loop();
              isolationArea_sound.setVolume(0.6);
          }


    // S O U N D S   C H A N G E
      
          //Hygiene
          if(player1.overlap(hygieneArea) && !hygieneAreaSoundOn){
              hygieneAreaSoundOn = true;
              hygiene_sound.play();
              hygiene_sound.setVolume(0.4)
              //isolationArea_sound.setVolume(0.4);
          }else if(player1.overlap(hygieneArea) === false){
              hygieneAreaSoundOn = false;
              hygiene_sound.stop();
          }

          //Digital Media
          if(player1.overlap(zoomArea) && !zoomAreaSoundOn){
              zoomAreaSoundOn = true;
              zoom_sound.play();
              zoom_sound.loop();
              zoom_sound.setVolume(0.05);
          }else if(player1.overlap(zoomArea) === false){
              zoom_sound.stop();
              zoomAreaSoundOn = false;
          }
          
          //Teleport
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

          //Mask
          if(player1.overlap(maskPosition) && !maskSoundOn){
              mask_sound.play();
              mask_sound.setVolume(0.6);
              maskSoundOn = true;
          }else if(player1.overlap(maskPosition) && !maskSoundOn){
              mask_sound.play();
              mask_sound.setVolume(0.6);
              maskSoundOn = true;
          }else if(player1.overlap(maskPosition)=== false){
              maskSoundOn = false;
          }

     

    //E N V I R O N M E N T

        //BG mapped on playerMovement
        for(let i = -1910 ; i < player1.position.x; i++){
          bg_back.position.x = -(i/10);
        }

        //Clouds Movement
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
    
      
      //LIMITATIONS X-AXIS
        let ScreenPlayerRelation = width/2;
        let ScreenPlayerRelationH = height/2;

        if (player1.position.x >= EDGE_R - ScreenPlayerRelation){
          camera.position.x = camera.position.x;
        }else if(player1.position.x <= EDGE_L + ScreenPlayerRelation){
          camera.position.x = camera.position.x;
        }else{
          camera.position.x = player1.position.x;
        }

      //LIMITATIONS GRAVITYAREA Y-AXIS
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

      //LIMITATIONS GRAVITYAREA Y-AXIS
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
      
      
      
    // P L A Y E R   M O V E M E N T

      //Flying or walking
        if (player1.overlap(gravityArea)){
          playerMovement();
        }else if (player1.overlap(flyingArea)){
          flying();
        }
      
  
    // D R A W   S P R I T E S
        drawSprites();  
      

      
    // D I G I T A L   M E D I A   S C R E E N S

        // Attraction points, for animation following player
        let att_animation_middle = map(player1.position.x, -1060, 140, 600, 1800);
        let att_animation_ground = map(player1.position.x, -840, -100, 600, 1000);

        //Flacker Effect
        push();
            let randomizer = random(1);
            if(randomizer > 0.5){
                image(lights_unten_img,-SCENE_W/2,0);
                image(lights_oben_img,-SCENE_W/2,0);
            }else{
                image(lights_unten_2_img,-SCENE_W/2,0);
                image(lights_oben_2_img,-SCENE_W/2,0);
            }
        pop();

        //Display Screens Function
        graphicsScreen(zoomScreenMiddle, -1080, SCENE_H/2-100, att_animation_middle, 480, 255, 200, 0, 150);
        graphicsScreen(zoomScreenGroundBig, -870, 2215, att_animation_ground, 425, 255, 0, 100, 150);
        for(let i = 0; i<301; i += 150){
            for(let y = 0; y < 1000; y += 980){
                graphicsScreen(zoomScreenGround, -1015+y, 2215+i, 125, 125, 255, 0, 100, 150);
            }
        }

      
     
    // D R A W  S P R I T E S
          // damit der Player vor den Screens bleibt (es muss noch die einzelnen Distancing Personen hinzugefügt werden)  
          drawSprites(singlepeople);
          drawSprites(singlepeople2);
          drawSprite(player1);



    // A D D I N G  I N T E R A C T I O N S
      
          teleporting();
          maskOnOff();
          movingHygieneArea();
          hygieneScore();
          zoomScore();
          isolationScore();
          flyingScore();
          singlePeopleWalking ();

          //DISTANCING 
          for (let i = 0; i < total_number_of_groups; i++){
              att_points[i].move();
              //att_points[i].show(); //debugging
              swarmFollowAttraction(distancing_groups[i], att_points[i].positionX, att_points[i].positionY);
          }


      
    // R A I N

          for (i = 0; i < rain.length; i++) {
              rain[i].dropRain();
              rain[i].splash();
          }
        


    // G U I

      camera.off();
      //always after all Sprites are drawn
      //für unbewegliche UI Elemente

          // SCORING SYSTEM MIN MAX
              
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


          // DISPLAYING SCORES 

              push();
              
                let r = 10; //radius Scores
                const widthScoreDisplay = windowWidth/5;
                const heightScoreDisplay = windowHeight/14;

                // mapping für die Farbe und Länge der Balken in den Scores
                let m = map(individualScore, 0, 100, 20, widthScoreDisplay);
                let c1 = map(individualScore, 0, 100, 0, 250);
                let c2 = map(individualScore, 0, 100, 0, 0);
                let c3 = map(individualScore,0, 100, 0, 200);

                let m2 = map(collectiveScore, 0, 100, 20, widthScoreDisplay);
                let c4 = map(collectiveScore, 0, 100, 0, 250);
                let c5 = map(collectiveScore, 0, 100, 0, 0);
                let c6 = map(collectiveScore,0, 100, 0, 200);


                // Inside
                noStroke();
                if(individualScore < 10){fill(0);}
                else if (individualScore > 10 && individualScore < 35){fill(30+(c1/1), 30+(c2/1), 30+(c3/1));}
                else if (individualScore > 35 && individualScore < 65){fill(60+(c1/2), 60+(c2/2), 60+(c3/2));}
                else if (individualScore > 65 && individualScore < 90){fill(c1, 30+c2, c3);}
                else{fill(c1,c2,c3);}
                rect(20,20, m, heightScoreDisplay, r); //individual 

                if(collectiveScore < 10){fill(0);}
                else if (collectiveScore > 10 && collectiveScore < 35){fill(30+(c4/1), 30+(c5/1), 30+(c6/1));}
                else if (collectiveScore > 35 && collectiveScore < 65){fill(60+(c4/2), 60+(c5/2), 60+(c6/2));}
                else if (collectiveScore > 65 && collectiveScore < 90){fill(c4, 30+c5, c6);}
                else{fill(c4,c5,c6);;}
                rect(20,40 + heightScoreDisplay, m2, heightScoreDisplay, r); //collective

                // Outside
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

                // Text
                noStroke();
                fill(fbS_I_r, fbS_I_g, fbS_I_b);
                textAlign(CENTER);
                textSize(windowHeight/40);
                text("Individual", 20 + windowWidth/10, 20+(heightScoreDisplay/2)+(windowHeight/120));

                fill(fbS_C_r, fbS_C_g, fbS_C_b);
                text("Collective", 20 + windowWidth/10, 40+(heightScoreDisplay*1.5)+(windowHeight/120));



          // USER INFO

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

                //pause 
                displayIcons(pause_icon,pause_hover_icon,windowWidth - windowWidth/20 - 20, windowWidth/35);
                
                //sound
                displayIcons(sound_icon,sound_hover_icon,windowWidth - windowWidth/20 - 20,windowHeight - (windowHeight/10));

                //zoom
                displayIcons(zoom_icon,zoom_hover_icon,20,windowHeight - (windowHeight/10));

               
                


            pop();


          //ENDINGS

              if (individualScore < 10 && collectiveScore > 90){
                  running = !running;
                  fill(0,0,200);
                  rect(0, 0, windowWidth, windowHeight);
              }
              if (individualScore > 90 && collectiveScore < 10){
                  ending_1 = true;
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

      

          //DEBUGGING
          // textSize(40);
          // text(individualScore, 0, 100);
          // text(collectiveScore, 0, 200);


    camera.on();

      // DEBUGGING
      // maskPosition.debug = mouseIsPressed; //so werden die collider visualisiert
      // invisibleGroundCheck.debug = mouseIsPressed;
      // stairs_1.debug = mouseIsPressed;
      // player1.debug = mouseIsPressed;
      // teleportArea.debug = mouseIsPressed;
      // teleportArea1.debug = mouseIsPressed;


  }//end running


  if(ending_1){
    camera.zoom = 0.3;
    camera.position.x = 0;
    camera.position.y = SCENE_H/2;
   
    //Sound ausschalten
    camera.off();
      push();
        noStroke();
        fill('rgba(0,0,0, 0.5)');
        rect(0, 0, windowWidth, windowHeight);

        fill(255);
        textAlign(CENTER);
        textSize(windowHeight/10);
        text('Individual Freedom', windowWidth/2, windowHeight/2);
      pop();
    camera.on();
  }
}//end draw





// ---- PLAYER1 MOVEMENT -----
function playerMovement(){
  
    gravity = 1;
      
      //go right
        if (keyIsDown(RIGHT_ARROW) && player1.position.x <= (SCENE_W/2)-100) {
            player1.position.x += 10;
            player1.rotation = -5;
        }
      //go left
        if (keyIsDown(LEFT_ARROW) && player1.position.x >= (-(SCENE_W/2))+100) {
            player1.position.x -= 10;
            player1.rotation = 5;
        }
      

      //gravity
        player1.velocity.y += gravity; 
        if(player1.collide(ground) || player1.collide(middleGround) || player1.collide(stairs_1) || player1.collide(podest1)) {
            player1.velocity.y = 0;
        }else{
            isJumping = true;
        }
        if(player1.position.y >= SCENE_H){
            player1.velocity.y = 0;
        }//stop player from falling


      //jumping
        //wenn space, innerhalb gravity area und gerade am Boden war, dann jumpen
        if(keyWentDown(' ') && playerGroundCheck && player1.overlap(gravityArea)){
            jump_sound.play();
            jump_sound.setVolume(0.6);
            player1.velocity.y = -jump;
            playerGroundCheck = false;
        }
    

      //ground check
        //wenn player boden berührt hat, dann ist der Ground check true
        if(player1.overlap(middleGround) || player1.overlap(ground)){
            playerGroundCheck = true;
            isJumping = false;
        }


      //debugging

        //necessary for debugging when player sticks to something
        if (keyIsDown(DOWN_ARROW)){
            player1.position.y += 1;
        }
        player1.position.y += 1;  //OHNE VIBRIERT DAS BILD WIESO AUCH IMMER -> ich glaube wegen overlap bei groundcheck

        if(player1.overlap(stairs_1) || player1.overlap(podest1)){
            playerGroundCheck = true;
        }//das muss einzeln hinter dem debug hier drüber, damit ein GroundCheck stattfindet

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
    fbS_I_r = 0;
    fbS_I_g = 230;
    fbS_I_b = 180;
    if(fbS_I_g === 230){
      camera.off();
      displayIcons(arrow_up_icon,arrow_up_icon,windowWidth/5 + 30,20);
      camera.on();
    }
    setTimeout(function(){fbS_I_r = 255; fbS_I_g = 255; fbS_I_b = 255;}, 500);
}

function feedbackDownScoreI(){
    fbS_I_r = 220;
    fbS_I_g = 0;
    fbS_I_b = 60;
    if(fbS_I_r === 220){
      camera.off();
      displayIcons(arrow_down_icon,arrow_down_icon,windowWidth/5 + 30,20);
      camera.on();
    }
    setTimeout(function(){fbS_I_r = 255; fbS_I_g = 255; fbS_I_b = 255;}, 500);
}
function feedbackUpScoreC(){
    fbS_C_r = 0;
    fbS_C_g = 230;
    fbS_C_b = 180;
    if(fbS_C_g === 230){
      camera.off();
      displayIcons(arrow_up_icon,arrow_up_icon,windowWidth/5 + 30,40+(windowHeight/14)+(windowHeight/120));
      camera.on();
    }
    setTimeout(function(){fbS_C_r = 255; fbS_C_g = 255; fbS_C_b = 255;}, 500);
}
function feedbackDownScoreC(){
    fbS_C_r = 220;
    fbS_C_g = 0;
    fbS_C_b = 60;
    if(fbS_C_r === 220){
      camera.off();
      displayIcons(arrow_down_icon,arrow_down_icon,windowWidth/5 + 30,40+(windowHeight/14)+(windowHeight/120));
      camera.on();
    }
    setTimeout(function(){fbS_C_r = 255; fbS_C_g = 255; fbS_C_b = 255;}, 500);
}



// ---- MASK ----

let maskOnInterval, maskOffInterval;
function setMaskOnInterval (){
    maskOnInterval = setInterval(function(){
      // SCORE CHANGE WHILE MASK IS ON
        collectiveScore += 0.1;
        individualScore -= 0.1;
    },500);//every 1000 milliseconds
}
function setMaskOffInterval (){
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

// FLYING 
function flyingScore(){
  if(player1.overlap(flyingArea)){
    feedbackUpScoreI();
    individualScore += 0.001;
  }
}


// ---- SINGLE CONTACT ----
let touchedPerson = false;
function singlePeopleWalking () {

    directionSingle = [3,6,9];
    for (let i = 0; i < singlepeople.length; i++){
        
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
        singleContact_sound.setVolume(3.0);
        setTimeout(function(){touchedPerson = false;},5000);
        feedbackUpScoreI();
        feedbackDownScoreC();
        individualScore += 5 ;
        collectiveScore -= 3;
    } 
}


// ---- DISTANCING ----

// CREATING SWARM
function createSwarm(distancing_group, attraction_pointX, attraction_pointY){
    for (let e = 0; e < amount_of_characters; e++ ){
        distance1 = createSprite(random(-SCENE_W/2, SCENE_W/2), random(SCENE_H/3), 44, 34);
        distance1.shapeColor = color(random(0,200),20,random(0,200));
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
        distancing_sound.play();
        distancing_sound.setVolume(3.0);
        individualScore += 10;
        collectiveScore -= 30;
        touchedGroup = true;
    }
    if(player1.overlap(distancing_group) === false && touchedGroup && !hasStartedTimeoutS){
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setTimeout(function (){touchedGroup = false; hasStartedTimeoutS = false;},10000) // 10000 macht problem aber 1000 nicht
        hasStartedTimeoutS = true;
    }
 
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
    this.length = 30;
    this.r = 0;
    this.opacity = 200;

    this.dropRain = function(){
        noStroke();
        let c =color('rgba(255,255,255,0.5)')
        fill(c);
        ellipse(this.x, this.y, 3, this.length);
        this.y = this.y + random(6,20) //+ frameCount/60;
        
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


function graphicsScreen(graphics, x, y, w, h, stroke, r, g, b){

    graphics.background(stroke);
    graphics.noFill();
    if(collectiveScore < 20){
        graphics.stroke(50,50,50);
    }else if(collectiveScore > 20 && collectiveScore < 40){
        graphics.stroke(50 + r/4, 50 + g/4, 50 + b/4);
    }else if(collectiveScore > 40 && collectiveScore < 60){
        graphics.stroke(r/2,g/2,b/2);
    }else if(collectiveScore > 60 && collectiveScore < 80){
        graphics.stroke(r/1.5,g/1.5,b/1.5);
    }else if(collectiveScore > 80){
        graphics.stroke(r,g,b);
    }
    
    graphics.strokeWeight(2);
    graphics.rectMode(CENTER);

    if(move1 <= 500){
        for(let i = 0; i < 200; i+=20){
            graphics.rect(w/2,h/2,move1-i,move1-i); ////hier statt 250 die Hälfte von er graphics Größe
        }
        for(let i = 0; i < 200; i+=5){
          graphics.rect(w/2,h/2,move1+i,move1+i);
        }
    }else{
        move1 = 50;
    }
    
    move1 += 0.1;
    image(graphics, x, y);//Ort
}


  /* ------------------- I N T E R A T C T I O N S --------------------- */
let hasClickedSound = false;
let hasClickedSound2 = false;

function zoomInOut(){
    if(mouseIsPressed){
        if(!hasClickedSound){
            button_sound.play();
            hasClickedSound = true;
        }
        camera.zoom = windowWidth/SCENE_H;
    }else{
        camera.zoom = 1;
        hasClickedSound = false;
    }
}

function playPauseSound(){
    if(mouseIsPressed && !muted){
        if(!hasClickedSound2){
            button_sound.play();
            hasClickedSound2 = true;
        }
        flyingArea_sound.setVolume(0.0);
        isolationArea_sound.setVolume(0.0);
        middleArea_sound.setVolume(0.0);
        setTimeout(function(){muted=true},100);
    }else if(mouseIsPressed && muted){
        if(!hasClickedSound2){
            button_sound.play();
            hasClickedSound2 = true;
        }
        button_sound.play();
        flyingArea_sound.setVolume(0.6);
        isolationArea_sound.setVolume(0.6);
        middleArea_sound.setVolume(0.6);
        setTimeout(function(){muted=false},100);
    }else{
        //PIERRE
        hasClickedSound2 = false;
    }
}


function displayIcons(img,img_hover,w,h){
    push();
        scale(0.1)
        let currentImg = img; 
        image(currentImg,w*10,h*10);
    pop();

    if(mouseX > w && 
        mouseX < w + (img.width)/10 && 
        mouseY > h && 
        mouseY < h + (img.height)/10){
            push();
                scale(0.1)
                image(img_hover, w*10,h*10);
            pop();
          if(currentImg === sound_icon){
              playPauseSound();
          }else if(currentImg === zoom_icon){
              zoomInOut();
          }
    } 
}



  // PAUSE FUNCTION
function mousePressed(){
    if(mouseX > windowWidth - windowWidth/20 - 20 &&
      mouseX < (windowWidth - windowWidth/20 - 20) + play_icon.width &&
      mouseY > windowWidth/35 &&
      mouseY < windowWidth/35 + (play_icon.height)/10){
            button_sound.play();
            running = !running; // flip the boolean
            background(docu_bg_img);
            //not in a loop daher klappt es nicht
            displayIcons(play_icon,play_hover_icon,windowWidth - windowWidth/20 - 20, windowWidth/35);
            imageMode(CENTER);
            image(docu_img,windowWidth/2,windowHeight/2);
            imageMode(CORNER);
    }
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

  //wenn irgendein key gedrückt wird add 0.01 für den movement dings
  //wenn key gedrückt +individual, -collective
  //wenn kein key gedrückt -individual, +collective 
  //so kann der wert durch nichts drücken nicht auf 0 sinken
