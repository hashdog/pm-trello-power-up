/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var mySpreadsheet = '';
var getValues = '';
var gFormUrl = '';
var cardUrl = '';
var userEmail = '';
var message = 'Please configure a google sheet on Hashdog setting power up. Ensure permit view the spreadsheet to users with the url.';

// this function we be called once on initial load
// and then called each time something changes
t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'estimatetimeurl'),
    t.get('organization', 'private', 'email'),
    t.get('board', 'shared', 'sheet'),
    t.card('url')
  ])
  .spread(function(savedGFormUrl, savedUserEmail, savedGSheetUrl, cardData){
    if(savedGSheetUrl){
      mySpreadsheet = savedGSheetUrl;
    }
    if(cardData){
      cardUrl = cardData.url;
    }
    if(savedUserEmail){
      userEmail = savedUserEmail;
    } else {
      document.getElementById('estimate-message')
      .textContent = 'Please add your personal email on settings';
    }
  })
  .then(function(){
    document.getElementsByTagName('iframe')[0].src = gFormUrl +
    "&entry.33315152=" + userEmail +
    "&entry.1600294234=" + cardUrl;

    if (mySpreadsheet) {
      getValues = "select B,F,G,E WHERE D = '" + cardData.url + "'";

      $('#switch-hitters').sheetrock({
        url: mySpreadsheet,
        query: getValues,
        callback: function (error, options, response) {
          if (error) { $('#estimate-message').text(message); }
        }
      });
    } else {
      $('#estimate-message').text(message);
    }
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
