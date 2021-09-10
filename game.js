var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; //this array takes care of the original sequence of colors.
var userClickedPattern = [];  //this array will store the pattern in which user selects the colors.

var started = false;
var level = 0;
//this will take c are of any keypress within the document to start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence(); 
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
//if the pattern entered by user matches with the game pattern then again nextSequence is called and the level increases
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 200);
      }
    }
    //else wrong sound is play, background changes and h1's text changes using jQuery
     else {
      playSound("wrong");
      $("body").addClass("game-over"); //on adding class game over the background will change to crimson 
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);  //after 200ms remove the "game-over" class which means the background color reverts back to black color

      startOver(); //and we start the game again from level 0
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level); //to change the h1 to the level (changing)
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]; //creates a random number between 0 to 3
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //using jQuery to select the id of the specified color and giving                                                                       animation effect of fadeIn and fadeOut
  playSound(randomChosenColour);
}

//function which gives animation effect as a flash to the buttons on pressing. it adds the class"pressed" to the button and removes it after a time interval of 150ms.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

//thsi function takes the randomChosenColor as parameter and concatenates it as a string to get the file name of sounds.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//function to start the game again from level 0
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
