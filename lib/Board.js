var MAX_BALLS = 20;

Board = function(canvasDrawer){
  this._balls = [];
  this.canvasDrawer = canvasDrawer;
  this.gamePhysics = null;
  this._magnets = [];
  this.init();
};


Board.prototype.init = function(){
  // create Game Physics
  var center = new Vector(this.canvasDrawer.getWidth() / 2 , this.canvasDrawer.getHeight() / 2);
  this._magnets.push(
    new Magnet({
      mass: 10,
      position: center
    })
  );
  this.gamePhysics = new GamePhysics({
    x: this.canvasDrawer.getWidth(),
    y: this.canvasDrawer.getHeight()
  });
  // create Game balls
  for (var i = 0; i < MAX_BALLS; i++) {
    var ball = this.createRandomBall();
    this.addBall(ball);
  }
};


Board.prototype.createRandomBall = function(){
  var radius = 14;
  var ball = {
    position: new Vector(
      Math.random() * (this.canvasDrawer.getWidth()  - 2 * radius) + radius,
      Math.random() * (this.canvasDrawer.getHeight() - 2 * radius) + radius
    ),
    mass: 1,//Math.random() * 10,
    friction: 0.95,
    radius: radius,
    velocity: new Vector(
      Math.random() * 1,
      Math.random() * 1
    )
  };
  ball.canvasDrawer = this.canvasDrawer;
  return new Ball(ball);
};


Board.prototype.addBall = function(ball){
  if (this._balls.length >= MAX_BALLS){
    console.log('This board is at capacity, not adding ball');
  }
  this._balls.push(ball);
};

Board.prototype.removeBall = function(ball){
  console.log('removeBall not yet implemented');
};

Board.prototype.tick = function(){
  this.gamePhysics.computeState(this._balls, this._magnets);
  this.render();
};

Board.prototype.render = function(context){

  this.canvasDrawer.beginDraw();
  this._balls.forEach( function(ball){
    debugger;
    ball.render();
  });
  this.canvasDrawer.endDraw();
};
