// Character object for character selection screen
const Character = function(name, source) {
    this.name = name;
    this.source = source;
}

const boy = new Character('Bugs', 'char-boy.png');
const hornGirl = new Character('Kitty', 'char-cat-girl.png');
const pinkGirl = new Character('Starflower', 'char-pink-girl.png');
const princess = new Character('Princess', 'char-princess-girl.png');
const allChars = [boy, hornGirl, pinkGirl, princess];

document.addEventListener("DOMContentLoaded", function() {
    let charSelection = document.getElementById('charSelection');
    allChars.forEach(function(sprite) {
        charSelection.innerHTML += `<figure class='sprites'><img src='images/${sprite.source}' id='${sprite.name}'><figcaption>${sprite.name}<figcaption><figure>`;
    })
});



// Enemies our player must avoid
const Enemy = function(name, x, y) {
    this.name = name;

    // starting position
    this.x = x;
    this.y = y;

    // array to define the start area
    this.enemySpace = [this.x, this.y]

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Draw the enemy on the screen, required method for game
    this.render = function() { // initial location
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    this.update = function(dt) { // move across the screen
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        if (this.x > 525) {
            this.x = -95;
            this.enemySpace = [this.x, this.y];
        } else {
            newX = this.x + 1;
            movement = (this.x + 1) * dt;
            this.x = newX;
            this.enemySpace = [this.x, this.y];
        }


    };

};





// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(sprite, x, y) {
    this.livesLeft = 3;

    // instantiate the modal object
    this.modal = new Modals();
    this.lives = new livesUpdate();

    // starting position
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    // array to define the sprite area
    this.playerSpace = [this.x, this.y];

    this.update = function(keyPress) {
        if (keyPress === 'left') {
            if (this.x <= 0) {player.reset();
                this.x = this.x + 20;
                this.playerSpace = [this.x, this.y];
            } else {
                this.x = this.x - 20;
                this.playerSpace = [this.x, this.y];
            }
        }
        if (keyPress === 'right') {
            if (this.x >= 410) {
                this.x = this.x - 20;
                this.playerSpace = [this.x, this.y];
            } else {
                this.x = this.x + 20;
                this.playerSpace = [this.x, this.y];
            }
        }
        if (keyPress === 'up') {
            if (this.y <= 0) { // reached the water
                this.y = - 20;
                difficulty.upDifficulty();
                if (difficulty.stage > 3) {
                    alert("You've beat the game!");
                    difficulty.stage = 1;
                    this.lives.update(3);

                }
                difficulty.updateEnemyCount();
                difficulty.updateStage(difficulty.stage);
                this.modal.showWinModal();

            } else {
                this.y = this.y - 20;
                this.playerSpace = [this.x, this.y];
            }
        }
        if (keyPress === 'down') {
            if (this.y >= 400) {
                this.y = this.y - 20;
                this.playerSpace = [this.x, this.y];
            } else {
                this.y = this.y + 20;
                this.playerSpace = [this.x, this.y];
            }
        } else {
            null;
        };
    };

    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    };

    this.reset = function() {
        // place the player back at the start
        this.x = 200;
        this.y = 400;
    }

    this.handleInput = function(keyPress) {
        // Pass the event listener response to the update method
        this.update(keyPress);
    };

    this.lifeLost = function() {
        this.livesLeft -= 1;
        this.lives.update(this.livesLeft)
    };
}

// Changes the displayed lives and ends the game after three hits
const livesUpdate = function() {
    this.update = function(lives) {
        this.livesHTML = document.querySelector('#livespanel');
        this.livesHTML.innerHTML = "Lives left:" + "❤".repeat(lives);
        if (lives === 0) {
            modal.showLoseModal();
            this.livesHTML.innerHTML = "Lives left:" + "❤❤❤";
            player.livesLeft = 3;
            difficulty.stage = 1;
            difficulty.updateStage(difficulty.stage);
            difficulty.updateEnemyCount();
        };
    };
}

// Ups the difficulty after winning
const setDifficulty = function() {
    this.stage = 1;

    this.upDifficulty = function() {
        this.stage += 1;
    };

    this.updateEnemyCount = function() {
        switch (this.stage) {
            case 1:
                allEnemies = [bug1, bug2, bug3, bug4];
                break;
            case 2:
                allEnemies = [bug1, bug2, bug3, bug4, bug5];
                break;
            case 3:
                allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6];
                break;
            default:
                allEnemies = [bug1, bug2, bug3];
                break;
        };
    };

    this.updateStage = function(level) {
        this.stageHTML = document.querySelector('#stage');
        this.stageHTML.innerHTML = `Stage: ${level}/3`

    }
}


// Give the user a confirmation that they've won the game
const Modals = function() {

    this.fullModal = document.getElementById('fullModal');
    this.winModal = document.getElementById('winmodal');
    this.loseModal = document.querySelector('#losemodal');
    this.charSelection = document.getElementById('charSelection');

    this.showWinModal = function() {
        this.winModal.style.display = 'block';
        this.fullModal.style.display = 'block';
        player.reset();
    };

    this.hideWinModal = function() {
        this.livesHTML = document.querySelector('#livespanel');
        this.winModal.style.display = 'none';
        this.fullModal.style.display = 'none';
        /*
        this.livesHTML.innerHTML = "Lives left:" + "❤❤❤";
        player.livesLeft = 3;
        */

    };

    this.showCharModal = function() {
        this.charSelection.style.display = 'block';
        this.fullModal.style.display = 'block';
    };

    this.hideCharModal = function() {
        this.charSelection.style.display = 'none';
        this.fullModal.style.display = 'none';
    };

    this.showLoseModal = function() {
        this.loseModal.style.display = 'block';
        this.fullModal.style.display = 'block';
        player.reset();

    };

    this.hideLoseModal = function() {
        this.loseModal.style.display = 'none';
        this.fullModal.style.display = 'none';

    };

}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player('images/char-boy.png',200, 400);
const modal = new Modals();
const difficulty = new setDifficulty();

const bug1 = new Enemy("bug1", -60, 60);
const bug2 = new Enemy("bug2", -200, 140);
const bug3 = new Enemy("bug3", -400, 220);
const bug4 = new Enemy("bug4", -230, 220);
const bug5 = new Enemy("bug5", -300, 60);
const bug6 = new Enemy("bug6", -90, 140)

let allEnemies = [bug1, bug2, bug3];






// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// listens for the reset button and character selection click
document.addEventListener('click', function(e) {

    allSprites = document.querySelectorAll('.sprites');
    png = document.getElementsByTagName('img');
    winPlayButton = document.getElementById('winRestart');
    losePlayButton = document.getElementById('loseRestart');
    winNewChar = document.getElementById('winNewChar');
    loseNewChar = document.getElementById('loseNewChar');


    if (e.target === winPlayButton) {
        modal.hideWinModal();
    };

    if (e.target === losePlayButton) {
        modal.hideLoseModal();
    };

    if (e.target === winNewChar){
        modal.hideWinModal();
        modal.showCharModal();
    };

    if (e.target === loseNewChar){
        modal.hideLoseModal();
        modal.showCharModal();
    };

    if (e.target.id in png) { // click on sprite
        spriteName = e.target.src.split('images/')[1];
        player.sprite = `images/${spriteName}`;
        modal.hideCharModal();
    };

    if (e.target.classList.contains('sprites') ) { // click on div
        modal.hideCharModal();
        spriteName = e.target.firstElementChild.src.split('images/')[1];
        player.sprite = `images/${spriteName}`;
    };
})
