class Play extends Phaser.Scene{
    constructor() {
        super('playScene')
    }

    init() {
        // for variables
        this.physics.world.gravity.y = 2600
    }

    create() {
        // placing tile sprites
        this.background = this.add.tileSprite(0,0, game.config.width, game.config.height, 'background').setOrigin(0,0)
        
        this.ground = this.add.group()
        for (let i = 0; i < game.config.width;i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'tile')
            groundTile.body.immovable = true
            groundTile.body.allowGravity = false
            this.ground.add(groundTile)
        }

        // adding character to scene
        this.character = new Character(this, game.config.width / 8, game.config.height / 1.25, 'temp', 0, 0)
        //adding physics collider
        this.physics.add.collider(this.character, this.ground)


        // setting up keyboard inputs
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)  

        // creating obstacles
        // this.obstacle01 = new Obstacle()

        // Game OVER flag
        this.gameOver = false


        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        // Game Over Events
        if (this.gameOver){
            this.character.reset()

        }
        // Collision Checks
            // Use Work from Section

        // If Game is Not Over
        if (!this.gameOver){
            this.characterFSM.step() // setting up state machine from default

            // Updating Tile Movement - temporarily at a fixed speed
            this.background.tilePositionX += scroll_SPEED
            this.ground.tilePositionX += scroll_SPEED
        }            

    }

        
       
       
    
}