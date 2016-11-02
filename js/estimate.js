/* global TrelloPowerUp */
var t = TrelloPowerUp.iframe();

// this function we be called once on initial load
// and then called each time something changes
t.render(function(){
  console.log('estimate.js');

  var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/17EwNIgGf9YqVUgl0WQftCJybGy2cYlKk7PKeJi0T3qU/edit#gid=0'

  $('#switch-hitters').sheetrock({
    url: mySpreadsheet,
    query: "select A,B,C,D,E,L where E = 'Both' order by L desc",
    fetchSize: 10
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
