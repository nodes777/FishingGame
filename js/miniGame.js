TopDownGame.miniGame = function(){};

TopDownGame.miniGame.prototype = {
  init: function(fishOnLine){
    this.fishOnLine = fishOnLine;
  },
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  },
  create: function(fishOnLine) {
    var caughtFish = true;
    this.state.start('Game', false, false, caughtFish, this.fishOnLine);
  }
};