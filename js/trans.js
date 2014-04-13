
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
    var $para = $('.talk-transcript__para__text');
    var paraCount = -1;
    $.each(res.captions, function(i, caption){
      // caption has startTime and duration and content, startofparagraph
      if (caption.startOfParagraph) {
        paraCount += 1;
        $para.eq(paraCount).append('<div id="trans2-' + paraCount + '"></div>');
      }
      $('#trans2-' + paraCount).append('<span class="talk-transcript__fragment">' + caption.content + ' </span>');
    });
  });
}
