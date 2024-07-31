var $ = jQuery.noConflict();
jQuery(function () {
	isElementExist(".slider-testimonials", initTestimonials);
	isElementExist(".slider-services", initServices);
	isElementExist(".slider-articles", initArticles);

	initScrollTopButton();
	initAccordion();
	initShowMoreText();
	initSidebarExpanded();
	initMenu();
	initCardExpanded();
	headerScrollUp();
	initCustomForms();
});

//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------

// Helper if element exist then call function
function isElementExist(_el, _cb) {
	var elem = document.querySelector(_el);

	if (document.body.contains(elem)) {
		try {
			_cb();
		} catch (e) {
			console.log(e);
		}
	}
}

function initScrollTopButton() {
	var button = $('.btn-scroll');
	var footer = $('footer'); // Заміни 'footer' на правильний селектор, якщо потрібно

	$(window).on('scroll', function () {
		var scrollTop = $(this).scrollTop();
		var windowHeight = $(this).height();
		var footerTop = footer.offset().top;

		if (scrollTop > 600 && (scrollTop + windowHeight) < footerTop) {
			button.addClass('show');
		} else {
			button.removeClass('show');
		}
	});

	button.on('click', function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('html, body').animate({ scrollTop: top }, 1500);
	});
}

// initialize custom form elements (checkbox, radio, select) https://github.com/w3co/jcf
function initCustomForms() {
	jcf.setOptions('Select', {
		maxVisibleItems: 8, // visible dropdown items before scroll appear
		wrapNative: false,
	});

	jcf.replaceAll();
}

function headerScrollUp() {
	var lastScrollTop = $(window).scrollTop();
	$(window).on('scroll', function (event) {
		var st = $(window).scrollTop();
		if (st > lastScrollTop && st > $('.header').innerHeight()) {
			$('.header').addClass('header-hidden');
		} else {
			$('.header').removeClass('header-hidden');
		}
		lastScrollTop = st;

		if (st > 0) {
			$('.header').addClass('header-fixed');
		} else {
			$('.header').removeClass('header-fixed');
		}
	});
}

function initShowMoreText(){
	$('.btn-toggle').on('click', function(e){
        e.preventDefault();
        $(this).closest('.expanded-cover').toggleClass('open');

        if ($(this).closest('.expanded-cover').hasClass('open')) {
            $(this).find('.btn-toggle__text').text('Show Less');
        } else {
            $(this).find('.btn-toggle__text').text('Show More');
        }
    });
}

function initSidebarExpanded(){
	$('.aside-tile__title, .filter-form__title').on('click', function(e) {
		if ($(window).innerWidth() < 1024) {
			e.preventDefault();
			$(this).closest('.aside-tile, .filter-form').toggleClass('open');
			$('.aside-tile__content, .filter-form__expanded').slideToggle();
		}
	});
}

function initMenu(){
	$('.menu__link').on('click', function (e) {
		if ($(this).siblings('.sub-menu').length && !$(this).closest('.menu__item').hasClass('submenu-open')) {
			e.preventDefault();
			$(this).closest('.menu__item').addClass('submenu-open');
			$(this).closest('.menu__item').siblings('li.submenu-open').find('.menu__item.submenu-open').removeClass('submenu-open');
			$(this).closest('.menu__item').siblings('li.submenu-open').removeClass('submenu-open');
		}
	});

	$('.nav-opener').on('click', function(e) {
		e.preventDefault();
		$('body').toggleClass('nav-active');
	})
};

function initCardExpanded() {
	$(window).on('resize load', function () {

		window_width = $(window).width();
	
		$('.card-link').off('click');
	
		if (window_width < 1200) {
			$('.card-link').on('click', function (e) {
				e.preventDefault();
				var $card = $(this).closest('.card-link');
				var isActive = $card.hasClass('flip--active');
				$('.card-link').removeClass('flip--active');
				$card.toggleClass('flip--active', !isActive);
			});
		}
	});
	
	$('.card-link__toggle').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.card-list').removeClass('flip--active');
	});
	
}

function initAccordion() {
	$('.accordion__item:not(.open) .accordion__expanded').hide();
	$('.accordion__item .accordion__title').on('click', function () {
		var item = $(this).closest('.accordion__item')[0];
		$(this).closest('.accordion__item').toggleClass('open');
		if ($(this).closest('.accordion__item').hasClass('open')) {
			$(this).closest('.accordion__item').find('.accordion__expanded').stop().slideDown();
			$(this).closest('.accordion__item').closest('.accordion').find('.accordion__item').each(function () {
				if (this != item) {
					$(this).removeClass('open').find('.accordion__expanded').stop().slideUp()
				}
			});
		} else {
			$(this).closest('.accordion__item').find('.accordion__expanded').stop().slideUp();
		}
	});
}

function initArticles() {
	$(".slider-articles").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: false,
			breakpoints: {
				768: {
					spaceBetween: 16,
					slidesPerView: 2.8,
				},
				1024: {
					spaceBetween: 34,
					slidesPerView: 3,
				}
			}
		});
	});
}

function initTestimonials() {
	$(".slider-testimonials").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: false,
			breakpoints: {
				1024: {
					spaceBetween: 32,
				}
			}
		});
	});
}

function initServices() {
	$(".slider-services").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: 'auto',
			spaceBetween: 16,
			loop: false,
			breakpoints: {
				1024: {
					slidesPerView: 4,
					spaceBetween: 34,
				}
			}
		});
	});
}

//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------

//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------


//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------