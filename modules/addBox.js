/**
 * Created by knowthis on 16/7/2.
 */
define(['router','template','bmob','zepto'],function (router,template,Bmob,$) {
    var main = {
        init:function () {
            this.render('addBox',{})
        },
        bindUI:function () {
            
        },
        render:function(id,data){
            var that = this;
            $("#app").html(template(id,data));
            setTimeout(function () {
                $(function () {
                    $('#picktime').mdatetimer({
                        mode : 1, //时间选择器模式
                        format : 2, //时间格式化方式
                        years : [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050], //年份数组
                        nowbtn : false //是否显示现在按钮
                    });
                })
                
            },800);

            this.bindUI();

            $("#footer").html(template('template_footer',{type:'add'}))
        }
        
    };
    main.submitData = function () {
      console.log(" 保存成功")  
    };
    return main
});