$('document').ready(function(){

  var texto1 = new Typed('#titleMain', {
    strings: ['Francisco de Paula'],
    typeSpeed: 40,
    backSpeed: 0,
    loop: false,
    showCursor: false
  });

  var texto2 = new Typed('#titleQuote', {
    strings: ['<strong>Programação</strong> ^1000',
              '<strong>Matemática</strong> ^1000',
              '<strong>Arte</strong> ^1000'],
    startDelay: 2000,
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    fadeOut: true,
    showCursor: false
  });

});
