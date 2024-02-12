class Play extends Phaser.Scene{
    constructor() {
        super('playScene')
    }

    init() {
        // for variables
        this.physics.world.gravity.y = 2600
        this.duration = 0
        this.speed = scroll_SPEED * 60
        this.distance = 0
        this.obstacleAmount = 3
    }

    create() {
        //TEST
        this.add.bitmapText(400, 128, 'atari', 'PHASER').setOrigin(0.5).setScale(2);

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


        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'groundScroll').setOrigin(0)
        
        // adding character to scene
        this.character = new Character(this, game.config.width / 8, game.config.height-tileSize, 'temp', 0, 0).setOrigin(0,1)
        // adding obstacles to the scene - temporarily 3
        this.obstacle01 = new Obstacle(this, game.config.width/1.25, game.config.height-tileSize, 'obstacle', 0, this.speed, 20).setScale(1.5).setOrigin(1)
        this.obstacle02 = new Obstacle(this, game.config.width/1, game.config.height-tileSize, 'obstacle', 0, this.speed, 20).setScale(1.5).setOrigin(1)
        this.obstacle03 = new Obstacle(this, game.config.width/3, game.config.height-tileSize, 'obstacle', 0, this.speed, 20).setScale(1.5).setOrigin(1)
 

        //adding physics + collider
        this.character.setCollideWorldBounds(true)
        this.character.setMaxVelocity(this.character.MAX_X_VEL, this.character.MAX_Y_VEL)

        // creating a wrapping area
        //see: https://github.com/phaserjs/examples/blob/master/public/src/actions/wrap%20in%20rectangle%20with%20padding.js
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
        this.physics.add.collider(this.character, this.obstacle02, this.handleCollision, null, this)
        this.physics.add.collider(this.character, this.obstacle03, this.handleCollision, null, this)

        this.physics.add.collider(this.character, this.ground)
        

        this.characterFSM.step() // setting up state machine from default
        if(this.character.run){
            // scrolling obstacles
            this.obstacle01.update()
            this.obstacle02.update()
            this.obstacle03.update()
            // wrapping obstacles
            this.physics.world.wrap(this.obstacle01, this.obstacle01.width/2)

            // scrolling tiles
            this.background.tilePositionX += scroll_SPEED
            this.groundScroll.tilePositionX += scroll_SPEED  
                //broken
        }    
        // Updating Tile Movement - temporarily at a fixed speed

    }

    handleCollision(character, obstacle){
        // Function from Rocket Patrol Section
        
        // when the player collides with any obstacle set to gameover

        // the player should enter the hurt scene and enter the menu
        this.scene.restart()
    }

    
        
    
       
    
}