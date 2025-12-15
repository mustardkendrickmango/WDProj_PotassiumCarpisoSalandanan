var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var score = 0;
var running = false;

var grid = 16;
var count = 0;

var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

var apple = { x: 320, y: 320 };

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function resetGame() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;

  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;

  score = 0;
  document.getElementById("scoreboard").textContent = "Score: " + score;
}

function loop() {
  if (!running) return; 

  requestAnimationFrame(loop);

  if (++count < 8) return;
  count = 0;

 
  context.clearRect(0,0,canvas.width,canvas.height);

  
  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) snake.x = canvas.width - grid;
  else if (snake.x >= canvas.width) snake.x = 0;

  if (snake.y < 0) snake.y = canvas.height - grid;
  else if (snake.y >= canvas.height) snake.y = 0;

  snake.cells.unshift({x: snake.x, y: snake.y});

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  context.fillStyle = '#c443c4ff';
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);

    
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;
      document.getElementById("scoreboard").textContent = "Score: " + score;

      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }




    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        running = false;
        document.getElementById("playBtn").style.display = "inline-block";
      }
    }
  });
}



document.addEventListener('keydown', function(e) {
  if (!running) return; 
 let key = e.key.toLowerCase();

  if (key === "a" && snake.dx === 0) {
    snake.dx = -grid; snake.dy = 0;
  }
  else if (key === "w" && snake.dy === 0) {
    snake.dy = -grid; snake.dx = 0;
  }
  else if (key === "d" && snake.dx === 0) {
    snake.dx = grid; snake.dy = 0;
  }
  else if (key === "s" && snake.dy === 0) {
    snake.dy = grid; snake.dx = 0;
  }
});


document.getElementById("playBtn").addEventListener("click", function() {
  resetGame();
  running = true;
  this.style.display = "none";
  requestAnimationFrame(loop);
});