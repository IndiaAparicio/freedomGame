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

