class Character extends Phaser.Physics.Arcade.Sprite {
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
        //this.MAX_Y_VEL = -100
        this.MAX_JUMPS = 2
        this.JUMP_VELOCITY = -700

        this.MAX_JUMPS = 2
        this.jumps = this.MAX_JUMPS
        this.body.allowGravity = true
        this.jumping = false
    
        
        //this.physics.world.gravity.y = 2600

    
    // initializing state machine managing character
    scene.characterFSM = new StateMachine('idle', {
        idle: new IdleState(),
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
        
        //character.setVelocity(0)
        //character.anims.play('standing')
        //character.anims.stop()

        // if not in the idle state then allow tiles to move
        // variable initializig
            //character.jumps = character.MAX_JUMPS
            //character.jumping = false

    }
    execute(scene, character){
        // destructuring to make a local copy of the keyboard inputs
        const { left, right, up, down, space, shift } = scene.keys        
        //const spaceKey = scene.keys.spaceKey

        scene.background.tilePositionX = 0
        scene.groundScroll.tilePositionX = 0

        // transition to jump if pressing space
        // if(Phaser.Input.Keyboard.JustDown(up)) {
        //     console.log("jump")
        //     this.stateMachine.transition('jump')
        //     return 
        // }

        // START THE GAME
        // transition to run if pressing right
        if(right.isDown){
            console.log("run")
            this.stateMachine.transition('run')
        }



    }
}

class RunState extends State {
    enter(scene, character){
        // character.jumping = false
        // console.log(character.jumping)
        if(character.body.touching.down){
            character.jumps = character.MAX_JUMPS
            character.jumping = false
        }
    }
    
    execute(scene, character) {
        const { left, right, up, down, space, shift } = scene.keys   

        // play running animation
        //character.anims.play('running')
        //character.anims.stop()

        // transition to jump if pressing space
        if(character.jumps > 0 && Phaser.Input.Keyboard.DownDuration(up, 150)) {
            // if the character has not jumped
            // console.log(character.jumps)
            character.jumping = true
            this.stateMachine.transition('jump')
            return 
        }

        if(character.jumping && Phaser.Input.Keyboard.UpDuration(up, 50)){
            character.jumps--
            character.jumping = false
        } 

        if(character.body.touching.down){
            character.jumps = character.MAX_JUMPS
            character.jumping = false
        }
    }
}

class JumpState extends State{ // NEEDS REVISIONS - implement only fixed amount of jumps
    enter(scene, character) {
        // const { left, right, up, down, space, shift } = scene.keys           
        //character.anims.play('jumping')
        // character.anims.stop()
        // console.log(character.jumping)


        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
            // from VariableJump.js
        character.body.velocity.y = character.JUMP_VELOCITY
        this.stateMachine.transition('run')
        
        // scene.time.delayedCall(scene.keys.up.getDuration(), () =>  {
        //     this.stateMachine.transition('run')
            
        // })

        
    }
    execute(scene, character) {

    }
}

class FlapState extends State {
    // considered a double jump - should only occur after first jump
        // might combine with jump state?
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