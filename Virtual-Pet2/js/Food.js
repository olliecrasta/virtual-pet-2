class Food {
    constructor() {
        this.foodStock = 0;
        this.lastFed = "00:00";
        this.image = loadImage("images/milk.png");
    }

    getFoodStock() {
        var foodRef = database.ref("foodStock");
        
    
        foodRef.on("value",(data) => {
          
            this.foodStock = data.val();
        })
        database.ref("lastFed").on("value",(data)=>{
            var temp=data.val();
            this.lastFed=temp;
        })
    }

    updateFoodStock(stock,time) {
        database.ref('/').update({
            foodStock: stock,
            lastFed : time
        })
    }

    // deductFood() {
    //     this.foodStock--;
    //     this.updateFoodStock();
    // }

    // async start(){
    //     console.log(this.foodStock);
    //     console.log(this.lastFed);
    //     await database.ref("foodStock").once("value", function (data) {
    //         console.log(data.val())
    //         var temp=data.val();
    //         this.foodStock=0;
    //     })
    //     await database.ref("lastFed").once("value",function(data){
    //         var temp=data.val();
    //         this.lastFed=temp;
    //     })
    // }

    display() {
       // console.log("disp milk : "+this.foodStock)
        if(this.foodStock>0){
            
            var x = 80, y = 100;
            imageMode(CENTER);
            image(this.image, 550, 330, 70, 70)
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 === 0) {
                    x = 80;
                    y = y + 50
                }
                image(this.image, x, y, 50, 50)
                x = x + 30
            }

        }
    
    }

}