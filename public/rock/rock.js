const gameGrid = document.getElementById('game');
const choices = ['rock', 'paper', 'scissors'];
let userChoice;
let computerChoice;
let score = 0;
let tries = 0;
let successes = 0;

const userChoiceDisplay = document.createElement('h1');
const computerChoiceDisplay = document.createElement('h1');
const resultDisplay = document.createElement('h1');
const scoreDisplay = document.createElement('h1');
const triesDisplay = document.createElement('h1');
const successDisplay = document.createElement('h1');

gameGrid.append(
    userChoiceDisplay,
    computerChoiceDisplay,
    resultDisplay,
    scoreDisplay,
    triesDisplay,
    successDisplay
);

const handleClick = (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = 'User choice: ' + userChoice;
    generateComputerChoice();
    getResult();
    tries++;
    updateStats();
}

const generateComputerChoice = () => {
    computerChoice = choices[Math.floor(Math.random() * choices.length)];
    computerChoiceDisplay.innerHTML = 'Computer choice: ' + computerChoice;
}

for (let i = 0; i < choices.length; i++) {
    const button = document.createElement('button');
    button.id = choices[i];
    button.innerHTML = choices[i];
    button.addEventListener('click', handleClick);
    gameGrid.appendChild(button);
}

const getResult = () => {
    switch (userChoice + computerChoice) {
        case 'scissorspaper':
        case 'rockscissors':
        case 'paperrock':
            resultDisplay.innerHTML = 'YOU WIN!';
            incrementScore();
            successes++;
            break;
        case 'paperscissors':
        case 'scissorsrock':
        case 'rockpaper':
            resultDisplay.innerHTML = 'YOU LOSE!';
            break;
        case 'paperpaper':
        case 'scissorsscissors':
        case 'rockrock':
            resultDisplay.innerHTML = "IT'S A DRAW!";
            break;
    }
}
console.log(score)
const incrementScore = () => {
    score++;
    scoreDisplay.innerHTML = 'Score: ' + score;
    // Envoyer le score au serveur via une requête
    fetch('http://localhost:8000/update-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score: score })
    })
        .then(response => {
            // Gérer la réponse du serveur si nécessaire
        })
        .catch(error => {
            // Gérer les erreurs de requête si nécessaire
        });
}

const resetScore = () => {
    score = 0;
    scoreDisplay.innerHTML = 'Score: ' + score;
}

const getScore = () => {
    return score;
}

const updateStats = () => {
    triesDisplay.innerHTML = 'Tries: ' + tries;
    successDisplay.innerHTML = 'Successes: ' + successes;
}

resetScore(); // Réinitialiser le score au démarrage
