//Create variables here

var database, dog, happyDog, dogImg, foodObj, feedPet, addFood, fs;
function preload() {
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
  //load images here

}

function setup() {
  createCanvas(800, 500);

  //init database
  database = firebase.database();

  //create dog sprite
  dog = createSprite(650, 300, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  //food object
  foodObj = new Food();
  //foodObj.start();
  foodObj.getFoodStock();

  //buttons for feeding pet and adding food
  feedPet = createButton("Feed the dog");
  feedPet.position(700, 100);
  feedPet.mousePressed(feedDog);

  //button for adding food
  addStock = createButton("Add food");
  addStock.position(800, 100);
  addStock.mousePressed(addFood);

}


function draw() {
  background(46, 139, 87);
  fill(255)
  text("Last Feed - " + foodObj.lastFed, 500, 20);
  foodObj.display();
  drawSprites();
  text(mouseX + "," + mouseY, mouseX, mouseY)

}

function feedDog() {
  foodObj.getFoodStock();
  // console.log(foodObj.foodStock)
  if (foodObj.foodStock > 0) {
    imageMode(CENTER);
    image(foodObj.image, 550, 330, 70, 70)

    var hh = hour();
    var mm = minute();
    if (hh <= 9) {
      hh = "0" + hh;
    }  
    if (mm <= 9) {
      mm = "0" + mm;
    }
    console.log(hh+":"+mm)
    foodObj.lastFed = hh + ":" + mm;
    foodObj.updateFoodStock(foodObj.foodStock - 1, foodObj.lastFed);
    dog.addImage(happyDogImg);
  }
  else {
    dog.addImage(dogImg);
  }

}

function addFood() {
  //console.log(foodObj.foodStock)
  foodObj.updateFoodStock(foodObj.foodStock + 1, foodObj.lastFed);
}

