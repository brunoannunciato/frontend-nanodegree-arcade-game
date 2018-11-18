class Positions {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
};

class Game {
     constructor() {
         this.level = 1;
     }

     lose() {
        for (const enemy of allEnemies) {

            const
                xColision = (enemy.x / 50).toFixed(0) === (player.x / 50).toFixed(0),
                yColision = (enemy.y / 50).toFixed(0) === (player.y / 50).toFixed(0);

            if (xColision && yColision) {
                player.y = 400;
                for (let i = 1; i <= game.level; i++) {
                    allEnemies.pop();
                }
                this.level = 1;
            }
        }
    }

    checkWin() {
        if((player.y).toFixed(0) <= -15) {
            this.level++;
        }

        for (let i = allEnemies.length; i <= this.level; i++) {
            allEnemies.push(new Enemy);
        }
    }

    score() {
        let
            textLevel = `Level: ${this.level}`,
            textMaxLevel = `Record: ${localStorage.maxLevel}`;

        document.querySelector('.level').textContent = textLevel;
        document.querySelector('.max-level').textContent = textMaxLevel;

        if (this.level > localStorage.maxLevel) {
            localStorage.setItem('maxLevel', this.level)
        }
    }
}

let game = new Game;

// Inimigos que nosso jogador deve evitar
class Enemy extends Positions {
    constructor({x = -100, y = 0} = {}) {
        super(x, y)
        // As variáveis aplicadas a nossas instâncias entram aqui.
        // Fornecemos uma a você para que possa começcar.
        
        // A imagem/sprite de nossos inimigos, isso usa um
        // ajudante que é fornecido para carregar imagens
        // com facilidade.
        this.sprite = 'images/enemy-bug.png';
        this.streets = [70, 150, 235];
        this.speed = Math.random() * 500; 
        this.y = this.streets[(Math.random() * 3).toFixed(0)]
    }

    // Parâmetro: dt, um delta de tempo entre ticks
    update(dt) {
        // Você deve multiplicar qualquer movimento pelo parâmetro
        // dt, o que garantirá que o jogo rode na mesma velocidade
        // em qualquer computador.
        if(this.x > 505 ) {
            this.x = -100;
            this.y = this.streets[Math.floor(Math.random() * this.streets.length)];
        }
        
        this.x = this.x + this.speed * dt;
        
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

// Atualize a posição do inimigo, método exigido pelo jogo
// Desenhe o inimigo na tela, método exigido pelo jogo
// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().

class Player extends Positions {
    constructor({x = 203, y = 400} = {}) {
        super(x, y);
        this.character ='images/char-boy.png';
    }

    update() {
        if( this.y.toFixed(0) <= -15 ) {
            setTimeout(() => this.y = 400, 100)
        }
        game.score();
        game.lose();
    }

    render() {
        ctx.drawImage(Resources.get(this.character), this.x, this.y);
    }

    handleInput(keyCode){
        const
            blockWidth = document.querySelector('canvas').width / 5,
            blockHeight = (document.querySelector('canvas').height - 190) / 5;

            switch(keyCode) {
                case 'right':
                    if (this.x != 405) {
                        this.x += blockWidth;
                    };
                break;

                case 'left':
                    if (this.x != 1) {
                        this.x -= blockWidth;
                    };
                break;

                case 'up':
                    if (this.y.toFixed(0) != -16) {
                        this.y -= blockHeight;
                    };
                    game.checkWin();
                break;

                case 'down':
                    if (this.y.toFixed(0) != 400) {
                        this.y += blockHeight;
                    };
                break;
            }
    }
}

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
const allEnemies = [];

// Coloque o objeto do jogador numa variável chamada jogador.
const player = new Player();


// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
