let move_speed = 2;
let gravity = 0.080;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('effetSonoreFlappy/point.mp3');
let sound_die = new Audio('effetSonoreFlappy/die.mp3');

// Obtenir les propriétés de l'élément bird
let bird_props = bird.getBoundingClientRect();

// Cette méthode renvoie DOMRect -> top, right, bottom, left, x, y, width et height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

let bird_dy = 0; // Nouvelle variable pour la vitesse de chute de l'oiseau

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && game_state !== 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    } else if (e.code === 'Space' && game_state === 'Play') {
        e.preventDefault();
        bird_dy = -5;
        img.src =  asset('medias/flappyImg/Bird-2.png') ;
    }
});


function move() {
    if (game_state !== 'Play') return;

    let pipe_sprite = document.querySelectorAll('.pipe_sprite');
    pipe_sprite.forEach((element) => {
        let pipe_sprite_props = element.getBoundingClientRect();
        bird_props = bird.getBoundingClientRect();

        if (pipe_sprite_props.right <= 0) {
            element.remove();
        } else {
            if (
                bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                bird_props.left + bird_props.width > pipe_sprite_props.left &&
                bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                bird_props.top + bird_props.height > pipe_sprite_props.top
            ) {
                game_state = 'End';
                message.innerHTML = '<span style="color: red;">Game Over</span><br>Press Enter To Restart';
                message.classList.add('messageStyle');
                img.style.display = 'none';
                sound_die.play();
                return;
            } else {
                if (
                    pipe_sprite_props.right < bird_props.left &&
                    pipe_sprite_props.right + move_speed >= bird_props.left &&
                    element.increase_score === '1'
                ) {
                    score_val.innerHTML = +score_val.innerHTML + 1;
                    sound_point.play();
                }
                element.style.left = pipe_sprite_props.left - move_speed + 'px';
            }
        }
    });
    requestAnimationFrame(move);
}

function play() {
    function apply_gravity() {
        if (game_state !== 'Play') return;

        bird_dy += gravity;

        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();

        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            game_state = 'End';
            message.style.left = '28vw';
            message.classList.remove('messageStyle');
            window.location.reload();
            return;
        }

        requestAnimationFrame(apply_gravity);
    }

    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;
    let pipe_gap = 35;

    function create_pipe() {
        if (game_state !== 'Play') return;

        if (pipe_seperation > 350) {
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;

            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);

            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }

    requestAnimationFrame(create_pipe);

    move();
}

play();
