class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // setting up a path
        this.load.path = './assets/'
        // setting up background 
        this.load.image('background', 'snowcave_test_1.png')
        this.load.image('tile', 'snow_tiles_1.png')
        this.load.image('groundScroll', 'snow_tiles_1.png')

        // setting up character sprite sheets
        // this.load.spritesheet('temp', 'berd_pratice_1.png', {
        //     frameWidth: 32,
        //     frameHeight: 32,
        // })
        this.load.spritesheet('penguin', 'penguin_spritesheet_1.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('enemy', 'berd_pratice_1.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        // setting up obstacle sprite sheets - temporary
        this.load.image('obstacle', 'pixelburger2.png')


        // loading in fonts
        //see: https://phaser.io/examples/v3/view/game-config/pixel-art-mode
        this.load.bitmapFont('atari', 'atari-classic.png', 'atari-classic.xml');

        
    }

    create() {
        // Title
        this.add.bitmapText(64, 64, 'atari', 'Slippery Slope', 16).setOrigin(0.25);

          //--Setting up Animations
        this.anims.create({
            key: 'run',
            frameRate: 8, 
            repeat: -1,
            frames: this.anims.generateFrameNumbers('penguin', { start: 0, end: 3}),
        })
        this.anims.create({
            key: 'jump',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('penguin', {start: 4, end: 7}),
        })
        //this.anims.create({
            //key: 'flap',
            //frameRate: 8,
            //repeat: 0,
        //})
        //this.anims.create({
            //key: 'duck'
            //frameRate: 8 
            //repeat: 0,
        //})

        // Display Menu 
        //see: https://github.com/phaserjs/examples/blob/master/public/src/game%20config/pixel%20art%20mode.js
    
        const controls = ['Move: Right key to start run.\n',
                          'Jump: Up key to jump.\n',
                          'Double Jump: Up key twice.'
        ]
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'atari', controls, 8, 0.5).setOrigin(0.5);
        this.add.bitmapText(game.config.width/2, 32, 'atari', 'High Score: ' + distance, 8, 0.5).setOrigin(0.5);

        // setting up inputs
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update(){
        const { left, right, up, down, space, shift } = this.keys   

        if(right.isDown){
            console.log("play")
            this.scene.start('playScene')
        }
        
    }
}