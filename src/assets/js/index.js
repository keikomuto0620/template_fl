import './lib/polyfill';
import domContentLoaded from 'dom-content-loaded';
import { addClass, removeClass, hasClass, fadeIn, fadeOut } from './lib/util';
// import fonts from './fonts';
import './jquery';

domContentLoaded(() => {
	// global menu for SP
	const menuBtn = document.querySelector('#js-menu');
	const menuPanel = document.querySelector('#js-gnav');
	menuBtn.addEventListener('click', () => {
		// e.preventDefault();
		if (hasClass(menuBtn, 'is-open')) {
			removeClass(menuBtn, 'is-open');
			menuBtn.setAttribute('aria-expanded', 'false');
			menuBtn.setAttribute('aria-label', 'メニューを開く');
			menuPanel.setAttribute('aria-hidden', 'true');
			fadeOut(menuPanel);
		} else {
			addClass(menuBtn, 'is-open');
			menuBtn.setAttribute('aria-expanded', 'true');
			menuBtn.setAttribute('aria-label', 'メニューを閉じる');
			menuPanel.setAttribute('aria-hidden', 'false');
			fadeIn(menuPanel);
		}
	});

	//smooth scroll
	const smoothScrollTriggers = document.querySelectorAll('a[href^="#"]');
	const offset = 110

	smoothScrollTriggers.forEach(function (smoothScrollTrigger) {
		smoothScrollTrigger.addEventListener('click', function (e) {
			const href = smoothScrollTrigger.getAttribute('href');
			const targetElement = (href === "#") ? document.getElementsByTagName('html')[0] : document.getElementById(href.replace('#', ''));

			if (targetElement) {
				e.preventDefault();
				e.stopPropagation();
				const targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top - offset;
				window.scroll({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		});
	});

	//back to page top button
	// let scrollPx = window.pageYOffset
	// const topBtn = document.getElementById('js-pagetop');

	// window.addEventListener('scroll',
	// 	() => {
	// 		scrollPx = window.pageYOffset

	// 		if (scrollPx > 300) {
	// 			fadeIn(topBtn);
	// 		} else {
	// 			fadeOut(topBtn);
	// 		}
	// 	}, {
	// 	passive: true
	// }
	// )

});