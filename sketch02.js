let att_points = [];


function setup(){
    createCanvas(windowWidth, windowHeight);
    
   for (let i = 0; i < 5; i++){
       att_points[i] = new Attraction_points(random(width), random(height), random(10));
   }

}

function draw(){
    background(25);

    for (let i = 0; i < 5; i++){
        att_points[i].move();
        att_points[i].show();
    }
  

    drawSprites();
}

class Attraction_points {
    constructor(posX, posY, speed){
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
    }

    move(){
        if(this.posX <= 0){
            this.speed = 10;
        }else if(this.posX >= width){
            this.speed = -10;
        }
        this.posX += this.speed;

    }

    show(){
        rect(this.posX, this.posY, 10,10);
    }
}