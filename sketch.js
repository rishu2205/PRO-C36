//database
var add;
var database;
//dog
var dog;
var play
var rest 
var bed 
var garden 
var happy
var bath 
var sad 
var sleep
//food
var feed;
var foodS;
var fedTime; 
var lastFed;
var foodStock;
var foodobject; 
//milk
var milk; 
var milk1;
var milkImage;
var milkImage1; 
//rooms
var garden; 
var bedroom; 
var washroom;
//gamestate
var readgamestate;
var gamestate;


function preload(){
  happy = loadImage("images/happy.png");                 
  bed = loadImage("images/Bed Room.png");
  gardn = loadImage("images/Garden.png");
  bath = loadImage("images/Wash Room.png");
  sad = loadImage("images/Lazy.png");
 

}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  
  foodobject=new Food(); 

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  add=createButton("add food");
  add.position(600,95);
  add.mousePressed(addfoods);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val()  
  });
  
  dog=createSprite(449,250);
  dog.addImage(happy);
  dog.scale = 0.15;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
    
  readgamestate = database.ref('gamestate');
  readgamestate.on("value", function(data){
  gamestate=data.val();
  });
  
}


function draw() { 
  background("orange");
  
  
   if(lastFed>=12){
  text("Last Feed: "+ lastFed%12+ "PM",350,30);  
  }else if(lastFed==0){
  text("Last Feed:12 AM",350,30);    
  }else{
  text("Last Feed: "+ lastFed+ "AM",350,30);    
  }
    

  
    currentTime = hour();
    if (currentTime==(lastFed + 1)) {
    update("Playing"); 
    foodobject.garden();
    }else if (currentTime == (lastFed + 2)) {
    update("Sleeping"); 
    foodobject.bedroom();
    }else if (currentTime > (lastFed + 2) && currentTime <=(lastFed + 4)) {
    update("Bathing");
    foodobject.washroom();
    }else {
    update("hungry");
    foodobject.display();
    }
    
    if(gamestate!="hungry"){
    feed.hide();
    add.hide();
    dog.remove();
    }else{
    feed.show();
    add.show();
    dog.addImage(sad);                        
    }   


  if(foodS == 0){
    dog.addImage(happy);
    foodS = 0;
  }

 
  drawSprites();
 
}
function update(state){
  database.ref('/').update({
  gamestate:state
  })
}





function readStock(data){
  foodS = data.val();
  foodobject.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(happy);
  foodobject.updateFoodStock(foodobject.getFoodStock()-1);
  database.ref('/').update({
  food:foodobject.getFoodStock(),
  FeedTime:hour()
  })
}


function addfoods(){
  dog.addImage(happy);
  foodS++;
  database.ref('/').update({
  food:foodS
  })
}



