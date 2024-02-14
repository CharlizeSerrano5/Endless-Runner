class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x,y , texture, frame, pointValue)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        // adding physics onto enemy
        this.chargeSpeed = 3
        this.points = pointValue
        this.timer = 5000

        //setting collision
        this.body.setSize(this.width / 2, this.height).setOffset(this.width / 5, 0)

        this.body.allowGravity = false

        
        // initializing state machine managing enemy
        scene.enemyFSM = new StateMachine('wait', {
            wait: new WaitState(),
            follow: new FollowState(),
            charge: new ChargeState(),
        }, [scene, this])
    }
}

// enemy specific state classes
class WaitState extends State {
    enter(scene, enemy) {
        // enemy.setVelocity(0)
        // enemy.x = enemy.body
        console.log('wait')
    }

    execute(scene, enemy) {
        // destructuring to make a local copy of the keyboard inputs
        const { left, right, up, down, space, shift } = scene.keys 
        // START GAME
        if(!scene.gameOver){
            this.stateMachine.transition('follow')
        }
    }
}

class FollowState extends State {
    enter(scene, enemy) {
        scene.time.delayedCall(enemy.timer, () =>  {
            this.stateMachine.transition('charge')
            
        })
    }

    execute(scene, enemy) {
        // execute is not being reached
        enemy.y = scene.character.y
        // enemy.x = scene.character.x - 32
    }
}

class ChargeState extends State {
    enter(scene, enemy) {

    }
    
    execute(scene, enemy) {
        // after every 15 seconds the enemy should charge onto the character
            enemy.body.setVelocityX(this.chargeSpeed)
            // the enemy will go into the scene
            
            if (enemy.x >= game.config.width){
                // go back to original state
                this.stateMachine.transition('wait')
            }
    }
}

