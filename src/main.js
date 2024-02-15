// Charlize Serrano
// Title: Slippery Seal
// Hours: 30 hours 
// Creative Tilt: 
    // What I decided to do interesting is that in my finite state machine I integrated the duration of how long keys were being held in order to implement the flap state
    // I also decided to use a finite state machine in both the character and enemy
    // this was so that the mechanics of the states would branch of from each other (ie: the jump state to double jump to flap state).
    // Overall, the most techinically difficult part of the code was successfully implementing the enemy.
    // I wanted to go for a cuphead styled boss that would charge at random intervals of time. 
    // At every charge an animation would played so that players can estimate the time of the next attack.
    // The enemy would also maintain a fixed y position when it played a charged animation.
    
    // In this project I feel I had learned several new things. Not only had I implemented logic and knowledge that I already had but I developed practices in learning this new language.
    // I read a lot of documentation and frequently checked my intellisense for the methods I can implement. For example, I was learning a lot on how to load audio and set fonts.
    // With the game projects in class as well, I learned more about setting physics and gravity.
    // Especially when implementing the enemy and character, through my endeavors I had learned new methods on how to implement collision and how to check collisions.
    // Something that I especially remember in my mind as I was integrating variable jumps in the character state machine, was that you cannot set a
    // boolean value to check if the character is on the ground when using down duration as down duration checks how long you were on the ground.

    // For the art I had decided to stick with a more cute vibe and I kept all art coherent with one another by maintaining
    // the type of border I was using for each sprite. For example, I would use pitch black outlines for areas of higher shadow and light colors for areas of light.
    // I also made sure to use a similar color palette for each of the sprites and background. I was quite proud of the style that I had accomplished and I was especially proud of some of my animations.
    // For instance, I am most proud of the seal's charge animation as I feel I created a long enough and noticeable change from the original state of the enemy
    // to the point where a player is more likely to determine when the seal will charge.

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
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Credits, Play ]
}


const game = new Phaser.Game(config)