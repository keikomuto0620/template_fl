(function($) {
	$(function() {

// smooth scroll
$('a[href^="#"]').click(function(){
	const href= $(this).attr('href');
	const target = $(href == '#' || href == '' ? 'html' : href);
	const position = target.offset().top;
	$('html, body').animate({scrollTop:position}, 500, 'swing');
	return false;
});

//current display
const activeUrl = location.pathname.split("/")[1];
const activeUrl02 = location.pathname.split("/")[2];
const navList = $(".gnav__sublist").find("a");

if(location.pathname != "/") {
	$('.gnav__item > a[href^="/' + location.pathname.split("/")[1] + '/"]').addClass('gnav__link--current');
} else {
	$('.gnav__item > a:eq(0)').addClass('gnav__link--current');
}

navList.each(function(){
    if( $(this).attr("href").split("/")[2] == activeUrl02 ) {
     $(this).addClass("gnav__sublink--current");
   };
});

//global menu for SP
const menuBtn = $('#js-menu');
const menuPanel = $('#js-gnav');

menuBtn.on('click', function() {
	menuPanel.slideToggle();
	$(this).toggleClass('is-open');
});

$.fn.clickToggle = function(a, b) {
	return this.each(function() {
		var clicked = false;
		$(this).on('click', function() {
			clicked = !clicked;
			if (clicked) {
				return a.apply(this, arguments);
			}
			return b.apply(this, arguments);
		});
	});
};

menuBtn.clickToggle(
  function () {
    menuBtn.attr('aria-expanded','true');
    menuPanel.attr('aria-hidden','false');
  },
  function () {
    menuBtn.attr('aria-expanded','false');
    menuPanel.attr('aria-hidden','true');
  }
);

//back to page top
const topBtn = $('#js-pagetop');
topBtn.hide();
$(window).on('scroll', function() {
	if ($(this).scrollTop() > 300) {
		topBtn.fadeIn();
	} else {
		topBtn.fadeOut();
	}
});

//slider
// if($('.js-slider').length) {
// 	$('.js-slider').slick({
// 		autoplay:true,
// 		arrows:false,
// 		fade:true,
// 	});
// }

//object-fit
  // objectFitImages('img.object-fit-img');


});
})(jQuery);

