class Obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        // add physics onto obstacle
        this.points = pointValue
        this.scrollSpeed = scroll_SPEED

        // setting collision
        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)
    }

    update() {
        // scroll with the background
        console.log(this.x)
        this.x -= this.scroll_SPEED

        // wrap from left to right edge
        // if (this.x <= 0 - this.width) {
        //     //- implement later - randomize its location
        //     this.x = game.config.width
        // }
    }

    reset() {
        this.x = game.config.width
    }
}