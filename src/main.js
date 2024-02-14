// Charlize Serrano
// Title: Slippery Slope
// Hours: 30+ hours 
// Creative Tilt: 
    

    // For my Code:
    // I decided to implement a finite state machine with both my character and enemy so that
    // I could develop mechanics that would branch off from each other (ie: the jump state to double jump to flap state).
    // I also used a finite state machine for my enemy so that the enemy had a visual showcase of a charge state that would stop its
    // y position at random intervals. 
    
    // For my Art: 
    // For the art I had decided to stick with a more cute vibe and I ensure keeping all art coherent with one another by maintaining
    // the type of border I was using for each sprite. For example, I would use pitch black outlines for areas of higher shadow and light colors for areas of light.
    // I also made sure to use a similar color palette for each of the sprites and background.

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