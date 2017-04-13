function ajax(options){
    //1、设置默认数据
    function merge(data){
        var defaultOpations = {
            methods:"get",
            url:'',
            async:true,
            data:{},
            cache:false,
            sendBefore:false,
            sendComplete:false,
            success:false,
            error:false
        };

        for(var i in defaultOpations){
            if(typeof data[i] != "undefined"){
                defaultOpations[i] = data[i];
            }
        }
        return defaultOpations;
    }

    options = merge(options);


    //2.实例化ajax
    var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('microsoft.xmlhttp');
    //3.判断是否是get请求
    var isGet =/get/i.test(options.method);
    //4.将json数据转换成字符串格式
    var data = "";
    for(var i in options.data){
        //5.将数据拼成字符串
        data+=i+'='+options.data[i]+'&';
    }

    options.data = data;


    //5.

    if(!isGet){
        if(options.url.indexOf('?')<0){
            options.url +="?"
        }
        options.url+="&"+options.data;

    }

    //6.判断是否启用缓存,如果不启用缓存，添加时间
    if(!options.cache){
        //6.1向URL上补充时间
        options.url+='&___'+new Date().getTime();

    }

    //7. 打url
    xhr.open(options.type,options.url,options.async);

    //7. 如果是get请求 数据应该添加到url地址

    if(!isGet){

        //8.如果是post需要设置请求头
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    }

    //9. 提交数据
    xhr.send(options.data);

    //10. 发送之前 执行回调函数
    if(typeof options.sendBefore == "function")options.sendBefore(xhr);

    //11. 添加监听事件

    xhr.onreadystatechange = function(){
        //12.获取ajax请求状态
        var state = xhr.readyState;
        //13.判断ajax请求是否成功
        if(state == 4){
            //14. 获取http请求状态
            var status = xhr.status;
            //14.1 执行请求完成的回调函数
            if(typeof options.sendComplete == 'function')options.sendComplete(xhr);
            //15. 判断http状态是否成功
            if(status == 200){
                //16.执行请求成功回调函数 并传递服务器的返回值
                if(typeof options.success == 'function')options.success(xhr.responseText,xhr);
            }else{
                //17. 执行失败的回调函数 并传递http状态码
                if(typeof options.error == 'function')options.error(xhr.status,xhr);

            }

        }

    }

}