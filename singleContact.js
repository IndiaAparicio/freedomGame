class SingleContact {

    constructor(r, x, y, speed){
        this.r = r;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    move(){
        this.x -= this.speed;
    }

    show(){
        ellipse(this.x, this.y, this.r, this.r);
    }
}