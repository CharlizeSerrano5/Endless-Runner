class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this) 
        scene.physics.add.existing(this)
            // add the physics body onto the character
        this.moveSpeed = 2
        
    //--setting collision
        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)
    }

    update(){
        
        // up and down movement

    }

    reset() {

    }
}