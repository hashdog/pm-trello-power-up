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
            text: calculateEstimation(),
            icon: './images/clock-estimation.svg', // for card front badges only
            color: 'red',
            refresh: 10
          }
        }
      },
      {
        dynamic: function(){
          return {
            title: 'Time tracked', // for detail badges only
            text: calculateTrackedHours(),
            icon: './images/clock-track.svg', // for card front badges only
            color: 'white',
            refresh: 10
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

var calculateEstimation = function() {
  return '6'
}

var calculateTrackedHours = function() {
  var Promise = TrelloPowerUp.Promise;
  var t = TrelloPowerUp.iframe();
  var gEstimationFormUrl = '';
  var userEmail = '';

  return Promise.all([
    t.get('board', 'shared', 'estimatetimeurl'),
    t.get('organization', 'private', 'email')
  ])
  .spread(function(savedEstimationFormUrl, savedUserEmail){
    if(savedEstimationFormUrl){
      gEstimationFormUrl = savedEstimationFormUrl;
    }
    if(savedUserEmail){
      userEmail = savedUserEmail;
    }
  })

  console.log('gEstimationFormUrl: ', gEstimationFormUrl);
  console.log('userEmail: ', userEmail);
  getValues = "select sum(F) WHERE D = '" + userEmail + "'";
  console.log('Results: ', getValues);

  // console.log('Warning: Please add your personal email on settings');
  // if (gEstimationFormUrl && userEmail) {
  //   getValues = "select sum(F) WHERE D = '" + userEmail + "'";

  //   console.log('Results: ', getValues);

  //   $('#switch-hitters').sheetrock({
  //     url: gEstimationFormUrl,
  //     query: getValues,
  //     callback: function (error, options, response) {
  //       if (error) { console.log('Error :', message); }
  //     }
  //   }).text();
  // }
}
