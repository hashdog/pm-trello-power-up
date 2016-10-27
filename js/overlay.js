/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var gFormUrl = '';
var cardName = '';
var cardShortLink = '';

// you can access arguments passed to your iframe like so
var num = t.arg('rand');

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()

  var card = t.card('name','shortLink');
  console.log('card: ', card);
  console.log('card.get("name"): ', card.get('name'));
  console.log('card.get("shortLink"): ', card.get("shortLink"));
  return Promise.all([
    t.get('board', 'shared', 'url'),
    t.card('name','shortLink')
  ])
  .spread(function(savedGFormUrl, cardData){
    if(savedGFormUrl){
      gFormUrl = savedGFormUrl;
    } else {
      console.log('Please add form url on settings');
    }
    if(cardData){
      cardName = cardData.name;
      cardShortLink = cardData.shortLink;
    }
  })
  .then(function(){
    var formUrl = gFormUrl + "?embedded=true&entry.995291397=" + cardName;
    console.log('formUrl: ', formUrl);
    document.getElementsByTagName('iframe')[0].src = formUrl;
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
