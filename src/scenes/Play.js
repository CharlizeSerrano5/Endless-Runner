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
        this.music_playing = false
        this.increase_value = 1.0002
        
    }

    create() {
        this.add.bitmapText(64, 64, 'atari', 'PHASER', 16).setOrigin(0)

        
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
        this.character = new Character(this, 96, game.config.height-tileSize, 'penguin', 0, 0).setOrigin(0,1)
        // adding obstacles to the scene - temporarily 3
        this.obstacle01 = new Obstacle(this, game.config.width/0.5, game.config.height-tileSize, 'obstacle', 0, this.speed, 20).setScale(1.25).setOrigin(1)
        this.obstacle02 = new Obstacle(this, game.config.width/1, game.config.height-tileSize, 'obstacle', 0, this.speed, 20).setOrigin(1)
 
        this.obstacle03 = new Obstacle(this, game.config.width/0.2, game.config.height-tileSize, 'obstacle', 0, this.speed, 20).setOrigin(1)
        // adding enemy to scene - test
        this.enemy = new Enemy(this, 0, game.config.height-tileSize, 'enemy', 13, this.speed, 0).setOrigin(0, 1)

        //adding physics + collider
        this.character.setCollideWorldBounds(true)
        this.character.setMaxVelocity(this.character.MAX_X_VEL, this.character.MAX_Y_VEL)

        // setting up keyboard inputs - FSM repository
        this.keys = this.input.keyboard.createCursorKeys()

        // adding music
        this.music = this.sound.add('music').setVolume(0.4).setLoop(true)

        // Game OVER flag
        this.gameOver = false

        // Distance Score - score should be implemented as a 32 wall at the top
            // this.distanceScore = this.add.text(game.config.width/2, 0, this.distance, tempConfig).setOrigin(0.5, 0)
            // topDistance = this.add.text(game.config.width/2, game.config.height/10, 'HI: ' + distance, tempConfig).setOrigin(0.5)
        this.distanceScore = this.add.bitmapText(game.config.width - 16, 32, 'atari', this.distance, 8, 0.5).setOrigin(0.5)
        topDistance = this.add.bitmapText(game.config.width - 64, 16 , 'atari', 'High Score: ' + distance, 8, 0.5).setOrigin(0.5)

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

            // Printing Game Over
            // see: https://phaser.io/examples/v3/view/game-config/pixel-art-mode
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 48, 'atari', 'GAME OVER', 32).setOrigin(0.5).setScale(0.5)
            this.add.bitmapText(game.config.width/2, game.config.height/2, 'atari', 'Down Key for Menu', 8).setOrigin(0.5)
            this.add.bitmapText(game.config.width/2, game.config.height/2-16, 'atari', 'Right Key to Restart', 8).setOrigin(0.5)
            
            // this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', tempConfig).setOrigin(0.5)
            // this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press Key to Restart or Key for Menu', tempConfig).setOrigin(0.5)
            this.scroll = 0
            
            // obstaining the top distance score
            if(this.distance > distance){
                distance = Math.floor(this.distance)
                topDistance.text = 'High Score: ' +distance
            }

            this.obstacle01.moveSpeed = this.scroll
            this.obstacle02.moveSpeed = this.scroll
            this.obstacle03.moveSpeed = this.scroll


            // set player to still
            this.character.setVelocity(0)
            this.enemy.setVelocity(0)
            // pausing music
            // this.music.stop()
            // this.enemy.anims.play('follow')

            if (right.isDown){
                this.music.stop()
                this.scene.restart()    
            }
            if (down.isDown) {
                this.music.stop()
                this.scene.start('menuScene')
                
            }
        }

       


        // Collision Checks
        this.physics.add.collider(this.character, this.obstacle01, this.handleCollision, null, this)
        this.physics.add.collider(this.character, this.obstacle02, this.handleCollision, null, this)
        this.physics.add.collider(this.character, this.obstacle03, this.handleCollision, null, this)
        this.physics.add.collider(this.character, this.enemy, this.handleCollision, null, this)
            
        this.physics.add.collider(this.character, this.ground)
        this.physics.add.collider(this.enemy, this.ground)

        // play music
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/
        if (this.music.seek == 0) {
            this.music_playing = false
        }
        if (!this.gameOver && !this.music_playing && this.character.run){
            this.music.play()
            this.music_playing = true
        }
        
        this.characterFSM.step() // setting up state machine 
        if(this.character.run){
            

            // setting up enemy
            this.enemyFSM.step() // setting up state machine 

            // Distance Score
            this.distance += this.scroll/10
            this.distanceScore.text = Math.floor(this.distance)

            // scrolling obstacles
            this.obstacle01.update()
            this.obstacle02.update()
            this.obstacle03.update()


            // moving enemy
            this.enemy.update()

            // scrolling tiles
            this.background.tilePositionX += this.scroll
            this.groundScroll.tilePositionX += this.scroll  
            

            this.scroll *= this.increase_value
            this.obstacle01.moveSpeed *= this.increase_value
            this.obstacle02.moveSpeed *= this.increase_value
            this.obstacle03.moveSpeed *= this.increase_value
            this.enemy.chargeSpeed *= this.increase_value * 1.00005
                //broken
        }    
        // Updating Tile Movement - temporarily at a fixed speed

    }

    handleCollision(character, colliding_object){
        // Function from Rocket Patrol Section
        this.character.collision = true
        
        this.scroll = 0
        // collision is broken
        // when the player collides with any obstacle set to gameover
        this.gameOver = true
        // this.music.stop()
        // this.music.
        

    }

    
        
    
       
    
}