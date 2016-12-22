var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('beach', 'assets/tilemaps/beach.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/basicTiles.png');


    //this.load.image('player', 'assets/images/guy.png');
    this.load.spritesheet('player', 'assets/images/guyWalking.png', 32, 32);
    this.load.spritesheet('yellowFlower', 'assets/images/yellowFlower.png', 32, 32);
    this.load.spritesheet('purpleFlower', 'assets/images/purpleFlower.png', 32, 32);
    this.load.spritesheet('ray', 'assets/images/fish/beachfront/ray.png', 16, 16);
    this.load.spritesheet('brown trout', 'assets/images/fish/riverfront/brownTrout.png', 16, 16);
    this.load.spritesheet('blue gill', 'assets/images/fish/lakefront/blueGill.png', 16, 16);
    this.load.spritesheet('pufferfish', 'assets/images/fish/beachfront/pufferfish.png', 32, 32);
    this.load.spritesheet('panfish', 'assets/images/fish/lakefront/Panfish.png', 32, 32);
    this.load.spritesheet('minnow', 'assets/images/fish/riverfront/Minnow.png', 32, 32);
    this.load.spritesheet('sauger', 'assets/images/fish/riverfront/Sauger.png', 32, 32);

    this.load.spritesheet('hook', 'assets/images/hook.png', 32, 32);
    this.load.spritesheet('fishmouth', 'assets/images/fishmouth.png', 32, 32);
  },
  create: function() {
    this.state.start('Game');
  }
};