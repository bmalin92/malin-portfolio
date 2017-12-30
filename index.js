'use strict';

$('.bio').click(function () {
  $('.about').show(200);
  $('.bio .bounce').removeClass('bounce');
  $('.bio-arrow').hide();
});

$('.experience h2').click(function () {
  $('.jobs').show(200);
  $('.experience .bounce').removeClass('bounce');
  $('.experience-arrow').hide();
});