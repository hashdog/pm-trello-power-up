TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: './images/icon-gray.svg',
      text: 'Time track',
      callback: function(t){
        return t.overlay({
          title: 'Time track',
          url: './overlay.html',
          args: { user: '' }
        });
      }
    },
    {
      icon: './images/icon-gray.svg',
      text: 'Estimate Card',
      callback: function(t){
        return t.overlay({
          title: 'Estimate Card',
          url: './estimate.html'
        });
      }
    }];
  },
  'card-badges': function(t, card) {
    return [
      {
        dynamic: function(){
          return {
            title: 'Average estimation', // for detail badges only
            text: estimationCallback(t, context),
            icon: './images/clock-estimation.svg', // for card front badges only
            color: 'red',
            refresh: 5
          }
        }
      },
      {
        dynamic: function(){
          return {
            title: 'Time tracked', // for detail badges only
            text: '1.5',
            icon: './images/clock-track.svg', // for card front badges only
            color: 'white',
            refresh: 5
          }
        }
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

var estimationCallback = function(t, context) {
  console.log(t);
  console.log(context);
  return '7'
}
