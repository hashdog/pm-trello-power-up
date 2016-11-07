/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var gETimeFormUrl  = document.getElementById('google-estimatetime-form-url');
var gTTimeFormUrl  = document.getElementById('google-tracktime-form-url');
var gEstimationSheetUrl = document.getElementById('google-estimation-sheet-url');
var gTrackingSheetUrl = document.getElementById('google-tracking-sheet-url');
var userEmail = document.getElementById('user-email');

t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'tracktimeurl'),
    t.get('board', 'shared', 'estimatetimeurl'),
    t.get('board', 'shared', 'estimationsheet'),
    t.get('card',  'shared', 'trakingsheet'),
    t.get('organization', 'private', 'email')
  ])
  .spread(function(savedGTTimeFormUrl, savedGETimeFormUrl, savedGEstimationSheetUrl, savedGTrackingSheetUrl, savedUserEmail){
    if(savedGTTimeFormUrl){
      gTTimeFormUrl.value = savedGTTimeFormUrl;
    }
    if(savedGETimeFormUrl){
      gETimeFormUrl.value = savedGETimeFormUrl;
    }
    if(savedGEstimationSheetUrl){
      gEstimationSheetUrl.value = savedGEstimationSheetUrl;
    }
    if(savedGTrackingSheetUrl){
      gTrackingSheetUrl.value = savedGTrackingSheetUrl;
    }
    if(savedUserEmail){
      userEmail.value = savedUserEmail;
    }
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

document.getElementById('save').addEventListener('click', function(){
  return t.set('board', 'shared', 'tracktimeurl', gTTimeFormUrl.value)
  .then(function(){
    return t.set('board', 'shared', 'estimatetimeurl', gETimeFormUrl.value);
  })
  .then(function(){
    return t.set('board', 'shared', 'estimationsheet', gEstimationSheetUrl.value);
  })
  .then(function(){
    return t.set('card', 'shared', 'trakingsheet', gTrackingSheetUrl.value);
  })
  .then(function(){
    return t.set('organization', 'private', 'email', userEmail.value);
  })
  .then(function(){
    t.closePopup();
  })
})
