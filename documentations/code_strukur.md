# Code-Struktur

## Global Variables
#### line 1 - 147
* Gameplay
* Player
* Player Movement
* Animation
* Sound-Checks
* Scores
* Scoring-System
* Camera and bg
* Colliders
* Interactions
* Distancing
* Text Information 
* Icon Checks

## Preload
#### line 150 - 279
* Sounds
* Icons
* Images 
* * *Startingpage* 
* * *Environment*
* Animations 
* * *Player* 
* * *Distancing*

## Setup
#### line 286 - 454
* Canvas
* Startingpage
* Background
* Colliders 
* * *Grounds* 
* * *Flying/Gravity Area*
* * *Stairs* 
* * *Teleport* 
* * *Blackboxes*
* Interactions
* * *Mask*
* * *Hygiene*
* * *Zoom* 
* * *Isolation*
* * *Single Contact (+Animations)*
* * *Distancing* **--> creating objects from class `Attraction_points`**
* Feedback Icons **--> creating objects from class `DisplayIcons_new`**
* Player Collider 

## Draw
#### line 461 - 1210
* Safe last Scores
* StartingPage
* ExplainPage **--> calling tutorial()**
* **RUNNING START** (everything following is inside running:)
* Backgrounds 
* * *Background Change Collective*
* * *Player Change Individual*
* * *Mask Change*
* Music Change
* Sound Change 
* * *Hygiene*
* * *Digital Media*
* * *Teleport*
* * *Mask*
* Environment 
* * *BG mapped on player*
* * *Clouds Movement*
* Camera
* * *Limitations X-Axis*
* * *Limitations Y-Axis Gravityarea*
* * *Limitations Y-Axis Flyingarea*
* Player Movement
* * **--> calling playerMovement();**
* * **--> calling flying();**
* Draw Sprites
* Digital Media Screens
* * **--> calling graphicScreen();**
* Draw Sprites
* Adding Interactions
* * **--> calling teleporting();**
* * **--> calling maskOnOff();**
* * **--> calling movingHygeineArea();**
* * **--> calling hygieneScore();**
* * **--> calling zoomScore();**
* * **--> calling isolationScore();**
* * **--> calling singlePeopleWalking();**
* * **--> calling swarmFollowAttraction();**
* Rain
* * **--> calling rain[].dropRain();**
* * **--> calling rain[].splash();**
* GUI
* * *Scoring System Min Max*
* * *Displaying Scores*
* * *User Info*
* * *Buttons*
* * * **--> calling displayIcons();**
* * *Feedback Icons*
* * * **--> calling for each object object.display();**
* * * **--> calling for each object object.push();**
* * * **--> calling for each object object.pop();**
* * *Feedback Color Scores*
* **RUNNING END**
* Pause
* Endings


## playerMovement()
#### line 1217 - 1273
Key Interactions, Walking Around, Jumping

## flying()
#### line 1278 - 1327
Takes away gravity, User Input all 4 arrows, rotation to direction

## teleporting()
#### line 1332 - 1339
Puts player in other position

## maskOnOff()
#### line 1345 - 1371
Checks if player wears mask and influence score

## movingHygieneArea()
#### line 1378 - 1400
let's area move

###  hygieneScore()
#### line 1404 - 1421
influence on Score with relative value (clean)

## zoomScore()
#### line 1426 - 1462
influence on Score with relative value (boring)

## isolationScore()
#### line 1466 - 1488
influence on Score with relative value (lonely)

## flyingScore()
#### line 1491 - 1496
lets player fly

## singlePeopleWalking()
#### line 1501 - 1531
lets people walk by and influence on score

## createSwarm()
#### line 1537 - 1547
creates swarm as groups

## swarmFollowAttraction()
#### line 1552 - 1592
lets swarms follow different attraction points

## class Attraction_points
#### line 1596 - 1633
creates differnet attraction points

## function Rain()
#### line 1638 - 1679
creates rain

## graphicsScreen()
#### line 1682 - 1714
creates screens with animation for digital media area

## zoomInOut()
#### line 1721 - 1732
zooms in and out

## playPauseSound()
#### line 1734 - 1758
plays and pauses sound

## displayIcons()
**--> calling zoomInOut()**
**--> calling playPauseSound()**
#### line 1761 - 1782
displayes icons and displays different color when hovering

## class DisplayIcons_new
#### line 1785 - 1816
displayes icons at position based on how many icons are already displayed

## windowResized()
#### line 1819 - 1821

## tutorial()
**--> calling tutorialSinglePage()**
#### line 1824 - 1944
displays the tutorial

## tutorialSinglePage()
#### line 1946 - 1982
handles the behaviour at a single tutorial page
