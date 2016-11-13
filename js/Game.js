var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('beach');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('basicTiles', 'gameTiles');

    //create layers
    this.backgroundlayer = this.map.createLayer('background');
    this.blockedLayer = this.map.createLayer('blockedLayer');
    console.log(this.blockedLayer);
    console.log(this.blockedLayer._results);
    console.log(fishJSON);

    //create yellow flowers group
    this.yellowFlowers = this.game.add.group();
    for (var i = 0; i < 5; i++)
    {
        this.yellowFlowers.create(this.game.rnd.integerInRange(0, 400), this.game.rnd.integerInRange(100, 300), 'yellowFlower', 0);
    }

    this.yellowFlowers.callAll('scale.setTo', 'scale', .5,.5);
    this.yellowFlowers.callAll('animations.add', 'animations', 'dance', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, false);

    //create purple flower sprite
    this.purpleFlower = this.game.add.sprite(150, 240, 'purpleFlower');
    this.purpleFlower.animations.add('dance', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, false);
    this.purpleFlower.scale.setTo(.5,.5)

    //create fishing group
    this.fishingZones = [];
    for(var i = 0; i<this.map.objects.objectsLayer.length; i++){
      var zone = this.createFishingTiles(this.map.objects.objectsLayer[i]);
      this.fishingZones.push(zone);
    }
    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //create player
    this.player = this.game.add.sprite(100, 300, 'player');
    this.player.animations.add('right', [0, 1, 2, 3], 10, true);
    this.player.animations.add('left', [4, 5, 6, 7], 10, true);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spacebar = this.game.input.keyboard.addKey(32);

    this.spacebar.onDown.add(this.fishCheck, this);

  },
  createFishingTiles: function(obj) {
    var fishingTiles = new Phaser.Rectangle(obj.x, obj.y, obj.width, obj.height);
    fishingTiles.name = obj.name;
    return fishingTiles;
  },
  update: function() {

    //collisions
    this.game.physics.arcade.collide(this.player, this.blockedLayer);

    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= 50;
      this.player.facing = "up";
    }
    else if(this.cursors.down.isDown) {
      this.player.body.velocity.y += 50;
      this.player.facing = "down";
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 50;
      this.player.animations.play('left');
      this.player.facing = "left";
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 50;
      this.player.animations.play('right');
      this.player.facing = "right";
    }

    else{
      this.player.animations.stop();
    }

  },
  fishCheck:  function (){
      for(var x = 0; x<this.fishingZones.length; x++){
        if(this.fishingZones[x].contains(this.player.x+this.player.width/2, this.player.y+this.player.height/2)) {
          console.log('fishing '+ this.fishingZones[x].name);
          if(this.chanceToCatch()){
            var fish = this.getFish(this.fishingZones[x].name);
            this.makeFlowersDance();
            console.log('caught a '+fish);
          }else{
            console.log('no fish, sorry man');
          }
        }
      }
    },
  makeFlowersDance: function(){
    this.yellowFlowers.getRandom().animations.play('dance')
    this.purpleFlower.animations.play('dance');
  },
  chanceToCatch: function(){
    var num = this.game.rnd.integerInRange(0, 1);
    if(num == 0){
      return true;
    } else {
      return false;
    }
  },
  getFish: function (zone){
    //zone is working as a way to get into the object
      zone = zone.toLowerCase();
    return fishJSON.zone[zone].fish[1].name;
  }
}
