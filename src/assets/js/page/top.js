import jQuery from "jquery";
const $ = jQuery;

import 'slick-carousel';
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';

// $(function () {
//slider for mainvisual
// ----------------------------------------------------------------------
$('#js-slider').slick({
	dots: true,
	fade: true,
	arrows: false,
	responsive: [
		{
			breakpoint: 767,
			settings: {
				dots: false,
				arrows: true,
			}
		},
	]
});
//slider for tour infomation
// ----------------------------------------------------------------------
$('#js-sliderTour').slick({
	slidesToShow: 3,
	arrows: true,
	responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
			}
		},
	]
});

//slider for tour infomation02
// ----------------------------------------------------------------------
$('#js-sliderTour02').slick({
	slidesToShow: 3,
	arrows: true,
	responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
			}
		},
	]
});
// });
