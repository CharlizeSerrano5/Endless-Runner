// Charlize Serrano
// Title: 
// Hours:
// Creative Tilt:

const config = {

    width: 400,
    height: 300,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Play ]
}

let keyUP, keyRIGHT, keyLEFT, keyJUMP

const game = new Phaser.Game(config)