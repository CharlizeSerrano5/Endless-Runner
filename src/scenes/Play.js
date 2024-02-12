class Play extends Phaser.Scene{
    constructor() {
        super('playScene')
    }

    init() {
        // for variables
        this.physics.world.gravity.y = 2600
        this.duration = 0
        this.speed = 80
        this.distance = 0
    }

    create() {
        // initializing scrolling background
        this.background = this.add.tileSprite(0,0, game.config.width, game.config.height, 'background').setOrigin(0,0)
        // initializing scrolling tiles
        this.ground = this.add.group()
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height-tileSize, 'tile').setOrigin(0)
            groundTile.body.immovable = true
            groundTile.body.allowGravity = false
            this.ground.add(groundTile)
        }
        this.groundScroll = this.add.tileSprite(0,game.config.width,game.config.height-tileSize, tileSize, 'groundScroll').setOrigin(0,0)

        // adding character to scene
        this.character = new Character(this, game.config.width / 8, game.config.height / 1.25, 'temp', 0, 0)
        // adding obstacles to the scene
        this.obstacle01 = new Obstacle(this, game.config.width/1.25, game.config.height-tileSize, 'obstacle', 0, this.speed, 20).setScale(1.5).setOrigin(1)
        this.obstacle01.body.allowGravity = false
        
        //adding physics + collider
        this.character.setCollideWorldBounds(true)
        this.character.setMaxVelocity(this.character.MAX_X_VEL, this.character.MAX_Y_VEL)

        // creating a wrapping area
        see: https://github.com/phaserjs/examples/blob/master/public/src/actions/wrap%20in%20rectangle%20with%20padding.js
            //  When a sprite leaves this, it'll be wrapped around
        this.wrapRect = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);


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
        // Game Over Events
        if (this.gameOver){
            // move to the next menu and show high score
            
            // character will be reset
            // this.character.step()
            
        }

        // Collision Checks
        this.physics.add.collider(this.character, this.obstacle01, this.handleCollision, null, this)
        this.physics.add.collider(this.character, this.ground)
        this.physics.add.collider(this.obstacle01, this.ground)
        
        // Wrapping Sprites
        // Phaser.Actions.WrapInRectangle(this.obstacle01, this.wrapRect, 200)

        this.characterFSM.step() // setting up state machine from default
        if(this.character.run){
            this.obstacle01.update()
            this.physics.world.wrap(this.obstacle01, this.obstacle01.width/2)

            this.background.tilePositionX += scroll_SPEED
            this.groundScroll.tilePositionX += scroll_SPEED  
        }    
        // Updating Tile Movement - temporarily at a fixed speed

    }

    handleCollision(character, obstacle){
        // Function from Rocket Patrol Section
        
        // when the player collides with any obstacle set to gameover
        this.scene.restart()
    }

        
       
       
    
}