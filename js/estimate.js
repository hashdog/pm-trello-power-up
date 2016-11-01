console.log('estimate.js');
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1raLEpgZyX0LHszBYtkR25N4t4EGbiYF3Os1fpRu5DDA/edit#gid=38447568'

var myCallback = function (error, options, response) {
  if (error) {
    console.log(error);
  } else {
    console.log("Data: ", response.data);
    console.log("HTML: ", response.html);
  }
};

$('#switch-hitters').sheetrock({
  url: mySpreadsheet,
  query: "select B  where B = 'hernan' order by L desc",
  fetchSize: 2,
  callback: myCallback
});
