console.log('estimate.js');
// var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1raLEpgZyX0LHszBYtkR25N4t4EGbiYF3Os1fpRu5DDA/edit#gid=38447568'
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/17EwNIgGf9YqVUgl0WQftCJybGy2cYlKk7PKeJi0T3qU/edit#gid=0'

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
  query: "select A,B,C,D,E,L where E = 'Both' order by L desc",
  fetchSize: 10
});
