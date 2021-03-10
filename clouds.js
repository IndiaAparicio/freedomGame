function preload(){

  docu_bg_img = loadImage('../img/docu_bg.png');
  docu_clouds_img = loadImage('../img/docu_clouds.png');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
}

function draw(){
  push();
        background(docu_bg_img);
      
        
  pop();
}

