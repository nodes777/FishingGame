TopDownGame.miniGame = function(){};

TopDownGame.miniGame.prototype = {
  init: function(fishOnLine){
    this.fishOnLine = fishOnLine;
  },
  preload: function() {
    //show loading screen
    //this.game.camera.focusOnXY(this.player.x, this.player.y);

  },
  create: function(fishOnLine) {
    var caughtFish = true;

    this.hook = this.game.add.sprite(100, 300, 'hook');
    this.game.camera.follow(this.hook);

    this.game.physics.arcade.enable(this.hook);
    this.hook.body.collideWorldBounds = false;
    this.hook.checkWorldBounds = true;
    this.hook.events.onOutOfBounds.add(this.didntCatchFish, this);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spacebar = this.game.input.keyboard.addKey(32);

    this.fishMouth = this.game.add.sprite(this.world.width-100, this.game.rnd.integerInRange(100, 300), 'fishMouth');

    this.fishMouth.animations.add('nom', [0,1,2,3,4,5], 10, true);
    this.fishMouth.animations.play('nom');

    this.game.physics.arcade.enable(this.fishMouth);


  },
  update: function() {

        //collisions
        this.game.physics.arcade.overlap(this.hook, this.fishMouth, this.caughtFish, null, this);

        //hook movement
        this.hook.body.velocity.y = 0;
        this.hook.body.velocity.x = 50;

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

    },
    render: function() {
        var debug = this.game.debug;

        debug.pixel(this.hook.centerX, this.hook.centerY, "yellow");

    },
    didntCatchFish: function(){
      console.log("didnt catch fish \n")
      this.fishMouth.kill();
      this.hook.kill();
      caughtFish = false;
      this.state.start('Game', false, false, caughtFish, this.fishOnLine)
    },
    caughtFish: function(){
      console.log('caught the fish! \n')
      //shake(intensity, duration, force, direction, shakeBounds) → {boolean}
      this.game.camera.shake(0.05, 500);
      this.hook.kill();
      this.fishMouth.kill();
      this.game.time.events.add(Phaser.Timer.SECOND * .5, this.startGameState, this);

    },
    startGameState: function () {
      caughtFish = true;
      this.state.start('Game', false, false, caughtFish, this.fishOnLine)
    }
};