/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var formUrl = '';
var cardName = '';
var cardShortLink = '';
var userName = t.arg('user');

var entryField = function(label) {
  var selector = "[aria-label='" + label + "']";
  return document.querySelectorAll(selector)[0].name
}

// this function we be called once on initial load
// and then called each time something changes
t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'url'),
    t.card('name', 'url')
  ])
  .spread(function(savedGFormUrl, cardData){
    if(savedGFormUrl){
      formUrl = savedGFormUrl;
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
    document.getElementsByTagName('iframe')[0].src = formUrl +"?embedded=true" +
    "&" + entryField('card name') + "=" + cardName +
    "&" + entryField('user') + "=" + userName +
    "&" + entryField('card url') + "=" + cardUrl;
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
