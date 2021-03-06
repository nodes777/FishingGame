TopDownGame.miniGame = function(){};

TopDownGame.miniGame.prototype = {
  init: function(fishOnLine, player){
    this.fishOnLine = fishOnLine;
    this.player = player;
    this.gameType = fishOnLine.catchType;
  },
  preload: function() {

    this.game.camera.focusOnXY(this.player.x, this.player.y);
    //blur or fade the background?

  },
  create: function(fishOnLine) {
    //Fish mouth's x position changes based on the camera position, this solves it
    //(CameraWidth + size of hook Sprite + camera position)
    var fishMouthX = this.camera.width - 32 + this.camera.x;

    this.hook = this.game.add.sprite(this.camera.x, this.game.world.centerY, 'hook');

    this.game.physics.arcade.enable(this.hook);
    this.hook.body.collideWorldBounds = false;
    this.hook.checkWorldBounds = true;
     

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spacebar = this.game.input.keyboard.addKey(32);

    this.fishMouth = this.game.add.sprite(fishMouthX, this.game.rnd.integerInRange(100, 300), 'fishMouth');

    this.fishMouth.animations.add('nom', [0,1,2,3,4,5], 10, true);
    this.fishMouth.animations.play('nom');

    this.game.physics.arcade.enable(this.fishMouth);

    this.makeEmitter();
    if(this.gameType === 'upDown'){
      this.startDownUpTween();
    }

  },
  update: function() {

        //collisions
        this.game.physics.arcade.overlap(this.hook, this.fishMouth, this.caughtFish, null, this);

        //hook movement
        this.hook.body.velocity.y = 0;
        this.hook.body.velocity.x = 100;

        if (this.cursors.up.isDown) {
            this.hook.body.velocity.y -= 50;
        } else if (this.cursors.down.isDown) {
            this.hook.body.velocity.y += 50;
        }
        if (this.cursors.left.isDown) {
            this.hook.body.velocity.x -= 25;
        } else if (this.cursors.right.isDown) {
            this.hook.body.velocity.x += 50;
        } else {
            this.hook.animations.stop();
        }
        if (this.hook.x > this.camera.view.width+this.game.camera.x){this.didntCatchFish();}
    },
    render: function() {
        var debug = this.game.debug;

        //debug.pixel(this.hook.centerX, this.hook.centerY, "yellow");
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteCoords(this.hook, 32, 128);

    },
    startDownUpTween: function() {

    var downUp = this.game.add.tween(this.fishMouth);
    var randomSpeed = 1000 + Math.random() * 4000; //Link speed to rarity here

    //Tween to the bottom of the camera view
    downUp.to({ y: this.camera.bounds.height-this.fishMouth.height }, randomSpeed)
    //then back up to the top of the view
    .to({ y: this.camera.y }, randomSpeed)
    //repeat back down
    .to({ y: this.camera.bounds.height-this.fishMouth.height }, randomSpeed)
    .to({ y: this.camera.y }, randomSpeed);
    downUp.start();
    },
    makeEmitter: function(){
    this.emitter = this.game.add.emitter(this.hook.x, this.hook.y, 50);

    this.emitter.makeParticles('sparkle');
    //this.emitter.setXSpeed(-100, 100);
    //this.emitter.setYSpeed(-100, 100);
    this.emitter.setAlpha(1, 0.5);

    //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
    //  The 5000 value is the lifespan of each particle
    this.emitter.start(false, 500, 20);
    this.game.time.events.add(500, this.destroyEmitter, this);

    },
    destroyEmitter: function() {
      this.emitter.destroy();
    },
    didntCatchFish: function(){
      console.log("didnt catch fish \n");
      this.fishMouth.kill();
      this.hook.kill();
      caughtFish = false;
      this.state.start('Game', false, false, caughtFish, this.fishOnLine);
    },
    caughtFish: function(){
      console.log('caught the fish! \n');
      //shake(intensity, duration, force, direction, shakeBounds) → {boolean}
      this.game.camera.shake(0.05, 500);
      this.hook.kill();
      this.fishMouth.kill();
      //When the camera finishes shaking start the main game state
      this.game.camera.onShakeComplete.add(function(){
        this.startGameState();
      }, this);
      //this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.startGameState, this);

    },
    startGameState: function () {
      caughtFish = true;
      this.state.start('Game', false, false, caughtFish, this.fishOnLine);
    },
};