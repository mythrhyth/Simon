let randomNumber;
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let score = 0;
let isGameActive = false;
let isPaused = false;
let leaderboard = [];

$("#start-btn").on("click", function() {
  if (!isGameActive) {
    startGame();
  }
});

$("#pause-btn").on("click", function() {
  isPaused = !isPaused;
  $("#pause-btn").text(isPaused ? "Resume" : "Pause");
});

$("#restart-btn").on("click", function() {
  startOver();
});

$(".btn").on("click", function(ev) {
  if (isGameActive && !isPaused) {
    let userChosenColour = ev.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function startGame() {
  isGameActive = true;
  level = 0;
  score = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("#score").text("Score: " + score);
  nextSequence();
}

function nextSequence() {
  if (isPaused) return;
  
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => $("#" + currentColour).removeClass("pressed"), 100);
}

function checkAnswer(index) {
  if (gamePattern[index] === userClickedPattern[index]) {
    if (index + 1 === gamePattern.length) {
      score += 10;
      $("#score").text("Score: " + score);
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => $("body").removeClass("game-over"), 200);
  $("#level-title").text("Game Over, Press 'Restart' to Try Again");
  updateLeaderboard();
  isGameActive = false;
}

function startOver() {
  isGameActive = false;
  isPaused = false;
  $("#pause-btn").text("Pause");
  startGame();
}

function updateLeaderboard() {
  // leaderboard.push({ level: level, score: score });
  leaderboard.sort((a, b) => b.score - a.score);
  $("#leaderboard").empty();
  leaderboard.forEach((entry, index) => {
    $("#leaderboard").append(`<li>Level ${entry.level}: ${entry.score} points</li>`);
  });
}
