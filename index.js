// 1. apply sound to the colors
// 2. create an array that will store the pattern of color used
// 3. check if the array pattern is followed
// 3.5 if the player failed then end the game
// 4. else if the player managed to follow the correct pattern then repeat and extend the array

// variables
var audio;
var color = "";
var counter = 0;
var pattern = new Array();
var resettableCounter = 0;

// functions
function checker(clicked_id) {
  if (resettableCounter === pattern.length-1) {
    if(clicked_id === pattern[resettableCounter]) {
      colorSorter();
      $("#level-title").text("Level " + pattern.length);
      resettableCounter = 0;

      return true;
    }

    else {
      resetCompiled();

      return false;
    }
  }

  else if (clicked_id === pattern[resettableCounter]) {
    resettableCounter++;
    return true;
  }

  else {
    resetCompiled();

    return false;
  }
}

function colorFade(color) {
  $("#" + color).fadeToggle("fast");
  setTimeout(function() {
    $("#" + color).fadeToggle("fast");
  }, 100);
}

function colorPressed(clicked_id) {
  var soundChecker = checker(clicked_id);
  $("#" + clicked_id).addClass("pressed")
  setTimeout(function() {
    $("#" + clicked_id).removeClass("pressed")
  }, 100);
  if(soundChecker) {
      soundColor(clicked_id);
  }
}

function colorSorter() {
  var number = randomNumberGenerator();

  switch (number) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "red";
      break;
    case 2:
      color = "yellow";
      break;
    case 3:
      color = "blue";
      break;
    default:
  }

  colorFade(color);
  pattern[counter] = color;
  counter++;
}

function gameOver() {
  audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over")
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 100);
  $("#level-title").text("Game Over, Press Any Key To Start");
}

function randomNumberGenerator() {
  return Math.floor(Math.random() * 4);
}

function soundColor(clicked_id) {
  audio = new Audio("sounds/" + clicked_id + ".mp3");
  audio.play();
}

function reset() {
  color = "";
  counter = 0;
  pattern = new Array();
  resettableCounter = 0;
}

function resetCompiled() {
  gameOver();
  reset();
  start();
}

function start() {
  $(document).keypress(function() {
    if (pattern.length < 1) {
      colorSorter();
    }
    $("#level-title").text("Level " + pattern.length);
    $(document).off("keypress");
  });
}

start();
