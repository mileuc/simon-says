//alert("Hello");

//list of button colours to choose from
var buttonColours = ["red", "blue", "green", "yellow"];

//arrays to store the color patterns from the game and the user
var gamePattern = [];
var userClickedPattern = [];

//variable to indicate if the game has started
var started = false;
//variable for the game level
var level = 0;

//keypress event listener to start the game
$(document).keypress(function() {
    if (started === false){
        $(".level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//button click event listener to detect for button clicks after the game is started
$(".btn").click(function() {
    if (level > 0){
        var userChosenColour = $(this).attr("id"); //grab id of the button object that triggered click event
        userClickedPattern.push(userChosenColour); //add color id to end of  the user input array
        // console.log(userClickedPattern);
        playSound(userChosenColour); //play sound of the clicked color button
        animatePress(userChosenColour); //animate the clicked color button
        checkAnswer(userClickedPattern.length - 1); //check user answer against the game pattern answer
    }
});

//mechanics for new level
function nextSequence() {
    
    userClickedPattern = []; //empty out user pattern array

    level += 1; //increase level by 1

    $(".level-title").text("Level " + level); //new h1 denoting the new level
    $(".simon-pic").attr("src", "images/simon_says.png") //simon's face while game is ongoing


    var randomNumber = Math.floor(Math.random() * 4); //random number from 0-3
    var randomChosenColour = buttonColours[randomNumber]; //choose a random colour with the random number
    gamePattern.push(randomChosenColour); //add the random colour to game pattern array

    //animation to flash the button that was randomly chosen
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //duration in ms
    //play sound of the randomly chosen color
    playSound(randomChosenColour);
}

//play sound of the clicked button or randomly chosen button
function playSound(name) {
    var buttonSound = new Audio("sounds/" + name + ".mp3");
    buttonSound.play();
}

//animate button that was clicked by adding, then removing the pressed CSS class
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout (function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//check user answer against the game pattern
function checkAnswer(currentLevel) {
    //if the user input matches the corresponding game input
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        //console.log("success");
        //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if(userClickedPattern.length === gamePattern.length) {
            //simon's face of approval after all the buttons are correct
            $(".simon-pic").attr("src", "images/simon_right.png");
            //start the next level after a 1 secdon delay
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        //if user gets a button wrong in the sequence
        //console.log("wrong");
        playSound("wrong");

        $(".level-title").text("Game Over! Press any key to restart").addClass("smaller-font");
        $(".simon-pic").attr("src", "images/simon_wrong.png");

        //apply game-over CSS for a 200ms, then remove
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        //reset level, game starter indicator, and empty the game color pattern.
        startOver();
    }
}

//reset level, game starter indicator, and empty the game color pattern.
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}


