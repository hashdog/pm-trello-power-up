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
    return getBadges(t, card);
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Google Form Settings',
      url: './settings.html',
      height: 184
    });
  }
});

var getBadges = function(t, card){
  console.log('Compilation: ', 33);

  var gTrackingSheetUrl = '';
  var cardUrl = '';
  var timeTracked = '';
  var timeTracked = '';

  return t.get('board', 'shared', 'trakingsheet')
  .then(function(savedTrackingSheetUrl) {
    gTrackingSheetUrl = savedTrackingSheetUrl;
    return t.card('url')
    .get('url')
  })
  .then(function(savedCardUrl) {
    cardUrl = savedCardUrl;
    if (gTrackingSheetUrl && cardUrl) {
      getValues = "select sum(F) WHERE D = '" + cardUrl + "'";

      $('body').sheetrock({
        url: gTrackingSheetUrl,
        query: getValues,
        callback: function (error, options, response) {
          if (!error) {
            timeTracked = $(response.html).find('td').text();
            t.set('card', 'shared', 'trackedtime', timeTracked);
            console.log("Time: ", timeTracked);
          } else {
            console.log('Error :', error);
          }
        }
      });
    }
    return Promise.all([
      t.get('card', 'shared', 'trackedtime'),
      t.get('card', 'shared', 'estimatedtime')
    ])
    .then(function(trackedtime, estimatedtime){
      return [
        {
          title: 'Time Tracked',
          text: trackedtime,
          icon: './images/clock-track.svg', // for card front badges only
          color: 'red'
        },
        {
          title: 'Time Estimated',
          text: estimatedtime,
          icon: './images/clock-track.svg', // for card front badges only
          color: 'yellow'
        }
      ]
    })
  })
};
