# Code-Struktur

## Global Variables
#### 1 - 95
* Gameplay
* Player
* Player Movement
* Animation
* Sound-Checks
* Scores
* Camera and bg
* Colliders
* Interactions
* Distancing
* Text Info

## Preload
#### 95 - 201
* Sounds
* Icons
* Images 
* * *Startingpage* 
* * *Environment*
* Animations 
* * *Player* 
* * *Distancing*

## Set Up
#### 205 - 358
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
* * *Distancing*
* Player Collider 

## Draw
#### 365 - 1236
* StartingPage
* InfoPage
* Running (everything folloing is inside running:)
* Backgrounds 
* * *Background Change Collective*
* * *Player Cha Individual*
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
* * **--> calling displayIcons();**
* * *Endings*
* Debugging


## playerMovement()
Key Interactions, Walking Around, Jumping

## flying()
Takes away gravity, User Input all 4 arrows, rotation to direction

## teleporting()
Puts player in other position

## maskOnOff()
Checks if player wears mask and influence score

## movingHygieneArea()
lässt die Area sich bewegen

###  hygieneScore()
Einfluss auf Score bei Hygiene

## zoomScore()
Lässt zoomScore beeinflussen, mit einem relativen Wert (boring)

## isolationScore()
Lässt isolationScore beeinflussen, mit einem relativen Wert (lonely)

## flyingScore()

## singlePeopleWalking()

## createSwarm()
## swarmFollowAttraction()

## class Attraction_points

## function Rain()

## graphicsScreen()

## zoomInOut()

## playPauseSound()

## displayIcons()

## class DisplayIcons_new

## mousePressed()

## windowResized()
