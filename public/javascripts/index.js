(function($) {
  function refresh() {
    $.ajax('/api/alternatives', {
      dataType:'json'
    }).done(function(alternatives) {
      var text = '';

      for (var i = 0; i < alternatives.length; i ++) {
        text = text + alternatives[i] + '\n';
      }

      $('#alternatives').text(text)
    });

    $.ajax('/api/logs', {
      dataType:'json'
    }).done(function(logs) {
      var text = '';

      for (var i = logs.length - 1; i >= 0; i --) {
        text = text + logs[i] + '\n';
      }

      $('#logs').text(text)
    });
  }

  setInterval(refresh, 1000);
})(jQuery);