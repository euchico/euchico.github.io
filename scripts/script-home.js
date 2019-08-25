$('document').ready(function(){
  var texto1 = new Typed('#titleMain', {
    strings: ['Francisco de Paula'],
    showCursor: false,
    typeSpeed: 40,
    backSpeed: 0,
    loop: false
  });

  var texto2 = new Typed('#titleQuote', {
      strings: ['Desenhista?',
                'Professor de Matemática?',
                '<strong>Desenvolvedor Web!</strong> ^5000'],
      startDelay: 2000,
      typeSpeed: 40,
      backSpeed: 10,
      showCursor: false,
      fadeOut: true,
      loop: true
    });
});
