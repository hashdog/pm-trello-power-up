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
    return getBadges(t);
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Google Form Settings',
      url: './settings.html',
      height: 184
    });
  }
});

var getBadges = function(t){
  console.log('Compilation: ', 19);

  var gEstimationSheetUrl = '';
  var userEmail = '';
  var timeTracked = '';

  return t.get('board', 'shared', 'estimatetimeurl')
  .then(function(savedEstimationSheetUrl) {
    gEstimationSheetUrl = 'https://docs.google.com/spreadsheets/d/1_1o8qHdUPdgzwZEV5PDx3VDt9IoByaeJDNcOAAIQZ7M/edit#gid=440459845';
    return t.get('organization', 'private', 'email');
  })
  .then(function(userEmail) {
    userEmail = userEmail;

    console.log('gEstimationSheetUrl: ', gEstimationSheetUrl);
    console.log('userEmail: ', userEmail);

    if (gEstimationSheetUrl && userEmail) {
      getValues = "select sum(F) WHERE B = '" + userEmail + "'";

      console.log("Before get data");

      $('body').sheetrock({
        url: gEstimationSheetUrl,
        query: getValues,
        callback: function (error, options, response) {
          if (!error) {
            timeTracked = $(response.html).find('td').text();

            console.log("Time: ", timeTracked);
            t.set('card', 'shared', 'trackedtime', timeTracked);
          } else {
            console.log('Error :', error);
          }
        }
      }).find('td').text();
    }
  }).then(function(t){
    t.get('card', 'shared', 'trackedtime').then(function(trackedtime){
      return [
        {
          title: 'Time Tracked',
          text: trackedtime,
          icon: './images/clock-track.svg', // for card front badges only
          color: 'red',
          refresh: 30
        }
      ]
    })
  })
};
