$(function() {
  $.get('/reports').then(function(data) {
    data = JSON.parse(data);

    var feed = '';
    for (var i = 0; i < data.length; i++) {
      feed += '<div>' + JSON.stringify(data[i]) + '</div>';
    }
    $('#feed').append(feed);
  });
});
