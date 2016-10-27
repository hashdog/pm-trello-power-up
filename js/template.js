var getUserName = function() {
  console.log('ok');
  return document.getElementsByClassName("js-member-name")[0].textContent;
}

TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: './images/icon-gray.svg',
      text: 'Time track',
      callback: function(t){
        return t.overlay({
          title: 'Time track',
          url: './overlay.html',
          args: { user: getUserName() }
        });
      }
    }];
  },
  'card-badges': function(t, card) {
    return [
      {
        icon: './images/icon-gray.svg',
        text: '0'
      }
    ];
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Google Form Settings',
      url: './settings.html',
      height: 184
    });
  }
});
