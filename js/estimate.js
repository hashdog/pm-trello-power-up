console.log('estimate.js');
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1raLEpgZyX0LHszBYtkR25N4t4EGbiYF3Os1fpRu5DDA/edit#gid=38447568'

$('#switch-hitters').sheetrock({
  url: mySpreadsheet,
  query: "select A,B,C,D",
  fetchSize: 10
});
