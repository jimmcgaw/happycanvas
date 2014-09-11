var MAX_BALLS = 30;
BOARD_WIDTH = 1000;
BOARD_HEIGHT = 550;

Board = function(canvasDrawer){
  this._balls = [];
  this.canvasDrawer = canvasDrawer;
  this.init();
};

Board.checkWallCollision = function(ball){
  var collision = {};
  var maxW = BOARD_WIDTH - ball.radius;
  var maxH = BOARD_HEIGHT - ball.radius;

  if ( ball.position.x < ball.radius || ball.position.x > maxW ) collision.horizontal = true;
  if ( ball.position.y < ball.radius || ball.position.y > maxH ) collision.vertical = true;

  return collision;
};

Board.prototype.init = function(){
  for (var i = 0; i < MAX_BALLS; i++) {
    var ball = this.createRandomBall();
    this.addBall(ball);
  }
};


Board.prototype.createRandomBall = function(){
  var ball = {
    position: new Vector(
      Math.random() * 0.5 * this.canvasDrawer.getWidth() + 50,
      Math.random() * 0.5 * this.canvasDrawer.getHeight() + 50
    ),
    mass: 1,//Math.random() * 10,
    friction: 0.95,
    radius: 14,
    velocity: new Vector(
      Math.random() * 1,
      Math.random() * 1
    )
  };
  console.log(">>",ball.velocity);
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

Board.prototype.checkBallCollision = function(a,b) {
  var distance = b.position.substract(a.position);
  var radiiSquared = Math.pow(a.radius + b.radius, 2);
  if( distance.squaredNorm() <= radiiSquared ){
    return true;
  }
  return false;
}

Board.prototype.checkBallCollisions = function() {
  for (var i = 0; i < this._balls.length; i++) {
    var a = this._balls[i]
    for (var j = i+1; j < this._balls.length; j++) {
      var b = this._balls[j];
      if(this.checkBallCollision(a,b)) {
        this.resolveCollision(a,b);
      }
    }
  };
};

Board.prototype.resolveCollision = function(a,b) {
  var n = b.position.substract(a.position);
  var un = n.scale( 1 / n.norm() );
  var ut = new Vector(-un.y, un.x);
  var v1n = a.velocity.dot(un);
  var v1t = a.velocity.dot(ut);
  var v2n = b.velocity.dot(un);
  var v2t = b.velocity.dot(ut);
  var v1t_p = v1t;
  var v2t_p = v2t;
  var v1n_p_s = v1n * ( a.mass - b.mass + 2 * b.mass * v2n ) / ( a.mass + b.mass);
  var v2n_p_s = v2n * ( b.mass - a.mass + 2 * a.mass * v1n ) / ( a.mass + b.mass);
  debugger;
  var v1n_p = un.scale(v1n_p_s);
  var v2n_p = un.scale(v2n_p_s);
  var v1t_p = ut.scale(v1t);
  var v2t_p = ut.scale(v2t);
  var v1_p = v1n_p.add(v1t_p);
  var v2_p = v2n_p.add(v2t_p);
  a.velocity = v1_p;
  b.velocity = v2_p;
}

Board.prototype.tick = function(){
  // PHYSICS HERE

  this._balls.forEach( function(ball){
    ball.tick();
  });
  this.checkBallCollisions();
  // RENDER HERE
  this.render();
};

Board.prototype.render = function(context){

  this.canvasDrawer.beginDraw();
  this._balls.forEach( function(ball){
    ball.render();
  });
  this.canvasDrawer.endDraw();
};
