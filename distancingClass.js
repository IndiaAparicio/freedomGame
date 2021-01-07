class DistancingClass {



distancingFunction(){

  //setting the point of attraction inside a certain area
  if (attraction1.position.x  > EDGE_R){
    directionOfAttractionX = random(-4,-1);
  }else if (attraction1.position.x <= EDGE_L){
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
}
}