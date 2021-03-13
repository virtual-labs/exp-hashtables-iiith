 /////////////////////////////////////////////////////////////////////////////

 /////////////////////// Do not modify the below code ////////////////////////

 /////////////////////////////////////////////////////////////////////////////

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
         });

         // finally combine our output list into one string of HTML and put it on the page
         quizContainer.innerHTML = output.join("");
     }

     function showResults() {
         // gather answer containers from our quiz
         const answerContainers = quizContainer.querySelectorAll(".answers");

         // keep track of user's answers
         let numCorrect = 0;

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
                 //answerContainers[questionNumber].style.color = "lightgreen";
             } else {
                 // if answer is wrong or blank
                 // color the answers red
                 answerContainers[questionNumber].style.color = "red";
             }
         });

         // show number of correct answers out of total
         resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
     }

     const quizContainer = document.getElementById("quiz");
     const resultsContainer = document.getElementById("results");
     const submitButton = document.getElementById("submit");


     /////////////////////////////////////////////////////////////////////////////

     /////////////////////// Do not modify the above code ////////////////////////

     /////////////////////////////////////////////////////////////////////////////






     /////////////// Write the MCQ below in the exactly same described format ///////////////


     const myQuestions = [{
            question: "1. Which of the following is not a disadvantage to the usage of array?", ///// Write the question inside double quotes
            answers: {
                a: " Fixed size", ///// Write the option 1 inside double quotes
                b: "You know the size of the array prior to allocation ", ///// Write the option 2 inside double quotes
                c: " Insertion based on position ", ///// Write the option 2 inside double quotes
                d: "Accessing elements at specified positions", ///// Write the option 2 inside double quotes
            },
            correctAnswer: "d" ///// Write the correct option inside double quotes
        },

    {
      question: "2. What is the time complexity to count the number of elements in the linked list? ",  ///// Write the question inside double quotes
      answers: {
        a: "O(1)",                  ///// Write the option 1 inside double quotes
        b: "O(n)",                  ///// Write the option 2 inside double quotes
	c: "O(NLogN)", ///// Write the option 3 inside double quotes
        d: "None of the mentioned", ///// Write the option 4 inside double quotes
             },
      correctAnswer: "b"                ///// Write the correct option inside double quotes
    },

{
      question: "3. What is the space complexity for deleting a linked list?",  ///// Write the question inside double quotes
      answers: {
        a: " O(1)",                  ///// Write the option 1 inside double quotes
        b: "O(n)",                  ///// Write the option 2 inside double quotes
	c: "Either O(1) or O(n)", ///// Write the option 3 inside double quotes
        d: " O(logn)", ///// Write the option 4 inside double quotes
             },
      correctAnswer: "a"                ///// Write the correct option inside double quotes
    },
{
      question: "4. Which of these is an application of linked lists? ",  ///// Write the question inside double quotes
      answers: {
        a: "To implement file systems",                  ///// Write the option 1 inside double quotes
        b: "For separate chaining in hash-tables ",                  ///// Write the option 2 inside double quotes
	c: "To implement non-binary trees ", ///// Write the option 3 inside double quotes
        d: "All of the mentioned ", ///// Write the option 4 inside double quotes
             },
      correctAnswer: "d"                ///// Write the correct option inside double quotes
    },
{
      question: "4. What is the search complexity in Simple Uniform Hashing? ",  ///// Write the question inside double quotes
      answers: {
        a: "O(n) ",                  ///// Write the option 1 inside double quotes
        b: "O(logn)  ",                  ///// Write the option 2 inside double quotes
	c: "O(nlogn) ", ///// Write the option 3 inside double quotes
        d: "O(1) ", ///// Write the option 4 inside double quotes
             },
      correctAnswer: "d"                ///// Write the correct option inside double quotes
    },
     ];




     /////////////////////////////////////////////////////////////////////////////

     /////////////////////// Do not modify the below code ////////////////////////

     /////////////////////////////////////////////////////////////////////////////


     // display quiz right away
     buildQuiz();

     // on submit, show results
     submitButton.addEventListener("click", showResults);
 })();


 /////////////////////////////////////////////////////////////////////////////

 /////////////////////// Do not modify the above code ////////////////////////

 /////////////////////////////////////////////////////////////////////////////
