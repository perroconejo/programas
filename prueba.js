import barra from "./proggamebarra";
let canvas= document.getElementById("pantalla-de-juego");
let contex= canvas.getContext("2d");
const GAME_WIDTH=850;
const GAME_HEIGHT=600;
contex.clearRect(0,0,850,600);
let barra= new Barra(GAME_WIDTH,GAME_HEIGHT);
barra.draw(contex);
