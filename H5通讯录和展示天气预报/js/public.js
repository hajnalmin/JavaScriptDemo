(function($) {

	var addressBook = {
		//0.初始化方法
		init: function() {
			var self = this;
			self.fit(); //适配方法
			self.createList();
			self.createBtns();
			self.move();

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
		//获取分组数据
		group: function(data) {
			var tempObj = {}; // result = {a:[],b:[]}

			//遍历数据
			for(var i in data) {
				//获取首字母并转大写
				var ucCode = i[0].toUpperCase();
				// 判断result中是否有当前首字母的属性 没有就添加一个默认的数组
				if(!tempObj[ucCode]) tempObj[ucCode] = [];
				//将当前数据方法对应的数组中去
				tempObj[ucCode].push(data[i].name);

			}
			//将分组处理好的数据返回出去
			return tempObj;

		},

		//根据数据创建列表
		createList: function() {
			var data = this.group(make_json);
			//遍历分组数据生成html并更新数据
			var html = "";
			for(var i in data) {
				//添加分组字母
				html += '<li class="word" data-word="' + i + '">' + i + '</li>';
				//遍历当前分组中的数据
				for(var j = 0; j < data[i].length; j++) {
					html += '<li>' + data[i][j] + '</li>';

				}
			}

			document.querySelector(".list").innerHTML = html;

		},

		//创建右侧按钮
		createBtns: function() {
			var btns = document.querySelector(".btns");
			//遍历生成ABCD....
			var data = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
			//遍历生成html并更新数据
			var html = "";
			for(var i = 0; i < data.length; i++) {
				html += '<li>' + data[i] + '</li>';
			}
			btns.innerHTML = html;

			//设置其行高，平均高度等于可视区域高度/数量
			var height = Math.floor(document.documentElement.clientHeight / 26);
			btns.style.lineHeight = height + 'px';

			//处理剩余的几像素的padding
			var padding = document.documentElement.clientHeight - height * 26;
			btns.style.paddingBottom = (padding) + 'px 0';

		},

		//设置移动方法

		move: function() {
			var echo = document.querySelector('.echo');
			var btns = document.querySelector('.btns');

			btns.addEventListener('touchmove', function(e) {
				e.preventDefault();

				var e = e.changedTouches[0];
				var y = e.clientY;

				var height = Math.floor(document.documentElement.clientHeight / 26);
				var index = Math.ceil(y / height);

				// 根据计算出来的索引值找到指定的按钮
				var li = document.querySelector('.btns li:nth-child(' + index + ')');
				//如果有对应的按钮
				if(li) {

					var word = li.innerHTML;
					echo.style.display = "block";
					echo.innerHTML = word;

					// 根据字母 查找 自定义属性里面为当前字母的元素（找到对应一行）

					var li = document.querySelector('.list li[data-word=' + word + ']');
					if(li) {
						var oTop = li.offsetTop;
						window.scrollTo(0, oTop);
					}

				}

			});

			//echo重新设置为隐藏
			function hide() {
				echo.style.display = "none";
			}
			btns.addEventListener('touchend', hide);
			btns.addEventListener('touchcancel', hide);

		}

	};

	addressBook.init();

})(Zepto)