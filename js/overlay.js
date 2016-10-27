/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var gFormUrl = '';
var cardName = '';
var cardShortLink = '';
var userName = t.arg('user');

// this function we be called once on initial load
// and then called each time something changes
t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'url'),
    t.card('name','url')
  ])
  .spread(function(savedGFormUrl, cardData){
    if(savedGFormUrl){
      gFormUrl = savedGFormUrl;
    } else {
      document.getElementById('overlay-message')
      .textContent = 'Please add form url on settings';
    }
    if(cardData){
      cardName = cardData.name;
      cardUrl = cardData.url;
    }
  })
  .then(function(){
    document.getElementsByTagName('iframe')[0].src = gFormUrl +
    "?embedded=true&entry.995291397=" + cardName +
    "&entry.33315152=" + userName +
    "&entry.1600294234" + cardUrl;
  })
});

// close overlay if user clicks outside our content
document.addEventListener('click', function(e) {
  if(e.target.tagName == 'BODY') {
    t.closeOverlay().done();
  }
});

// close overlay if user presses escape key
document.addEventListener('keyup', function(e) {
  if(e.keyCode == 27) {
    t.closeOverlay().done();
  }
});
