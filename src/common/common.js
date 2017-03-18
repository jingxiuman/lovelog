/**
 * Created by knowthis on 2017/2/10.
 * auther website:http://zhouxianbao.cn
 */
import axios from 'axios';
import toast from './../components/toast';
import _ from 'underscore';
let common;
let that;
export default  common  = {
    debug:true,
    tools:_,
    init:function () {
        that = this;
    },
    apiUrl:function () {
      if(this.debug){
          return '//apit.xbpig.cn/'
      }else{
          return '//api.xbpig.cn/'
      }
    },
    imgUrl:function () {
        if(this.debug){
            return 'http://ohhuk1c8m.bkt.clouddn.com/'
        }else{
            return 'http://cdn.xbpig.cn/'
        }
    },
    msgShow:function (msg) {
        toast(msg,2000)

    },
    formatCreate : function(timestamp,type){
        let time = new Date(timestamp*1000),str;
        if(type === 'time'){
            str =  time.getHours()+':'+time.getMinutes();
        }else if(type === 'date'){
            str = time.getFullYear() +'/'+(time.getMonth()+1)+'/'+time.getDay();
            // str = time.getDate();
        }else if(type === 'all'){
            str = time.getFullYear() +'/'+(time.getMonth()+1)+'/'+time.getDay() +' '+ time.getHours()+':'+time.getMinutes();

        }
        return str;
    },
    formatTimeLine:function(timestamps,type){
        let str ='',nowTime = new Date().getTime(), interval, year, day, dateStr, timeStr;
        timestamps *= 1000;
        interval = Math.round(Math.abs((timestamps - nowTime) / 86400000));
        year = parseInt(interval / 365);
        day = parseInt(interval % 365);
        let timS = timestamps;
        let date = new Date(timS),
            date_year = date.getFullYear(),
            date_month = date.getMonth() + 1;
        dateStr = '距离' + date_year + '年' + date_month + '月' + date.getDate() + '日';
        if (year > 0) {
            timeStr = year + '年' + day + '天';
        } else {
            timeStr = day + '天';
        }
        if(type === 'date'){
            str = dateStr;
        }else if(type === 'time'){
            str = timeStr;
        }
        return str;
    },
    checkLogin:function () {
        if(that.getLocalStorage('info') != '' && that.getLocalStorage('token') != ''){
            return true;
        }else{
            return false;
        }
    },
    /**
     * 设置localStorage数据
     * 格式
     * {key:'',value:''}
     *
     * @param data
     */
    setLocalStorage: function(data) {
        if(typeof(data.value) == 'object') {
            window.localStorage.setItem(data.key, JSON.stringify(data.value));
        } else if(typeof(data.value) == 'string') {
            window.localStorage.setItem(data.key, data.value);
        }
    },
    /**
     * 设置localStorage数据
     * @param key
     * @returns {string}
     */
    getLocalStorage: function(key) {
        let val = window.localStorage.getItem(key) || "";
        if(val.search(/:/i) > 0) {
            val = JSON.parse(val);
        }
        return val;
    },
    getImgByOld:function (img) {
        let imgArr = [];
        let reg_img = /^http:\/\/.+\/(.+)$/gi;
        let result;
        while((result = reg_img.exec(img)) !== null){
            imgArr.push(result[1])
        }
        return imgArr;
    },
    checkImgByOld:function (img) {
        let reg_img = /^http:\/\/.+\/(.+)$/gi;
        if(reg_img.test(img)){
            return true;
        }else{
            return false;
        }
    },
    commonAjax:function (url,data,type) {
        let publicData = {
            info: that.getLocalStorage('info') || '',
            token: that.getLocalStorage('token') || ''
        };
        axios.defaults.withCredentials = true;
        if(type == 'address') {
            return axios.get(url,{params:data}).catch(function (error) {
                console.log(error)
            })

        }else if(type == 'file'){
           let formdata = new FormData();
           formdata.append('info',publicData.info);
           formdata.append('token',publicData.token);
           formdata.append('img',data);
            return axios.post(this.apiUrl() + url, formdata).then(function (res) {
                if (res.data.code == 0) {
                    return res.data.data;
                } else {
                    // Message.toast(res.data.msg);
                    that.msgShow(res.data.msg);
                    //return res;
                }
            }).catch(function (error) {
                console.log(error)
            })
        }else{
            let allData = {};
            that.tools.extend(allData, data, publicData);
            return axios.post(this.apiUrl() + url, allData).then(function (res) {
                if (res.data.code == 0) {
                    return res.data.data;
                } else {
                    // Message.toast(res.data.msg);
                    that.msgShow(res.data.msg);
                    //return res;
                }
            }).catch(function (error) {
                console.log(error)
            })
        }
    },
    userLogin:function (data) {
        return this.commonAjax('api2/user/login',data)
    },
    getOwn:function (data) {
        return this.commonAjax('api2/box/own',data)
    },
    getBoxOne:function (data) {
        return this.commonAjax('api2/box/one',data)
    },
    getUserInfo:function (data) {
        return this.commonAjax('api2/user/detail',data)
    },
    getUpdateInfo:function (data) {
        return this.commonAjax('api2/system/update/list',data)
    },
    addAdvance:function (data) {
        return this.commonAjax('api2/advice/add',data)
    },
    getAddress:function (data) {
        return this.commonAjax('//api.map.baidu.com/geocoder/v2/',data,'address')
    },
    addPic:function (data) {
        return this.commonAjax('api2/pic/add',data,'file')
    },
    addBox:function (data) {
        return this.commonAjax('api2/box/add',data)
    },
    updatePic:function (data) {
        return this.commonAjax('api2/user/update',data,'file')
    }


};
common.init();