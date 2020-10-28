//Race to Fortune Code

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//creating all the characters of the game
var doctor;
var bg, ybiker, obiker, doctordriver, horsey, police, tree;
var theDoctor;
var bg;
var count;
var gameOver, restart;
var restarter
//create Obstacle Group
var ObstaclesGroup;

function preload() {
  //defining all the images/animations
  bgimg = loadImage("images/bgr.png");
  yBiker = loadImage("images/BikeYoung.png");
  oBiker = loadImage("images/BikeOld.png");
  obstacle1 = loadImage("images/ca.png");
  obstacle2 = loadImage("images/cy.png");
  obstacle3 = loadImage("images/po.png");
  obstacle4 = loadImage("images/tr.png");
  restarter = loadImage("images/restart.png");
  theDoctor = loadImage("images/TheDoctor.png"); //The Player
}

function setup() {

  //creating a canvas
  createCanvas(1550, 750);

  //defining the background
  bg = createSprite(700, 400);
  bg.addImage("bgimage", bgimg);
  bg.scale = 2.36;
  bg.y = height / 2;

  //defining our player The Doctor
  doctor = createSprite(400, 580, 50, 50);
  doctor.shapeColor = "red";
  //set collision radius for the doctor
  doctor.setCollider("rectangle", -50, 0,350,700);
  doctor.addImage(theDoctor);
  doctor.scale = 0.3;
  

  restart = createSprite(700, 365,100,100);
  restart.addImage(restarter);
  restart.scale = 0.2;
  restart.visible = false;
  //create Obstacle Group
  ObstaclesGroup = createGroup();

  //scaling the images
  obstacle1.debug = true;
  //score
  count = 0;
}

function draw() {
  //colouring the background
  background(0);

  //GameStates
  if (gameState === PLAY) {
    //move the background
    bg.velocityY = (6 + 3 * count / 100);
    //scoring
    count = Math.round(World.frameCount / 4)
    //spawn obstacles
    spawnObstacles();
    //End the game when doctor is touching the obstacle
    if (ObstaclesGroup.isTouching(doctor)) {
      gameState = END;
    }
    restart.visible = false;

    //making an endless gameArea
    if (bg.y > 600) {
      bg.y = height / 2;
    }
  } else if (gameState === END) {

    //set velocity of each game object to 0
    doctor.velocityY = 0;
    doctor.velocityX = 0;
    //ObstaclesGroup.setVelocityXEach(0);

    bg.velocityY = 0;

    restart.visible = true;


    //place gameOver and restart icon on the screen
    text("Game Over",690,170);

    //increasing text size
    textSize(25);
    text("Click on Restart to Play Again",660,170);

    //creating a restart button
    

    //set lifetime of the game objects so that they are never destroyed
    //ObstaclesGroup.setLifetimeEach(-1);

  }





  //display score



  doctor.x = mouseX;

  drawSprites();

  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
  fill(250);

 

  text("Score: " + count, 1400, 40);

  text(mouseX + ", " + mouseY, 30,30);
}

function spawnObstacles() {
  if(World.frameCount % 20 === 0) {
    var obstacle = createSprite(random(130,1300),0,10,40);
    obstacle.shapeColor = "blue";
    obstacle.velocityY = (6 + 3*count/100);

    //generate random obstacles
    var rand = Math.round(random(1,4));
      switch(rand){
        case 1: obstacle.addImage(obstacle1);
        break;
        
        case 2: obstacle.addImage(obstacle2);
        
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
      }


      
    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.6;
   // obstacle.lifetime = 70;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}