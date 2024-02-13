class Play extends Phaser.Scene{
    constructor() {
        super('playScene')
    }

    init() {
        // for variables
        this.physics.world.gravity.y = 2600
        this.duration = 0
        this.scroll = scroll_SPEED
        this.speed = this.scroll * 60
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
        this.character = new Character(this, game.config.width / 8, game.config.height-tileSize, 'penguin', 0, 0).setOrigin(0,1)
        // adding obstacles to the scene - temporarily 3
        // this.obstacle01 = new Obstacle(this, game.config.width/1.5, game.config.height-tileSize, 'obstacle', 0, this.speed, 20).setScale(1.5).setOrigin(1)
        // this.obstacle02 = new Obstacle(this, game.config.width/1, game.config.height-tileSize, 'obstacle', 0, this.speed, 20).setScale(1.5).setOrigin(1)
        // this.obstacle03 = new Obstacle(this, game.config.width/2, game.config.height-tileSize, 'obstacle', 0, this.speed, 20).setScale(1.5).setOrigin(1)
 

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

        // Distance Score
        this.distanceScore = this.add.text(game.config.width/2, game.config.height/4, this.distance, tempConfig).setOrigin(0.5)
        //see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/distance/
        // Built-in Method of Phaser: var d = Phaser.Math.Distance.Between(x1, y1, x2, y2);
        
        topDistance = this.add.text(game.config.width/2, game.config.height/10, 'HI: ' + distance, tempConfig).setOrigin(0.5)


        // debug key listener - TEMP - from FSM
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        // Game Over Events
        if (this.gameOver){
            const { left, right, up, down, space, shift } = this.keys   

            // move to the next menu and show high score
            // console.log('Game Over')

            // see: https://phaser.io/examples/v3/view/game-config/pixel-art-mode
            this.add.bitmapText(game.config.width/2, 128, 'atari', 'GAME OVER').setOrigin(0.5).setScale(0.5);
            
            // this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', tempConfig).setOrigin(0.5)
            // this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press Key to Restart or Key for Menu', tempConfig).setOrigin(0.5)
            this.scroll = 0
            
            // obstaining the top distance score
            if(this.distance > distance){
                distance = Math.floor(this.distance)
                topDistance = this.add.text(game.config.width/2, game.config/height/10, 'HI: ' + distance, tempConfig).setOrigin(0.5)
            }

            this.obstacle01.moveSpeed = this.scroll
            this.obstacle02.moveSpeed = this.scroll
            this.obstacle03.moveSpeed = this.scroll

            this.character.setVelocity(0)

            if (right.isDown){
                this.scene.restart()    
            }
            if (down.isDown) {
                this.scene.start('menuScene')
            }
        }

       


        // Collision Checks
        this.physics.add.collider(this.character, this.obstacle01, this.handleCollision, null, this)
        this.physics.add.collider(this.character, this.obstacle02, this.handleCollision, null, this)
        this.physics.add.collider(this.character, this.obstacle03, this.handleCollision, null, this)

        this.physics.add.collider(this.character, this.ground)
        

        this.characterFSM.step() // setting up state machine from default
        if(this.character.run){
            // Distance Score
            this.distance += this.scroll/10
            this.distanceScore.text = Math.floor(this.distance)

            // scrolling obstacles
            // this.obstacle01.update()
            // this.obstacle02.update()
            // this.obstacle03.update()

            // scrolling tiles
            this.background.tilePositionX += this.scroll
            this.groundScroll.tilePositionX += this.scroll  
                //broken
        }    
        // Updating Tile Movement - temporarily at a fixed speed

    }

    handleCollision(character, colliding_object){
        // Function from Rocket Patrol Section
        console.log('handle collision')
        character.collision = true
        
        // when the player collides with any obstacle set to gameover
        this.gameOver = true
        

    }

    
        
    
       
    
}