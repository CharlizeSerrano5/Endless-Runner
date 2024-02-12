class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x,y , texture, frame, pointValue)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.chargeSpeed = 3

        this.points = pointValue
    }
}