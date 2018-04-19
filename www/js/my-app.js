var $$ = Dom7;

// Initialize your app
var myApp = new Framework7({
    modalTitle: 'Phone Book',
    material: true,
    init: false,
    template7Pages: true
});
var mainView = myApp.addView('.view-main');





function getData() {
  $$.ajax({
    url: 'https://randomuser.me/api/?results=10&inc=name,picture,phone,email&nat=us',
    dataType: 'json',
    success: function (data) {
      var html = '';
      for (var i = 0; i < data.results.length; i++) {
        var query = encodeURIComponent(JSON.stringify(data.results[i]));
        html += '<li>' +
          '<a href="detail.html?data=' + query + '" class="item-link item-content">' +
          '<div class="item-media">' +
          '<img src="' + data.results[i].picture.thumbnail + '" alt="">' +
          '</div>' +
          '<div class="item-inner">' +
          '<div class="fio">' + data.results[i].name.first + ' ' + data.results[i].name.last + '</div>' +
          '</div>' +
          '</a>' +
          '</li>';
      }
      $$('#list-users').html(html);
    }
  });
}


myApp.onPageInit('index', function(page) {
  getData();
});


myApp.onPageInit('detail', function(page) {
  var item = JSON.parse(decodeURIComponent(page.query.data));
  console.log(item);
  var html = '<div class="ava-user">'+
    '<img class="pb-popup-dark" src="'+item.picture.medium+'" alt="">'+
  '</div>' +
  '<div class="data-table">'+
    '<table>'+
      '<tr>'+
        '<td class="label-cell">Фамилия</td>'+
        '<td class="label-cell">'+item.name.first+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td class="label-cell">Имя</td>'+
        '<td class="label-cell">'+item.name.last+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td class="label-cell">Отчество</td>'+
        '<td class="label-cell">no data in API</td>'+
      '</tr>'+
      '<tr>'+
        '<td class="label-cell">Телефон</td>'+
        '<td class="label-cell">'+item.phone+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td class="label-cell">Email</td>'+
        '<td class="label-cell">'+item.email+'</td>'+
      '</tr>'+
    '</table>'+
  '</div>' +
  '<p><a href="tel:'+item.phone+'" class="button button-fill external">Позвонить</a></p>' +
  '<p><a href="mailto:'+item.email+'" class="button button-fill external">Отправить SMS</a></p>';
  $$('.data').html(html);
  $$('.mytitle').html(item.name.first+' '+item.name.last);

  var myPhotoBrowserPopupDark = myApp.photoBrowser({
    photos : [
      item.picture.large
    ],
    theme: 'dark',
    type: 'popup'
  });
  $$('.pb-popup-dark').on('click', function () {
    myPhotoBrowserPopupDark.open();
  });
});





myApp.init();
