GameCanvas = function(canvasElementSelector){
  EventGenerator.apply(this, arguments);
  this.canvas = document.querySelector(canvasElementSelector);
  this.attachClickHandler();
};

GameCanvas.prototype.attachClickHandler = function(){
  var gameCanvas = this;
  this.canvas.onclick = function(event){
    gameCanvas.fire("click", {data: "mydata"});
  }
}
