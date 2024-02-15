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

        // setting up audio
        this.load.audio('music', 'christmas-journey-128873.mp3')
        this.load.audio('menu_music', 'menu_frozen.mp3')
        this.load.audio('boop', 'boop.mp3')
        this.load.audio('jump', 'swing-whoosh.mp3')

        // setting up character and enemy sprite sheets
        this.load.spritesheet('penguin', 'penguin_spritesheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('enemy', 'seal_spritesheet_1.png', {
            frameWidth: 48,
            frameHeight: 32
        })

        // setting up obstacle sprite sheets
        this.load.image('obstacle', 'icespike_1.png')
        // loading in fonts
        //see: https://phaser.io/examples/v3/view/game-config/pixel-art-mode
        this.load.bitmapFont('atari', 'atari-classic.png', 'atari-classic.xml');

        
    }

    create() {
        

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
        this.anims.create({
            key: 'hurt',
            frameRate: 8, 
            repeat: 0,
            frames: this.anims.generateFrameNumbers('penguin', {start: 7, end: 7}),
        })
        this.anims.create({
            key: 'duck',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('penguin', {start: 8, end: 8}),
        })

        this.anims.create({
            key: 'charge',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('enemy', {start: 0, end: 13}),
        })
        this.anims.create({
            key: 'follow',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('enemy', {start: 13, end: 13}),
        })

        // Title
        this.add.bitmapText(72,48, 'atari', 'Slippery Seal', 16).setOrigin(0.25);

        // Display Menu 
        //see: https://github.com/phaserjs/examples/blob/master/public/src/game%20config/pixel%20art%20mode.js
        
        const controls = ['Move: Right key to start run.\n',
                          'Jump: Up to jump.\n',
                          'Double Jump: Up key in air.\n',
                          'Flap: Hold Up after Double Jump.\n',
                          'Duck: Down Key'
        ]
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'atari', controls, 8, 0.5).setOrigin(0.5);
        this.add.bitmapText(game.config.width/2, 16, 'atari', 'High Score: ' + distance, 8, 0.5).setOrigin(0.5);
        this.add.bitmapText(game.config.width/2, game.config.height - 16, 'atari', 'Left Key for CREDITS', 8, 0.5).setOrigin(0.5, 0);
        this.add.bitmapText(game.config.width/2, game.config.height - 32, 'atari', 'Right Key to PLAY', 8, 0.5).setOrigin(0.5, 0);
        this.add.bitmapText(game.config.width/2, game.config.height - 64, 'atari', 'Challenge - Boop (jump on) seal', 8, 0.5).setOrigin(0.5, 0);



        // setting up inputs
        this.keys = this.input.keyboard.createCursorKeys()


        // setting up menu music
        console.log('test')
        this.menuMusic = this.sound.add('menu_music').setLoop(true).setVolume(0.4)
        this.menuMusic.play()

    }

    update(){
        const { left, right, up, down, space, shift } = this.keys   

        if(right.isDown){
            this.menuMusic.stop()
            console.log("play")
            this.scene.start('playScene')
        }

        if(left.isDown){
            this.menuMusic.stop()
            console.log("credits")
            this.scene.start('creditScene')
        }
        
    }
}