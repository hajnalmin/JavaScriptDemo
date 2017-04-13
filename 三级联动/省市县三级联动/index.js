/**
 * Created by zhm on 17/3/14.
 */
/**
 * Created by zhm on 2017/3/14.
 */

(function ($) {

//    创建三个对象分别是控制器，模型，视图
        var model = {

        //获得省数据
        get_province: function () {
            return LocalList;
        },
        //获得城市数据
        get_city: function (id) {
            return LocalList[id].region.state;
        },
        //获取县城数据
        get_county: function (id) {
            return LocalList[index].region.state[id].city;
        }


    };

    var view = {
        // 根据数据及选择器 创建html代码并更新到对应的元素上
        create_options: function (data, selector) {

            //1.遍历生成html代码
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var province = data[i].region ? data[i].region : data[i];
                html += ' <option  value="' + i + '"> ' + province.name + '</option>'
            }
            $(selector).html(html)
        },

        //显示省列表
        show_province: function (data) {
            this.create_options(data, 'select:first');
        },
        //显示城市列表
        show_city: function (data) {
            this.create_options(data, 'select:eq(1)');
        },
        //显示县列表
        show_county: function (data) {
            this.create_options(data, 'select:last');
        }

    };

    var ctrl = {

        //初始化
        init: function () {

            //创建省份列表
            this.C_province();
            this.province_change();
            this.city_change();
        },

        C_province: function () {
            //调用模型方法获得数据
            var data = model.get_province();
            //将数据传递给视图
            view.show_province(data);

        },
        //创建城市列表
        create_city: function () {
            //获取索引值
            var id = $('select:nth-child(1)').val();
            index = id;
            //调用模型根据索引值 获取对应的城市数据

            var data = model.get_city(id);
            //将数据交给视图让其显示
            view.show_city(data);

            //创建县
            ctrl.create_county();

        },
        //创建县
        create_county: function () {
            //获取ID
            var id = $('select:nth-child(2)').val();
            //调用模型根据ID获取对应的车型数据
            var data = model.get_county(id);
            //将数据交给视图让其显示
            view.show_county(data);
        },

        //省份切换事件
        province_change: function () {
            var self = this;
            //省份变化事件
            $('select:nth-child(1)').change(function () {
                self.create_city();
            })
        },

        //城市切换事件
        city_change: function () {
            var self = this;
            //城市变化事件
            $('select:nth-child(2)').change(function () {
                self.create_county();
            })
        }

    };


    ctrl.init();


})(jQuery);