/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var gFormUrl  = document.getElementById('google-form-url');
var userEmail = document.getElementById('user-email');

t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'url'),
    t.get('organization', 'private', 'email')
  ])
  .spread(function(savedGFormUrl, savedUserEmail){
    if(savedGFormUrl){
      gFormUrl.value = savedGFormUrl;
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
  return t.set('board', 'shared', 'url', gFormUrl.value)
  .then(function(){
    return t.set('organization', 'private', 'email', userEmail.value);
  })
  .then(function(){
    t.closePopup();
  })
})
