class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, moveSpeed, pointValue){
        super(scene, x, y, texture, frame, pointValue)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        // adding physics onto enemy
        this.chargeSpeed = moveSpeed
        this.points = pointValue
        this.timer = 5000
        this.startX = this.x
        this.charge = false

        //setting collision
        this.body.setImmovable(true)
        this.body.setSize(this.width, this.height).setOffset(0, 0)

        this.body.allowGravity = false

        
        // initializing state machine managing enemy
        scene.enemyFSM = new StateMachine('wait', {
            wait: new WaitState(),
            follow: new FollowState(),
            charge: new ChargeState(),
            reset: new ResetState(),
        }, [scene, this])
    }
}

// enemy specific state classes
class WaitState extends State {
    enter(scene, enemy) {
        enemy.setVelocity(0)
        enemy.anims.play('follow')
        // reset to position in wait (important for charge)
        enemy.x = enemy.startX
        // console.log(enemy.x)
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
        // play an animation

        enemy.anims.play('follow')
        scene.timer = scene.time.delayedCall(enemy.timer + (Math.random() * 300), () =>  {
            enemy.charge = true    
            enemy.anims.play('charge')
            enemy.once('animationcomplete', () => {
                this.stateMachine.transition('charge')
            })
        })
    }

    execute(scene, enemy) {

        if(scene.character.collision){
            //see: https://newdocs.phaser.io/docs/3.55.2/focus/Phaser.Time.TimerEvent-remove
            // if the game has ended do not run any of the scene delay items
            scene.timer.remove(false)
            this.stateMachine.transition('wait')
        }

        if (!enemy.charge){

            if ((scene.character.y - 16 <= enemy.y) && (enemy.y <= scene.character.y + 16))  {
                console.log("teleport");
                enemy.y = scene.character.y;
                enemy.setVelocityY(0);
            }
            else if (enemy.y > scene.character.y) {
                enemy.setVelocityY(-250);
            }
            else if (enemy.y < scene.character.y) {
                enemy.setVelocityY(250);
            }
        }

    }
}

class ChargeState extends State {
    enter(scene, enemy) {
        enemy.setVelocityY(0);
        enemy.anims.play('follow')
        enemy.charge = false
    }
    
    execute(scene, enemy) {
        // after at random intervals of time between 5-8 seconds the enemy should charge onto the character
        if(scene.character.collision){
            // if character collides with anything in the scene
            this.stateMachine.transition('wait')
        }
        enemy.body.setVelocityX(enemy.chargeSpeed * 2)
        // the enemy will go into the scene
        
        if (enemy.x >= game.config.width){
            // transition into original state
            this.stateMachine.transition('reset')
        }
    }
}

class ResetState extends State{
    enter(scene, enemy) {
        enemy.x = 0 - enemy.width;
        enemy.setVelocityX(20);
    }

    execute(scene, enemy) {

        if (enemy.x >= 0) {
            enemy.setVelocityX(0)
            this.stateMachine.transition('wait');
        }
        
        
    }
}

