// Character Selection Screen
allChars = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];
document.addEventListener("DOMContentLoaded", function() { 
    let charSelection = document.getElementById('charSelection');
    allChars.forEach(function(sprite) {
        charSelection.innerHTML += `<div id='sprites'><img src=${sprite}><div>`;
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
const Player = function(x, y) {

    // instantiate the modal object 
    this.modal = new Modals();

    // starting position
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';

    // array to define the sprite area
    this.playerSpace = [this.x, this.y];

    this.update = function(keyPress) {
        if (keyPress === 'left') {
            if (this.x <= 0) {
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
            if (this.y <= 0) {
                console.log('You win!');
                this.y = - 20;
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
}


// Give the user a confirmation that they've won the game
const Modals = function() {

    this.fullModal = document.getElementById('fullModal');
    this.winModal = document.getElementById('winmodal');
    this.charSelection = document.getElementById('charselection');

    this.showWinModal = function() {
        this.winModal.style.display = 'block';
        this.fullModal.style.display = 'block';
    };

    this.hideWinModal = function() {
        winmodal.style.display = 'none';
        fullModal.style.display = 'none';
        player.reset();
    };

    this.showCharModal = function() {
        return null;
    };

    this.hideCharModal = function() {
        charSelection.style.display = 'none';
        fullModal.style.display = 'none';
    };

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const bug1 = new Enemy("bug1", -60, 60);
const bug2 = new Enemy("bug2", -200, 140);
const bug3 = new Enemy("bug3", -400, 220);

const player = new Player(200, 400);
const modal = new Modals();
const allEnemies = [bug1, bug2, bug3];



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

// listens for the reset button
document.addEventListener('click', function(e) {

    playButton = document.getElementById('restart');
    if (e.target === playButton) {
        modal.hideWinModal();
    }
})
