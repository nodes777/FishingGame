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
        this.inventoryBackground = this.game.add.sprite(this.game.camera.width / 2, this.game.camera.height / 2, 'inventory');
  		this.inventoryBackground.scale.setTo(0.7,0.7);
  		this.inventoryBackground.anchor.setTo(0.5, 0.5);
  },
  update: function() {

  	if (this.shiftKey.isDown) {
  			this.inventoryBackground.kill();
  			//change the plugin config here
            this.game.stateTransition.to('Game', false, false);
        }
  },
  render: function() {
        var debug = this.game.debug;
        //debug.pixel(this.hook.centerX, this.hook.centerY, "yellow");
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteCoords(this.hook, 32, 128);
  },
};