window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render } );
    
    
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.image( 'background','assets/background.jpg');
        //game.load.spritesheet('player', 'assets/dude.png',32,48);
        //game.load.spritesheet('player2', 'assets/dude2.png',32,48);
        game.load.image('ledge', 'assets/brick2.png');
        game.load.image('star', 'assets/star2.png');
        game.load.audio('finish','assets/cheering.wav');
        game.load.audio('music', 'assets/fiati.wav');
        game.load.image('player1', 'assets/ufo.png');
        game.load.image('player2', 'assets/ufo2.png');
    }
    
    
    var background;
    var player;
    var player2;
    var facing = 'left';
    var facing2 = 'left';
    var cursors;
    var cursors2;
    var stars;
    var text;
    var sound;
    var score1 = 0;
    var score1String;
    var score2 = 0;
    var score2String;
    var score1Text;
    var score2Text;
    var speed = 4;
    
    var starGravity = 0;
    var music;
    
    
    function create() {
        //Change the background image and scale to fit screen
        game.world.setBounds(0,0, 800,600);
        background = game.add.tileSprite(0,0,800,600,'background');
        
        
        //Checks bounds collisions with all sides except the sky
        game.physics.arcade.checkCollision.up = false;
        

        //Creates the star group to be collected
        stars = game.add.physicsGroup();
        var star;
        stars.physicsBodyType = Phaser.Physics.ARCADE;
        
        //Creates the initial star with world out of bounds detection
        star = stars.create(400,300,'star');
        star.checkWorldBounds = true;
        game.physics.enable(stars, Phaser.Physics.ARCADE);
        
        //Creates the background Music
        music = game.add.audio('music');
        music.play();
        music.loop = true;
        
        
        //  The score String is made and displayed here
        score1String = 'Player 1 : ';
        score1Text = game.add.text(10, 10, score1String + score1, { font: '34px Arial', fill: '#fff' });
        score2String = 'Player 2 : ' ;
        score2Text = game.add.text(620, 10, score2String + score2, { font: '34px Arial', fill: '#fff' });
        
        // Create a sprite to be the player
        player = game.add.sprite(0,560, 'player1');
        player2 = game.add.sprite(770,560,'player2');
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        game.physics.enable( player2, Phaser.Physics.ARCADE );
        
        //Makes it so the players may not leave the screen
        player.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;
        

        //Makes the controls the arrow keys on the keyboard
        cursors = game.input.keyboard.createCursorKeys();
        cursors2 = {up: game.input.keyboard.addKey(Phaser.Keyboard.W), down: game.input.keyboard.addKey(Phaser.Keyboard.S), left: game.input.keyboard.addKey(Phaser.Keyboard.A), right: game.input.keyboard.addKey(Phaser.Keyboard.D)};
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
        text = game.add.text( 400, 10, "Capture the Star!", style );
        text.anchor.setTo( 0.5, 0.0 );
        text.fixedToCamera=true;
    }
    
    function update() {
        
        //If player makes it to the end of the world
        if (game.camera.x >=999000)
            {
                var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
                text = game.add.text( game.camera.x + 400, 50, "You made it to the end with a Great Score!", style );
                text.anchor.setTo( 0.5, 0.0 );
                game.paused=true;
            }
        
        //game.physics.arcade.collide(player,ledges);
        //game.physics.arcade.collide(stars,ledges);
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player2.body.velocity.y=0;
        player2.body.velocity.x=0;
       
        //Checks if the player has hit a star
        game.physics.arcade.collide(player,stars,hitStar,null,this);
        game.physics.arcade.collide(player2,stars,hitStar2,null,this);
        

        
        //Loops the Background Music
        loopMusic();
        
        //Input detection
        detectInput();

        
    }
    
    
    //Detects if the player has given input
    function detectInput()
    {
        //Player 1 input
        if (cursors.left.isDown)
        {
            player.x -= speed;
            player.angle = -15;
        }
        else if (cursors.right.isDown)
        {
            player.x += speed;
            player.angle = 15;
        }
        else if (cursors.up.isDown)
        {
            player.y -= speed;
        }
        else if (cursors.down.isDown)
        {
            player.y += speed;
        }
        else
        {
            player.angle = 0;
        }
        
        //Player 2 input
        if (cursors2.left.isDown)
        {
            player2.x -= speed;
            player2.angle = -15;
        }
        else if (cursors2.right.isDown)
        {
            player2.x += speed;
            player2.angle = 15;
        }
        else if (cursors2.up.isDown)
        {
            player2.y -= speed;
        }
        else if (cursors2.down.isDown)
        {
            player2.y += speed;
        }
        else
        {
            player2.angle = 0;
        }
        
    }
    
    //Action occurs when the player hits the star
    function hitStar(player,star)
    {
        
        //Destroys old star and creats new one to be collected.
        //Updates Score for collected star.
        star.destroy();
        sound = game.sound.play('finish');  
        star = stars.create(random,120,'star');
        score1 += 1;
        score1Text.text = score1String + score1;
        

    }
    
    function render() {

    //game.debug.cameraInfo(game.camera, 32, 32);

}
    
    
    //Event when a star is missed 
    //Kills the current star and makes a new one fall within the camera window
    function starMissed(star)
    {
        star.kill();
        var random =game.rnd.integerInRange(game.camera.x+200,game.camera.x+800);
        star = stars.create(random,120,'star');
        star.body.allowGravity=true;
        star.body.gravity.y=starGravity;
        star.checkWorldBounds = true;
        star.events.onOutOfBounds.add(starMissed, this );
        //score-=5;
        //scoreText.text = scoreString + score
    }
    
    
    
    //Loops the Background Music
    function loopMusic()
    {            
        if (music.isPlaying == false)
            {
                music.restart();
            }
    }
    
    //Player 1 captured the star
    function hitStar()
    {
        star.kill()
        var randomX = game.rnd.integerInRange(30,770);
        var randomY = game.rnd.integerInRange(100,570);
        star = stars.create(randomX, randomY, 'star');
        score1 +=1;
        score1Text.text = score1String + score1;
    }
    
    //Player 2 capture the star
    function hitStar2()
    {
        star.kill()
        var randomX = game.rnd.integerInRange(30,770);
        var randomY = game.rnd.integerInRange(100,570);
        star = stars.create(randomX, randomY, 'star');
        score2 +=1;
        score2Text.text = score2String + score2;
    }
    
    
   
    
/*    function endGame()
    {
        
        player.kill();
        //Put Player Losing Screen Here 
        
         var style = { font: "25px Verdana", fill: "#000000", align: "center" };
        text = game.add.text( game.camera.x + 400, 200, "You died! Refresh to play again", style );
        text.anchor.setTo( 0.5, 0.0 );
        game.paused=true;
	
    }*/
    
    
    
};
