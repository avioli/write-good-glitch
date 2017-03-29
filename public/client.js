// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function () {
  var checks = [
    {
      key: 'passive',
      desc: 'Checks for passive voice.'
    },
    {
      key: 'illusion',
      desc: 'Checks for lexical illusions – cases where a word is repeated.'
    },
    {
      key: 'so',
      desc: 'Checks for so at the beginning of the sentence.'
    },
    {
      key: 'thereIs',
      desc: 'Checks for there is or there are at the beginning of the sentence.'
    },
    {
      key: 'weasel',
      desc: 'Checks for "weasel words."'
    },
    {
      key: 'adverb',
      desc: 'Checks for adverbs that can weaken meaning: really, very, extremely, etc.'
    },
    {
      key: 'tooWordy',
      desc: 'Checks for wordy phrases and unnecessary words.'
    },
    {
      key: 'cliches',
      desc: 'Checks for common cliches.'
    },
    {
      key: 'eprime',
      desc: 'Checks for "to-be" verbs. Disabled by default.'
    },
  ]
  
  var checksHtml = checks.map(function (check) {
    return '<li><label><input type="checkbox" name="check-' + check.key + '" value="' + check.key + '" /> <b>' + check.key + '</b> – ' + check.desc + '</label></li>';
  }).join('');

  $('ul#checks').append(checksHtml);
  
  $('[data-toggle]').each(function (i, el) {
    var $el = $(el);
    var $target = $($el.data('target'));
    var on = $el.data('toggle');
    var off = $el.text();
    var toggled = false;
    $(el).on('click', function (event) {
      event.preventDefault();
      toggled = !toggled;
      $el.text(toggled ? on : off);
      $target.toggle();
    });
  });

  $('form').submit(function (event) {
    event.preventDefault();
    
    var sentence = $('input#sentence').val();
    
    var checkedChecks = [];
    $('input:checked').each(function (i, el) {
      checkedChecks.push($(el).val());
    });
    
    var params = $.param({
      sentence: sentence,
      checks: checkedChecks.join('|')
    });
    
    $.get('/suggestions?' + params, function (response) {
      try {
        var json = JSON.parse(response);
        console && console.log && console.log('response:', json);
        
        $('ul#suggestions').empty();
        $('#suggestions-for').text(sentence);
        
        json.forEach(function (suggestion) {
          $('<li></li>').text(suggestion.reason).appendTo('ul#suggestions');
        })
        
        $('input#sentence').focus();
      } catch (err) {
        alert(err);
      }
    });
  });
});
