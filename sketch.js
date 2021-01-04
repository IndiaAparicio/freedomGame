//colliders
let walls, boxes;

//interactions
let singleContacts = [];

//player
let player, playerCollider;

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
  boxes = new Group();
  player = new Player();
  

 

  for (let i = 0; i < 5; i++) {
    let w = createSprite(
      random(125, width-125), (height/5)*i,
      random(10, 100), random(10, 100));
    w.shapeColor = color(0);
    walls.add(w);
  }

  for (var i = 0; i < 4; i++) {
    var b = createSprite(
      random(50, 100), random(100, height-100),
      25, 25);
    b.shapeColor = color(255, 0, 0);
    boxes.add(b);
  }


}



function draw() {
  background(bgImg1);

  //PLAYER
  //creating a Collider for the player with a Sprite, so that the player can interact with other Sprite Objects
  playerCollider = createSprite(player.x + 30, player.y + 30, 60, 60);
  playerCollider.shapeColor = color(200,0,50);
  playerCollider.life = 5;

  playerCollider.collide(walls);
  playerCollider.displace(boxes);
  boxes.collide(walls);
  boxes.displace(boxes);

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
    }
    else if (keyIsDown(DOWN_ARROW)) {
      //fehlt, nur im Himmel oder beim Runter gehen
    }
    else if (keyIsDown(LEFT_ARROW)) {
      player.left();
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