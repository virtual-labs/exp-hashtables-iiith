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
            question: "1. Consider a hash table of size seven, with starting index zero, and a hash function (3x + 4)mod7. Assuming the hash table is initially empty, which of the following is the contents of the table when the sequence 1, 3, 8, 10 is inserted into the table using closed hashing? Note that ‘_’ denotes an empty location in the table.", ///// Write the question inside double quotes
            answers: {
                a: "8, _, _, _, _, _, 10", ///// Write the option 1 inside double quotes
                b: " 1, 8, 10, _, _, _, 3", ///// Write the option 2 inside double quotes
 		c: "1, _, _, _, _, _,3", ///// Write the option 3 inside double quotes
                d: "1, 10, 8, _, _, _, 3", ///// Write the option 4 inside double quotes
            },
            correctAnswer: "b" ///// Write the correct option inside double quotes
        },

    {
      question: "2. Consider a hash table of size seven, with starting index zero, and a hash function (3x + 4)mod7. Assuming the hash table is initially empty, which of the following is the contents of the table when the sequence 1, 3, 8, 10 is inserted into the table using closed hashing? Note that ‘_’ denotes an empty location in the table. ",  ///// Write the question inside double quotes
      answers: {
        a: "8, _, _, _, _, _, 10 ",                  ///// Write the option 1 inside double quotes
        b: "1, 8, 10, _, _, _, 3",                  ///// Write the option 2 inside double quotes
	c: "1, _, _, _, _, _,3 ", ///// Write the option 3 inside double quotes
        d: "1, 10, 8, _, _, _, 3", ///// Write the option 4 inside double quotes
              },
      correctAnswer: "b"                ///// Write the correct option inside double quotes
    },

{
      question: "3. Given the following input (4322, 1334, 1471, 9679, 1989, 6171, 6173, 4199) and the hash function x mod 10, which of the following statements are true? i. 9679, 1989, 4199 hash to the same value ii. 1471, 6171 has to the same value iii. All elements hash to the same value iv. Each element hashes to a different value. ",  ///// Write the question inside double quotes
      answers: {
        a: "i only",                  ///// Write the option 1 inside double quotes
        b: " ii only ",                  ///// Write the option 2 inside double quotes
	c: "i and ii only", ///// Write the option 3 inside double quotes
        d: " iii or iv", ///// Write the option 4 inside double quotes
              },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },

{
      question: "4. What is the worst case scenario for bubble sort?Consider a hash table with 100 slots. Collisions are resolved using chaining. Assuming simple uniform hashing, what is the probability that the first 3 slots are unfilled after the first 3 insertions?",  ///// Write the question inside double quotes
      answers: {
        a: "(97 × 97 × 97)/100^3",                  ///// Write the option 1 inside double quotes
        b: "(99 × 98 × 97)/100^3",                  ///// Write the option 2 inside double quotes
	c: "(97 × 96 × 95)/100^3", ///// Write the option 3 inside double quotes
        d: "(97 × 96 × 95)/(3! × 100^3)", ///// Write the option 4 inside double quotes
	 
              },
      correctAnswer: "a"                ///// Write the correct option inside double quotes
    },

{
      question: "5. Which one of the following hash functions on integers will distribute keys most uniformly over 10 buckets numbered 0 to 9 for i ranging from 0 to 2020? ",  ///// Write the question inside double quotes
      answers: {
        a: "h(i) =i^2 mod 10",                  ///// Write the option 1 inside double quotes
        b: "h(i) =i^3 mod 10",                  ///// Write the option 2 inside double quotes
	c: "h(i) = (11 ∗ i^2) mod 10  ", ///// Write the option 3 inside double quotes
        d: "h(i) = (12 ∗ i) mod 10", ///// Write the option 4 inside double quotes
	 
              },
      correctAnswer: "b"                ///// Write the correct option inside double quotes
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
