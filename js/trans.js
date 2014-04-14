
var langs = getTransLangs();
var id;
if($main = $('.main.talks-main script')) {
  id = $main.html().match(/__ga\('set', "dimension2", (\d*)/)[1];
}
if(!id) {
  $.get(location.href.match(/.*(?=\/transcript)/), function(res){
    id = res.match(/__ga\('set', "dimension2", (\d*)/)[1];
  });
}

chrome.runtime.sendMessage({name: 'init', langs: langs}, function(res){
  console.log(res);
});

chrome.runtime.onMessage.addListener(function(req, sender, sendRes) {
  if (req.name == 'selected') {
    lang = req.lang;
    renderTrans2(lang);
    sendRes('catched selected lang in main view')
  }
  if (req.name == 'getTransLangs') {
    sendRes(getTransLangs());
  }
});

function getTransLangs() {
  return $('select.talk-transcript__language').html();
}

function renderTrans2(lang) {
  $.get('https://www.ted.com/talks/subtitles/id/' + id + '/lang/' + lang, function(res){
    $('.trans2').remove();
    var $para = $('.talk-transcript__para__text');
    var paraCount = -1;
    var trans2Id;
    $.each(res.captions, function(i, caption){
      // caption has startTime and duration and content, startofparagraph
      if (caption.startOfParagraph) {
        paraCount += 1;
        trans2Id = 'trans2-' + paraCount;
        $para.eq(paraCount).append('<div id="' + trans2Id + '" class="trans2"></div>');
      }
      $('#' + trans2Id).append('<span class="talk-transcript__fragment">' + caption.content + ' </span>');
    });
  });
}
