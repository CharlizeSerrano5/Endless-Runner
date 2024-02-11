class Play extends Phaser.Scene{
    constructor() {
        super('playScene')
    }

    init() {
        // for variables
        this.physics.world.gravity.y = 1300
    }

    create() {
        // initializing scrolling background
        this.background = this.add.tileSprite(0,0, game.config.width, game.config.height, 'background').setOrigin(0,0)
        
        // initializing scrolling tiles
        this.ground = this.add.group()
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'tile').setScale(SCALE).setOrigin(0)
            groundTile.body.immovable = true
            groundTile.body.allowGravity = false
            this.ground.add(groundTile)
        }

        
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'groundScroll').setOrigin(0)

        // adding character to scene
        this.character = new Character(this, game.config.width / 8, game.config.height / 1.25, 'temp', 0, 0)
        //adding physics + collider
        this.character.setCollideWorldBounds(true)
        // this.character.body.allowGravity = true
        // this.character.setGravityY(2600)

        this.physics.add.collider(this.character, this.ground)
        this.character.setMaxVelocity(this.character.MAX_X_VEL, this.character.MAX_Y_VEL)

        // setting up keyboard inputs
        this.keys = this.input.keyboard.createCursorKeys()
            // from FSM repository


        // creating obstacles
        // this.obstacle01 = new Obstacle()

        // Game OVER flag
        this.gameOver = false

        // debug key listener - TEMP - from FSM
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        //TESTS
        //console.log(this.character.y)


        // Game Over Events
        if (this.gameOver){
            this.character.reset()

        }
        // Collision Checks
            // Use Work from Section

        // If Game is Not Over
        if (!this.gameOver){
            this.characterFSM.step() // setting up state machine from default
            this.background.tilePositionX += scroll_SPEED
            this.groundScroll.tilePositionX += scroll_SPEED  
            // Updating Tile Movement - temporarily at a fixed speed

        }            
        
    }

        
       
       
    
}