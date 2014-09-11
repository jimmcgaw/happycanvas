Particle = function(params){
  this.init(params);
};

Particle.prototype.init = function(params) {
  this.position = params.position;
  this.velocity = params.velocity;
  this.acceleration = params.acceleration || new Vector(0,0);
  this.mass = params.mass || 1;
  this.friction = params.friction || 0.5;
};
