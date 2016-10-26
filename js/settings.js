/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var gFormUrl = document.getElementById('google-form-url');

t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'google-form-url')
  ])
  .spread(function(savedGFormUrl){
    if(savedGFormUrl){
      vegetableSelector.value = savedVegetable;
    }
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

document.getElementById('save').addEventListener('click', function(){
  return t.set('board', 'shared', 'vegetable', gFormUrl.value)
  .then(function(){
    t.closePopup();
  })
})
