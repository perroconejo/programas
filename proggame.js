import barra from "./proggamebarra.js";
let canvas= document.getElementById("pantalla-de-juego");
let contex= canvas.getContext("2d");

const Game_width=850;
const Game_height=600;
contex.fillRect(20,20,100,100);
contex.clearRect(0,0,850,600);

let barra=new Barra(Game_width,Game_height);
barra.draw(contex);
let lastTime=0;
function loop(timestamp){
    let deltaTime= timestamp=lastTime;
    lastTime=timestamp;
    contex.clearRect(0,0,850,600);
    barra.update(deltaTime);
    barra.draw(contex);
    requestAnimationFrame(loop);
}
loop();