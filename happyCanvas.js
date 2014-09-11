dt = 0.02; // 20s/1000 = 20 ms
if (Meteor.isClient) {
  // // counter starts at 0
  // Session.setDefault("counter", 0);
  //
  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get("counter");
  //   }
  // });
  //
  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set("counter", Session.get("counter") + 1);
  //   }
  // });

  Meteor.startup(function () {
    var canvasDrawer = new CanvasDrawer();
    var board = new Board(canvasDrawer);
    Meteor.setInterval(board.tick.bind(board), dt * 1000);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
