var MAX_BALLS = 100;

Board = function(canvasDrawer){
  this._balls = [];
  this.canvasDrawer = canvasDrawer;
  this.init();
};

Board.prototype.init = function(){
  for (var i = 0; i < MAX_BALLS; i++) {
    var ball = this.createRandomBall();
    this.addBall(ball);
  }
};


Board.prototype.createRandomBall = function(){
  var ball = {
    x: Math.random() * this.canvasDrawer.width,
    y: Math.random() * this.canvasDrawer.height,
    mass: Math.random() * 10,
    friction: 0.8,
    radius: 10,
    velocity: {
      speed: Math.random() * 10,
      angle: Math.random() * 360
    }
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

  // PHYSICS HERE
  // updatedBalls = applyLaws(ball, laws);

  // RENDER HERE
  this.render();
};

Board.prototype.render = function(){
  this._balls.forEach( function(ball){
    ball.render();
  });
};
