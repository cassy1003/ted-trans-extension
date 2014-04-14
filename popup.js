
var $langs = $('#langs');
var $showTransViewNotice = $('#show-trans-view-notice');
var $notTransNotice = $('#not-trans-notice');
var $selectTrans = $('#select-trans');
var langs = chrome.extension.getBackgroundPage().langs

$langs.change(function(){
  var val = $('#langs option:selected').val();
  chrome.runtime.sendMessage({name: 'selected', lang: val});
});

if (langs) {
  renderLangs();
} else {
  chrome.runtime.sendMessage({name: 'getTransLangs'});
  setTimeout(function(){
    langs = chrome.extension.getBackgroundPage().langs
    if (langs) {
      renderLangs();
    }
  }, 300);
}

function renderLangs() {
  $showTransViewNotice.hide();
  $selectTrans.show();
  $langs.html(langs);
}

