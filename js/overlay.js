/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// you can access arguments passed to your iframe like so
var num = t.arg('rand');

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
  var card = t.card('name','shortLink');
  console.log('card.get("name"): ', card.get('name'));
  console.log('card.get("shortLink"): ', card.get("shortLink");
  document.getElementsByTagName('iframe')[0].src = "https://docs.google.com/forms/d/e/1FAIpQLSeXKOZiY8QNUpCVbNQKEG0_Dg6IAcPv-DlsO987xhd7zC01Vg/viewform?embedded=true&entry.995291397=pastor2";
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
