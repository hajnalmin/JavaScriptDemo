(function(z) {

	function AddressBook() {
		var self = this;
		this.__init();

	}

	AddressBook.prototype.__init = function() {
		this.__fit();

	}

	/**
	 * 适配方法
	 */
	AddressBook.prototype.__fit = function() {
		var num = 1 / $(window).devicePixelRatio;
		$(document.body).append('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=' + num + ', maximum-scale=' + num + ', minimum-scale=' + num + '" />');
		var fontSize = $(window).width() / 10;
		$("html").css("font-size", fontSize);

	}

	/**
	 * 获取分组数据
	 * 
	 */

	AddressBook.prototype.__getGroup = function(data) {
		var tempObj = {}; 
		for(var i in data) {
			var ucCode = i[0].toUpperCase();
			if(!tempObj[ucCode]) tempObj[ucCode] = [];
			tempObj[ucCode].push(data[i].name);

		}
		return tempObj;

	}

	z.AddressBook = AddressBook;

})(Zepto)