/**
 * Created by zhm on 17/3/14.
 */
$(function() {

	var obj = {

		init: function() {
			var self = this;
			
			self.getElementsByClassName()//兼容IE
				.addEvent() //兼容IE，解决DOM2级事件的兼容性
				.removeEvent() //兼容IE，解决DOM2级事件的兼容性
	
				.getEvent()//跨浏览器事件,获取事件对象
				.getTarget() //跨浏览器事件,获取事件触发目标
				.stopPropagation()//跨浏览器事件,获取事件触发目标
				.preventDefault() //跨浏览器事件,获取事件触发目标
	
				//数组方法
				.isArray() //兼容IE
				.indexOf() //兼容IE
				.randomArr() //返回随机数组-数组乱序
				.unique1() //数组去重-hash表
				.unique2() //数组去重-indexof
				.unique3() //数组去重-对象的属性
				.bubbleSort()//冒泡排序
				.fastSort()//快速排序
				.zhmSort()//排序
	
				//number方法
				.toInt() //转换为整数,兼容IE
				.toFloat() //转换为浮点数,兼容IE
				.toFix(str, num) //保留几位小数
				.isNumber() //判断是不是数字---string--boolean等等
	
				//字符串方法
				.trim() //去掉空格,兼容IE
				.trimL() //去掉左空格，兼容IE
				.trimR() //去掉右空格，兼容IE
				.zhmType() //返回数据真实类型，兼容IE
				.zhmTransform() //转驼峰法
				.countWord(str, word) //统计某个字符出现的次数
	
				//Data函数
				.zhmGetTime() //获取时间戳函数
	
				//DOM方法
				.hasClassName() //判断元素是否含有某个类名

		},

		getElementsByClassName: function(className) {
			if(document.getElementsByClassName) {
				return document.getElementsByClassName(className);
			} else {
				var tag = document.getElementsByTagName("*");
				var newArr = [];

				for(var i = 0; i < tag.length; i++) {
					var n = tag[i].split(' ');
					for(var j = 0; j < n.length; j++) {
						if(n[j] == className) {
							newArr.push(tag[i]);
							break;
						}
					}
				}
				return newArr;
			}
			
			//链式调用
			return this;
		},

		/**
		 * 解决DOM2级事件的兼容性
		 * @param ele
		 * @param this.zhmType
		 * @param handler
		 * 添加事件
		 */
		addEvent:function(ele,type, handler)
	{
		//IE9以上,FF,chrome
		if (ele.addEventListener) {
			return ele.addEventListener(type, handler);
		}

		//IE6-8
		else if (ele.attachEvent) {
			return ele.attachEvent('on' + type, handler);
		}

		//其他浏览器

		ele['on' + this.type] = handler;
		//链式调用
		return this;
	},

		/**
		 *解决DOM2级事件的兼容性
		 * @param ele
		 * @param this.zhmType
		 * @param handler
		 * 移除事件
		 */
		removeEvent: function(ele, type, handler) {
			//IE9以上，FF和Chrome
			if(ele.removeEventListener) {
				return ele.removeEventListener(this.type, handler);
			}

			//IE6-8
			else if(ele.detachEvent) {
				return ele.detachEvent('on' + type, handler);
			}

			//其他浏览器

			ele['on' + type] = null;
				//链式调用
			return this;

		},

		/**
		 * 跨浏览器对象
		 * @param e
		 * 获取事件对象
		 */

		getEvent: function(e) {
			return e || window.event;
				//链式调用
			return this;
		},

		/**
		 * 跨浏览器对象
		 * @param e
		 * 获取事件触发目标
		 */
		getTarget: function(e) {
			return e.target || e.srcElement;
				//链式调用
			return this;
		},

		/**
		 *跨浏览器对象
		 * @param e
		 * @returns {*}
		 * 阻止事件冒泡
		 */
		stopPropagation: function(e) {
			if(e.stopPropagation) {
				return e.stopPropagation(e);
			} else {
				e.cancelBubble = true;
			}
				//链式调用
			return this;
		},

		/**
		 * 跨浏览器对象
		 * @param e
		 * @returns {*}
		 * 阻止默认事件
		 */
		preventDefault: function(e) {
			if(e.preventDefault) {
				return e.preventDefault(e);
			} else {
				e.returnValue = false;
			}
				//链式调用
			return this;
		},

		//isArray()
		isArray: function(arg) {
			return Object.protothis.zhmType.toString.call(arg) === '[object Array]';
			//链式调用
			return this;
		},

		//trim方法重写

		trim: function(str) {
			return str.replace(/(^\s*)|(\s*$)/g, "");
			//链式调用
			return this;
		},
		//去除左空格
		trimL: function(str) {
			return str.replace(/(^\s*)/g, "");
			//链式调用
			return this;
		},
		//去除右空格
		trimR: function(str) {
			return str.replace(/(\s*$)/g, "");
			//链式调用
			return this;
		},

		//转驼峰法
		zhmTransform: function(str) {
			var temp = str.split("-");
			for(var i = 1; i < temp.length; i++) {
				temp[i] = temp[i][0].toLocaleUpperCase() + temp[i].slice(1);
			}
			return temp.join('');
			//链式调用
			return this;
		},

		//重写indexOf，兼容IE8
		indexOf: function(obj) {
			for(var o in this) {
				if(this[o] == obj) {
					return o;
				}
			}
			return -1;
			//链式调用
			return this;
		},

		//返回随机数组
		randomArr: function(arr) {
			arr.sort(function(x, y) {
				return parseInt(Math.random() * 2); // 返回随机值  0或1
			})
			//链式调用
			return this;
		},
		//检测数据真实类型，重写this.zhmTypeof方法
		zhmType: function(data) {
			var z; // ===undefined 减少变量的长度
			if(data === "null" || data === z) return(data === z ? z : data) + "";
			return Object.protothis.toString.call(data).slice(8, -1).toLowerCase();
			//链式调用
			return this;
		},

		//判断数据是不是数字
		isNumber: function(data) {
			return this.zhmType(data) == "number";
			//链式调用
			return this;
		},

		//判断是不是数组
		isArray: function(data) {
			return this.zhmType(data) == "array";
			//链式调用
			return this;
		},

		//3.判断是不是string
		isString: function(data) {
			return this.zhmType(data) == "string";
			//链式调用
			return this;
		},

		//4.判断是不是function
		isFunction: function(data) {
			return this.zhmType(data) == "fucntion";
			//链式调用
			return this;
		},

		//5.判断是不是对象
		isObject: function(data) {
			return this.zhmType(data) == "object";
			//链式调用
			return this;
		},

		//6.判断是不是boolean
		isBoolean: function(data) {
			return this.zhmType(data) == "boolean";
			//链式调用
			return this;
		},

		//7.判断是不是null
		isNull: function(data) {
			return this.zhmType(data) == "null";
			//链式调用
			return this;
		},

		//8.判断是不是undefined
		isUndefined: function(data) {
			return this.zhmType(data) == "undefined";
			//链式调用
			return this;
		},
		//转换为整数
		toInt: function(data) {
			var num = parseInt(num);
			return isNaN(num) ? 0 : num;
			//链式调用
			return this;
		},

		//转换成浮点数
		toFloat: function(data) {
			var num = parseFloat(num);
			return isNaN(num) ? 0 : num;
			//链式调用
			return this;
		},

		//获取指定位数的小数
		toFix: function(str, num) {
			var reg = new RegExp("(^[+-]?\\d+\\.\\d{" + num + "})\\d+$");
			return str.replace(reg, '$1');
			//链式调用
			return this;
		},

		//数组去重--(1)使用hash表
		unique1: function(arr) {
			var hash = {};
			var temp = [];
			for(var i = 0; i < arr.length; i++) {
				if(!hash[arr[i]]) {
					hash[arr[i]] = 1;
					temp.push(arr[i]);
				}
			}
			return temp;
			//链式调用
			return this;
		},

		//数组去重--(2)使用indexof
		unique2: function(arr) {
			var temp = [];
			for(var i = 0; i < arr.length; i++) {
				if(temp.indexOf(arr[i]) == -1) {
					temp.push(arr[i]);
				}
			}
			return temp;
			//链式调用
			return this;
		},
		//数组去重--(2)使用对象的特性
		unique3: function(arr) {
			var res = {};
			for(var i = 0; i < arr.length; i++) {
				res[arr[i]] = 1;
			}
			return Object.keys(res);
			//链式调用
			return this;
		},

		//冒泡排序--从小到大
		bubbleSort:function(arr){
			for(var i = 0;i<arr.length;i++){
				for(var j = 0;j<arr.length-i;j++){
					if(arr[j]>arr[j+1]){
						var temp = arr[j];
						arr[j] = arr[j+1];
						arr[j+1] = temp;
					}
				}
			}
			return arr;
			//链式调用
			return this;
		},

		//快速排序
		fastSort:function(arr){
			//1.检查数组长度
			if(arr.length<=1){
				return arr;
			}else{
			//2.选择中间数和中心点
				var pivotIndex = Math.floor(arr.length/2);
				var pivotNum = arr.slice(pivotIndex,1)[0];
				//定义两个空数组存放一左一右子集
				var left = [];
				var right = [];
				//开始遍历，小的放在左数组，大的放在右数组
				for(var i = 0;i<arr.length;i++){
					if(arr[i]<pivotNum){
						left.push(arr[i]);
					}else{
						right.push(arr[i]);
					}
				}
				
				//使用递归，多次遍历数据
				return this.fastSort(left).cancat([pivotNum],this.fastSort(right));
				
			}
			//链式调用
			return this;
		
		},
		
		//数组排序
		zhmSort:function(a,b){
			return a-b;//a>b  小于0 false 正序  从小到大排序
			return b-a;//a<b  大于0 true  倒序  从大到小排序
			//链式调用
			return this;
		},








		//获取时间戳函数
		//Get the timestamp function
		zhmGetTime: function() {
			return new Date().getTime();
			//链式调用
			return this;

		},

		//转驼峰法
		zhmTransform: function(str) {
			var temp = str.split("-");
			for(var i = 1; i < temp.length; i++) {
				temp[i] = temp[i][0].toLocaleUpperCase() + temp[i].slice(1);
			}
			return temp.join('');
			//链式调用
			return this;
		},

		//统计在一个字符串中，某个单词出现的次数
		countWord: function(str, word) {
			var obj = {};
			for(var i = 0; i < str.length; i++) {
				var temp = str[i];
				if(!obj[temp]) {
					obj[temp] = i;
				} else {
					obj[temp]++;
				}
			}
			for(var key in obj) {
				if(key == word) {
					return obj[key];
				}
			}
			//链式调用
			return this;
		},

		//判断元素是否含有某个类名
		hasClassName: function(className) {
			var elements = [];
			if(document.getElementsByClassName) {
				return document.getElementsByClassName(className)
			} else {
				var all = document.getElementsByTagName('*');
				var reg = new RegExp('\\b' + className + '\\b');
				for(var i in all) {
					var cur = all[i].className;
					if(reg.test(cur)) elements.push(all[i])
				}
				return elements;
			}
			//链式调用
			return this;
		}

	}

})(jQuery);