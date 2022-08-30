var timer = document.getElementById ('timer');
var btn = document.getElementById('btn-start');
var currentQuestion = 1; 
var score = 0; 
var penalty = 5; 
var secondLeft = 75; 
var lastQuestionNumber = 4; 
var clearInterval 


function allDoneScreen () {
  
  var questionContainer = document.querySelector('.question-container'); 
  var allDoneContainer = document.querySelector('.all-done-container');
  var finalScore = document.getElementById ('final-score');
  var submitBtn = document.getElementById ("submit-btn"); 

   
  allDoneContainer.classList.remove('hidden');
  submitBtn.addEventListener ('click', submitHandler);
  questionContainer.classList.add('hidden');
  clearInterval(timeInterval); 
  timer.textContent = '';
  finalScore.textContent = score;

}

function submitHandler () {
  var initial = document.getElementById ('initial').value ; 
  var histories = JSON.parse(localStorage.getItem ('finalScore'));
  var userScore = {

    score: score, 
    initial: initial 
  
} ; 
  if (histories === null ){
    histories = []; 
  }
  histories.push(userScore);

 
  localStorage.setItem("finalScore" , JSON.stringify (histories));
  window.location.replace("./score.html");


}

function countdown () {
  
  timeInterval = setInterval (function (){
    if (secondLeft >= 0 ) {
      timer.textContent = secondLeft; 
      secondLeft--; 
    } else {
      allDoneScreen();
    }
  }, 1000 );
  
}

function startQuize () {
  countdown (); 
  render (currentQuestion);
}
 
//added event listener
btn.addEventListener ('click', startQuize); 

function render (num) {
  var questionEl = document.getElementById('question-' + num ); 
  questionEl.classList.remove("hidden");
  var btns = questionEl.querySelectorAll ('.answer'); 
  var answer = questionEl.getAttribute ('data-answer');
  

  btns.forEach(function(btnEl){
    var currentSelection = btnEl.textContent.trim(); 
    btnEl.addEventListener ('click', function(){
      var divText = document.getElementById("result"); 
      
      if (currentSelection == answer) {
        score++;
        divText.textContent = "Correct! The answer is:  " + answer;
        
      } else {
        secondLeft = secondLeft - penalty;
        divText.textContent = "Wrong! The correct answer is:  " + answer;
      }
      currentQuestion++; 
      if (currentQuestion <= lastQuestionNumber) {
        questionEl.classList.add("hidden");
        render (currentQuestion); 
      } else {
        allDoneScreen (); 
      }
 
    })
  });
}

