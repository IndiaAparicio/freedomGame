let character;
let distanceCharacter;
let attraction1; //der Punkt, dem die Dinger folgen sollen
let direction = 90;
let directionOfAttractionX = 2;
let directionOfAttractionY = 2;


function setup() {
  createCanvas(600, 600);

  //creating the attraction point as a moving sprite and making it invisible
  attraction1 = createSprite(random(width),height/2,20,20);
  //attraction1.visible = false;
  

  distanceCharacter = new Group();

  for (let i = 0; i < 10; i++ ){
    c1 = createSprite(random(width), random(height), random(20,50), 20);
    c1.shapeColor = color(20,20,20);
    c1.maxSpeed = 12;
    camera.setSpeed = random(1,15);
    c1.friction = random(0.05, 0.15);
    c1.rotateToDirection = true;
    distanceCharacter.add(c1);
}
}

function draw() {
  background(220);


//setting the point of attraction inside a certain area
if (attraction1.position.x > width){
    directionOfAttractionX = random(-4,-1);
}else if (attraction1.position.x < 0){
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


  

  drawSprites();
}
