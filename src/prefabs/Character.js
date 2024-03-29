class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this) 
        scene.physics.add.existing(this)
            // add the physics body onto the character
        this.moveSpeed = 2
            // unused
        
    // setting collision
        // this.body.setSize(this.width / 2, this.height).setOffset(this.width/3, 0)
        
        this.body.setCollideWorldBounds(true)

    // set character variables and settings
        this.ACCELERATION = 1500
        this.MAX_X_VEL = 500
        this.MAX_Y_VEL = 5000
        //this.MAX_Y_VEL = -100
        this.MAX_JUMPS = 2
        this.JUMP_VELOCITY = -500

        this.MAX_JUMPS = 2
        this.jumps = this.MAX_JUMPS
        this.body.allowGravity = true
        this.jumping = false
        this.run = false
        this.collision = false
        this.startX = 0
        this.gliding = 0;
    
        
        //this.physics.world.gravity.y = 2600

    
    // initializing state machine managing character
    scene.characterFSM = new StateMachine('idle', {
        idle: new IdleState(),
        run: new RunState(),
        jump: new JumpState(),
        double_jump: new DoubleJumpState(),
        flap: new FlapState(),
        hurt: new HurtState(),
        duck: new DuckState(),
    }, [scene, this])  

    }

}

// character specific state classes
class IdleState extends State {
    enter(scene, character) {
        character.run = false
        // initializing collision
        character.body.setSize(character.width / 2, character.height).setOffset(character.width/3, 0)
        // character.body.allowGravity = true
        //character.setVelocity(0)
        //character.anims.play('standing')
        //character.anims.stop()

        // if not in the idle state then allow tiles to move
    }
    execute(scene, character){
        // destructuring to make a local copy of the keyboard inputs
        const { left, right, up, down, space, shift } = scene.keys        
        // START THE GAME - transition to run if pressing right
        if(right.isDown){
            // console.log("start game")
            scene.music.play()
            this.stateMachine.transition('run')

        }



    }
}

class RunState extends State {
    enter(scene, character){
        character.run = true
    }
    
    execute(scene, character) {
        const { left, right, up, down, space, shift } = scene.keys   
        // character.anims.play('run', true)
        // play running animation
        if (!character.jumping){
            character.anims.play('run', true)
        }
        
        // transition to jump if pressing space
        if (!scene.gameOver){
            if (Phaser.Input.Keyboard.JustDown(up)) {
                this.stateMachine.transition('jump');
            }

            // transition to duck if pressing down
            if(down.isDown){
                this.stateMachine.transition('duck')
            }
        }

        if (scene.gameOver){
            this.stateMachine.transition('hurt')
        }
        
        
    }
}

class JumpState extends State{ 
    enter(scene, character) {     

        character.anims.play('jump')
        // console.log("jump")
        
        scene.jump_sound = scene.sound.add('jump').setVolume(2)
        scene.jump_sound.play() 
        character.body.velocity.y = character.JUMP_VELOCITY
        // console.log(character.body.velocity.y)
        
    }
    execute(scene, character) {
        const { left, right, up, down, space, shift } = scene.keys   

        if (scene.gameOver){
            this.stateMachine.transition('hurt')
        }

        if (up.isDown && Phaser.Input.Keyboard.DownDuration(up, 100)) {
            character.body.velocity.y = character.JUMP_VELOCITY
        }

        if (Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('double_jump');
        }

        if (character.body.touching.down && character.body.velocity.y == 0) {
            this.stateMachine.transition('run');
        }

    }
}

class DoubleJumpState extends State {
    enter(scene, character) {
        character.anims.play('jump')
        scene.jump_sound.play() 
        // console.log("jump2")

        character.body.velocity.y = character.JUMP_VELOCITY
        // console.log(character.body.velocity.y)
    }

    execute(scene, character) {
        const { left, right, up, down, space, shift } = scene.keys
        
        if (scene.gameOver){
            this.stateMachine.transition('hurt')
        }

        if (Phaser.Input.Keyboard.DownDuration(up, 100)) {
            character.body.velocity.y = character.JUMP_VELOCITY
        }

        if (Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('flap')
        }

        // if (Phaser.Input.Keyboard.JustDown(down)){
        //     this.stateMachine.transition('duck')
        // }

        if (character.body.touching.down) {
            this.stateMachine.transition('run');
        }
    }
}

class FlapState extends State {
    // flap should have a duration on the second time the player hits a jump
    // the player should only be able to glide for 5 seconds 

    enter(scene, character) {
        character.anims.play('run')
        // console.log("flap");
    }
    
    execute(scene, character) {
        const { left, right, up, down, space, shift } = scene.keys

        if (scene.gameOver){
            this.stateMachine.transition('hurt')
        }

        
        if (scene.keys.up.isDown) {
            // console.log("flapping");
            if (character.gliding <= 150) {
                character.setVelocityY(20);
                character.gliding++;
                // console.log(character.gliding)
            }        
        }
        

        if (character.body.touching.down) {
            this.stateMachine.transition('run');
            character.gliding = 0;
        }
    }
}

class HurtState extends State {
    // if the game ends then show high score
    enter(scene, character) {
        character.setTint(0xFF0000)     // turn red
        character.setVelocity(0)
        // console.log("hurt")
        character.anims.play('hurt')
        // character.body.allowGravity = false
    }
}

class DuckState extends State{
    enter(scene, character){
        // character.body.setSize(this.width / 2, this.height/2).setOffset(this.width/3, this.height/2)
        // character.body.setSize(this.width / 2, this.height/2).setOffset(this.width/3)
    }
    execute(scene, character){
        const { left, right, up, down, space, shift } = scene.keys   

        if (scene.gameOver){
            this.stateMachine.transition('hurt')
        }

        if (down.isDown){
            character.setSize(character.width / 2, character.height/2).setOffset(character.width/3, character.height/2)
            character.anims.play('duck')
            // console.log("not ducking")
            // this.stateMachine.transition('run')
            // character.body.setSize(character.width / 2, character.height).setOffset(character.width/3, 0)
        }
        else {
            character.body.setSize(character.width / 2, character.height).setOffset(character.width/3, 0)
            this.stateMachine.transition('run')
        }
    }
}