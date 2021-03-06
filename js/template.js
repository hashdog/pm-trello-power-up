console.log('Compilation: ', 70);
TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: './images/clock-track.svg',
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
      icon: './images/clock-estimation.svg',
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

var getEstimationTime = function(t, gEstimationSheetUrl, cardUrl) {
  if (gEstimationSheetUrl) {
    var cardUrlColumnLetter = 'D';
    var estimationColumnLetter = 'O';

    // Get the estimation column letter
    sheetrock({
      url: gEstimationSheetUrl,
      query: "select *",
      callback: function (error, options, response) {
        if (!error) {
          $.each($(response.rows[0].labels), function(index, columnName) {
            if (columnName == 'URL') {
              estimationColumnLetter = String.fromCharCode(65+index);
            }
            if (columnName == 'TeamEstimation') {
              estimationColumnLetter = String.fromCharCode(65+index);
            }
          });
        } else {
          console.log('Get column name :', error);
        }
      },
      fetchSize: 1
    });

    // Get estimation value
    var getValues = "select "+ estimationColumnLetter +" WHERE "+ cardUrlColumnLetter + " = '" + cardUrl + "'";
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
}

var getTrackingTime = function(t, gTrackingSheetUrl, cardUrl) {
  if (gTrackingSheetUrl) {
    var getValues = "select sum(F) WHERE D = '" + cardUrl + "'";
    sheetrock({
      url: gTrackingSheetUrl,
      query: getValues,
      callback: function (error, options, response) {
        if (!error) {
          timeTracked = $(response.html).find('td').text();
          t.set('card', 'shared', 'trackedtime', timeTracked);
          console.log("Tracked Time: ", timeTracked);
        } else {
          console.log('Tracking ', error);
        }
      },
      reset: true
    });
  }
}

var getBadges = function(t, card){

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
    gEstimationSheetUrl = savedEstimationSheetUrl.replace(/gid=\d*/g, "gid=0");
    return t.card('url').get('url')
  })
  .then(function(savedCardUrl) {
    cardUrl = savedCardUrl;

    getTrackingTime(t, gTrackingSheetUrl, cardUrl);
    getEstimationTime(t, gEstimationSheetUrl, cardUrl);

    return [
      {
        dynamic: function() {
          getTrackingTime(t, gTrackingSheetUrl, cardUrl);
          return t.get('card', 'shared', 'trackedtime')
          .then(function(savedTrackedTime){
            return{
              title: 'Time Tracked',
              text: savedTrackedTime == '' ? '0' : savedTrackedTime,
              icon: './images/clock-track.svg',
              refresh: 30
            }
          })
        }
      },
      {
        dynamic: function() {
          getEstimationTime(t, gEstimationSheetUrl, cardUrl);
          return t.get('card', 'shared', 'estimatedtime')
          .then(function(savedEstimatedtime){
            return {
              title: 'Time Estimated',
              text: savedEstimatedtime == '' ? '0' : savedEstimatedtime,
              icon: './images/clock-estimation.svg',
              refresh: 30
            }
          })
        }
      }
    ]
  })
};
