class Obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, moveSpeed, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        // add physics onto obstacle
        this.points = pointValue
        this.moveSpeed = moveSpeed


        // setting collision
        this.body.setImmovable(true)
        this.body.setSize(this.width / 2, this.height).setOffset(this.width / 5, 0)
        // this.body.setCollideWorldBounds(true)


        this.body.allowGravity = false

        
    }

    update() {
        // console.log(this.moveSpeed)
        this.body.setVelocityX(-this.moveSpeed)

        console.log(this.x)

        if (this.scene.gameOver){
            this.body.setVelocityX(0)
        }
        // scroll with the background
        // console.log(this.x)
        // game.physics.world.wrap(game.this, game.this.width/2)

        // wrap from left to right edge
        if (this.x <= 0 - this.width) {
            //- implement later - randomize its location
            this.x = game.config.width + (Math.random()* 300 * Math.random())
        }
    }

    reset() {
        this.x = game.config.width
    }
}