$(document).ready(function () {
  
  $(".modal").modal({
    show: false,
    backdrop: 'static'
  });


  $("#menu-item-2").mouseover(function () {
    $(".sub-menu").show();
  });
  $("#menu-item-2").mouseleave(function () {
    $(".sub-menu").hide();
  });

  $('.menu-item a').click(function () {
    $('#main-navbar-menu li a').map(function (i, el) {
      return $(el).removeClass('active');
    }).get();

    $(this).addClass('active');
    removeHash();
  })
  // $('#Cosmeticslist').html(genarteBandList(brandsList.Cosmetics));
  // $('#Make-uplist').html(genarteBandList(brandsList.makups));
  // $('#perfumelist').html(genarteBandList(brandsList.Perfumes));

  var markup1 = ''
  for (var i = 1; i < 10; i++) {
    markup1 += '<div class="brantitem"><img src="image/Brands/b' + i + '.png" /> </div>';
    if (i == 9)
      $('.brandData').html(markup1);
  }

  myMap();


  initData();

  function initData() {
    var bgcount = localStorage.getItem('cartCount');
    $('#cartCount').html(bgcount);

  }

  function logInUser() {
    debugger;
  }


  var token = '1362124742.7b33a8d.6613a3567f0a425f9852055b8ef743b7',
    num_photos = 10;

  $.ajax({
    url: 'https://api.instagram.com/v1/users/self/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: { access_token: token, count: num_photos },
    success: function (data) {
      console.log(data);
      for (x in data.data) {
        $('ul').append('<li><img src="' + data.data[x].images.low_resolution.url + '"></li>');
      }
    },
    error: function (data) {
      console.log(data);
    }
  });


  $('#submitlogin').click(function () {
    var error = false;
    var username = $('#email').val();
    var password = $('#password').val();
    if (username == "") {
      error = true;
      $('#email').parent().addClass('borderError');
      $('#email').parent().next().html('Please enter Email address')
    }
    if (password == "") {
      error = true;
      $('#password').parent().addClass('borderError');
      $('#password').parent().next().html('Please enter Password')
    }
    if (error)
      return;

    $('#submitlogin').css("display", "none");
    $('#submitlogin').next().css("display", "block");
    var loginRequest = {
      "loginid": username,
      "password": password
    }
    var requestUrl = localStorage.getItem("apiServer") + 'api/lucky/login';
    $.ajax({
      url: requestUrl,
      type: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(loginRequest),
      success: function (result) {
        $('#submitlogin').next().css("display", "none");
        if (result.statusCode == 200) {
          $('#myModal').modal('hide');
          localStorage.setItem("token", result.sessionID);
          localStorage.setItem("user", JSON.stringify(result.user));
          if (result.user.userRole === "SuperAdmin") {
            window.open('admin.html', '_blank');
          } else {
            window.open('items.html', '_blank');
          }
          $('#email').val('');
          $('#password').val('');
        }
        if (result.statusCode == 404) {
          $('#email').parent().addClass('borderError');
          $('#password').parent().addClass('borderError');
          $('#rememberme').parent().next().html(result.errorMessage);
          $('#submitlogin').css("display", "block");
        }
      },
      error: function (result) {
        $('#rememberme').parent().next().html('Error');
        $('#submitlogin').css("display", "block");
        $('#submitlogin').next().css("display", "none");
      }
    });
  });

  $('#email').keypress(function () {
    $('#email').parent().removeClass('borderError');
    $('#email').parent().next().html('')
  });

  $('#password').keypress(function () {
    $('#password').parent().removeClass('borderError');
    $('#password').parent().next().html('')
  });

  $('#ordernowbtn').click(function () {
    $('#email').parent().removeClass('borderError');
    $('#email').parent().next().html('')
    $('#password').parent().removeClass('borderError');
    $('#password').parent().next().html('');
    $('#rememberme').parent().next().html('');
    $('#submitlogin').css("display", "block");
  });


  $(window).on('scroll', function () {
    let scrollAmount = window.scrollY;
    console.clear()
    if (scrollAmount > 50) {
      $('.navbar').addClass('navbar-fixed-top');
    } else {
      $('.navbar').removeClass('navbar-fixed-top');
    }
  });
});

function removeHash() {
  history.replaceState({}, document.title, "#");
}

function genarteBandList(list) {
  var markup = '';
  for (i = 0; i < list.length; i++) {
    markup += '<div class="brantitem">' + list[i] + '</div>'
  }
  return markup;
}

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(18.0265, 63.0660),
    zoom: 2,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var myCenter = { position: { lat: 18.0265, lng: +63.0660 }, map: map };
  var marker = new google.maps.Marker({ position: myCenter });
  marker.setMap(map);
}