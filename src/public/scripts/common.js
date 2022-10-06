(function () {
  $(function () {
    // Animations and resizes:
    var animateTitle = function () {
      if ($('h1').is(':hidden') == false || $('.card').is(':hidden') == false) {
        $('h1').animate({
            opacity: 0.5,
            fontSize: '20px'
          },
          2000, function () {
            $(this).hide(1500);
          }
        ),
          $('.card').animate({
              height: '60px'
            },
            2000, function () {
              $(this).animate({
                  height: '0px'
                },
                2000, function () {
                  $(this).hide();
                });
            }
          ),
          $('.fixed-bottom').animate({
              opacity: 0.1
            },
            1000, function () {
              $(this).hide(1000);
            });

      }
    };

    $(document).ready(function () {
      var w = $(window).innerWidth();
      if (w > 1200) {
        $('h1').addClass('display-1');
      } else if (w <= 1200 && w > 660) {
        $('h1').addClass('display-4');
      } else if (w <= 660 && w > 530) {
        $('h1').addClass('h1');
      } else if (w <= 530 && w > 375) {
        $('h1').addClass('h3');
      } else if (w <= 375) {
        $('h1').addClass('h6');
      }
    });

    $(window).resize(function () {
      var w = $(window).innerWidth();
      if (w > 1200) {
        $('h1').addClass('display-1');
        $('h1').removeClass('display-4');
        $('h1').removeClass('h1');
        $('h1').removeClass('h3');
        $('h1').removeClass('h6');
      } else if (w <= 1200 && w > 660) {
        $('h1').removeClass('display-1');
        $('h1').addClass('display-4');
        $('h1').removeClass('h1');
        $('h1').removeClass('h3');
        $('h1').removeClass('h6');
      } else if (w <= 660 && w > 530) {
        $('h1').removeClass('display-1');
        $('h1').removeClass('display-4');
        $('h1').addClass('h1');
        $('h1').removeClass('h3');
        $('h1').removeClass('h6');
      } else if (w <= 530 && w > 375) {
        $('h1').removeClass('display-1');
        $('h1').removeClass('display-4');
        $('h1').removeClass('h1');
        $('h1').addClass('h3');
        $('h1').removeClass('h6');
      } else if (w <= 375) {
        $('h1').removeClass('display-1');
        $('h1').removeClass('display-4');
        $('h1').removeClass('h1');
        $('h1').removeClass('h3');
        $('h1').addClass('h6');
      }
    });

    // REQUESTS:
    const rowsToHtml = (rows) => {
      return rows.map((row) => '<li>' +
        '<div className="py-2"><div className="row">' +
        '<div className="text-justify col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><p>' +
        row["description"] +
        '</p></div>' +
        '<div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">' +
        '<p className="words-groups">Частина мови:<br><span className="text-primary">' +
        row["partOfSpeech"] +
        '</span></p>' +
        '</div>' +
        '<div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">' +
        '<p className="words-groups">Лексико-семантична група:<br><span className="text-primary">' +
        row["lexicalGroup"] +
        '</span></p>' +
        '</div>' +
        '<div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">' +
        '<p className="words-groups">За характером вживання:<br><span className="text-primary">' +
        row["characteristic"] +
        '</span></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>')
    }

    const noDataHtml = (input) => {

      return ('<li>' +
        '<div class="text-center" id="search-error"><p><strong>Слово <em>"' + input +
        '"</em> не знайдено <i class="fa fa-exclamation-circle fa-lg align-middle"></i></strong></p>'
        // '<a class="btn btn-success" href="#" id="all-lexis-2">Переглянути всю лексику</a>' +
        // '<script>' +
        // '$("#all-lexis-2").on("click", function(event) {' +
        // '$("#list-search-result").html("");' +
        // '$.ajax({type: "GET",url: "api/vocabulary",' +
        // 'success: function(data) {$("#list-search-result").append(rowsToHtml(data.rows);}});});' +
        // '</script></div></li>'
      );
    }


    $('#input-search').on('textchange', function () {
      animateTitle();

      const input_search = $("#input-search").val();
      if (input_search.length > 2 && input_search.length < 50) {
        $('#int-menu').html('');
        $.ajax({
          type: "GET",
          url: "api/vocabulary?search=" + input_search,
          cache: false,
          success: function (data) {
            $("#block-search-result").show();
            $("#list-search-result").html(data.rows.length != 0 ? rowsToHtml(data) : noDataHtml(input_search));
          }
        });
      } else {
        $("#block-search-result").hide();
      }

    });

    $('#all-lexis').on('click', function (event) {
      animateTitle();
      $("#list-search-result").html('');
      $.ajax({
        type: 'GET',
        url: 'api/vocabulary',
        success: (data) => {
          $("#block-search-result").show();
          $('#list-search-result').append(rowsToHtml(data));
        }
      });
    });

    // HTML:
    $('#parts-of-speech').on('click', function (event) {
      animateTitle();
      $("#list-search-result").html('');
      $('#int-menu').html('<div class="text-center"><h3 class="py-2">Частини мови:</h3>' +
        '<ul class="px-0">' +
        '<li><a class="btn btn-outline-dark btn-lg btn-block my-1" href="#" id="nouns">Іменники</a></li>' +
        '<li><a class="btn btn-outline-dark btn-lg btn-block my-1" href="#" id="verbs">Дієслова</a></li>' +
        '<li><a class="btn btn-outline-dark btn-lg btn-block my-1" href="#" id="adjectives">Прикметники</a></li>' +
        '<li><a class="btn btn-outline-dark btn-lg btn-block my-1" href="#" id="verb-adjectives">Дієприкметники</a></li>' +
        '</ul></div>' +
        '<script>' +
        '$("#nouns").on("click", function(event) {$("#int-menu").html("");' +
        '$.ajax({type: "GET", url: "/api/vocabulary?partOfSpeech=noun",' +
        'success: function(data) { $("#list-search-result").append(rowsToHtml(data));}});});' +

        '$("#verbs").on("click", function(event) {$("#int-menu").html("");' +
        '$.ajax({type: "GET", url: "/api/vocabulary?partOfSpeech=verb",' +
        'success: function(data) {$("#list-search-result").append(rowsToHtml(data));	}});});' +

        '$("#adjectives").on("click", function(event) {$("#int-menu").html("");' +
        '$.ajax({type: "GET", url: "/api/vocabulary?partOfSpeech=adjective",' +
        'success: function(data) {$("#list-search-result").append(rowsToHtml(data));	}});});' +

        '$("#verb-adjectives").on("click", function(event) {$("#int-menu").html("");' +
        '$.ajax({type: "GET", url: "/api/vocabulary?partOfSpeech=verbAdjective",' +
        'success: function(data) {$("#list-search-result").append(rowsToHtml(data));	}});});' +
        '</script>');
    });

    $('#lexis-class').on('click', function (event) {
      animateTitle();
      $("#list-search-result").html('');
      $('#int-menu').html('<div class="text-center"><h3 class="py-2">Лексико-семантична класифікація:</h3>' +
        '<ul class="px-0">' +
        '<li><a class="btn btn-outline-dark btn-lg btn-block my-1" href="#" id="styles">Назваи стилів та прийомів гри</a></li>' +
        '<li><a class="btn btn-outline-dark btn-lg btn-block my-1" href="#" id="name-of-person">Назви осіб, що займаються спортом</a></li>' +
        '<li><a class="btn btn-outline-dark btn-lg btn-block my-1" href="#" id="sports-gear">Назви спортивного знаряддя, інвентарю, споруд</a></li>' +
        '</ul></div>' +
        '<script>' +
        '$("#styles").on("click", function(event) {$("#int-menu").html("");' +
        '$.ajax({type: "GET", url: "/api/vocabulary?lexisClass=styles",' +
        'success: function(data) {$("#list-search-result").append(rowsToHtml(data));}});});' +

        '$("#name-of-person").on("click", function(event) {$("#int-menu").html("");' +
        '$.ajax({type: "GET", url: "/api/vocabulary?lexisClass=nameOfPerson",' +
        'success: function(data) {$("#list-search-result").append(rowsToHtml(data));}});});' +

        '$("#sports-gear").on("click", function(event) {$("#int-menu").html("");' +
        '$.ajax({type: "GET", url: "/api/vocabulary?lexisClass=sportsGear",' +
        'success: function(data) {$("#list-search-result").append(rowsToHtml(data));}});});</script>');
    });

    $('#class-char').on('click', function (event) {
      animateTitle();
      $("#list-search-result").html('');
      $('#int-menu').html('<div class="text-center"><h3 class="py-2">Класифікація за характером вживання:</h3>' +
        '<ul class="px-0">' +
        '<li><a class="btn btn-outline-dark btn-lg btn-block my-1" href="#" id="general-use">Загальновживані слова</a></li>' +
        '<li><a class="btn btn-outline-dark btn-lg btn-block my-1" href="#" id="general-sports">Загальноспортивні терміни</a></li>' +
        '<li><a class="btn btn-outline-dark btn-lg btn-block my-1" href="#" id="own">Власне шахові терміни</a></li>' +
        '</ul></div>' +
        '<script>' +
        '$("#general-use").on("click", function(event) {$("#int-menu").html("");' +
        '$.ajax({type: "GET", url: "/api/vocabulary?classChar=generalUse",' +
        'success: function(data) {$("#list-search-result").append(rowsToHtml(data));}});});' +

        '$("#general-sports").on("click", function(event) {$("#int-menu").html("");' +
        '$.ajax({type: "GET", url: "/api/vocabulary?classChar=generalSports",' +
        'success: function(data) {$("#list-search-result").append(rowsToHtml(data));}});});' +

        '$("#own").on("click", function(event) {$("#int-menu").html("");' +
        '$.ajax({type: "GET", url: "/api/vocabulary?classChar=own",' +
        'success: function(data) {$("#list-search-result").append(rowsToHtml(data));}});});' +
        '</script>');
    });
  });
})();