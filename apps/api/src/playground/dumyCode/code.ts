export const data = {
  hello: `/* Use an emoji to say hello */
var helloWorld = document.createElement('div');
helloWorld.innerHTML = '&#x1F44B;';
document.body.appendChild(helloWorld);`,
  word: `/* Create a word guessing game */
var word = 'hello';
var guesses = [];
var guessCount = 0;
var guessLimit = 5;
var gameOver = false;
var gameWon = false;
var guessInput = document.createElement('input');
var guessButton = document.createElement('button');
var guessResult = document.createElement('div');
var guessCountDisplay = document.createElement('div');
var guessLimitDisplay = document.createElement('div');
var gameOverDisplay = document.createElement('div');
var gameWonDisplay = document.createElement('div');
var gameResetButton = document.createElement('button');
guessInput.setAttribute('type', 'text');
guessInput.setAttribute('placeholder', 'Enter a guess');
guessButton.innerHTML = 'Guess';
guessResult.innerHTML = 'Result: ';
guessCountDisplay.innerHTML = 'Guess Count: ' + guessCount;
guessLimitDisplay.innerHTML = 'Guess Limit: ' + guessLimit;
gameOverDisplay.innerHTML = 'Game Over: ' + gameOver;
gameWonDisplay.innerHTML = 'Game Won: ' + gameWon;
gameResetButton.innerHTML = 'Reset';
document.body.appendChild(guessInput);
document.body.appendChild(guessButton);
document.body.appendChild(guessResult);
document.body.appendChild(guessCountDisplay);
document.body.appendChild(guessLimitDisplay);
document.body.appendChild(gameOverDisplay);
document.body.appendChild(gameWonDisplay);
document.body.appendChild(gameResetButton);


guessButton.addEventListener('click', function() {
  if (guessCount < guessLimit) {
    var guess = guessInput.value;
    guesses.push(guess);
    guessCount++;
    guessCountDisplay.innerHTML = 'Guess Count: ' + guessCount;
    if (guess === word) {
      gameWon = true;
      gameWonDisplay.innerHTML = 'Game Won: ' + gameWon;
      guessResult.innerHTML = 'Result: You guessed the word!';
    } else {
      guessResult.innerHTML = 'Result: You guessed wrong!';
    }
  } else {
    gameOver = true;
    gameOverDisplay.innerHTML = 'Game Over: ' + gameOver;
    guessResult.innerHTML = 'Result: You ran out of guesses!';
  }
});

gameResetButton.addEventListener('click', function() {
  guessCount = 0;
  guessCountDisplay.innerHTML = 'Guess Count: ' + guessCount;
  gameOver = false;
  gameOverDisplay.innerHTML = 'Game Over: ' + gameOver;
  gameWon = false;
  gameWonDisplay.innerHTML = 'Game Won: ' + gameWon;
  guessResult.innerHTML = 'Result: ';
});`,
  ball: `/* Make a ping pong ball on a black background and move */
var pingPongBall = document.createElement('div');
pingPongBall.style.width = '100px';
pingPongBall.style.height = '100px';
pingPongBall.style.backgroundColor = 'white';
pingPongBall.style.borderRadius = '50px';
pingPongBall.style.position = 'absolute';
pingPongBall.style.top = '0px';
pingPongBall.style.left = '0px';
document.body.style.backgroundColor = 'black';
document.body.appendChild(pingPongBall);
var pingPongBallX = 0;
var pingPongBallY = 0;
var pingPongBallDirectionX = 1;
var pingPongBallDirectionY = 1;
var pingPongBallSpeed = 1;
var pingPongBallInterval = setInterval(function() {
  pingPongBallX += pingPongBallDirectionX * pingPongBallSpeed;
  pingPongBallY += pingPongBallDirectionY * pingPongBallSpeed;
  if (pingPongBallX < 0) {
    pingPongBallX = 0;
    pingPongBallDirectionX = 1;
  }
  if (pingPongBallX > window.innerWidth - 100) {
    pingPongBallX = window.innerWidth - 100;
    pingPongBallDirectionX = -1;
  }
  if (pingPongBallY < 0) {
    pingPongBallY = 0;
    pingPongBallDirectionY = 1;
  }
  if (pingPongBallY > window.innerHeight - 100) {
    pingPongBallY = window.innerHeight - 100;
    pingPongBallDirectionY = -1;
  }
  pingPongBall.style.left = pingPongBallX + 'px';
  pingPongBall.style.top = pingPongBallY + 'px';
}, 10);`,
  storm: `/* Make a snowstorm on a black background */
document.body.style.backgroundColor = 'black';
var snow = document.createElement('div');
snow.style.position = 'absolute';
snow.style.top = '0px';
snow.style.left = '0px';
snow.style.width = '100%';
snow.style.height = '100%';
snow.style.zIndex = '-1';
document.body.appendChild(snow);
var snowflakes = [];
var snowflakeCount = 100;
var snowflakeSize = 10;
var snowflakeSpeed = 1;
var snowflakeOpacity = 0.5;
function createSnowflake() {
  var snowflake = document.createElement('div');
  snowflake.style.position = 'absolute';
  snowflake.style.top = '0px';
  snowflake.style.left = '0px';
  snowflake.style.width = snowflakeSize + 'px';
  snowflake.style.height = snowflakeSize + 'px';
  snowflake.style.backgroundColor = 'white';
  snowflake.style.opacity = snowflakeOpacity;
  snowflake.style.borderRadius = '50%';
  snowflake.style.boxShadow = '0px 0px 10px white';
  snowflake.style.zIndex = '-1';
  snowflake.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
  snowflake.style.transition = 'top ' + snowflakeSpeed + 's linear, left ' + snowflakeSpeed + 's linear';
  snow.appendChild(snowflake);
  snowflakes.push(snowflake);
}
for (var i = 0; i < snowflakeCount; i++) {
  createSnowflake();
}
function updateSnowflakes() {
  for (var i = 0; i < snowflakes.length; i++) {
    var snowflake = snowflakes[i];
    var top = parseInt(snowflake.style.top);
    var left = parseInt(snowflake.style.left);
    if (top > window.innerHeight) {
      top = -snowflakeSize;
    }
    if (left > window.innerWidth) {
      left = -snowflakeSize;
    }
    snowflake.style.top = top + snowflakeSpeed + 'px';
    snowflake.style.left = left + snowflakeSpeed + 'px';
  }
}
setInterval(updateSnowflakes, 1000 / 60);`,
};
