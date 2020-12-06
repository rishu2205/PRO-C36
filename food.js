class Food{
    constructor(){
    foodStock = database.ref('food');
    this.image=loadImage('images/milk2.png');
    }

    getFoodStock(){
    return this.foodStock
    }

    updateFoodStock(foodStock){
    this.foodStock=foodStock;
    }

    deductFood(){
    if(this.foodStock>0){
    this.foodStock=this.foodStock-1;    
    }
    }

    
     bedroom(){
        background(bed,550,500); 
        }
      
        garden(){
        background(gardn,550,500);     
        
        }
      
         washroom(){
        background(bath,550,500);     
        }

    display(){
    var x=80;
    var y=170; 
    imageMode(CENTER);
    if(this.foodStock!=0){
    for(var i=0;i<this.foodStock;i++){
    if(i%10===0){
    x=80;
    y=y+50;
    }
    image(this.image,x,y,50,50);
    x=x+30;
    }
    }
    }
}