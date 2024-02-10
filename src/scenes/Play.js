class Play extends Phaser.Scene{
    constructor() {
        super('playScene')
    }


    create() {
        // create a frame for the screen
        this.character = new Character(this, game.config.width / 2, game.config.height / 2, 'temp', 0, 0)

        // setting up the inputs

        keyRIGHT =this.input.keyboard.addKey(Phaser.Input.KeyCodes.RIGHT)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.KeyCodes.LEFT)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.KeyCodes.SPACE)
        

        // focus on creating a scrolling framework
    }

    update() {
        // i can either use FSM or checkss
            //set up checks first then use FSM
    }
}