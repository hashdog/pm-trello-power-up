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
  console.log('Compilation: ', 50);
  var gTrackingSheetUrl = '';
  var gEstimationSheetUrl = '';
  var cardUrl = '';
  var timeTracked = '';
  var timeEstimated = '';

  return t.get('board', 'shared', 'trakingsheet')
  .then(function(savedTrackingSheetUrl) {
    gTrackingSheetUrl = savedTrackingSheetUrl;
    return t.get('board', 'shared', 'estimationsheet')
  })
  .then(function(savedEstimationSheetUrl) {
    gEstimationSheetUrl = savedEstimationSheetUrl;
    return t.card('url').get('url')
  })
  .then(function(savedCardUrl) {
    cardUrl = savedCardUrl;
    if (gTrackingSheetUrl) {
      getValues = "select sum(F) WHERE D = '" + cardUrl + "'";

      sheetrock({
        url: gTrackingSheetUrl,
        query: getValues,
        callback: function (error, options, response) {
          if (!error) {
            timeTracked = $(response.html).find('td').text();
            t.set('card', 'shared', 'trackedtime', timeTracked);
            console.log("Tracked Time: ", timeTracked);
          } else {
            console.log('Traking ', error);
          }
        },
        reset: true
      });
    }
    if (gEstimationSheetUrl) {
      getValues = "select O WHERE D = '" + cardUrl + "'";
      console.log('gEstimationSheetUrl: ', gEstimationSheetUrl);
      console.log('getValues: ', getValues);
      sheetrock({
        url: gEstimationSheetUrl,
        query: getValues,
        callback: function (error, options, response) {
          if (!error) {
            timeEstimated = $(response.html).find('td').text();
            t.set('card', 'shared', 'estimatedtime', timeEstimated);
            console.log("Estimated Time: ", timeEstimated);
          } else {
            console.log('Estimation ', error);
          }
        },
        reset: true
      });
    }
    return t.get('card', 'shared', 'trackedtime')
    .then(function(trackedtime) {
      return [
        {
          dynamic: function() {
            return{
              title: 'Time Tracked',
              text: trackedtime,
              icon: './images/clock-track.svg', // for card front badges only
              color: 'red',
              refresh: 60
            }
          }
        },
        {
          dynamic: function() {
            console.log('ok2');

            if (gEstimationSheetUrl) {
              getValues = "select O WHERE D = '" + cardUrl + "'";
              console.log('gEstimationSheetUrl: ', gEstimationSheetUrl);
              console.log('getValues: ', getValues);
              sheetrock({
                url: gEstimationSheetUrl,
                query: getValues,
                callback: function (error, options, response) {
                  if (!error) {
                    timeEstimated = $(response.html).find('td').text();
                    t.set('card', 'shared', 'estimatedtime', timeEstimated);
                    console.log("Estimated Time: ", timeEstimated);
                  } else {
                    console.log('Estimation ', error);
                  }
                },
                reset: true
              });
            }

            return t.get('card', 'shared', 'estimatedtime')
            .then(function(estimatedtime){
              return {
                title: 'Time Estimated',
                text: estimatedtime,
                icon: './images/clock-estimation.svg', // for card front badges only
                color: 'yellow',
                refresh: 60
              }
            })
          }
        }
      ]
    })
  })
};
