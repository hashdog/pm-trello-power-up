TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: './images/icon-white.svg',
      text: 'Button Test',
      callback: function(t){
        return t.popup({
          title: "Card Button Popup",
          url: './overlay.html'
        });
      }
    }];
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184
    });
  }
});
