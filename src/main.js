// Charlize Serrano
// Title: 
// Hours: 
// Creative Tilt: 

'use strict'

let tileSize = 32
const SCALE = 0.5
const scroll_SPEED = 2
let topDistance
let distance = 0

let tempConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0    
}

const config = {
    type: Phaser.WEBGL,
    //width: 640,
    width: 256,
    //height: 480,
    height: 224,
    backgroundColor: '#CDC7FF',
    pixelArt: true,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Credits, Play ]
}


const game = new Phaser.Game(config)