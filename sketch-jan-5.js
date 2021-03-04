//colliders
let walls;

//interactions
let singleContacts = [];

//player
let player, playerCollider;
//gravity (https://www.youtube.com/watch?v=StoBCNiQakM)

//scores
let individualScore = 0;
let collectiveScore = 0;

//images
let bgImg0, bgImg1, bgImg2, playerImg;

function preload(){
  bgImg0 = loadImage("../img/BG-0.png");
  bgImg1 = loadImage("../img/BG-1.png");
  bgImg2 = loadImage("../img/BG-2.png");
}



function setup() {

  createCanvas(windowWidth, windowHeight);
  
  walls = new Group();
  player = new Player();
  

  for (let i = 0; i < 5; i++) {
    let w = createSprite(
      random(125, width-125), (height/5)*i,
      random(10, 100), random(10, 100));
    w.shapeColor = color(0);
    walls.add(w);
  }
}



function draw() {
  
  background(bgImg2);
  textSize(40);
  text(individualScore, 400, 30);
  text(collectiveScore, 800, 30);

  //ENDINGS
  if (individualScore >= 30){
    text('Szenario 1', 200,200);
  }
  if (collectiveScore >= 300){
    text('Szenario 2', 200,200);
  }

  //PLAYER
  //creating a Collider for the player with a Sprite, so that the player can interact with other Sprite Objects
  playerCollider = createSprite(player.x + 30, player.y + 30, 60, 60);
  playerCollider.shapeColor = color(200,0,50);
  playerCollider.life = 5;

  playerCollider.collide(walls);
  
  

  

  //creating a Single Contact randomly if value is less than 0.5%
  if (random(1) < 0.005){
    singleContacts.push(new SingleContact() );
  }
  for (let s of singleContacts){
    s.move();
    s.show(); 
  }



  drawSprites();
  player.show();
  player.move();

  
    if (keyIsDown(RIGHT_ARROW)) {
      player.right();
      individualScore -= 1; 
      collectiveScore += 1;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      //fehlt, nur im Himmel oder beim Runter gehen
    }
    else if (keyIsDown(LEFT_ARROW)) {
      player.left();
      individualScore += 1; 
      collectiveScore -= 1;
    }
    else if (keyIsDown(UP_ARROW)) {
      //fehlt, nur im Himmel oder beim Hoch gehen
    }

    
}

function keyPressed() {
    if (key == ' ') {
      player.jump();
    }
    return false;
}



//following this tutorial: https://www.youtube.com/watch?v=l0HoJHc-63Q

class Player {
    constructor() {
        this.r = 50; //making size a variable
        this.x = this.r;
        this.y = height - this.r;
        this.speed = 0; //velocity
        this.gravity = 1.5;
    }

    jump() {
        this.speed = -15;
    }

    right() {
        this.x += 2;
    }

    left() {
        this.x -= 2;
    }

    move() {
        this.y += this.speed;
        this.speed += this.gravity;
        this.y = constrain(this.y, 0, height - this.r);
    }

    show() {
        rect(this.x, this.y, this.r, this.r);
    }
}