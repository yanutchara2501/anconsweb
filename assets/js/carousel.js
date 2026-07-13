(function () {
	function init(carousel) {
		var track = carousel.querySelector('.carousel-track');
		var slides = Array.prototype.slice.call(carousel.querySelectorAll('.carousel-slide'));
		var dots = Array.prototype.slice.call(carousel.querySelectorAll('.carousel-dot'));
		var prevBtn = carousel.querySelector('.carousel-prev');
		var nextBtn = carousel.querySelector('.carousel-next');
		var index = 0;
		var timer = null;

		function goTo(i) {
			index = (i + slides.length) % slides.length;
			track.style.transform = 'translateX(-' + (index * 100) + '%)';

			slides.forEach(function (slide, idx) {
				slide.classList.toggle('is-active', idx === index);
			});

			dots.forEach(function (dot, idx) {
				dot.classList.toggle('is-active', idx === index);
			});
		}

		function restart() {
			if (timer)
				clearInterval(timer);

			timer = setInterval(function () {
				goTo(index + 1);
			}, 6000);
		}

		dots.forEach(function (dot, idx) {
			dot.addEventListener('click', function () {
				goTo(idx);
				restart();
			});
		});

		if (prevBtn) {
			prevBtn.addEventListener('click', function () {
				goTo(index - 1);
				restart();
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener('click', function () {
				goTo(index + 1);
				restart();
			});
		}

		carousel.addEventListener('mouseenter', function () {
			if (timer)
				clearInterval(timer);
		});

		carousel.addEventListener('mouseleave', restart);

		goTo(0);
		restart();
	}

	function ready() {
		var carousels = document.querySelectorAll('[data-carousel]');

		for (var i = 0; i < carousels.length; i++)
			init(carousels[i]);
	}

	if (document.readyState === 'loading')
		document.addEventListener('DOMContentLoaded', ready);
	else
		ready();
})();
