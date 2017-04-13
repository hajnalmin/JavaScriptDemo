/**
 * Created by zhm on 17.1.16.
 */
/*
    1.问题：
        offsetWidth不包括外边距，所以如果没有img包裹层的情况下，设置时要单独加上margin值
        刚开始加载图片，个数不正确，解决办法：使用window.onload()函数加载数据


     2.步骤：
        （1）获取元素，读取第一行个数，通过视口宽度和元素宽度
        （2）定义数组，存放第一行元素的高度
        （3）排第二行元素，找到数组中高度最小的那个元素的下标，读取他的offsetTop和offsetLeft
        （4）
* */

window.onload = function(){
    //1.获取元素
    var wrap = document.getElementsByClassName("wrap").item(0);
    var myin = document.getElementsByClassName("in");
    //获取第一行元素个数
    var num = Math.floor(document.documentElement.clientWidth/myin[0].offsetWidth);
    //获取wrap的宽度，让其达到居中的效果
    wrap.style.width = num*myin[0].offsetWidth+'px';

    //2.定义一个数组存放第一行元素的高度
    var arrHeight = [];
    for(var i = 0;i<myin.length;i++){
        //如果i<第一行元素个数,把第一行元素的高度放入数组
        if(i<num){
            arrHeight.push(myin[i].offsetHeight);
        }else{//操作第一行元素以外的元素

            //设置定位
            myin[i].style.position = "absolute";
            //获取最小高度
            var minHeight = Math.min.apply(null,arrHeight);
            //设置第num+1个元素的top值为最小高度
            myin[i].style.top = minHeight+'px';
            //找到当前最小高度对应的下标值，
            var index = arrHeight.indexOf(minHeight);
            //当前元素的left和当前最小高度对应的下标值的元素的left相等
            myin[i].style.left = myin[index].offsetLeft+'px';
            //排上第i个元素之后，更新数组中index对应的那个最小值
            arrHeight[index]+=myin[i].offsetHeight;

        }
    }







};
