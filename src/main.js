// Charlize Serrano
// Title: 
// Hours:
// Creative Tilt:

const config = {

    width: 640,
    height: 480,
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