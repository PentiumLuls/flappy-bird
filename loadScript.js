var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var bg = new Image();
var bird = new Image();
var ground = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

function loadImages() {
    //GAME
    bg.src = "images/bg.png";
    bg.onclick = function () {console.log("TEST")};
    bird.src = "images/bird.png";
    ground.src = "images/fg.png";
    pipeNorth.src = "images/pipeNorth.png";
    pipeSouth.src = "images/pipeSouth.png";
}