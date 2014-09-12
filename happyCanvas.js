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
    var game = new Game({
      elementSelector: '#happycanvas',
      dimensions: {
        width: 500,
        height: 500
      }
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
