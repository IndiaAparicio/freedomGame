DOCUMENTATION


- [Short Discription](#short-discription)
- [November](#november)
  - [Mid-term presentation](#mid-term-presentation)
- [Dezember](#dezember)
- [Januar](#januar)
    - [Start Coding](#start-coding)
    - [Viewport, Background and Camera](#viewport-background-and-camera)
    - [Collider](#collider)
    - [Gruppe in p5 play](#gruppe-in-p5-play)
    - [Player](#player)
      - [Maske](#maske)
      - [Player Movement](#player-movement)
    - [Distancing](#distancing)
    - [GUI](#gui)
      - [Display Scores/Buttons](#display-scoresbuttons)
      - [Feedback through color](#feedback-through-color)
      - [Pause](#pause)
    - [Second Background](#second-background)
    - [More interactive elements](#more-interactive-elements)
    - [Scoring System](#scoring-system)
      - [Hygiene](#hygiene)
      - [Isolation and Zoom](#isolation-and-zoom)
- [Februar](#februar)
- [März](#märz)


# Short Discription

At the beginning of the project the plan was to develop a storytelling website about philosophy and religion. These very daring plans have become concrete in the last weeks. The subject area was narrowed down to the - still philosophical - topic of freedom. Due to the current restrictions caused by the Corona virus, many discussions about "freedom" have been started. How much freedom do I have to give away? Is it a violation of personal freedom or the freedom of others if I follow or break certain rules? A **balance between individual freedom and the freedom of the collective** follows. Based on this topic, a game-like application will be developed, which resembles a kind of simulation on the one hand and a puzzle principle on the other. The game will be implemented with **p5 and the p5.play library**.

The player finds himself in a world in which he can move freely. Two values are displayed to the player: *Individual Freedom* and *Collective Freedom*. The values change depending on how the player moves in the world. After a while of trial and error, the player should figure out how the values are affected and can specifically try to achieve a certain score. There are six objects/areas in the world, which are meant to symbolize Corona-related limitations: *Mask, Single Contacts, Distance, Hygiene Regulation, Isolation, Zoom*. The six interactions were arranged differently in space. Here, the Y-axis reflects the differences in individual freedom (Top: flying, many contacts, sky -> much freedom. Bottom: Isolation, basement -> little freedom). The room has three different floors and is altogether larger than the viewport. Different value changes are planned for the interactions and through affordance/signifier and feedback the player should understand which objects are interactive.



The overall style is intended to appear dreamy and abstract, and the six interaction areas are intended to be represented metaphorically. (For example, the mask appears like a small cage around the player -> see image) The look and feel was made vivid in a moodboard:

![Example Player Mask](./media/player-example-small.png)
![Moodboard](./media/moodboard-small.png)

The design of the game changes depending on how high the current values are. At a high collective value the background becomes more detailed and at a high individual value the player's image becomes more detailed. Thus the "value of freedom" is directly reflected in the visualization. 

![Example of Design Change](./media/design-example.png)

Finally, the game can end up in four different scenarios: Both values are at 100%, One value is at 100% and the other is below 10% (and vice versa), Both values are below 10%. The game starts at 50% for both values. For each ending, a theoretical background on individual and collective freedom and the user's choices should be displayed.



____


# November

## Mid-term presentation

In November I developed the concept further and narrowed it down a lot. While at the beginning of the semester the plan was to create a scrollitelling website about philosophy and religion, the plan became more concrete in November. I also prepared [presentation](./presentations/mid-term-presentation.pdf) for the mid-term presentation.









____


# Dezember

Im Dezember habe ich begonnen die Szene für das Spiel zu skizieren und zu planen. Ich habe mir verschiedene Interaktionen ausgedacht und diese in die Szene integriert. 
Ich habe folgende List erstellt, die die Interaktionen – und ihre Auswikung – visualisiert:

![Interaction table](./media/interactionsTable.png)
![Interactions in world](./media/interactionsInWorld.png) 


Außerdem habe ich den [Projektplan] erstellt. Passend zum Projektplan, habe ich für einen besseren Überblick, alle [To-Dos] aufgelistet. Für die Zielsetzung haben wir die [Best und Worst Case Scenarios] definiert.



Ich habe mich dazu entschieden das Spiel mit der p5-play-library zu erstellen, da es sich um ein Spiel handeln sollte, welches im Browser gespielt werden kann. Den Rest des Dezembers habe ich dafür genutzt mich mit den [p5-play-library] auseinanderzusetzen. Während des gesamten Projekt habe ich ständig diese zwei Dokumentation verwendet.:







____


# Januar

![Dezember](./media/video-jan-3.mp4)
![Dezember](./media/img-jan-3.png)

### Start Coding

In January during the project week I had the conception of the project mostly ready, so I sat down to the code for the first time. Since it is my first big coding project, I tried to make a plan for the project week. The sequence of the project was as follows:
- Create scene
- Insert background 
- Add camera 
- Add all interactive elements 
- Player Movement
  
*Mein Stand [Anfang Januar](../sketch-jan-5.js)*

### Viewport, Background and Camera
In January I started working on the code. The first thing to do was to create the game world. For this the previously created [drawing](./media/) was used as background image.


```javascript
function preload(){
    bgImg2 = loadImage("../img/BG-2.png");
} 
function setup() {
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    background(bgImg2);
}
```

Since the viewport `createCanvas(windowWidth, windowHeight);` should be smaller than the whole scene `bg = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H);`, I created a *sprite* for the background, to which I could add different images. With a virtual camera it was then possible to determine the section which is visible. This section was then linked to the behavior of the player, so that the player always stays in the middle of the viewport - unless the player gets too close to the edge of the screen, then the camera stops.
*My state [early January](../sketch-jan-10.js)*


```javascript
let SCENE_W = 4000;
let SCENE_H = 3000;

function preload(){
    bgImg2 = loadImage("../img/BG-2.png");
} 
function setup() {
    createCanvas(windowWidth, windowHeight);

    bg = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H);
    bg.addImage(bgBigImg1);
}
function draw() {
    camera.zoom = 1;
    ...
    let ScreenPlayerRelation = width/2;
    if (player1.position.x >= EDGE_R - ScreenPlayerRelation){
        camera.position.x = camera.position.x;
    }
    ...
    else{
    camera.position.x = player1.position.x;
    }
    ...
}
```


### Collider

For all platforms and other objects the player can interact with, I created more *sprites*. Sprites were created for the following objects:
* Ground (collider with player)
* Middle platform (collider with player)
* Stairs (Collider with Player)
* Flying Area (Overlapping with player changes score)
* Gravity Area (Overlapping with Player sets Gravity)
* Teleport Area 1 and 2 (Overlapping with Player changes player.position)
* Mask (Overlapping with player changes score)
* Hygiene Area (Overlapping with player changes score)
* Zoom Area (Overlapping with player changes score)
* Isolation Area (Overlapping with player changes score)
* Individuals (score is changed by overlapping with player)
* Group persons (score is changed by overlapping with player)
Most *sprites* remain invisible in the game.


```javascript
function setup() {
    ...
    ground = createSprite(0,SCENE_H,SCENE_W,50);
    middleGround = createSprite(0,(SCENE_H/3)*2,SCENE_W,20);
    ...
    flyingArea = createSprite(0,(SCENE_H/6),SCENE_W,SCENE_H/3);
    flyingArea.visible = false;
    gravityArea = createSprite(0,(SCENE_H)-(SCENE_H/3),SCENE_W,SCENE_H/1.5);
    gravityArea.visible = false;
    ...
}
function draw() {
    ...
    if (player1.overlap(flyingArea)){
    flying();
    }else{
    gravity = 1;
    }
    ...
    if(player1.collide(ground) || player1.collide(middleGround)) {
    player1.velocity.y = 0;
    }
    ...
}
```
### Gruppe in p5 play

For the individual contacts and for the distancing groups, p5-play groups had to be created. This way many elements could be given the same attributes. For the different interaction elements I created functions, like here `singlePeopleWalking()` .

```javascript
function setup() {
    ...
    singlepeople = new Group(); 
    for (let i = 0; i < 5; i++){
        s1 = createSprite(random(SCENE_W)-(SCENE_W/2),heightSinglePerson,200,100);
        s1.friction = random(0.001, 0.05);
        s1.shapeColor = color(200,0,50);
        s1.maxSpeed = 12;
    singlepeople.add(s1);
  }
    ...
}
function draw() {
    ...
    singlePeopleWalking ();
    ...
}
function singlePeopleWalking(){
    directionSingle = random(1,10)
      for (let i = 0; i < singlepeople.length; i++){
        singlepeople[i].attractionPoint(0.12, SCENE_W, heightSinglePerson); 
        if (singlepeople[i].overlap(rightEdgeCollider)){
          singlepeople[i].position.x = -(SCENE_W/2); 
        }
      }
}
```



### Player

#### Maske

A *sprite* was also created for the player, so that the player has a collider that provides the events when it touches the other colliders. However, since the player should look different depending on whether it wears a mask, several images were assigned to the *sprite*. Several boolean variables were then used to check whether the player was wearing the mask and whether he had touched the ground again since putting on the mask (because otherwise the mask would be on and off continuously for the entire time the player was touching the mask). Throughout the code for the game, I then very often used this Boolean logic to trigger events only once (in a given) in the draw loop.


```javascript
function preload(){
    playerImg = loadImage("../img/woman.png");
    playerMaskImg = loadImage("../img/mask.png");
} 
function setup() {
    ...
    player1 = createSprite(0,0);
    player1.addImage(playerMaskImg);
    player1.addImage(playerImg);
    ...
}
function draw() {
    ...
    maskOnOff();
    ...
}
function maskOnOff(){
    //put on mask
    if(player1.overlap(maskPosition) && !maskOn && maskGroundCheck){
        player1.addImage(playerMaskImg);
        maskGroundCheck = false;
        maskOn = true; 
    }
    //Ground Check
    else if(player1.overlap(invisibleGroundCheck) && maskOn && !maskGroundCheck){
        maskGroundCheck = true;
    } 
    //put off mask
    if (player1.overlap(maskPosition) && maskOn && maskGroundCheck){
        player1.addImage(playerImg);
        maskGroundCheck = false;
        maskOn = false;
    }
    //Ground Check
    else if(player1.overlap(invisibleGroundCheck) && !maskOn && !maskGroundCheck){
        maskGroundCheck = true;
    }
}
```

#### Player Movement


To make the player move, I programmed the player movement in the Gravity-Area on the one hand and in the Flying-Area on the other hand. To change the position of the player only the `player1.position.x` had to be changed at for example `keyIsDown(RIGHT_ARROW)`. For flying, this was allowed in all four directions. For jumping the `player.velocity.y` had to be changed. Again a GroundCheck with a Boolean variable was used, so that the player cannot jump continuously.

```javascript
...
function draw() {
    ...
    if (player1.overlap(flyingArea)){
        flying();
    }else{
        gravity = 1;
    }
    ...
    //Jumping
    if(keyWentDown(' ') && playerGroundCheck && player1.overlap(gravityArea)){
        player1.velocity.y = -jump;
        playerGroundCheck = false;
    }
    ...
}
function flying(){
    ...
    gravity = 0; 
    if (keyIsDown(UP_ARROW)) {
        player1.position.y -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        player1.position.y += 10;
    }
    ...
}
```

BIS HIER IST DIE VERSION VOM 10. JANUAR

### Distancing 

Especially with the programming for the distancing function I had great difficulties. For this, a group should be created that follows an attraction point. The attraction point should be invisible afterwards, so that it looks like the group is moving in swarms. With one group it worked relatively fast, but there were many problems and failed attempts to create multiple groups following different points. 
The first version looked like this: ![Distancing-Version1](./media/)

https://molleindustria.github.io/p5.play/examples/index.html?fileName=sprite4.js

```javascript
function setup() {
    ...
    attraction1 = createSprite(random(width),height/2,20,20);
    distanceCharacter = new Group();
   
    for (let i = 0; i < 20; i++ ){
        c1 = createSprite(random(width), random(height), random(20,50), 20);
        c1.shapeColor = color(20,20,20);
        c1.maxSpeed = 12;
        c1.friction = random(0.05, 0.15);
        c1.rotateToDirection = true;
        distanceCharacter.add(c1);
    }
    ...
}
function draw() {
    ...
    distancingFunction();
    ...
}
function distancingFunction(){
    ...
    //Limiting area where attraction-points move
    if (attraction1.position.x  > EDGE_R){
        directionOfAttractionX = random(-4,-1);
    }
    ...

    attraction1.position.x += directionOfAttractionX;
    attraction1.position.y += directionOfAttractionY;

    //direction and speed of attraction character
    direction += random(1,5); 
    attraction1.setSpeed(random(2,3), direction); 

    for (let i = 0; i < distanceCharacter.length; i++ ){
        distanceCharacter[i].attractionPoint(0.12, attraction1.position.x, attraction1.position.y);
        distanceCharacter[i].setCollider("circle", 0, 0, 20);
        distanceCharacter.collide(distanceCharacter[i]); 
    } 
}
```

To create multiple groups I had to make many attempts. In some versions the attraction points always moved in the same way or the groups followed only one point. To solve the problem that the attraction points do not always move the same way (i.e. in the same direction), I created a class `class Attraction_points`. So each object of the class has its own attributes.

```javascript
let distancing_groups = [];
let att_points = [];
let total_number_of_groups = 6;
let amount_of_characters = 40;

function setup() {
    ...
    for (let i = 0; i < total_number_of_groups; i++){
        distancing_groups[i] = new Group();
        att_points[i] = new Attraction_points(random(-SCENE_W/2, SCENE_W/2), random(SCENE_H/3), random(-2,2), random(-2,2));
        createSwarm(distancing_groups[i], att_points[i].positionX, att_points[i].positionY);
    }
    ...
}
function draw() {
    ...
    for (let i = 0; i < total_number_of_groups; i++){
    att_points[i].move();
    swarmFollowAttraction(distancing_groups[i], att_points[i].positionX, att_points[i].positionY);
  }
    ...
}

// CREATING SWARM
function createSwarm(distancing_group, attraction_pointX, attraction_pointY){
  for (let e = 0; e < amount_of_characters; e++ ){
    c1 = createSprite(...);
    ...
    c1.attractionPoint(29, attraction_pointX, attraction_pointY);
    distancing_group.add(c1);
  }
}

// SWARM FOLLOWS ATTRACTION POINT
function swarmFollowAttraction(distancing_group, attraction_pointX, attraction_pointY){
  
  for (let i = 0; i < amount_of_characters; i++){
    distancing_group[i].attractionPoint(random(0.08, 0.2), attraction_pointX, attraction_pointY);
    distancing_group[i].setCollider("circle", 0, 0, 20);
    distancing_group.collide(distancing_group[i]);
  }
  ...
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
    ...
    this.posX += this.speedX;
    ...
  }
}
```


BIS ENDE JANUAR

### GUI

#### Display Scores/Buttons

For the userinterface elements the camera had to be turned off with `camera.off()`, so that the elements on the canvas are shown absolutely and not relatively in the game world. The buttons and elements I added with simple p5 functions like `rect` or `ellipse`. To change the colors of the scores depending on how high the score is, I used the `map()` function to store varibbles that store targeted color values for the score interval from 0-100.

```javascript
function draw() {

    ...

    camera.off();

    ...

    let m = map(individualScore, 0, 100, 20, windowWidth/5);
    let c1 = map(individualScore, 0, 100, 250, 0);
    let c2 = map(individualScore, 0, 100, 0, 200);
    let c3 = map(individualScore,0, 100, 100, 150);

    ...

    noStroke();
    fill(c1,c2,c3);
    rect(20,20, m, (windowWidth/5)/4, r); //individual 

    ...

    camera.on();
}

```

#### Feedback through color

To give the user feedback when the score changes positively or negatively, I created the variables `fbS_I_r` (feedbackScore_Individual_red) etc. for the word `individual` and `collective` as well as for the contour of the score image. For events in which the scores change, one of the four functions `feedbackUpScoreI()`,`feedbackDownScoreI()`,`feedbackUpScoreC()`,`feedbackDownScoreC()` is then called, coloring the corresponding score either red or green. After 500 milliseconds of action, the color values are reset. For this, use was made of the `setTimeout()` function, which I used again several times later.

```javascript
function draw() {
    ...
    camera.off();

    ...

    stroke(fbS_I_r, fbS_I_g, fbS_I_b);
    strokeWeight(3);
    noFill();
    rect(20,20, windowWidth/5, (windowWidth/5)/4, r); //individual

    ...

    fill(fbS_I_r, fbS_I_g, fbS_I_b);
    textAlign(CENTER);
    textSize(windowHeight/40);
    text("Individual", 20 + windowWidth/10, 20 + windowWidth/35);

    ...

    camera.on();
}

function feedbackUpScoreI(){
    fbS_I_g = 200;
    fbS_I_b = 150;
    setTimeout(function(){fbS_I_g = 0; fbS_I_b = 0;}, 500);
}

```

#### Pause
For the pause button function, I packed the entire contents of the draw function into an if-condition. When the button is pressed, I then set this condition to false so that the game cannot continue to run. Since the `mousePressed()` function I use to flip the boolean is outside the `draw()` function, the condition can be set back to true and the game continues.

```javascript
let running = true;

function mousePressed(){
    if(mouseX > 20 && mouseX < 20 + windowWidth/10 && mouseY > windowHeight - (windowHeight/10) && mouseY < windowHeight - (windowHeight/20)) {
    running = !running; // flip the boolean
    ...
}
function draw() {
    if(running){
        ...
    }
}
```

### Second Background 

To create an illusion of depth, I decided to have the foreground and background move differently. So it appears that the foreground is closer to the player. The background (`bg_back`) now moves relative to the position of the player. However, to prevent the edge of the back image from protruding into the viewport when the player is at the edge of the playfield, the background image must be larger than the foreground. While the illustrations for the foreground should be 4000x3000px, the background must be 4300x3000px.

```javascript
function setup(){
    bg_back = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H);
    bg = createSprite(0, SCENE_H/2, SCENE_W, SCENE_H);
    }
function draw() {
    for(let i = -1910 ; i < player1.position.x; i++){
        bg_back.position.x = -(i/10);
    }
}
```

### More interactive elements

### Scoring System

Now that all the interactive elements have been added, the influences of these on the scoring system had to be inserted. 

#### Hygiene

I coded many influences on the score by the `overlap()` method available in the p5-play-library. If the player is within a certain area, the score is affected accordingly. For a one-time boost, like in the hygiene area, I added a boolean varibael so that it only applies once. When leaving the area, the varibael is reset with `setTimeout()` after 20000 milliseconds, so that a new boost can take place.

```javascript
function draw() {
    hygieneScore();
}

function hygieneScore(){
    if (player1.overlap(hygieneArea) && boostHygine === false){
      boostHygine = true;
      feedbackUpScoreC();
      feedbackDownScoreI();
      collectiveScore += 20;
      individualScore -= 10;
    }else if (player1.overlap(hygieneArea) === false && boostHygine && !hasStartedTimeoutH){
      hygieneBoostIntervall = setTimeout(function(){boostHygine = false; hasStartedTimeoutH = false;}, 20000); 
      hasStartedTimeoutH = true;
    }
}
```

#### Isolation and Zoom

Some values should not change statically, but for example should increase/decrease more and more. For example, when staying in the isolation area, the individual value should decrease more if the player has been there for a longer time. For this I introduced a variable `lonely`, which indicates how lonely the player already is. 1 would be in this case not lonely and 10 very lonely. The value is multiplied by 0.001 throughout, so that it increases faster and faster. 

```javascript
function draw() {
    isolationScore();
}
let lonely = 1; //1= not lonely ; 10 = very lonely
function isolationScore(){
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
        lonely *= 0.999; 
    }
}
```

The same principle is used to influence the score within the zoom range. In this case the variable `boring` was introduced.


- Rain

# Februar

Das Illustrieren aller Illustrationen und Animationen hat über 2 Wochen im Februar in Anspruch genommen. Eine Übersicht über alle nötigen Illustration findet man [hier] unter Animationen. 

Die Illustrationen habe ich mit [procrate] auf meinem Tablet erstellt und als png-Dateien exportiert. 


Insgesamt habe ich ... Einzelbilder gezeichnet und eingepflegt. 




![Januar](./media/video-jan-3.mp4)
![Januar](./media/img-jan-3.png)


# März

![Februar](./media/video-jan-3.mp4)
![Februar](./media/img-jan-3.png)



