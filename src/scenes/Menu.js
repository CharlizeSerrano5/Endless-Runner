class Menu extends Phaser.Scene{
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('temp', 'berd_pratice_1.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
    }

    create() {


        //this.anims.create({
            //key: ''
            //frameRate: 8 
            //repeat: 0,
        //})
        this.scene.start('playScene')
    }
}