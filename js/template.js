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

// var calculateTrackedHours = function() {
//   // return '3'
//   // var Promise = TrelloPowerUp.Promise;
//   // var t = TrelloPowerUp.iframe();
//   var gEstimationSheetUrl = '';
//   var userEmail = '';

//   t.render(function(){
//     return Promise.all([
//       t.get('board', 'shared', 'estimatetimeurl'),
//       t.get('organization', 'private', 'email')
//     ])
//     .spread(function(savedEstimationSheetUrl, savedUserEmail){
//       if(savedEstimationSheetUrl){
//         gEstimationSheetUrl = savedEstimationSheetUrl;
//       }
//       if(savedUserEmail){
//         userEmail = savedUserEmail;
//       }
//     })

//     console.log('gEstimationSheetUrl: ', gEstimationSheetUrl);
//     console.log('userEmail: ', userEmail);
//     // getValues = "select sum(F) WHERE D = '" + userEmail + "'";
//     // console.log('Results: ', getValues);

//     // console.log('Warning: Please add your personal email on settings');
//     // if (gEstimationSheetUrl && userEmail) {
//     //   getValues = "select sum(F) WHERE D = '" + userEmail + "'";

//     //   console.log('Results: ', getValues);

//     //   $('#switch-hitters').sheetrock({
//     //     url: gEstimationSheetUrl,
//     //     query: getValues,
//     //     callback: function (error, options, response) {
//     //       if (error) { console.log('Error :', message); }
//     //     }
//     //   }).text();
//     // }
//   });
// };

var getBadges = function(t){
  console.log('Compilation: ', 6);

  var gEstimationSheetUrl = '';
  var userEmail = '';

  return t.get('board', 'shared', 'estimatetimeurl')
  .then(function(savedEstimationSheetUrl) {
    gEstimationSheetUrl = 'https://docs.google.com/spreadsheets/d/1_1o8qHdUPdgzwZEV5PDx3VDt9IoByaeJDNcOAAIQZ7M/edit#gid=440459845';
    return t.get('organization', 'private', 'email');
  })
  .then(function(userEmail) {
    gEstimationSheetUrl = 'https://docs.google.com/spreadsheets/d/1_1o8qHdUPdgzwZEV5PDx3VDt9IoByaeJDNcOAAIQZ7M/edit#gid=440459845';
    userEmail = userEmail;

    console.log('gEstimationSheetUrl: ', gEstimationSheetUrl);
    console.log('userEmail: ', userEmail);

    if (gEstimationSheetUrl && userEmail) {
      getValues = "select sum(F) WHERE D = '" + userEmail + "'";

      console.log("Before get data");

      var timeTracked = '';
      var other = $('body').sheetrock({
        url: gEstimationSheetUrl,
        query: getValues,
        callback: function (error, options, response) {
          if (!error) {
            console.log('response :', response);
          } else {
            console.log('Error :', message);
          }
        }
      }).find('td').text();
    }

    console.log("Other: ", other);
    console.log("Time: ", timeTracked);

    return [
      {
        title: 'Time Tracked',
        text: timeTracked,
        icon: './images/clock-track.svg', // for card front badges only
        color: 'red',
        refresh: 15
      }
    ]

    // if(lowercaseName.indexOf('static') > -1){
    //   // return an array of badge objects
    //   return [{
    //     title: 'Global Estimation', // for detail badges only
    //     text: 'Static',
    //     icon: icon, // for card front badges only
    //     color: badgeColor
    //   }];
    // } else {
    //   return [];
    // }
  })
};
