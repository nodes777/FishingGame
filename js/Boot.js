var TopDownGame = TopDownGame || {};

TopDownGame.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
TopDownGame.Boot.prototype = {
  preload: function() {
    //assets we'll use in the loading screen
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  create: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.scale.setGameSize(400,400);
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
    this.game.stateTransition.configure({
      duration: Phaser.Timer.SECOND * 0.8,
      ease: Phaser.Easing.Exponential.InOut,
      properties: {
        alpha: 0,
        scale: {
          x: -1.4,
          y: -1.4
        }
      }
    });
    this.game.stateTransition.to('Preload');
  }
};
/*
//expand out
 this.game.stateTransition.configure({
     duration: Phaser.Timer.SECOND * 1.0,
     ease: Phaser.Easing.Exponential.InOut,
     properties: {
         alpha: 0,
         scale: {
             x: 1.4,
             y: 1.4
         }
     }
 });
 this.game.stateTransition.to('state1'); //....and then in a different state... 

//shrink in
 this.game.stateTransition.configure({
     duration: Phaser.Timer.SECOND * 1.0,
     ease: Phaser.Easing.Exponential.OutIn,
     properties: {
         alpha: 0,
         scale: {
             x: 0.4,
             y: 0.4
         }
     }
 });
 this.game.stateTransition.to('state2');
 */