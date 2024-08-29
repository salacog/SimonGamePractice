var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var patternOk = true;


var redSound = new Audio('./sounds/red.mp3');
var blueSound = new Audio('./sounds/blue.mp3');
var greenSound = new Audio('./sounds/green.mp3');
var yellowSound = new Audio('./sounds/yellow.mp3');
var wrongSound = new Audio('./sounds/wrong.mp3');

keyDownEvent();

//keydown listener to initialize the game
function keyDownEvent(){
    $(document).on("keydown", function(){
    $(document).off("keydown");
    newStart();
    nextSecuence();
    });
}


//Color buttons event listener
function buttonEvent(){
    $(".btn").on("click", function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    validatePatern();
    });
}


//Creates the new sequence
function nextSecuence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    if(level == 1){
        $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
        playSound(randomChosenColour);
    }
    else{
        setTimeout(function () {
         
        $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
        playSound(randomChosenColour);

        }, 1000);

    }
    userClickedPattern = [];
    console.log(randomChosenColour);
    

}

function playSound(colour){
    switch(colour){
        case ("red"):
            redSound.play();
            break;
        
        case ("blue"):
            blueSound.play();
            break;
        
        case ("green"):
            greenSound.play();
            break;

        case ("yellow"):
            yellowSound.play();
            break;
        
        case ("wrong"):
            wrongSound.play();
            break;

        default:
            break;
    }
}

function animatePress(colour){
    $("#"+ colour).addClass("pressed").delay(150).queue(function(){
        $("#" + colour).removeClass("pressed").dequeue();
        
    });
    
}

//Validate comparing clicked pattern against game pattern
function validatePatern(){
    var count = userClickedPattern.length;

    for (var i=0; i<count; i++){
        if (userClickedPattern[i] != gamePattern[i]){
            $("#level-title").text("Game over at level " + level + "! Press any key to restart");
            playSound("wrong");
            $("body").addClass("game-over").delay(200).queue(function(){
                $("body").removeClass("game-over").dequeue();
            });
            $(".btn").off("click");
            patternOk = false;
            //Activate again keydown listener to restart the game
            keyDownEvent();
        }
    }
    if(gamePattern.length == userClickedPattern.length && patternOk == true){
        nextSecuence();
    }

}

function newStart(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    patternOk = true;
    buttonEvent();
}