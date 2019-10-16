$('document').ready(function(){
  switch ($('body').attr('id')) {
    // HOME --------------------------------------------------
    case ("home"):
      var texto1 = new Typed('#titleMain', {
        strings: ['Francisco de Paula'],
        typeSpeed: 40,
        backSpeed: 0,
        loop: false,
        showCursor: false
      });

      var texto2 = new Typed('#titleQuote', {
        strings: ['Desenhista?',
                  'Professor de Matemática?',
                  '<strong>Desenvolvedor Web!</strong> ^5000'],
        startDelay: 2000,
        typeSpeed: 40,
        backSpeed: 10,
        loop: true,
        fadeOut: true,
        showCursor: false
      });
      break;

    // CURRICULUM --------------------------------------------------
    case ("curriculum"):
      $('[data-toggle="collapse"]').click(function(){
      	$("div > div > .glyphicon",this).toggleClass("fa-angle-down fa-angle-up")
      })
    break;
  }
});
