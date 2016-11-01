console.log('estimate.js');
var mySpreadsheet = 'https://drive.google.com/accounts?continueUrl=https://docs.google.com/a/hashdog.com/spreadsheets/d/1raLEpgZyX0LHszBYtkR25N4t4EGbiYF3Os1fpRu5DDA/edit?usp%3Dforms_web_b%23gid%3D38447568&ddrp=1#'

$('#switch-hitters').sheetrock({
  url: mySpreadsheet,
  query: "select A,B,C,D",
  fetchSize: 10
});
