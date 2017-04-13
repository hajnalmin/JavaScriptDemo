(function($) {

	var health = {
		//0.初始化方法
		init: function() {
			var self = this;
			self.fit(); //适配方法
			

			return this;
		},

		//适配方法
		fit: function() {
			/*四步走*/
			var num = 1 / $(window).devicePixelRatio;
			$(document.body).append('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=' + num + ', maximum-scale=' + num + ', minimum-scale=' + num + '" />');
			var fontSize = $(window).width() / 10;
			$("html").css("font-size", fontSize);

			return this;
		},
		
		
		
		//轮播图
		run:function(){
			
			
			
			
			
			
			
			
			
			
			
			
		}

		
		

	};

	health.init();

})(Zepto)