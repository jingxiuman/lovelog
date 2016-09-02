/**
 * Created by knowthis on 16/9/1.
 */
define(['common'],function (common) {
    var modules={
        loginFunc:function (response) {
            common.setLocal({
                key:'info',
                value:response.info
            });
            common.setLocal({
                key:'token',
                value:response.token
            });
            common.gotoPage('index.html',{page:'index'})
        },
        bindUI:function () {
            var self =this;
            $("#register").on('click',function () {
                var username = $('#username').val();
                var password = $('#password').val();
                // common.register({
                //     username: username,
                //     password: password
                // }, {
                //     func: self.loginFunc,
                //     context: self
                // });
                if(username.trim() != '' && password.trim() != '') {
                    common.register({
                        username: username,
                        password: password
                    }, {
                        func: self.loginFunc,
                        context: self
                    })
                }else{
                    common.msgShowDelay('用户和密码不能为空',3)
                }

            })

        },
        renderUI:function () {
            var self =this;
            common.renderUI('app','template_login',{type:'login'});
            self.bindUI();
        }
    };
    modules.init = function () {
        var self =this;
        self.renderUI();
    };
    return modules;

});