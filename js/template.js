TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: './images/logo.png',
      text: 'Button Text',
      callback: function(t){
        return t.popup({
          title: "Card Button Popup",
          url: './overlay.html'
        });
      }
    }];
  }
});
