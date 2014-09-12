var MAX_BALLS = 20;

Board = function(dimensions){
  this.dimensions = dimensions;
  this._balls = [];
  this._magnets = [];
  this.init();
};


Board.prototype.init = function(){
  // create Game Physics
  var center = new Vector(this.dimensions.width / 2 , this.dimensions.height / 2);
  this._magnets.push(
    new Magnet({
      mass: 10,
      position: center
    })
  );
  // create Game balls
  for (var i = 0; i < MAX_BALLS; i++) {
    var ball = this.createRandomBall();
    this.addBall(ball);
  }
};

Board.prototype.addMagnet = function(coords){
  this._clearMagnets();

  var center = new Vector(coords.x, coords.y);
  this._magnets.push(
    new Magnet({
      mass: 10,
      position: center
    })
  );
};

Board.prototype.moveMagnet = function(x, y){
  this._magnets[0].position = new Vector(x, y);
}

Board.prototype._clearMagnets = function(){
  this._magnets = [];
};

Board.prototype.createRandomBall = function(){
  var radius = 14;
  var ball = {
    position: new Vector(
      Math.random() * (this.dimensions.width  - 2 * radius) + radius,
      Math.random() * (this.dimensions.height - 2 * radius) + radius
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

Board.prototype.getBalls = function(){
  return this._balls;
};

Board.prototype.getMagnets = function(){
  return this._magnets;
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
