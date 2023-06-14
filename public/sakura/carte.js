const cards = document.querySelectorAll(".cards")
const flipCount = document.querySelector(".flipCount")
const restartBtn = document.querySelector(".restart-btn")
const second = document.querySelector(".nav")
let clickOne, clickTwo;
let disableflip = false;
let matchFlip = 0;
let score = 0;
let sec = 0;
var timerOp = true;
var Interval;
var isClickedOp = true;
function timer() {
    clearInterval(Interval)
    Interval = setInterval(() => {
        sec++;
        second.innerHTML = sec + "s"
    }, 1000);
}

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", ()=>{
        isClickedOp = true;
        if (timerOp == true) {
            timer()
            setTimeout(() => {
                timerOp = false;
            }, 50);
        }
    });

}

function flipCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== clickOne && !disableflip) {
        score++;
        flipCount.innerHTML = "Flips: " + score
        clickedCard.classList.add("flip")
        if (!clickOne) {
            return clickOne = clickedCard
        }
        clickTwo = clickedCard;
        disableflip = true;
        matchCards()
    }

}

function matchCards() {
    if (clickOne.innerHTML === clickTwo.innerHTML) {
        matchFlip++;
        if (matchFlip === 12) {
            setTimeout(() => {
                return shuffle();
            }, 1000);
        }
        clickOne.removeEventListener("click", flipCard)
        clickTwo.removeEventListener("click", flipCard)
        clickOne = clickTwo = "";
        return disableflip = false;
    }
    setTimeout(() => {
        if (clickOne.classList == "cards flip" && clickTwo.classList == "cards flip") {
            clickOne.classList.remove("flip"), clickTwo.classList.remove("flip")
            clickOne = clickTwo = "";
            disableflip = false;
        }
    }, 700);
}

restartBtn.addEventListener("click", () => {
    cards.forEach(card => {
        if (isClickedOp == true) {
            setTimeout(() => {
                isClickedOp = false;
            }, 700);
            scoreVbReset()
            card.classList.remove("flip")
            card.addEventListener("click", flipCard);
            disableflip = true;
            clickOne = clickTwo = "";
            setTimeout(() => {
                shuffleCards()
            }, 700);
            setTimeout(() => {
                disableflip = false;
            }, 1000);
        }
    });
})



function scoreVbReset() {
    score = 0;
    flipCount.innerHTML = "Flips: " + score;
    matchFlip = 0;
    clearInterval(Interval)
    sec = 0;
    second.innerHTML = sec + "s"
    timerOp = true;
}

function shuffle(){
    const scoreBoard = document.querySelector(".modal");
    const scoretext = document.querySelector(".scoretext");
    const flips = document.querySelector(".flips");
    const scoreSec = document.querySelector(".secs");
    scoreBoard.style.display = "flex";
    window.addEventListener("click", (e) => {
        if (e.target === scoreBoard) {
            scoreBoard.style.display = "none";
        }
    })
    if (score < 45) {
        scoretext.classList.toggle("damn")
        scoretext.innerHTML = "Impeccable"
        flips.innerHTML ="Flips: "+score;
        scoreSec.innerHTML = "Second: " + sec+"s";
    }
    if (score >= 45 && score < 65) {
        scoretext.classList.toggle("great")
        scoretext.innerHTML = "Exellent"
        flips.innerHTML = "Flips: " + score;
        scoreSec.innerHTML = "Second: "+sec+"s";
    }
    if (score >= 65 && score < 80) {
        scoretext.classList.toggle("mid")
        scoretext.innerHTML = "Moyen"
        flips.innerHTML = "Flips: " + score;
        scoreSec.innerHTML = "Second: " + sec+"s";
    }
    if (score >= 80) {
        scoretext.classList.toggle("bad")
        scoretext.innerHTML = "tu es une grosse merde :("
        flips.innerHTML = "Flips: " + score;
        scoreSec.innerHTML = "Second: " + sec+"s";
    }
    cards.forEach(card => {
        card.classList.remove("flip")
        card.addEventListener("click", flipCard);
    });
    setTimeout(() => {
        shuffleCards()
    }, 700);
    scoreVbReset()
    clickOne = clickTwo = "";
}



function shuffleCards() {
    var cardContents = [];
    for (let i = 0; i < cards.length; i++) {
        cardContents.push(cards[i].innerHTML)
    }
    cardContents = shuffleArray(cardContents);
    for (let i = 0; i < cards.length; i++) {
        cards[i].innerHTML = cardContents[i];
    }
}

function shuffleArray(array) {
    for (var i = array.length -1; i > 0; i--){
        var j = Math.floor(Math.random()* (i+1));
        var temp = array[i];
        array[i] = array[j]
        array[j] = temp;
    }
    return array;
}

shuffleCards()


cards.forEach(card => {
    card.addEventListener("click", flipCard);
});







