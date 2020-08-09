(function ($) {
	$(function () {
		// smooth scroll
		$('a[href^="#"]').click(function () {
			const href = $(this).attr("href");
			const target = $(href == "#" || href == "" ? "html" : href);
			const position = target.offset().top;
			$("html, body").animate({ scrollTop: position }, 500, "swing");
			return false;
		});

		//back to page top
		const topBtn = $("#js-pagetop");
		topBtn.hide();
		$(window).on("scroll", function () {
			if ($(this).scrollTop() > 300) {
				topBtn.fadeIn();
			} else {
				topBtn.fadeOut();
			}
		});

		//current display
		const activeUrl = location.pathname.split("/")[1];
		const activeUrl02 = location.pathname.split("/")[2];
		const navList = $(".gnav__sublist").find("a");

		if (location.pathname != "/") {
			$(
				'.gnav__item > a[href^="/' +
					location.pathname.split("/")[1] +
					'/"]'
			).addClass("gnav__link--current");
		} else {
			$(".gnav__item > a:eq(0)").addClass("gnav__link--current");
		}

		navList.each(function () {
			if ($(this).attr("href").split("/")[2] == activeUrl02) {
				$(this).addClass("gnav__sublink--current");
			}
		});

		//global menu for SP
		const menuBtn = $("#js-menu");
		const menuPanel = $("#js-gnav");

		menuBtn.on("click", function () {
			menuPanel.slideToggle();
			$(this).toggleClass("is-open");
		});

		$.fn.clickToggle = function (a, b) {
			return this.each(function () {
				var clicked = false;
				$(this).on("click", function () {
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
				menuBtn.attr({
					"aria-expanded": "true",
					"aria-label": "メニューを閉じる",
				});
				menuPanel.attr("aria-hidden", "false");
			},
			function () {
				menuBtn.attr({
					"aria-expanded": "false",
					"aria-label": "メニューを開く",
				});
				menuPanel.attr("aria-hidden", "true");
			}
		);

		var confirm = $("#js-confirm");
		var submit = $("#js-submit");

		$("#js-confirm").click(function () {
			if ($(this).prop("checked") == false) {
				submit
					.attr("disabled", "disabled")
					.parent()
					.addClass("c-btn--disabled");
			} else {
				submit
					.removeAttr("disabled")
					.parent()
					.removeClass("c-btn--disabled");
			}
		});
		//sticky display
		//----------------------------------------------------------------------
		// var elem = document.querySelectorAll('.is-sticky');
		// Stickyfill.add(elem);

		//object-fit
		//----------------------------------------------------------------------
		// objectFitImages('.object-fit-img');

		//slider
		// if($('.js-slider').length) {
		// 	$('.js-slider').slick({
		// 		autoplay:true,
		// 		arrows:false,
		// 		fade:true,
		// 	});
		// }

		//object-fit
		objectFitImages(".c-ofi");
	});
})(jQuery);
