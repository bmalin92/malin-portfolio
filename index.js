'use strict';

$('.bio h2').click(function () {
  $('.about').show(200);
  $('.bio .bounce').removeClass('bounce');
});

$('.experience h2').click(function () {
  $('.jobs').show(200);
  $('.experience .bounce').removeClass('bounce');
});