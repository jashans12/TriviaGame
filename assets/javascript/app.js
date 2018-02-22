(function() {
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );

        // Start the timer
        timer();

      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
  
      // keep track of user's answers
      let numCorrect = 0;
      let numIncorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          // if answer is wrong or blank
          // add to the number of incorrect answers
          numIncorrect++;
          // color the answers red
          answerContainers[questionNumber].style.color = "red";
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length} correct!`;
      // show number of incorrect answers out of total
      wrongContainer.innerHTML = `${numIncorrect} out of ${myQuestions.length} incorrect`;
    }

    function timer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
      }
    
        //  The decrement function.
        function decrement() {
            //  Decrease number by one.
            number--;
            //  Show the number in the #show-number tag.
            $("#showTimer").html("<h2>" + number + "</h2>");
            //  Once number hits zero...
            if (number === 0) {
              //  ...run the stop function.
              stop();
              //  Alert the user that time is up.
              alert("Time Up!");
              showResults();
            }
          }

        //  The stop function
    function stop() {
      //  Clears our intervalId
      //  We just pass the name of the interval
      //  to the clearInterval function.
      clearInterval(intervalId);
    }

  
    var number = 20;
    var intervalId;
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const wrongContainer = document.getElementById("wrong");
    const submitButton = document.getElementById("submit");
    const myQuestions = [
      {
        question: "Name the actress who plays Maria Hill.",
        answers: {
          a: "Cobie Smulders",
          b: "Kat Dennings",
          c: "Hayley Atwell",
          d: "Emily Vancamp"
        },
        correctAnswer: "a"
      },
      {
        question: "What weapon is Fandral known best to use?",
        answers: {
          a: "Bow and arrow",
          b: "Axe",
          c: "Rapier",
          d: "A pair of daggers"
        },
        correctAnswer: "c"
      },
      {
        question: "Which of these characters DID NOT wear an Iron Man suit in 'Iron Man 3'?",
        answers: {
          a: "James 'Rhodey' Rhodes",
          b: "Pepper Potts",
          c: "President Ellis",
          d: "Happy Hogan"
        },
        correctAnswer: "d"
      },
      {
        question: "Who is Loki's biological father?",
        answers: {
          a: "Odin",
          b: "Jotunn",
          c: "The Hulk",
          d: "Laufey"
        },
        correctAnswer: "d"
      },
      {
        question: "Who's Loki's daddy?",
        answers: {
          a: "Ego",
          b: "Jotunn",
          c: "The Hulk",
          d: "Laufey"
        },
        correctAnswer: "c"
      },
    ];
  
    // display quiz when button is clicked
    start.addEventListener("click", buildQuiz);
    // buildQuiz();
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
  })();