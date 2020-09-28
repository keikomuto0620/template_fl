import jQuery from 'jquery';
const $ = jQuery;

$(function () {
	// smooth scroll
	// $('a[href^="#"]').on('click', function () {
	// 	const href = $(this).attr("href");
	// 	const target = $(href == "#" || href == "" ? "html" : href);
	// 	const position = target.offset().top;
	// 	$('html, body').animate({ scrollTop: position }, 500, 'swing');
	// 	return false;
	// });

	// back to page top
	const topBtn = $('#js-pagetop');
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 300) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});

	// toggle panel
	const toggleBtn = $('.js-toggle');
	toggleBtn.on('click', function () {
		$(this).toggleClass('is-open');
		$(this).next().slideToggle();
	});

});
