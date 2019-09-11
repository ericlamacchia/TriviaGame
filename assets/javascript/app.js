// Need to define my lets these will keep track of the various questions correct questions and incorrect questions


let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
// need to create one for keeping track of the time
let timer;

// I need to be able to display my questions as well as my answers
function loadQuestion() {
    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;
// Here I will be creating my timer
$('#time').html('Timer: ' +counter);
    $('#game').html(`
    <h3>${question}</h3>
    ${loadChoices(choices)}
    `);

}
function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
        
    }
    return result;
    
}
//This is where I need to load my questions
loadQuestion();