(function(z) {
	function Carousel(options) {
		this.lists = options.lists;
		this.btns = options.btns;
		this.prev = options.prev;
		this.next = options.next;
		this.count = options.count;
		this.indexNow = 0;
		this.timer = null;

		//方法调用
		this.__click();
	}

	Carousel.prototype.__core = function(num) {
		this.lists.eq(num).stop().fadeIn(1000).siblings().fadeOut(500);
		this.btns.eq(num).addClass('active').siblings().removeClass('active');
	}

	Carousel.prototype.__click = function() {
		this.btns.onclick = function() {
			/*
			indexNow = $(this).index();
			core(indexNow);*/
			console.log(111);
		};
		console.log(this.btns);
	}

	/*function play() {
		indexNow++;
		if(indexNow > count - 1) {
			indexNow = 0;
		}
		core(indexNow);
	}

	$next.click(play);
	$prev.click(function() {
		indexNow--;
		if(indexNow < 0) {
			indexNow = count - 1;
		}
		core(indexNow);
	});

	timer = setInterval(play, 1000);
	$('.banner').hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(play, 1000);
	});*/

	z.Carousel = Carousel;
})(window)