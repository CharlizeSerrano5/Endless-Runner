// Charlize Serrano
// Title: 
// Hours:
// Creative Tilt:

const config = {

    //width: 640,
    width: 400,
    //height: 480,
    height: 300,
    pixelArt: true,
    zoom: 2,
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