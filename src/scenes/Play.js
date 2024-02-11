class Play extends Phaser.Scene{
    constructor() {
        super('playScene')
    }

    init() {
        // for variables
        this.physics.world.gravity.y = 2600
        this.duration = 0;
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
        // adding obstacles to the scene
        this.obstacle01 = new Obstacle(this, game.config.width/1.25, game.config.height/ 1.25, 'obstacle', 0, 0).setScale(1.5)
        
        //adding physics + collider
        this.character.setCollideWorldBounds(true)
        this.physics.add.collider(this.character, this.ground)
        this.physics.add.collider(this.obstacle01, this.ground)
        this.physics.add.collider(this.character, this.obstacle01)
        this.character.setMaxVelocity(this.character.MAX_X_VEL, this.character.MAX_Y_VEL)



        // setting up keyboard inputs
        this.keys = this.input.keyboard.createCursorKeys()
            // from FSM repository


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
        // console.log(this.character.jumping)

        // Game Over Events
        if (this.gameOver){
            this.character.reset()

        }
        // Collision Checks
            // Use Work from Section

        // If Game is Not Over
        if (!this.gameOver){
            this.characterFSM.step() // setting up state machine from default
            this.obstacle01.update()
            this.background.tilePositionX += scroll_SPEED
            this.groundScroll.tilePositionX += scroll_SPEED  
            // Updating Tile Movement - temporarily at a fixed speed

        }            
        
    }

        
       
       
    
}