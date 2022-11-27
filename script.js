var timeLeft = 60;
var score = 0;
var startQuiz = document.querySelector("#startQuiz");
var bodyText = document.querySelector("#quizz");
var introText = document.querySelector("#introText");
var timerEl = document.querySelector("#time")
var highScoresEl = document.querySelector("#highscores");
var body = document.body.children[0].children[1];
var container = document.querySelector(".container");
var playAgain = document.createElement("button");
var tryAgainBtn = document.createElement("button");
var clearHighScoresBtn = document.createElement("button");
var lastEval = "";
var lastAnswer;
const localStorageContent = localStorage.getItem('inputs')
var inputs;
        if (localStorageContent === null) {
          inputs = [];
        } else {
          inputs = JSON.parse(localStorageContent);
        }

var question1 = {
  question: "Arrays in JavaScript can be used to store _______.",
  answer1: "1. Numbers and Strings",
  answer2: "2. Other Arrays",
  answer3: "3. Booleans",
  answer4: "4. All of the above",
  correctAnswer: "4. All of the above",
}
var question2 = {
  question: "JavaScript is an ______ language.",
  answer1: "1. Object-Oriented",
  answer2: "2. Object-Based",
  answer3: "3. Procedural",
  answer4: "4. None of the above",
  correctAnswer: "1. Object-Oriented",
};
var question3 = {
  question: "Which of the following keywords is used to define a variable in Javascript?",
  answer1: "1. var",
  answer2: "2. let",
  answer3: "3. Both A and B",
  answer4: "4. None of the above",
  correctAnswer: "3. Both A and B",
};
var question4 = {
  question: "Which of the following methods is used to access HTML elements using Javascript?",
  answer1: "1. getElementbyId()",
  answer2: "2. getElementsByClassName()",
  answer3: "3. Both A and B",
  answer4: "4. None of the above",
  correctAnswer: "3. Both A and B",
};
var question5 = {
  question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
  answer1: "1. Throws an error",
  answer2: "2. Ignores the statements",
  answer3: "3. Gives a warning",
  answer4: "4. None of the above",
  correctAnswer: "2. Ignores the statements",
};
var question6 = {
  question: "Which of the following methods can be used to display data in some form using Javascript?",
  answer1: "1. document.write()",
  answer2: "2. console.log()",
  answer3: "3. window.alert()",
  answer4: "4. All of the above",
  correctAnswer: "4. All of the above",
};
var question7 = {
  question: "How can a datatype be declared to be a constant type?",
  answer1: "1. const",
  answer2: "2. var",
  answer3: "3. let",
  answer4: "4. constant",
  correctAnswer: "1. const",
};
var question8 = {
  question: "When the switch statement matches the expression with the given labels, how is the comparison done?",
  answer1: "1. Both the datatype and the result of the expression are compared.",
  answer2: "2. Only the datatype of the expression is compared.",
  answer3: "3. Only the value of the expression is compared.",
  answer4: "4. None of the above.",
  correctAnswer: "1. Both the datatype and the result of the expression are compared.",
};
var question9 = {
  question: "What keyword is used to check whether a given property is valid or not?",
  answer1: "1. in",
  answer2: "2. is in",
  answer3: "3. exists",
  answer4: "4. lies",
  correctAnswer: "1. in",
};
var question10 = {
  question: "What is the use of the <noscript> tag in Javascript?",
  answer1: "1. The contents are displayed by non-JS-based browsers.",
  answer2: "2. Clears all the cookies and cache.",
  answer3: "3. Both A and B.",
  answer4: "4. None of the above.",
  correctAnswer: "1. The contents are displayed by non-JS-based browsers.",
};

var questionsRemaining = [question1,question2,question3,question4,question5,question6,question7,question8,question9,question10];


highScoresEl.setAttribute("style", "color:purple;");
highScoresEl.addEventListener("click", function(event){
  event.stopPropagation();
  event.preventDefault();
  populateHighscores();
})


var timer;
function startTimer(){
timeLeft=60;
clearInterval(timer);
timer = setInterval(function(){
  timerEl.textContent = timeLeft;
  if(timeLeft > 0) {
    timeLeft--;
  } else if (timeLeft <=0){
  clearInterval(timer);
  enterInitials();
  }
}, 1000);
}

function presentQuestions(){
  var ol = document.createElement("ol");
  var li1 = document.createElement("li");
  var li2 = document.createElement("li");
  var li3 = document.createElement("li");
  var li4 = document.createElement("li"); 
  var br1 = document.createElement("br");
  var br2 = document.createElement("br");
  var br3 = document.createElement("br");
  var br4 = document.createElement("br");
  var br5 = document.createElement("br");
  var line = document.createElement("p");
  var h4 = document.createElement("h4");
  


    bodyText.textContent = "";
    introText.textContent = "";
    h4.textContent = "";
    startQuiz.remove();
    if (questionsRemaining < 1){questionsRemaining = [question1,question2,question3,question4,question5,question6,question7,question8,question9,question10];}
    var randomIndex = Math.floor(Math.random() * questionsRemaining.length);
    var randomQuestion = questionsRemaining.splice(randomIndex,1)[0];
    var questionPresent = randomQuestion;
    li1.textContent = questionPresent.answer1;
    li2.textContent = questionPresent.answer2;
    li3.textContent = questionPresent.answer3;
    li4.textContent = questionPresent.answer4;
    h4.textContent = "Last Question: " +lastEval 
    container.children[1].setAttribute("style", "text-align: left;");
    li1.setAttribute("style", " display: table; background-color: purple; color:white; padding: 5px; margin-bottom: -15px;");
    li2.setAttribute("style", " display: table; background-color: purple; color:white; padding: 5px; margin-bottom: -15px;");
    li3.setAttribute("style", " display: table; background-color: purple; color:white; padding: 5px; margin-bottom: -15px;");
    li4.setAttribute("style", " display: table; background-color: purple; color:white; padding: 5px; margin-bottom: -15px;");
    bodyText.textContent = questionPresent.question;
    introText.appendChild(ol);
    ol.appendChild(li1);
    ol.appendChild(br1);
    ol.appendChild(li2);
    ol.appendChild(br2);
    ol.appendChild(li3);
    ol.appendChild(br3);
    ol.appendChild(li4);
    ol.appendChild(br4);
    introText.appendChild(line);
    line.textContent = "__________________________________________________";
    introText.appendChild(h4);
    introText.appendChild(br5);

    li1.addEventListener("mouseover", function () {
        this.style.fontSize = "150%";
        this.style.cursor = "grab";
  
  
      });
      li1.addEventListener("mouseout", function () {
        this.style.fontSize = "100%";
        this.style.cursor = "point";
  
      });
  
      li1.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        lastAnswer = this.textContent;
        if (lastAnswer === questionPresent.correctAnswer) {
          score = score + 10;
          lastEval = "Correct!";
          presentQuestions();
        } else {
          lastEval = "Wrong!";
          timeLeft = timeLeft - 10;
          presentQuestions();
        }
      });
  
      li2.addEventListener("mouseover", function () {
        this.style.fontSize = "150%";
        this.style.cursor = "grab";
  
  
      });
      li2.addEventListener("mouseout", function () {
        this.style.fontSize = "100%";
        this.style.cursor = "point";
  
      });
  
      li2.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        lastAnswer = this.textContent;
        if (lastAnswer === questionPresent.correctAnswer) {
          score = score + 10;
          lastEval = "Correct!";
          presentQuestions();
        } else {
          lastEval = "Wrong!";
          timeLeft = timeLeft - 10;
          presentQuestions();
        }
      });
  
      li3.addEventListener("mouseover", function () {
        this.style.fontSize = "150%";
        this.style.cursor = "grab";
  
  
      });
      li3.addEventListener("mouseout", function () {
        this.style.fontSize = "100%";
        this.style.cursor = "point";
  
      });
  
      li3.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          lastAnswer = this.textContent;
        if (lastAnswer === questionPresent.correctAnswer) {
          score = score + 10;
          lastEval = "Correct!";
          presentQuestions();
        } else {
          lastEval = "Wrong!";
          timeLeft = timeLeft - 10;
          presentQuestions();
        }
      });
  
      li4.addEventListener("mouseover", function () {
        this.style.fontSize = "150%";
        this.style.cursor = "grab";
  
  
      });
      li4.addEventListener("mouseout", function () {
        this.style.fontSize = "100%";
        this.style.cursor = "point";
  
      });
  
      li4.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        lastAnswer = this.textContent;
        if (lastAnswer === questionPresent.correctAnswer) {
          score = score + 10;
          lastEval = "Correct!";
          presentQuestions();
        } else {
          lastEval = "Wrong!";
          timeLeft = timeLeft - 10;
          presentQuestions();
          return;
        }
      });
}

function enterInitials(){
  timerEl.textContent = "0";
  introText.textContent = "";
  bodyText.textContent = "Times Up!";
  introText.textContent = "You scored " + score + " points!" + "\nEnter your initials.";
  var br1 = document.createElement("br");
  var br2 = document.createElement("br");
  var initialsInput = document.createElement("INPUT");
  var submitInitialsBtn = document.createElement("button");
  submitInitialsBtn.innerHTML = "Submit";
  introText.appendChild(br1);
  introText.appendChild(initialsInput);
  introText.appendChild(br2);
  introText.appendChild(submitInitialsBtn);
  initialsInput.label = "initials";
  submitInitialsBtn.formMethod = "post";
  submitInitialsBtn.label = "initials";
  score.label = "score";
  submitInitialsBtn.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var hs = {
      initials: initialsInput.value,
      score: score.valueOf(),
    };
    inputs.push(hs);
    inputs = inputs.sort(function (a, b) { return b.score - a.score; });
    localStorage.setItem('inputs', JSON.stringify(inputs));

    bodyText.textContent = "High Scores";
    bodyText.setAttribute("style", "text-align: center;");
    introText.textContent = "";

    for (i = 0; i < inputs.length; i++) {
      var li = document.createElement("li");
      li.textContent = inputs[i].score + " - " + inputs[i].initials;
      li.setAttribute("style", "display: block; background-color: purple; color:white; padding: 5px; margin-bottom: 5px;");
      introText.appendChild(li);
    }
    clearHighScoresBtn.textContent = "Clear High Scores";
    introText.appendChild(clearHighScoresBtn);
    clearHighScoresBtn.addEventListener("click", function () {
      event.preventDefault();
      event.stopPropagation();
      bodyText.textContent = "High Scores Cleared!";
      introText.textContent = "";
      inputs.splice(0, inputs.length);
      localStorage.setItem('inputs', JSON.stringify(inputs));
      tryAgainBtn.textContent = "Try Again";
      introText.appendChild(tryAgainBtn);
      tryAgainBtn.addEventListener("click", function(event){
          event.preventDefault();
          event.stopPropagation();
          timeLeft = 60;
          quizBegins();
    })
    });

    tryAgainBtn.textContent = "Try Again";
    introText.appendChild(tryAgainBtn);
    tryAgainBtn.addEventListener("click", function(event){
          event.preventDefault();
          event.stopPropagation();
          timeLeft = 60;
          quizBegins();
    })
  })
}

function quizBegins(){
  var questionsRemaining = [question1,question2,question3,question4,question5,question6,question7,question8,question9,question10];
  lastEval = ""
  score = 0;
  startTimer();
  presentQuestions();
}

function populateHighscores(){
  clearInterval(timer)
  startQuiz.remove();
  bodyText.textContent = "High Scores";
  bodyText.setAttribute("style", "text-align: center;");
  introText.textContent = "";

  for (i = 0; i < inputs.length; i++) {
    var li = document.createElement("li");
    li.textContent = inputs[i].score + " - " + inputs[i].initials;
    li.setAttribute("style", "display: block; background-color: purple; color:white; padding: 5px; margin-bottom: 5px;");
    introText.appendChild(li);
  }
    clearHighScoresBtn.textContent = "Clear High Scores";
    introText.appendChild(clearHighScoresBtn);
    clearHighScoresBtn.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    bodyText.textContent = "High Scores Cleared!";
    introText.textContent = "";
    inputs.splice(0, inputs.length);
    localStorage.setItem('inputs', JSON.stringify(inputs));
    tryAgainBtn.textContent = "Try Again";
    introText.appendChild(playAgain);
    })

    tryAgainBtn.addEventListener("click", function(event){
        event.preventDefault();
        event.stopPropagation();
        timeLeft = 60;
        quizBegins();
      })


      tryAgainBtn.textContent = "Try Again";
  introText.appendChild(tryAgainBtn);
  tryAgainBtn.addEventListener("click", function(event){
        event.preventDefault();
        event.stopPropagation();
        timeLeft = 60;
        quizBegins();
  })

}

startQuiz.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  quizBegins();
})