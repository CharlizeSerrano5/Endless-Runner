class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }

    create() {
        // Credits
        this.add.bitmapText(64, 48, 'atari', 'Credits: ', 16).setOrigin(0.25);

        // content of credits
        const credits = ['Code by Charlize Serrano\n',
                         'Assets by Charlize Serrano\n',
                         'Music from Pixabay:\n',
                         'floraphonic, verbovets,',
                         'geoffharvey, Jofae\n'
        ]
        // All Music
    //https://pixabay.com/sound-effects/bloop-4-186533/
// https://pixabay.com/music/modern-classical-frozen-175197/
// https://pixabay.com/music/christmas-christmas-journey-128873/

// https://pixabay.com/sound-effects/swing-whoosh-110410/
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'atari', credits, 8, 0.5).setOrigin(0.5);
        this.add.bitmapText(game.config.width/2, game.config.height - 16, 'atari', 'Any Arrow Key for Menu', 8, 0.5).setOrigin(0.5, 0);

        // setting up keyboard inputs - FSM repository
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        const { left, right, up, down, space, shift } = this.keys   
        if (down.isDown  || left.isDown || right.isDown || up.isDown){
            console.log("Menu")
            this.scene.start('menuScene')
        }
    }



}