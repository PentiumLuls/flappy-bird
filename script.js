var pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
};

var gap = 100;
var constHeight;

var birdX = 50;
var birdY = 150;

var gravity = 2;
var speed = 1; //CONST
var alive;
var score;

var movedUp = false;
var movedUpCounter = 20;

function run() {
    alive = true;
    score = 0;

    document.addEventListener("keydown", keyPressed);

    console.log("Starting!");
    draw();
}

//HANDLING PRESSED KEY EVENT
function keyPressed() {
    if (alive) {
        movedUp = true;
        if (birdY < 0) {
            birdY = 0;
        }
    } else {
        alive = true;
        location.reload();
    }

}

function draw() {
    //BACKGROUND
    ctx.drawImage(bg, 0, 0);

    if (alive) {
        //PIPES
        for (var i = 0; i < pipe.length; i++) {
            constHeight = gap + pipeNorth.height;
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constHeight);
            pipe[i].x -= speed;

            //ADDING NEW PIPE
            if (pipe[i].x == 126) {
                pipe.push({
                    x: canvas.width,
                    y: Math.floor((Math.random() * pipeNorth.height - 30) - pipeNorth.height + 30)
                })
            }

            //CHECKING IF PIPE IS OVER THE SCREEN
            if (pipe[i].x <= 0 - pipeNorth.width) {
                pipe.splice(i, 1); //delete pipe[i]
            }

            //COLLISIONS WITH BIRD
            if (birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeNorth.width &&
                (birdY <= pipe[i].y + pipeNorth.height || birdY + bird.height >= pipe[i].y + constHeight)
                || birdY + bird.height >= canvas.height - ground.height) {
                alive = false;
            }

            if (birdX + bird.width / 2 == pipe[i].x + pipeNorth.width / 2) {
                score++;
            }
        }

        //GROUND
        ctx.drawImage(ground, 0, canvas.height - ground.height);

        //BIRD
        ctx.drawImage(bird, birdX, birdY);
        if (!(birdY >= canvas.height - bird.height - ground.height)) {
            birdY += gravity;
        }
        if (movedUp) {
            movedUpCounter--;
            birdY -= 6;
            if (birdY < 0) {
                birdY = 0;
            }

            if (movedUpCounter == 0) {
                movedUp = false;
                movedUpCounter = 10;
            }

        }

        //SCORE
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score: " + score, 10, canvas.height - 30);

        requestAnimationFrame(draw);
    } else {
        //PIPES
        for (var i = 0; i < pipe.length; i++) {
            constHeight = gap + pipeNorth.height;
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constHeight);
        }

        //GROUND
        ctx.drawImage(ground, 0, canvas.height - ground.height);

        //BIRD
        ctx.drawImage(bird, birdX, birdY);

        //SCORE
        drawFinalScore();
    }


}

function drawFinalScore() {
    ctx.fillStyle = "#000";
    ctx.font = "40px Verdana";
    var scoreText = "Score: " + score;
    ctx.fillText(scoreText, canvas.width / 5 - scoreText.length, canvas.height / 2);
    ctx.font = "20px Verdana";
    ctx.fillText("Press any key to restart", canvas.width / 10, canvas.height / 2 + 20);
}