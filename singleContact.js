class SingleContact {

    constructor(){
        this.r = 10;
        this.x = width;
        this.y = height - this.r;
        this.speed = random(0.5,2)
    }

    move(){
        this.x -= this.speed;
    }

    show(){
        ellipse(this.x, this.y, this.r, this.r);
    }
}