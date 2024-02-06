class Play extends Phaser.Scene{
    constructor() {
        super('playScene')
    }


    create() {
        // create a frame for the screen


        // setting up the inputs

        keyRIGHT =this.input.keyboard.addKey(Phaser.Input.KeyCodes.RIGHT)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.KeyCodes.LEFT)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.KeyCodes.SPACE)
        

        // focus on creating a scrolling framework
    }

    update() {

    }
}