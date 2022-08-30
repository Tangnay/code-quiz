var clearHighScore = document.getElementById ('btn-clear'); 
var goBack = document.getElementById ('btn-go-back');
var highScore = document.getElementById ('highscore');



clearHighScore.addEventListener ('click', clearHighScoreHandler); 
function clearHighScoreHandler () {
  localStorage.removeItem ('finalScore');

}

goBack.addEventListener ('click', goBackListener); 
function goBackListener () {
  location.replace ('./index.html');

}

window.onload = function() {
  

  var displayScores = JSON.parse (localStorage.getItem('finalScore'));
  if (displayScores !== null) {
    for (var i = 0; i < displayScores.length; i++) {

      var createLi = document.createElement("li");
      createLi.textContent = displayScores[i].initial + " " + displayScores[i].score;
      highScore.appendChild(createLi);

  }
 }
}