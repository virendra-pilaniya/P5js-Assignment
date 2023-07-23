var ball_x, ball_dx, ball_y, ball_dy, ball_radius;
var paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;

var brickRows = 4, brickColumns = 4, brickWidth = 75, brickHeight = 20, brickPadding = 20, brickOffsetLeft = 15, brickOffsetTop = 10;

var bricks = [];
var score = 0;
var lives = 3;

function setup() {
  createCanvas(400, 400);
  
  ball_x = width / 2;
  ball_dx = 3;
  
  ball_y =  height / 2;
  ball_dy = 3;
  
  ball_radius = 25;
  
  paddle_width = 90;
  paddle_height = 15;
  paddle_x = (width / 2) - (paddle_width / 2);
  paddle_y = height - 30;
  
  paddle_dx = 3;
  create_grid();
  fill("black")
}


function show_grid() {
  
  for(var c=0; c<brickColumns; c++){
    for(var r=0; r<brickRows; r++ ){
        
        if(bricks[c][r].hidden == 0){
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;

          fill("black");
          rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
        }
    }
  }
  
}

function hitting() {
  for(var c=0; c<brickColumns; c++){
    for(var r=0; r<brickRows; r++ ){
        
        if(bricks[c][r].hidden == 0){
          if ((bricks[c][r].x <= (ball_x + ball_radius)) && ((bricks[c][r].x + brickWidth) >= (ball_x - ball_radius))) {
            if ((bricks[c][r].y <= (ball_y + ball_radius)) && ((bricks[c][r].y + brickHeight) >= (ball_y - ball_radius))) {
              bricks[c][r].hidden = 1;
              score = score + 1;
              
              ball_dy = -ball_dy;
            }
          }
        }
    }
  }
}

function create_grid() {
  for(var c=0; c<brickColumns; c++) {
    bricks[c] = []
    for(var r=0; r<brickRows; r++) {
      bricks[c][r] ={x: 0, y: 0, hidden: 0}
    }
  }
  
}

function draw() {
  
  background("grey");
  
  text("score", 0, 180);
  text(score, 40, 180);
  text("Lives",0,200);
  text(lives, 40,200);
  circle(ball_x, ball_y, ball_radius)
  rect(paddle_x, paddle_y, paddle_width, paddle_height)
  
  show_grid();
  ball_x = ball_x - ball_dx;
  
  if (score == (brickRows * brickColumns)) {
    alert("Wow, you won the game");
    clear()
    text("Great",200,200);
    return;
  }
  
  if (ball_x >= width - ball_radius) {
    ball_dx = -ball_dx;
  }
  
  if (ball_x <= ball_radius) {
    ball_dx = -ball_dx;
  }
  
  ball_y = ball_y - ball_dy;
  
  if (ball_y >= height - ball_radius) {
    
    if (lives == 1) {
      lives = 0;
      alert("You lost the game");
      clear()
      text("OHH!",200,200);
      return;
    }
    
    if ((lives - 1) > 0) {
      lives = lives - 1;
      ball_x = 200;
      ball_y = 200;
      ball_dy = 3;
    }
  }
  
  if (ball_y <= ball_radius) {
    ball_dy = -ball_dy;
  }
  
  if (keyIsDown(LEFT_ARROW)) {
     paddle_x = paddle_x - paddle_dx;
  }
   if (keyIsDown(RIGHT_ARROW)) {
     paddle_x = paddle_x + paddle_dx;
  }
  
  if ((paddle_x <= (ball_x + ball_radius)) && ((paddle_x + paddle_width) >= (ball_x - ball_radius))) {
    if ((paddle_y <= (ball_y + ball_radius)) && ((paddle_y + paddle_height) >= (ball_y - ball_radius)))
    {
      ball_dy = -ball_dy;
    }
  }
  
  hitting();
}