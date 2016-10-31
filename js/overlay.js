/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var gFormUrl = '';
var cardName = '';
var cardShortLink = '';
var userEmail = '';

// this function we be called once on initial load
// and then called each time something changes
t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'url'),
    t.get('organization', 'private', 'email'),
    t.card('name', 'url')
  ])
  .spread(function(savedGFormUrl, savedUserEmail, cardData){
    if(savedGFormUrl){
      gFormUrl = savedGFormUrl;
    } else {
      document.getElementById('overlay-message')
      .textContent = 'Please add the google form url on settings';
    }
    if(savedUserEmail){
      userEmail = savedUserEmail;
    } else {
      document.getElementById('overlay-message')
      .textContent = 'Please add your personal email on settings';
    }
    if(cardData){
      cardName = cardData.name;
      cardUrl = cardData.url;
    }
  })
  .then(function(){
    d = new Date;
    day = ("0" + d.getDate()).slice(-2);
    month = ("0" + (d.getMonth() + 1)).slice(-2);
    year = d.getFullYear();
    document.getElementsByTagName('iframe')[0].src = gFormUrl +
    "?embedded=true&entry.995291397=" + cardName +
    "&entry.33315152=" + userEmail +
    "&entry.1600294234=" + cardUrl +
    "&entry.588722511=" + year+'-'+month+'-'+day;
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
