/**
 * Created by knowthis on 16/7/2.
 */
define(['template','zepto','qiniu','plupload','common'],
    function (template,$,Qiniu,plupload,common) {
    var main = {
        init:function () {
            common.loadingStart();
            this.render('addBox',{});
            //common.msgShow("你好")
        },
        bindUI:function () {
            var that =this;
            this.uploadImgToQiniu();
            var thingName = $("#incidentName");
            var thingTime = $("#picktime");
            var thingImg = $("#pickfilesInput");
            $("#box_save_btn").on('click',function(){
                console.log($("#incidentName").val());
                common.msgShow("开始保存");
                console.log("名称:"+thingName.val());
                console.log("时间:"+thingTime.val());
                console.log("图片:"+thingImg.val());
                if(thingName.val() !=''  && thingTime.val() !=''){
                    that.submitData(thingName.val(),new Date(thingTime.val()).getTime(),thingImg.val());
                }else{
                    common.msgShow("名称和事件,你都填了么?")
                }

            })

        },
        render:function(id,data){
            var that = this;
            $("#app").html(template(id,data));
            // setTimeout(function () {
            //     $(function () {
            //         $('#picktime').mdatetimer({
            //             mode : 1, //时间选择器模式
            //             format : 2, //时间格式化方式
            //             years : [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050], //年份数组
            //             nowbtn : false //是否显示现在按钮
            //         });
            //     })
            //
            // },800);



            $("#footer").html(template('template_footer',{type:'add'}));

            common.loadingEnd();
            that.bindUI();
        },
        uploadImgToQiniu:function () {
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                browse_button: 'pickfiles',         // 上传选择的点选按钮，必需
                uptoken_url: common.tokenUrl,         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                domain: 'lovelog',     // bucket域名，下载资源时用到，必需
                container: 'addContent',             // 上传区域DOM ID，默认是browser_button的父元素
                max_file_size: '4mb',             // 最大文件体积限制
                flash_swf_url: '../assets/lib/plupload/js/Moxie.swf',  //引入flash，相对路径
                max_retries: 3,                     // 上传失败最大重试次数
                dragdrop: true,                     // 开启可拖曳上传
                drop_element: 'addContent',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    'FilesAdded': function(up, files) {
                        var windowURL = window.URL ||window.webkitURL;
                        plupload.each(files, function(file) {
                            var dataUrl =  windowURL.createObjectURL(file.getNative());
                            $("#addbox_img").css("background-image","url("+dataUrl+")");
                        });
                        common.loadingStart();
                    },
                    'UploadProgress': function(up, file) {
                        // 每个文件上传时，处理相关的事情
                    },
                    'FileUploaded': function(up, file, info) {
                        common.loadingEnd();
                        console.log(info);
                        var infoObj = JSON.parse(info);

                         var sourceLink = common.host.imgUrl + infoObj.key;
                        $("#pickfilesInput").val(sourceLink);
                        $("#addbox_img").css("background-image","url("+sourceLink+")");

                    },
                    'Error': function(up, err, errTip) {
                        common.msgShow(errTip)
                    }
                }
            });
        }
        
    };
    main.submitData = function (thingName,time,img) {
        var that =this;
        if(common.checkIsLogin()) {
            common.createBox({
                eventTime: time/1000,
                eventName: thingName,
                eventImg: img,
            },{
                func:function () {
                    common.msgShow("保存成功");
                   common.gotoPage('index.html',{page:'index'})
                },
                context:that
            });
        }else{
            common.msgShowDelay("请先登录",2000);
            common.gotoPage('index.html',{page:'index'})
        }
    };
    return main
});