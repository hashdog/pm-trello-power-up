/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var gETimeFormUrl  = document.getElementById('google-estimatedtime-form-url');
var gTTimeFormUrl  = document.getElementById('google-trackedtime-form-url');
var gSheetUrl = document.getElementById('google-sheet-url');
var userEmail = document.getElementById('user-email');

t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'trackedtimeurl'),
    t.get('board', 'shared', 'estimatedtimeurl'),
    t.get('board', 'shared', 'sheet'),
    t.get('organization', 'private', 'email')
  ])
  .spread(function(savedGTTimeFormUrl, savedGETimeFormUrl, savedGSheetUrl, savedUserEmail){
    if(savedGTTimeFormUrl){
      gTTimeFormUrl.value = savedGTTimeFormUrl;
    }
    if(savedGETimeFormUrl){
      gETimeFormUrl.value = savedGETimeFormUrl;
    }
    if(savedGSheetUrl){
      gSheetUrl.value = savedGSheetUrl;
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
  return t.set('board', 'shared', 'trackedtimeurl', gTTimeFormUrl.value)
  .then(function(){
    return t.set('board', 'shared', 'estimatedtimeurl', gETimeFormUrl.value);
  })
  .then(function(){
    return t.set('board', 'shared', 'sheet', gSheetUrl.value);
  })
  .then(function(){
    return t.set('organization', 'private', 'email', userEmail.value);
  })
  .then(function(){
    t.closePopup();
  })
})
