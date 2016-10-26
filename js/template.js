TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: './images/icon-gray.svg',
      text: 'Time track',
      callback: function(t){
        return t.overlay({
          title: 'Time track',
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
