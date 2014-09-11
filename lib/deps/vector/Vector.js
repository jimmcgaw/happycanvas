Vector = function(x, y) {
  this.x = x;
  this.y = y;
};

Vector.prototype.add = function(vector){
  return (new Vector(
    this.x + vector.x,
    this.y + vector.y
  ));
}

Vector.prototype.substract = function(vector){
  return (new Vector(
    this.x - vector.x,
    this.y - vector.y
  ));
}

Vector.prototype.scale = function(s){
  return (new Vector(
    this.x * s,
    this.y * s
  ));
}

Vector.prototype.dot = function(vector){
  return (this.x * vector.x + this.y * vector.y);
}

// SCALAR INSTEAD OF VECTOR BECAUSE WE ARE IN 2D
Vector.prototype.cross = function(vector){
  return (this.x * vector.y - this.y * vector.x);
}

Vector.prototype.rotate = function(angle, anchor) {
  var x = this.x - anchor.x;
  var y = this.y - anchor.y;
  var x_prime = anchor.x + ((x * Math.cos(angle)) - (y * Math.sin(angle)));
  var y_prime = anchor.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)));

  return new Vector(x_prime, y_prime);
}

Vector.prototype.squaredNorm = function() {
  return this.x*this.x + this.y*this.y;
}
Vector.prototype.norm = function() {
  return Math.sqrt(this.squaredNorm());
}
