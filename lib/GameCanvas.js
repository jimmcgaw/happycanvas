GameCanvas = function(canvasElementSelector){
  this.canvas = document.querySelector(canvasElementSelector);
  this.attachClickHandler();
};

GameCanvas.prototype.attachClickHandler = function(){
  var gameCanvas = this;
  this.canvas.onclick = function(event){
    // this.board.addMagnet({x: event.x, y: event.y});
  }
}
