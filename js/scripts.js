//BUSINESS LOGIC//
function Game (cards1, cards2){ //<--object--//
  this.cardsOne = cards1;
  this.cardsTwo = cards2;
}

var buildCards = function(numberOfCards){ //---generates an array from 1 to 6 and pushes each # to empty cardsArray--//
  var cardsArray = [];
  for(i=1; i <= numberOfCards; i++){
    cardsArray.push(i);
  }
  return cardsArray;
}

var buildTotalArray = function(cardsOneArray, cardsTwoArray){ ///- 2 loops that manipulats 2 existing arrays---//
  var totalArray = [];
  for(i = 0; i < cardsOneArray.length; i++){
    totalArray.push(cardsOneArray[i]);
  }
  for(i = 0; i < cardsTwoArray.length; i++){
    totalArray.push(cardsTwoArray[i]);
  }

  return totalArray;
}

function Card (cardValue, className){
  this.cardValue = cardValue;
  this.class = className;
}

function HighScore(player, score){
this.player = player;
this.score = score;
}

function checkWin(winCounter) {
  if (winCounter === numberOfCards) {
    alert("Game Over!");
    var highScore = new HighScore(player, turnCounter);
    updateHighScores(highScore);
    updateHighScoreDisplay();
    turnCounter = 0;
  }
}

function determineDifficulty() {
  if (difficulty === "Easy") {
    return highScoreArrayEasy
  } else if (difficulty === "Medium") {
    return highScoreArrayMedium
  } else {
    return highScoreArrayHard
  }
}

function updateHighScores(highScore) {
  for (var i = 0; i < 3; i++) {
    var targetArray = determineDifficulty(); // Picks the right array to use for the difficulty level
    if (highScore.score < targetArray[i].score) {
      targetArray[i+2] = targetArray[i+1];
      targetArray[i+1] = targetArray[i];
      targetArray[i] = highScore;
      targetArray = targetArray.slice(0, 3);
      break;
    }
  }
}

function updateHighScoreDisplay() {
  var targetArray = determineDifficulty(); // Picks the right array to use for the difficulty level
  $(".user1-name").text(targetArray[0].player);
  $(".user1-score").text(targetArray[0].score);
  $(".user2-name").text(targetArray[1].player);
  $(".user2-score").text(targetArray[1].score);
  $(".user3-name").text(targetArray[2].player);
  $(".user3-score").text(targetArray[2].score);
}

var defaultScores = new HighScore("Player", 200);
var highScoreArrayEasy = [defaultScores, defaultScores, defaultScores];
var highScoreArrayMedium = [defaultScores, defaultScores, defaultScores];
var highScoreArrayHard = [defaultScores, defaultScores, defaultScores];
var turnCounter = 0;
var player;
var numberOfCards;
var difficulty = "Easy";


//USER LOGIC//
$(document).ready(function(){

  $("#player").submit(function(event){
    player = $("#playerName").val();
    $("#player ul#name").text(player);
  });

  var columns = "col-xs-4";
  var numberOfColumns = 3;
  var icons = ["sun", "water", "fire", "moon", "wind", "earth"];
  var numberOfCards = 6;
  var difficulty = "Easy";
  var numberOfRows = 4;
  var layoutId = 0;


  $("#level1").click(function(){
    $("form .row").empty();
    columns = "col-xs-4";
    numberOfColumns = 3;
    icons = ["sun", "water", "fire", "moon", "wind", "earth"];
    numberOfCards = 6;
    difficulty = "Easy";
    numberOfRows = 4;
    layoutId = 0;
    updateHighScoreDisplay();

  });

  $("#level2").click(function(){
    $("form .row").empty();

    columns = "col-xs-2";
    numberOfColumns = 5;
    icons = ["tree", "mountain", "rock", "rain", "sun", "water", "fire", "moon", "wind", "earth"];
    numberOfCards = 10;
    difficulty = "Medium";
    layoutId = "layout";
    numberOfRows = 4;
    updateHighScoreDisplay();

  });

  $("#level3").click(function(){
    $("form .row").empty();

    columns = "col-xs-2";
    numberOfColumns = 6;
    icons = ["tree", "mountain", "rock", "rain", "sun", "water", "fire", "moon", "wind", "earth", "flower", "snow", "cloud", "star", "leave"];
    numberOfCards = 15;
    numberOfRows =  5;
    layoutId = 0;
    difficulty = "Hard";
    updateHighScoreDisplay();

  });



  $("form").submit(function(event){
    event.preventDefault();
    $("form .row").empty();
    console.log(icons);

    var cards1 = buildCards(numberOfCards);
    var cards2 = buildCards(numberOfCards);
    var newGame = new Game(cards1, cards2);
    var combinedArrays = buildTotalArray(newGame.cardsOne, newGame.cardsTwo);

    var shuffledArray = [];
    var cardObjectsArray = [];


    counter2 = 0
    for(i=0; i < combinedArrays.length; i++){
      var newCard = new Card(combinedArrays[i], icons[counter2]);
      cardObjectsArray.push(newCard);
       counter2 = counter2 + 1
       if (counter2 === icons.length){
         counter2 = 0;
       }
    }

    var lengthOfCardObjectsArray = cardObjectsArray.length;

    for(i = 0; i < (shuffledArray.length + cardObjectsArray.length); i++){
      var randomValue = cardObjectsArray.splice((Math.floor(Math.random() * lengthOfCardObjectsArray)), 1);
      shuffledArray.push(randomValue);
      lengthOfCardObjectsArray = lengthOfCardObjectsArray - 1;

    }

    var newArray = [];

    for(i = 0; i < (shuffledArray.length + cardObjectsArray.length); i++){
      newArray = newArray.concat(shuffledArray[i]);
    }

    var hTMLelement = $(".main-content .row");
    var counter = 0;
    for(i = 0; i < numberOfRows; i++){
      for(j = 0; j < numberOfColumns; j++){
        if (counter !== 30){
          $(hTMLelement[i]).append('<div id = "' + layoutId +'" class="' + columns + '"><li class="back ' + newArray[counter].class + '">' + newArray[counter].cardValue + '</li></div>');
          counter += 1;
        }
      }

    }
    var winCounter = 0;
    var lastClicked;
    $("li").click(function(){
      if (this != lastClicked){
        $(this).removeClass("back");
        $(this).fadeIn(500);
        turnCounter ++;
        if ($(this).attr('class') === $(lastClicked).attr('class')) {
          lastClicked = $(".hiddenPlaceholder");
          winCounter ++;
          checkWin(winCounter);
        }
        else {
        $(lastClicked).addClass("back");
        lastClicked = this;
        }
        $("#score").text("Number of clicks: " + turnCounter);
      }
    });
  });

  $("button").trigger("submit");

});
