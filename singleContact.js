class SingleContact {

    constructor(){
        this.r = 10;
        this.x = width;
        this.y = ((windowHeight/3)*2)-((this.r)*2);
        this.speed = random(0.5,2)
    }

    move(){
        this.x -= this.speed;
    }

    show(){
        ellipse(this.x, this.y, this.r, this.r);
    }
}