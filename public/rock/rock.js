const gameGrid = document.getElementById('game');
const choices = ['pierre', 'feuille', 'ciseaux'];
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
    userChoiceDisplay.innerHTML = 'Votre choix: ' + userChoice;
    generateComputerChoice();
    getResult();
    tries++;
    updateStats();
}

const generateComputerChoice = () => {
    computerChoice = choices[Math.floor(Math.random() * choices.length)];
    computerChoiceDisplay.innerHTML = 'Ordinateur: ' + computerChoice;
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
        case 'ciseauxpapier':
        case 'pierreciseaux':
        case 'papierpierre':
            resultDisplay.innerHTML = 'Vous avez gagné!';
            incrementScore();
            successes++;
            break;
        case 'papierciseaux':
        case 'ciseauxpierre':
        case 'pierrepapier':
            resultDisplay.innerHTML = 'Perdu!';
            break;
        case 'papierpapier':
        case 'ciseauxciseaux':
        case 'pierrepierre':
            resultDisplay.innerHTML = "Egalité !!";
            break;
    }
}
console.log(score)
const incrementScore = () => {
    score++;
    scoreDisplay.innerHTML = 'Score: ' + score;
    // Envoyer le score au serveur via une requête fetch
    fetch('/update_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //prend en compte l'objet et le renvoi en chaine de caractere
        body: JSON.stringify({ score: score })
    })
        .then(r => {
            return r.json()
        }
        )
        .catch(e => {
           console.error('une erreur est survenue', e)
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
    triesDisplay.innerHTML = 'Essais ' + tries;
    successDisplay.innerHTML = 'Victoire ' + successes;
}

resetScore(); // Réinitialiser le score au démarrage
