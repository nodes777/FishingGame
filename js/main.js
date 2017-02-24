var TopDownGame = TopDownGame || {};
//new Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig)
TopDownGame.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Game', TopDownGame.Game);
TopDownGame.game.state.add('miniGame', TopDownGame.miniGame);
TopDownGame.game.state.add('inventory', TopDownGame.inventory);

TopDownGame.game.state.start('Boot');