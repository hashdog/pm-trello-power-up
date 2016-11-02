/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var mySpreadsheet = '';
var getValues = '';

// this function we be called once on initial load
// and then called each time something changes
t.render(function(){
  return Promise.all([
    t.card('url')
  ])
  .spread(function(cardData){
    if(cardData){
      mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1raLEpgZyX0LHszBYtkR25N4t4EGbiYF3Os1fpRu5DDA/edit#gid=38447568';
      getValues = "select B,E,F,G WHERE D = '" + cardData.url + "'";
    }
  })
  .then(function(){
    $('#switch-hitters').sheetrock({
      url: mySpreadsheet,
      query: getValues,
      callback: function (error, options, response) {
        var message = 'Please permit view the spreadsheet to users with the url.'
        if (error) { $('#estimate-message').text(message); }
      }
    });
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
