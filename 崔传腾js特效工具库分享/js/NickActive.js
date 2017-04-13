(function(nick){
	
	//Enable Strict Mode
	"use strict";

	var attr_window = 'window';
	
	var attr_document = 'document';
	
	var attr_body = 'body';
	
	var attr_documentElement = 'documentElement';
	
	var attr_toLowerCase = 'toLowerCase';
	
	var attr_toUpperCase = 'toUpperCase';
	
	var attr_substr = 'substr';
	
	var attr_indexOf = 'indexOf';
	
	var attr_test = 'test';
	
	var attr_replace = 'replace';
	
	var attr_split = 'split';
	
	var attr_length = 'length';
	
	var attr_push = 'push';
	
	var attr_concat = 'concat';
	
	var attr_call = 'call';
	
	var attr_apply = 'apply';
	
	var attr_extend = 'extend';
	
	var attr_nick = 'nick_';
	
	var attr_parent = 'parent';
	
	var attr_parentNode = attr_parent+'Node';
	
	
	var pattern_number = /^[-\+]?\d+\.*\d*$/;
	
	var pattern_space = /\s+/;
	
	var document = window[attr_document];
	
	var documentElement = document[attr_documentElement];
	
	var undefined;
	
	var real = !0;
	
	var fake = !real;
	
	var vacancy = null;
	
	var empty = '';
	
	var each = nick.each;
	
	var fn = nick.fn;
	
	var cover = nick.cover;
	
	var array2Object = nick.array2Object;
	
	var ltrim = nick.ltrim;
	
	var isString = nick.isString;
	
	var toNumber = nick.toNumber;
	
	var isFunction = nick.isFunction;
	
	var ucword = nick.ucword;
	
	var setInterval = window.setInterval;
	
	var isApp = nick.isApp === real;
	
	var attr_Math = window.Math;
	
	var abs = attr_Math.abs;
	
	var round = attr_Math.round;
	
	/**
	 * slide滑动
	 * 是否启用自动播放
	 * 鼠标移入是否停止
	 * 是否启用左右滑动切换
	 * 配置滑动方向
	 * 按钮单击切换
	 * 切换样式
	 * 动画时间
	 * 切换时间
	 * 
	 * 
	 */
	(function(){
		
		var attr_addEventListener = 'addEventListener';
		
		var attr_mouse = isApp ? 'touch' :'mouse';
		
		var attr_changedTouches = 'changed'+ucword(attr_mouse)+'es';
		
		var attr_mousedown = attr_mouse+(isApp?'start':'down');
		
		var attr_hover = 'hover';
		
		var attr_mouseenter = isApp ? attr_mousedown : attr_mouse+'enter';
		
		var attr_mouseover = isApp ? attr_mousedown : attr_mouse+'over';
		
		var attr_mouseout = attr_mouse+(isApp?'end '+attr_mouse+'cancel':'out');
		
		var attr_mouseleave = attr_mouse+(isApp?'end '+attr_mouse+'cancel':'leave');
		
		var attr_mouseup = isApp ? attr_mouseout : attr_mouse+'up';
		
		var attr_mousemove = attr_mouse+'move';
		
		var attr_clientX = 'clientX';
		
		var attr_clientY = attr_clientX[attr_replace]('X','Y');
		
		var attr_children = 'children';
		
		var attr_trigger = 'trigger';
		
		var attr_time = 'time';
			
		var attr_delay = 'delay';
		
		var attr_items = 'items';
		
		var attr_click = 'click';
		
		var attr_style = 'style';
		
		var attr_show = 'show';
			
		var attr_hide = 'hide';
		
		var attr_type = 'type';
		
		var attr_stop = 'stop';
		
		var attr_in = 'in';
		
		var attr_out = 'out';
		
		//查找元素并指定选择器，若指定函数名称则通过对象的对应函数进行查找否则直接查找
		//Look for the element and specify the selector, if the specified function name is through object or direct search for the corresponding function
		
		var find = function(myself,callback,selector){
			
			return isString(selector) ? myself[callback](selector) : nick(selector)
			
		};
		
		
		//选项卡及轮播图功能
		//TAB and shuffling diagram function
		
		var tab = function(options,callback){
			
			//参数选项列表及默认值如下
			//The parameter list of options and the default value as follows
			
			/**
			 * options = {
			 * 	
			 *    设置选项卡被选中元素添加的类名，默认值为active
			 *    Set the TAB to add the class name of the selected element, the default value is active
			 *    active:'active',
			 * 	      根据索引值设置默认被选中的元素，若有元素拥有active所设置的类名则该设置无效
			 * 	  According to the index values to set the default selected elements, if there are elements with the active class name is set by the setting is invalid 	
			 * 	  index:0,
			 *    设置轮播图被选中时的类名，默认值为空
			 *    Set up by the name of the class when they are selected, the default value is empty
			 *    bannerActive:'',
			 *    设置动画切换时动画的持续时间仅对轮播图动画有效
			 *    Set the duration of the animation when switching animation only the wheel information figure animations available
			 *    time:0.7,
			 *    设置定时器切换的时间默认值为2秒
			 *    Set the timer switch time of the default value is 2 seconds
			 *    delay:2,
			 *    设置是否启用自动播放默认值为真
			 * 	  Set whether to enable automatically play the default value is true 	 
			 *    auto:true,
			 *    设置是否启用无缝循环滚动默认值为真
			 *    Set whether to enable seamless circularly the default value is true
			 *    loop:true,
			 *    下一个切换按钮，值可以是选择器或者对应的元素
			 *    A switch button, the values can be selector or the corresponding elements
			 *    next:'',
			 *    上一个切换按钮，值可以是选择器或者对应的元素
			 *    prev:'',
			 *    The value of a switch button, can is a selector or corresponding element
			 *    banner:'',
			 *    选项卡切换的触发事件默认值为单击事件
			 *    TAB to switch the default value for the click event triggering events
			 *    trigger:'click',
			 *    设置轮播图切换的动画样式默认值为show，可选值为hide fadeIn fadeOut left marginLeft top marginTop，若值为left或top则要注意元素需要添加定位才有效
			 *    Switch Settings by figure animation style of the default values for the show, the optional value of hide fadeIn fadeOut left marginLeft top marginTop, if the value is left or top note elements need to add the location is valid
			 *    style:'show'
			 * 
			 * }
			 * 
			 */
			
			var self = this;
			
			var attr_point = '.';
			
			var attr_width = 'width';
			
			var attr_height = 'height';
			
			var attr_offset = 'offset';
			
			var attr_left = 'left';
			
			var attr_top = 'top';
			
			var attr_css = 'css';
			
			var attr_fadeIn = 'fade';
			
			var attr_append = 'append';
			
			var attr_prepend = 'prepend';
			
			var attr_fadeOut = attr_fadeIn+'Out';
			
			var attr_fadeIn = attr_fadeIn+'In';
			
			var attr_animation = 'animation';
			
			var attr_next = 'next';
			
			var attr_prev = 'prev';
			
			var attr_addClass = 'Class';
			
			var attr_removeClass = 'remove'+attr_addClass;
			
			var attr_addClass = 'add'+attr_addClass;
			
			var attr_active = 'active';
			
			var attr_index = 'index';
			
			var attr_auto = 'auto';
			
			var attr_loop = 'loop';
			
			var attr_banner = 'banner';
			
			var attr_bannerActive = attr_banner+ucword(attr_active);
			
			var attr_on = 'on';
			
			var options = cover(array2Object([attr_bannerActive,attr_active,attr_index,attr_auto,attr_loop,attr_delay,attr_trigger,attr_style,attr_time,attr_on,attr_banner,attr_next,attr_prev],[attr_active,attr_active,0,real,real,2,attr_click,attr_show]),options);
			
			var attr_active = ltrim(options[attr_active],'\\.');
			
			var attr_bannerActive = ltrim(options[attr_bannerActive],'\\.');
			
			var attr_auto = options[attr_auto];
			
			var attr_delay = (toNumber(options[attr_delay]) || 1)*1000;
			
			var trigger = options[attr_trigger];
			
			var banner = nick(options[attr_banner]);
			
			var bannerParent = banner[attr_parent]();
			
			var bannerFirst = banner.eq(0);
			
			var next = nick(options[attr_next]);
			
			var prev = nick(options[attr_prev]);
			
			var length = (banner[attr_length] || self[attr_length])-1;
			
			var prevIndex = self[attr_index](nick(attr_active ? self['filter'](attr_point+attr_active)[0] || self[options[attr_index]] : self[options[attr_index]])[attr_addClass](attr_active)) || 0;
			
			var index = prevIndex;
			
			var timer;
			
			var $this;
			
			var $prev;
			
			var $thisBanner;
			
			var $prevBanner;
			
			var callback = isFunction(callback) ? callback : fake;
			
			var fadeAnimation = [[attr_show,attr_hide],[attr_fadeIn,attr_fadeOut]];
			
			var commonAnimation = array2Object([attr_show,attr_hide,attr_fadeIn,attr_fadeOut],[fadeAnimation[0],fadeAnimation[0],fadeAnimation[1],fadeAnimation[1]]);
			
			var commonAnimation = commonAnimation[options[attr_style]] || options[attr_style];
			
			var time = commonAnimation == fadeAnimation[0] ? options[attr_time]  : options[attr_time] || 0.7;
			
			var isX = /left/i[attr_test](commonAnimation);
			
			var attr_client = isX ? attr_clientX : attr_clientY;
			
			var offset = commonAnimation &&  isString(commonAnimation) ? attr_offset+(isX ? ucword(attr_width) : ucword(attr_height)) :empty;
			
			var isLoop = options[attr_loop] && offset;
			
			var size;
			
			var move;
			
			var animationCss = {100:{}};
			
			var attr_WidthHeight = offset[attr_substr](6)[attr_toLowerCase]();
			
			var hundred = 100;
			
			var currentIndex;
			
			var currentLeftTop;
			
			var currentWidthHeight = !bannerFirst[offset] || bannerFirst[offset]();
			
			var tabActiveCallback = function(){
				
				//获取轮播图宽或高
				//Get round figure width or height
					
				currentWidthHeight = !bannerFirst[offset] || bannerFirst[offset]();
				
				//先停止轮播图动画队列
				//Stop first round figure animation queue
					
				if(offset)bannerParent[attr_stop]();
				
				//如果启用循环
				//If you enable cycle
				
				if(isLoop){
					
					
					//如果索引值大于轮播图数量（不包含克隆的节点）则瞬间将定位设置为第一张图的位置，索引值为第二张图
					//If the index value is greater than the shuffling figure number (does not contain the clone node) is instantly set position to the position of the first picture, the index value of the second picture
					
					if(index>length){
						
				   		bannerParent[attr_css](commonAnimation,-currentWidthHeight);
				   		
						index = 2;
						
					}else if (index<1){
					
					//如果索引值为0则显示的是最后一张图因此瞬间将位置设置为最后一张图的位置，索引值为最后一张图
					//If the index value of 0 indicates is the last one picture so instantly set position to the position of the last picture, the index value of the last picture
						
						bannerParent[attr_css](commonAnimation,-length*currentWidthHeight);
						
						index = length-1;
						
					}
					
					
				}else{
					//不启用无缝循环时索引若大于长度则返回0的位置，若小于0则返回到最后一张的位置
					//Do not enable a seamless loop if index is greater than the length it returns 0 position, if less than 0 is returned to the last position
					
					index = index>length ? 0 :index<0?length:index;
					
				}

				
				//若启用循环则索引+1否则+0
				//If enabled circulation index + 1 + 0 otherwise
				
				size = isLoop ? 1:0;
				
				//根据索引值获取上一个元素与当前被选中的元素
				//According to the index value for an element with the currently selected element
				
				$prev = self.eq(self[prevIndex-size] ? prevIndex-size : 0);
				
				$this = self.eq(self[index-size] ? index-size :0 );
				
				$thisBanner = banner.eq(index);
				
				$prevBanner = banner.eq(prevIndex);
				
				//根据索引值计算当前要滚动的距离
				//According to the index values to calculate the distance the current to scroll
				
				size = offset ? -bannerFirst[offset]() * index :0;
				
				//设置动画样式
				//Set the animation style
				
				animationCss[hundred][commonAnimation]=size;
				
				//当终止动画时会保存上一个动画执行的值可能是残缺的值 因此 本次动画可能因此受影响
				//结束队列的时候 是否要清除原先执行过的样式呢？
				//如果队列终止清除掉动画及则回到未执行前的样式
				//如果动画是正常完成则可以保存 如果是终止则直接清理 掉它的影响
				
				//若启用滚动则执行滚动动画
				//If you enable execute scrolling animation
				
				!offset ||  bannerParent[attr_animation](animationCss,time);
				
				//若指定的动画方法存在则直接调用动画
				//If the specified animation methods direct call animation
				
				!$thisBanner[commonAnimation[0]] || $prevBanner[attr_stop]()[commonAnimation[1]](time) && $thisBanner[attr_stop]()[commonAnimation[0]](time);
				
				//若指定active类名则上一个元素清除类名当前元素添加类名
				//If you specify the active class name is an element to clear the name of the class on the current element to add the name of the class
				
				!attr_active || $prev[attr_removeClass](attr_active) && $this[attr_addClass](attr_active);
				
				//若指定轮播图的active类名则上一个元素删除类名当前元素添加类名
				//If specified by drawing on the active class name is an element to delete the class name of the current element to add the name of the class
				
				!attr_bannerActive || $prevBanner[attr_removeClass](attr_bannerActive) && $thisBanner[attr_addClass](attr_bannerActive);
				
				//若指定回调函数则执行回调函数并将this指向当前元素，并传入当前元素、下一个元素、当前索引、上一个索引及轮播图对象
				//If the specified callback function is executed the callback function and will this point to the current element, and introduced to the current element, the next element, the current index, an index and shuffling diagram on the object
				
				!callback || callback[attr_call](self,$this,$prev,index,prevIndex,banner);
				
				//将当前索引设置为上一个索引
				//Sets the current index to an index
				
				prevIndex=index;
				
			};
			
			var play = function(dir){
				
				index+=dir===real?-1: 1;
				
				//执行选项卡切换回调函数
				//Perform TAB to switch the callback function
				
				tabActiveCallback();
				
				
			};
			
			//鼠标移入轮播图父级时终止定时器
			//The mouse moved to shuffling figure parent terminated when the timer
			
			var overPause = function(){
				
				clearInterval(timer)
				
			};
			
			//鼠标离开轮播图父级时重新开启定时器
			//The mouse left shuffling figure parent reopened when the timer
			
			var outPlay = function(){
				
				if(attr_auto)timer = setInterval(play,attr_delay)
				
			};
			
			//如果启用滚动切换则自动设置轮播图父级宽及子级宽以保证平均分布展示
			//If you enable the scroll switch is automatically set the figure the parent and child wide width in place to ensure that the average distribution
			
			if(offset){
				
				//如果启用无缝循环将自动克隆首尾节点插入到轮播图列表中以解决使用拖动切换时两侧空白的问题
				//If you enable seamless loop will automatically fore and aft clone node is inserted into the round figure in the list to solve the problem of using drag switch on both sides of the blank
				
				//若启用循环则长度加3，否则加1，因启用循环将添加两个克隆节点，加1因为长度已经减过1
				//If enabled cycle length plus 3, or 1, due to enable loop will add two clone node, add 1 because the length has been minus 1
				
				length+=isLoop ? 3 :1 ;
				
				//如果启用循环则克隆最后一个节点插入到头部，克隆第一个节点插入到尾部否则不克隆节点，设置父级的样式为节点长度*百分之百
				//If you enable cycle is the last one clone node is inserted into the head, cloned the first node is inserted into the tail or not clone node, set the style of the parent for the node length * one hundred percent
				
				bannerParent[attr_append](isLoop ? banner[0] : undefined)[attr_prepend](isLoop ? banner[length-3] :undefined)[attr_css](attr_WidthHeight,length*hundred+'%')[attr_css](commonAnimation,isLoop? -currentWidthHeight :0);
				
				//设置轮播图宽或高为平均的百分比
				//Set the figure the width or the height of the average percentage
				
				bannerParent[attr_children]()[attr_css](attr_WidthHeight,1/length*hundred+'%');
				
				//索引值由0开始因此长度-1
				//The index value by 0 so length - 1
				
				length--;
				
				//无缝滚动起始索引值为1因为0的位置显示的是最后一张
				//Seamless rolling start index value of 1 for zero position display is the last one
				
				index = isLoop ?  1 : index;
				
			}
			
			//执行选项卡切换回调函数，进行初始切换
			//Perform TAB to switch the callback function, to switch from the original
			
			tabActiveCallback(index,prevIndex);
			
			//为当前元素添加事件，事件触发时更新索引值为当前元素的索引值，并调用选项卡切换回调函数
			//For the current element to add events, event triggered when update the index value of index values of the current element, and call the TAB to switch the callback function
			
			self[attr_addEventListener](trigger,function(){
				
				//如果为循环滚动索引值再加1否则加0
				//If the loop rolling index value plus 1 or 0
				
				tabActiveCallback(index = self[attr_index](this)+(isLoop ?1:0));
				
			});
			
			//如果启用自动播放则开启定时器并为当前元素父级及轮播图父级添加移入停止定时器移出开启定时器事件
			//If you enable automatically play the open timer and to the current element parent and shuffling figure parent add remove open to stop the timer timer events
			
			if(attr_auto){
				
				outPlay();
				
				self[attr_parent]()[attr_hover](overPause,outPlay);
				
				banner[attr_parent]()[attr_hover](overPause,outPlay);
				
			}
			
			//为左右切换按钮添加事件进行索引加或减
			//About to switch the button add event to index plus or minus
			
			next[attr_hover](overPause,outPlay)[attr_click](play);
			
			prev[attr_hover](overPause,outPlay)[attr_click](function(){
				
				play(real);
				
			});
			
			//如果启用循环且为滚动则绑定拖动事件
			//If you enable cycle and a scroll binding a drag event
			
			if(isLoop){
				
				//为轮播图父级添加按下事件
				//For them by figure parent add press event
				
				bannerParent[attr_addEventListener](attr_mousedown,function(e){
					
					e = e[attr_changedTouches] ? e[attr_changedTouches][0] : e;
					
					//获取轮播图宽或高
					//Get round figure width or height
					
					currentWidthHeight = bannerFirst[offset]();
					
					//获取当前轮播图样式中的left或top值
					//Gets the current round of seeding in figure style left or top value
					
					currentLeftTop = toNumber(bannerParent[attr_css](commonAnimation));
					
					//根据当前的left或top值除以轮播图宽或高计算出当前位置所对应的索引值
					//According to the current left or top values divided by the shuffling figure width or height to calculate the index values of the current location
					
					move = currentLeftTop/bannerFirst[offset]()+empty;
					
					//计算出当前位置对应的索引值进行四舍五入
					//Calculate the current position corresponds to the index values are rounded
					
					currentIndex = round(abs(move));
					
					//根据当前位置计算出的索引值取小数部分然后根据小数部分计算出上一张或下一张图已经出现的宽或高
					//Index calculated according to the current position of the decimal part, and then according to the decimal part calculates the one or the one has appeared the width or height
					
					move = move[attr_replace](/.*?\.(\d+)/,'0.$1')-0; 
					
					move = -abs((move<-1?-1:move)*currentWidthHeight);
					
					//如果当前计算出的索引值为0或索引值大于等于轮播图节点长度瞬间改变轮播图的位置，若为0切换到最后一张图的位置，若大于节点长度切换到第一张图的位置，并且要加上已经显示出的宽或高
					//If the current to calculate the index values of 0 or index values greater than or equal to instantly change shuffling shuffling diagram node length figure, if zero switching to the position of the last picture, if the location of the switch to the first figure is greater than the node length, and to add has shown the width or height
					
					if(!currentIndex || currentIndex>=length) bannerParent[attr_css](commonAnimation,(!index ? -abs((length-1)*currentWidthHeight) : 0)+move)
					
					//获取当前轮播图移动的left或top值
					//Gets the current round of figure moving left or top value
					
					move = toNumber(bannerParent[attr_css](commonAnimation));
					
					
				}).slip(function(e,x,y){
					
					//拖动时设置元素的位置为x移动的值加轮播图已经移动的left或top值
					//Sets the position of the element when dragging for x mobile value added by figure has been moving left or top value
					
					bannerParent[attr_css](commonAnimation,(isX?x:y)+move)
					
				})[attr_addEventListener](attr_mouseup+' '+attr_mouseleave,function(e){
					
					//当鼠标抬起或鼠标离开根据已经移动的位置计算当前元素的索引值，四舍五入
					//When the lift or the mouse left according to the index value of the current element has the position of the mobile computing, rounded
					
					index =abs( round(toNumber(bannerParent[attr_css](commonAnimation))/bannerFirst[offset]()));
					
					//执行选项卡切换回调函数
					//Perform TAB to switch the callback function
					
					 tabActiveCallback()
					 
				})
			}
			
			
		};
		
		//绑定下拉菜单方法
		//Binding a drop-down menu
		
		var menu = function(options){
			
			//参数选项列表及默认值如下
			//The parameter list of options and the default value as follows
			
			/**
			 * options = {
			 * 	
			 *    设置选项卡被选中元素添加的类名，默认值为active
			 *    Set the TAB to add the class name of the selected element, the default value is active
			 *    active:'active',
			 * 	      根据索引值设置默认被选中的元素，若有元素拥有active所设置的类名则该设置无效
			 * 	  According to the index values to set the default selected elements, if there are elements with the active class name is set by the setting is invalid 	
			 * 	  index:0,
			 *    设置轮播图被选中时的类名，默认值为空
			 *    Set up by the name of the class when they are selected, the default value is empty
			 *    bannerActive:'',
			 *    设置动画切换时动画的持续时间仅对轮播图动画有效
			 *    Set the duration of the animation when switching animation only the wheel information figure animations available
			 *    time:0.7,
			 *    设置定时器切换的时间默认值为2秒
			 *    Set the timer switch time of the default value is 2 seconds
			 *    delay:2,
			 *    设置是否启用自动播放默认值为真
			 * 	  Set whether to enable automatically play the default value is true 	 
			 *    auto:true,
			 *    设置是否启用无缝循环滚动默认值为真
			 *    Set whether to enable seamless circularly the default value is true
			 *    loop:true,
			 *    下一个切换按钮，值可以是选择器或者对应的元素
			 *    A switch button, the values can be selector or the corresponding elements
			 *    next:'',
			 *    上一个切换按钮，值可以是选择器或者对应的元素
			 *    prev:'',
			 *    The value of a switch button, can is a selector or corresponding element
			 *    banner:'',
			 *    选项卡切换的触发事件默认值为单击事件
			 *    TAB to switch the default value for the click event triggering events
			 *    trigger:'click',
			 *    设置轮播图切换的动画样式默认值为show，可选值为hide fadeIn fadeOut left marginLeft top marginTop，若值为left或top则要注意元素需要添加定位才有效
			 *    Switch Settings by figure animation style of the default values for the show, the optional value of hide fadeIn fadeOut left marginLeft top marginTop, if the value is left or top note elements need to add the location is valid
			 *    style:'show'
			 * 
			 * }
			 * 
			 */
			
			var triggerin = attr_trigger+attr_in;
			
			var triggerout = attr_trigger+attr_out;
			
			var stylein = attr_style+attr_in;
			
			var styleout = attr_style+attr_out;
			
			var options = cover(array2Object([triggerin,triggerout,attr_children,stylein,styleout,attr_children,attr_time],[attr_mouseover,attr_mouseleave,'ul',attr_show,attr_hide]),options);
			
			var self = this;
			
			var target;
			
			var $this;
			
			var children = options[attr_children];
			
			var itmes;
			
			var animation;
			
			var attr_triggerin = options[triggerin];
			
			var attr_triggerout = options[triggerout];
			
			console.log(options)
			
			/**
			 * 指定显示与隐藏的触发事件类型
			 * 指定菜单的层级 允许查找多少层 默认无限级
			 * 指定显示与隐藏要使用的方法名或回调函数
			 * 修改方法名并不限于无限级菜单，而是通过触发事件进行切换
			 * 左滑显示  右滑隐藏
			 * 移入显示  移出隐藏。。。
			 * triggerin
			 * triggerout
			 * stylein
			 * styleout
			 * depth true
			 * children 
			 */
			
			
			//循环查找元素
			//Loop through elements
			
			var find = function(e){
				
				//兼容获取可操作的事件对象
				//Compatible with access to actionable event object
				
				e = e[attr_changedTouches] ? e[attr_changedTouches][0] : e;
				
				//获取当前元素
				//Get Current Placeable
				
				$this = this;
				
				//根据事件对象获取目标元素
				//According to the event object for the target element
				
				target = e.target;
				
				//根据目标元素循环向上查找 元素，当找到的元素为当前元素或未找到时则循环终止
				//Cycle up to find elements according to the target element, when the elements found for the current element loop terminates or not found
				
				while(target && target!=$this){
					
					//根据事件类开判断是否执行显示或隐藏
					//According to the event classes open judgment whether to show or hide
					
					animation = /out|leave/[attr_test](e[attr_type]) ? stylein : styleout;
					
					//获取当前元素的子级元素并根据items中定义的选择器进行匹配
					//Level access to the current element's child elements according to the items that are defined in the selector matches
					
					items = nick(target)[attr_children](items);
					
					//
					
					items[animation] ? items[attr_stop]()[animation]() : isFunction(animation) ? animation[attr_call](target,children) :empty;
					
					//逐级向上获取父级元素
					//Step by step up from the parent element
					
					target = target[attr_parentNode];
					
				}
				
				
			};
			
			console.log(attr_triggerout);
			
			//绑定移入移出事件且均执行查找函数
			//Binding to remove events and performs the lookup function
			
			return self[attr_triggerin](find)[attr_triggerout](find);
			
			
		};
		
		
		fn[attr_extend]({
			
			tab:tab,
			
			menu:menu
			
		})
		
	})();
	
})(nick)
