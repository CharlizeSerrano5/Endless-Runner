class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }

    create() {
        // Credits
        this.add.bitmapText(64, 64, 'atari', 'Credits: ', 16).setOrigin(0.25);

        // content of credits
        const credits = ['Code by Charlize Serrano\n',
                         'Assets by Charlize Serrano\n',
                         'Music from Pixabay\n'
        ]

        this.add.bitmapText(game.config.width/2, game.config.height/2, 'atari', credits, 8, 0.5).setOrigin(0.5);

        // setting up keyboard inputs - FSM repository
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        const { left, right, up, down, space, shift } = this.keys   
        if (right.isDown){
            console.log("Menu")
            this.scene.start('menuScene')
        }
    }



}