window.onload = function () {

    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });
    
    
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('logo', 'assets/phaser.png');
        game.load.image('background', 'assets/background.jpg');
        game.load.image('player1', 'assets/ufo.png');
        game.load.image('one', 'assets/one.png');
        game.load.image('two', 'assets/two.png');
        game.load.image('three', 'assets/three.png');
        game.load.image('four', 'assets/four.png');
        game.load.image('five', 'assets/five.png');
        game.load.image('six', 'assets/six.png');
        game.load.image('seven', 'assets/seven.png');
        game.load.image('eight', 'assets/eight.png');
        game.load.image('nine', 'assets/nine.png');
        game.load.image('ten', 'assets/ten.png');
        
        game.load.audio('music', 'assets/Jupiter.wav');
        game.load.audio('yay', 'assets/cheering.wav');
        game.load.audio('buzz','assets/buzz.wav');
    }
    
    
    var background;
    var start;
    
    var player1;
    
    //Input from players
    var cursors;
    
    //Groups
    var numbers;
    var one,two,three,four,five,six,seven,eight,nine,ten;
     
    var randomX,randomY;
    var text;
    var winText;
    var sound;
    var count=1;
    
    var speed = 4;
    var music;
    
    var killSpace;
    
    
    function create() {
        //Change the background image and scale to fit screen
        game.world.setBounds(0, 0, 1920, 1080);
        background = game.add.tileSprite(0, 0, 1920, 1080, 'background');
        
        game.physics.startSystem(game, Phaser.Physics.ARCADE);
    
        //Creates the star group to be collected
        numbers = game.add.physicsGroup();
        numbers.physicsBodyType = Phaser.Physics.ARCADE;
        
        //Puts numbers randomly in the world
        placeNumbers();
        
        /* //Creates the initial star with world out of bounds detection
        letter = letters.create(400, 300, 'star');
        game.physics.enable(letters, Phaser.Physics.ARCADE);*/
        
        //Creates the background Music
        music = game.add.audio('music');
        music.play();
        //music.loop = true;
        
        
        // Create a sprite to be the player
        player1 = game.add.sprite(0, 20, 'player1');
        game.camera.follow(player1);
        
        //Set the anchor to the middle of the players
        player1.anchor.setTo(0.5,0.5);

        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable(player1, Phaser.Physics.ARCADE);
        
        
        //Makes it so the players may not leave the screen
        player1.body.collideWorldBounds = true;

        
        killSpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //Makes the controls the arrow keys on the keyboard
        cursors = game.input.keyboard.createCursorKeys();
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
        text = game.add.text(400, 10, "Collect the numbers in order!", style);
        text.anchor.setTo(0.5, 0.0);
    }
    
    function update()
    {

        player1.body.velocity.x = 0;
        player1.body.velocity.y = 0;
        
        //Checks if the player has hit a number
        game.physics.arcade.overlap(player1, numbers, hitNumber, null, this);
        
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
            player1.x -= speed;
            player1.angle = -15;
        }
        if (cursors.right.isDown)
        {
            player1.x += speed;
            player1.angle = 15;
        }
        if (cursors.up.isDown)
        {
            player1.y -= speed;
        }
        if (cursors.down.isDown)
        {
            player1.y += speed;
        }
        if (cursors.up.isDown == false && cursors.down.isDown == false && cursors.left.isDown == false && cursors.right.isDown == false)
        {
            player1.angle = 0;
        }
        
        
    }
    

    
    function render()
    {
        //game.debug.body(player1);

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
    function hitNumber(player1, number)
    {
        if(count==1)
            {
                if(number==one)
                    {
                        number.destroy();
                        sound = game.sound.play('yay');
                        count+=1;
                    }
                else
                    {
                        game.sound.play('buzz');
                        number.visible=false;
                        randomX = game.rnd.integerInRange(50, 1800);
                        randomY = game.rnd.integerInRange(50, 980);
                        number.x = randomX;
                        number.y = randomY;
                        number.visible = true;
                    }
            }
        else if(count==2)
        {
            if(number==two)
                    {
                        number.destroy();
                        sound = game.sound.play('yay');
                        count+=1;
                    }
                else
                    {
                        sound = game.sound.play('buzz');
                        number.visible=false;
                        randomX = game.rnd.integerInRange(50, 1800);
                        randomY = game.rnd.integerInRange(50, 980);
                        number.x = randomX;
                        number.y = randomY;
                        number.visible = true;
                    }
        }
        else if(count==3)
        {
            if(number==three)
                    {
                        number.destroy();
                        sound = game.sound.play('yay');
                        count+=1;
                    }
                else
                    {
                        sound = game.sound.play('buzz');
                        number.visible=false;
                        randomX = game.rnd.integerInRange(50, 1800);
                        randomY = game.rnd.integerInRange(50, 980);
                        number.x = randomX;
                        number.y = randomY;
                        number.visible = true;
                    }
        }
        else if(count==4)
        {
            if(number==four)
                    {
                        number.destroy();
                        sound = game.sound.play('yay');
                        count+=1;
                    }
                else
                    {
                        sound = game.sound.play('buzz');
                        number.visible=false;
                        randomX = game.rnd.integerInRange(50, 1800);
                        randomY = game.rnd.integerInRange(50, 980);
                        number.x = randomX;
                        number.y = randomY;
                        number.visible = true;
                    }
        }
        else if(count==5)
        {
            if(number==five)
                    {
                        number.destroy();
                        sound = game.sound.play('yay');
                        count+=1;
                    }
                else
                    {
                        sound = game.sound.play('buzz');
                        number.visible=false;
                        randomX = game.rnd.integerInRange(50, 1800);
                        randomY = game.rnd.integerInRange(50, 980);
                        number.x = randomX;
                        number.y = randomY;
                        number.visible = true;
                    }
        }
        else if(count==6)
        {
            if(number==six)
                    {
                        number.destroy();
                        sound = game.sound.play('yay');
                        count+=1;
                    }
                else
                    {
                        sound = game.sound.play('buzz');
                        number.visible=false;
                        randomX = game.rnd.integerInRange(50, 1800);
                        randomY = game.rnd.integerInRange(50, 980);
                        number.x = randomX;
                        number.y = randomY;
                        number.visible = true;
                    }
        }
        else if(count==7)
        {
            if(number==seven)
                    {
                        number.destroy();
                        sound = game.sound.play('yay');
                        count+=1;
                    }
                else
                    {
                        sound = game.sound.play('buzz');
                        number.visible=false;
                        randomX = game.rnd.integerInRange(50, 1800);
                        randomY = game.rnd.integerInRange(50, 980);
                        number.x = randomX;
                        number.y = randomY;
                        number.visible = true;
                    }
        }
        else if(count==8)
        {
            if(number==eight)
                    {
                        number.destroy();
                        sound = game.sound.play('yay');
                        count+=1;
                    }
                else
                    {
                        sound = game.sound.play('buzz');
                        number.visible=false;
                        randomX = game.rnd.integerInRange(50, 1800);
                        randomY = game.rnd.integerInRange(50, 980);
                        number.x = randomX;
                        number.y = randomY;
                        number.visible = true;
                    }
        }
        else if(count==9)
        {
            if(number==nine)
                    {
                        number.destroy();
                        sound = game.sound.play('yay');
                        count+=1;
                    }
                else
                    {
                        sound = game.sound.play('buzz');
                        number.visible=false;
                        randomX = game.rnd.integerInRange(50, 1800);
                        randomY = game.rnd.integerInRange(50, 980);
                        number.x = randomX;
                        number.y = randomY;
                        number.visible = true;
                    }
        }
        else if(count==10)
        {
            if(number==ten)
                    {
                        number.destroy();
                        sound = game.sound.play('yay');
                        count+=1;
                        endGame();
                    }
                else //Won't happen. Here in case more numbers are added
                    {
                        sound = game.sound.play('buzz');
                        number.visible=false;
                        randomX = game.rnd.integerInRange(50, 1800);
                        randomY = game.rnd.integerInRange(50, 980);
                        number.x = randomX;
                        number.y = randomY;
                        number.visible = true;
                    }
        }

    }
    

   function placeNumbers()
    {   
        randomX = game.rnd.integerInRange(50, 1800);
        randomY = game.rnd.integerInRange(50, 980);
        one = numbers.create(randomX, randomY, 'one');
        randomX = game.rnd.integerInRange(50, 1800);
        randomY = game.rnd.integerInRange(50, 980);
        two = numbers.create(randomX, randomY, 'two');
        randomX = game.rnd.integerInRange(50, 1800);
        randomY = game.rnd.integerInRange(50, 980);
        three = numbers.create(randomX, randomY, 'three');
        randomX = game.rnd.integerInRange(50, 1800);
        randomY = game.rnd.integerInRange(50, 980);
        four = numbers.create(randomX, randomY, 'four');
        randomX = game.rnd.integerInRange(50, 1800);
        randomY = game.rnd.integerInRange(50, 980);
        five = numbers.create(randomX, randomY, 'five');
        randomX = game.rnd.integerInRange(50, 1800);
        randomY = game.rnd.integerInRange(50, 980);
        six = numbers.create(randomX, randomY, 'six');
        randomX = game.rnd.integerInRange(50, 1800);
        randomY = game.rnd.integerInRange(50, 980);
        seven = numbers.create(randomX, randomY, 'seven');
        randomX = game.rnd.integerInRange(50, 1800);
        randomY = game.rnd.integerInRange(50, 980);
        eight = numbers.create(randomX, randomY, 'eight');
        randomX = game.rnd.integerInRange(50, 1800);
        randomY = game.rnd.integerInRange(50, 980);
        nine = numbers.create(randomX, randomY, 'nine');
        randomX = game.rnd.integerInRange(50, 1800);
        randomY = game.rnd.integerInRange(50, 980);
        ten = numbers.create(randomX, randomY, 'ten');
        game.paused =false;
        if(count!=1)
            {
                count=1;
                text.visible = false;

            }
    }
    
    function endGame()
    {
        music.pause();
        var style = { font: "25px Verdana", fill: "#0", align: "center" };
        text = game.add.text(game.camera.x+100, game.camera.y+300, "You count to 10 very well! Click to try again?", style);
        game.paused = true;
        game.input.onTap.addOnce(placeNumbers,this);

    }
    
};
