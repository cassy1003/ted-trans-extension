// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  console.log("checkForValidUrl");
  if (tab.url.indexOf("www.ted.com/talks") > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

var langs = '';
var selectedLang = '';

chrome.runtime.onMessage.addListener(
  function(req, sender, sendRes) {
    if (req.name == 'init') {
      langs = req.langs;
      sendRes('save langs in background');
    }
    if (req.name == 'selected') {
      selectedLang = req.lang;
      chrome.tabs.query({active: true, currentWindow: true}, function(tab){
        chrome.tabs.sendMessage(tab[0].id, req, function(res){
          console.log(res);
        });
      });
      sendRes('catched selected lang in background');
    }
    if (req.name == 'getTransLangs') {
      chrome.tabs.query({active: true, currentWindow: true}, function(tab){
        chrome.tabs.sendMessage(tab[0].id, req, function(res){
          langs = res;
          sendRes(langs);
        });
      });
    }
  }
);
