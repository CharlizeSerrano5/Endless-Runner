class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // setting up a path
        this.load.path = './assets/'
        // setting up background 
        this.load.image('background', 'background.png')
        this.load.image('tile', 'ground.png')
        this.load.image('groundScroll', 'ground.png')

        // setting up character sprite sheets
        this.load.spritesheet('temp', 'berd_pratice_1.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        // setting up obstacle sprite sheets - temporary
        this.load.image('obstacle', 'pixelburger2.png')


        // loading in fonts
        //see: https://phaser.io/examples/v3/view/game-config/pixel-art-mode
        this.load.bitmapFont('atari', 'atari-classic.png', 'atari-classic.xml');
    }

    create() {

    //--Setting up Animations
        //this.anims.create({
            //key: 'walk'
            //frameRate: 8 
            //repeat: 0,
        //})

        //this.anims.create({
            //key: 'jump'
            //frameRate: 8 
            //repeat: 0,
        //})

        //this.anims.create({
            //key: 'flap'
            //frameRate: 8 
            //repeat: 0,
        //})

        //this.anims.create({
            //key: 'duck'
            //frameRate: 8 
            //repeat: 0,
        //})


    // Display Menu 
        //this.add.text()
        //see: https://phaser.io/examples/v3/view/game-config/pixel-art-mode
        
        // rocket patrol
        this.add.text(game.config.width/2, game.config.height/2, 'TEMP TITLE', tempConfig)
        // this.add.text(game.config.width/2, game.config.height/2, 'Use Cursor controls to move', tempConfig)
        tempConfig.backgroundColor = '#00F00'
        // tempConfig.color = '#000'
        // this.add.text(game.config.width/2, game.config.height/2, 'Press stuff', tempConfig)

        

        // setting up the inputs
        this.keys = this.input.keyboard.createCursorKeys()
        //this.scene.start('playScene')
    }

    update(){
        const { left, right, up, down, space, shift } = this.keys   

        if(right.isDown){
            console.log("play")
            this.scene.start('playScene')
        }
        
    }
}