/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var mySpreadsheet = '';
var getValues = '';

// this function we be called once on initial load
// and then called each time something changes
// var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1raLEpgZyX0LHszBYtkR25N4t4EGbiYF3Os1fpRu5DDA/edit#gid=38447568'
t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'sheet'),
    t.card('url')
  ])
  .spread(function(savedGSheetUrl, cardData){
    if(savedGSheetUrl){
      mySpreadsheet = savedGSheetUrl;
    }
    if(cardData){
      getValues = "select B,E,F,G WHERE D = '" + cardData.url + "'";
    }
  })
  .then(function(){
    if (mySpreadsheet) {
      $('#switch-hitters').sheetrock({
        url: mySpreadsheet,
        query: getValues,
        callback: function (error, options, response) {
          if (error) { $('#estimate-message').text(error); }
        }
      });
    } else {
      $('#estimate-message').text('Please configure a google sheet on Hashdog setting power up');
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
