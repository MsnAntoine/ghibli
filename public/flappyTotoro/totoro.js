// Définition des variables
let move_speed = 2; // Vitesse de déplacement des tuyaux
let gravity = 0.070; // Gravité de l'oiseau
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('effetSonoreFlappy/point.mp3');
let sound_die = new Audio('effetSonoreFlappy/die.mp3');

// Obtenir les propriétés de l'élément bird
let bird_props = bird.getBoundingClientRect();

// Obtenir les propriétés de l'arrière-plan
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

let bird_dy = 0; // Nouvelle variable pour la vitesse de chute de l'oiseau

// Écouteur d'événement pour les touches du clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && game_state !== 'Play') {
        // Si la touche Entrée est enfoncée et que le jeu n'est pas en cours
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove(); // Supprimer tous les tuyaux existants
        });
        img.style.display = 'block'; // Afficher l'image de l'oiseau
        bird.style.top = '40vh'; // Positionner l'oiseau au milieu de l'écran vertical
        game_state = 'Play'; // Mettre l'état du jeu à "Play"
        message.innerHTML = ''; // Effacer le message affiché
        score_title.innerHTML = 'Score : '; // Réinitialiser le titre du score
        score_val.innerHTML = '0'; // Réinitialiser la valeur du score
        message.classList.remove('messageStyle'); // Supprimer la classe de style pour le message
        play(); // Lancer le jeu
    } else if (e.code === 'Space' && game_state === 'Play') {
        e.preventDefault();
        bird_dy = -4.78; // Ajuster la vitesse du saut ici
        img.src =  asset('medias/flappyImg/totoro1.png') ; // Chemin de l'image à partir de l'asset()
    }
});


// Fonction de déplacement des tuyaux
function move() {
    if (game_state !== 'Play') return;

    let pipe_sprite = document.querySelectorAll('.pipe_sprite');
    pipe_sprite.forEach((element) => {
        let pipe_sprite_props = element.getBoundingClientRect();
        bird_props = bird.getBoundingClientRect();

        if (pipe_sprite_props.right <= 0) {
            element.remove(); // Supprimer le tuyau s'il est hors de l'écran
        } else {
            if (
                bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                bird_props.left + bird_props.width > pipe_sprite_props.left &&
                bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                bird_props.top + bird_props.height > pipe_sprite_props.top
            ) {
                game_state = 'End'; // Mettre l'état du jeu à "End"
                message.innerHTML = '<span style="color: red;">Game Over</span><br>ENTRER pour rejouer'; // Afficher le message de fin de jeu
                message.classList.add('messageStyle'); // Appliquer la classe de style pour le message
                img.style.display = 'none'; // Masquer l'image de l'oiseau
                sound_die.play(); // Jouer le son de fin de jeu
                return;
            } else {
                if (
                    pipe_sprite_props.right < bird_props.left &&
                    pipe_sprite_props.right + move_speed >= bird_props.left &&
                    element.increase_score === '1'
                ) {
                    score_val.innerHTML = +score_val.innerHTML + 1; // Incrémenter le score
                    sound_point.play(); // Jouer le son de point gagné
                }
                element.style.left = pipe_sprite_props.left - move_speed + 'px'; // Déplacer le tuyau vers la gauche
            }
        }
    });
    requestAnimationFrame(move); // Appeler récursivement la fonction de déplacement
}

// Fonction principale du jeu
function play() {
    // Fonction pour appliquer la gravité à l'oiseau
    function apply_gravity() {
        if (game_state !== 'Play') return;

        bird_dy += gravity; // Ajuster la vitesse de chute de l'oiseau

        bird.style.top = bird_props.top + bird_dy + 'px'; // Mettre à jour la position de l'oiseau
        bird_props = bird.getBoundingClientRect();

        // Vérifier les collisions avec les bords de l'écran
        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            game_state = 'End'; // Mettre l'état du jeu à "End"
            message.style.left = '28vw';
            message.classList.remove('messageStyle');
            window.location.reload(); // Recharger la page pour redémarrer le jeu
            return;
        }

        requestAnimationFrame(apply_gravity); // Appeler récursivement la fonction pour appliquer la gravité
    }

    requestAnimationFrame(apply_gravity); // Appeler la fonction pour appliquer la gravité au lancement du jeu

    let pipe_seperation = 0;
    let pipe_gap = 35;

    // Fonction de création des tuyaux
    function create_pipe() {
        if (game_state !== 'Play') return;

        if (pipe_seperation > 350) {
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8; // Position verticale aléatoire pour les tuyaux

            // Création du tuyau supérieur
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh'; // Positionnement vertical du tuyau supérieur
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv); // Ajout du tuyau supérieur à la page

            // Création du tuyau inférieur
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh'; // Positionnement vertical du tuyau inférieur
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1'; // Attribut pour augmenter le score

            document.body.appendChild(pipe_sprite); // Ajout du tuyau inférieur à la page
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe); // Appeler récursivement la fonction de création des tuyaux
    }

    requestAnimationFrame(create_pipe); // Appeler la fonction de création des tuyaux au lancement du jeu

    move(); // Lancer le déplacement des tuyaux
}

play(); // Lancer le jeu
