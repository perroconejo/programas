export default 
class barra{
    
    constructor(GAME_WIDTH,GAME_HEIGHT){
        this.width=150;
        this.height=30;
        this.position={
            x:GAME_WIDTH/2-this.width/2,
            y:GAME_HEIGHT-this.height-10,
        };
    }
    draw(contex){
        //contex. fillStyle ='darkblue';
        contex.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    /*update(deltaTime){
        if(!deltaTime)return;
        this.position.x+=5/deltaTime;

    }*/
}