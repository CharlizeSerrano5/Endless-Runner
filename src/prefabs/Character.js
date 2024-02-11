class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this) 
        scene.physics.add.existing(this)
            // add the physics body onto the character
        this.moveSpeed = 2
        
    // setting collision
        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)

    // set character variables and settings
        this.ACCELERATION = 1500
        this.MAX_X_VEL = 500
        this.MAX_Y_VEL = 5000
        this.DRAG = 600
        this.MAX_JUMPS = 2
        this.JUMP_VELOCITY = -700
        //this.physics.world.gravity.y = 2600

    
    // initializing state machine managing character
    scene.characterFSM = new StateMachine('run', {
        run: new RunState(),
        jump: new JumpState(),
        flap: new FlapState(),
        throw: new ThrowState(),
        hurt: new HurtState(),
    }, [scene, this])  

    }

}

// character specific state classes
class IdleState extends State {
    enter(scene, character) {
        character.setVelocity(0)
        //character.anims.play('standing')
        //character.anims.stop()

        // if not in the idle state then allow tiles to move
    }
}

class RunState extends State {
    execute(scene, hero) {

    }
}

class JumpState extends State{
    enter(scene, character) {
        // MAIN ISSUE

    }

    execute(scene, character) {

    }
}

class FlapState extends State {
    enter(scene, character) {

    }
    
    execute(scene, character) {

    }
}

class ThrowState extends State {
    // throws items at enemies to temporarily pause them
    enter(scene, character) {

    }
    
    execute(scene, character) {

    }
}

class HurtState extends State {
    enter(scene, character) {
        character.setVelocity(0)
    }

    execute(scene, character) {

    }
}