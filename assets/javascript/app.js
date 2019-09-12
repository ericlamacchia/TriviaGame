// Need to define my lets these will keep track of the various questions correct questions and incorrect questions


let counter = 30;

let currentQuestion = 0;

let score = 0;

let lost = 0;
// need to create one for keeping track of the time

let timer;

function nextQuestion() {

    const isQuestionOver = (quizQuestions.length -1) === currentQuestion;
   

    if (isQuestionOver) {
        
        displayResult();

        
    } 
    
    else {
        currentQuestion++;

        loadQuestion(); 
    }
    
    
}

// Start a timer to keep track of the game doing 30 seconds
function timeUp() {
    clearInterval(timer);
    lost++;
    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
    
}
function countDown() {
    counter--;
    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
    
}

// I need to be able to display my questions as well as my answers
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices; //

// Here I will be creating my timer
$('#time').html('Timer: ' +counter);
    $('#game').html(`
    <h3>${question}</h3>
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
    `);

}
//Here is where i need to display the choices
function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
        
    }

    return result;
    
}
// Need to make sure correct or incorrect answer is chosen
$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const rightAnswer = quizQuestions[currentQuestion].rightAnswer;
    // If the user picks the right answer it displays a fun image and will pause for 3 seconds
    if (rightAnswer === selectedAnswer) {
        //The user will add to correct answers
        score++;
        
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
        
        
    }
    // wrong answers cause a sad image with a 3 second pause
    else {
        lost++;
        
        
        preloadImage('lost')
        setTimeout(nextQuestion, 3 * 1000);
    }
    
    
});
// need to display the score with a message that says you either got it correct or incorrect
function displayResult() {
    const result = `
    <p>You got ${score} questions right</p>
    <p>You missed ${lost} questions</p>
    <p>Total questions ${quizQuestions.length}</p>
    <button class="btn btn-primary" id="reset">Play Again?</button>
    `;
    $('#game').html(result);
    
}
$(document).on('click', '#reset', function () {
    counter = 30;

    currentQuestion = 0;

    score = 0;

    lost = 0;
    
    timer = null;

    loadQuestion();
    
});
function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Questions: ${remainingQuestion}/${totalQuestion}`;


}
function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images [random];
    return randomImage;
}

function preloadImage(status) {
    const rightAnswer = quizQuestions[currentQuestion].rightAnswer;

    if (status === 'win') {
     $('#game').html(`
     <p class="preload-image">Congratulations you are correct!</p>
     <p class="preload-image">The correct answer was <b>${rightAnswer}</b></p>
     <img src="${randomImage(funImages)}"/>
     
     `);   
    }
    else {
        $('#game').html(`
        <p class="preload-image">The correct answer was <b>${rightAnswer}</b></p>
        <p class="preload-image">You lost Bozo!</p>
        <img src="${randomImage(sadImages)}"/>
        `);   
    }
}
//This is where I need to load my questions


$('#start').click(function () {
   $('#start').remove();
   $("#time").html(counter);
   loadQuestion(); 
});