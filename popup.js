
var langs = chrome.extension.getBackgroundPage().langs

$('#langs').html(langs).change(function(){
  var val = $('#langs option:selected').val();
  chrome.runtime.sendMessage(
    {name: 'selected', lang: val},
    function(res){
      console.log(res);
    }
  );
})
