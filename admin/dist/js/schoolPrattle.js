/*!
 * Start Bootstrap - SB Admin 2 v3.3.7+1 (http://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2016 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */
//  展示已经发不过的文章
    $(document).ready(function() {
      var url = "http://" + location.host + "/admin/schoolPrattle";
      $('#dataTables-trade').DataTable({
          "processing": true,
          "serverSide": true,
          "ajax": {
            url: url,
            type: "GET",
            dataType: "json",
      			contentType: "application/json",
            success: function(data) {
            }
          },
          "columns": [
            {"data": "title"},
            {"data": "author"},
            {"data": "time"},
            {"data": "path"},
            {"data": "view"},
            {"data": function(data, type, row) {
              return "<img src=" + data + "/>";
            }}
          ]
      });
    });

//  添加文章
$('#newPrattle').on('click', function(e) {

})
