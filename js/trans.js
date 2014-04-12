
var langs = $('select.talk-transcript__language').html();
var id;
$.get(location.href.match(/.*(?=\/transcript)/), function(res){
   id = res.match(/__ga\('set', "dimension2", (\d*)/)[1];
});

chrome.runtime.sendMessage({name: 'init', langs: langs}, function(res){
  console.log(res);
});

chrome.runtime.onMessage.addListener(function(req, sender, sendRes) {
  if (req.name == 'selected') {
    lang = req.lang;
    renderTrans2(lang);
    sendRes('catched selected lang in main view')
  }
});

function renderTrans2(lang) {
  console.log(lang);
  $.get('https://www.ted.com/talks/subtitles/id/' + id + '/lang/' + lang, function(res){
    $.each(res.captions, function(i, caption){
      console.log(caption.startTime);
      console.log(caption.duration);
      console.log(caption.content);
    });
  });
}
