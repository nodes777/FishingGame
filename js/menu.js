var TopDownGame = TopDownGame || {};
TopDownGame.Game.prototype = {
 init: function(inventory, player){
    this.inventory = inventory;
    this.player = player;
  },
  preload: function() {
    //blur or fade the background?

  },
  create: function(fishOnLine) {


  },
  update: function() {


  },
  render: function() {
        var debug = this.game.debug;

        //debug.pixel(this.hook.centerX, this.hook.centerY, "yellow");
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteCoords(this.hook, 32, 128);

  },
};