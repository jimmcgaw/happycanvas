Game = function(params){
  this.dimensions = params.dimensions;
  this.init(params);
};

Game.prototype.init = function(params){
  var selector = params.elementSelector;
  var canvasDrawer = new CanvasDrawer(selector, this.dimensions);
  var gameCanvas = new GameCanvas(selector);
  gameCanvas.bind("click", function(event){
    board.moveMagnet(event.x, event.y);
  });

  // var boardManager = new BoardManager(gameCanvas, canvasDrawer, this.dimensions);
  var board = new Board(this.dimensions);
  var gamePhysics = new GamePhysics(this.dimensions);

  // Meteor.setInterval(board.tick.bind(board), dt * 1000);
  Meteor.setInterval(
    function(){
      var balls = board.getBalls();
      var magnets = board.getMagnets();
      var players = null;

      gamePhysics.update(balls, magnets);
      canvasDrawer.draw(balls, magnets);
    }
    , dt * 1000);
};
