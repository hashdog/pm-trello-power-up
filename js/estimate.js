/* global TrelloPowerUp */
var t = TrelloPowerUp.iframe();

// this function we be called once on initial load
// and then called each time something changes
t.render(function(){
  var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1raLEpgZyX0LHszBYtkR25N4t4EGbiYF3Os1fpRu5DDA/edit#gid=38447568'

  $('#switch-hitters').sheetrock({
    url: mySpreadsheet,
    query: "select A,B,C,D",
    fetchSize: 10,
    callback: function (error, options, response) {
        console.log(error, options, response);
        if (error) { $('#estimate-message').text(error); }
      }
    }
  });

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
