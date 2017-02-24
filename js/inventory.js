var TopDownGame = TopDownGame || {};
TopDownGame.inventory = function(){};
TopDownGame.inventory.prototype = {
 init: function(inventory, player){
    this.inventory = inventory;
    this.player = player;
  },
  preload: function() {
    //blur or fade the background?

  },
  create: function() {
  	console.log("inventory: "+this.inventory);
  		this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spacebar = this.game.input.keyboard.addKey(32);
        this.shiftKey = this.game.input.keyboard.addKey(16);

  },
  update: function() {

  	if (this.shiftKey.isDown) {
            this.state.start('Game', false, false);
        }
  },
  render: function() {
        var debug = this.game.debug;
        //debug.pixel(this.hook.centerX, this.hook.centerY, "yellow");
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteCoords(this.hook, 32, 128);
  },
};