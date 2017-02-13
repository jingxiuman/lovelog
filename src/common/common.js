/**
 * Created by knowthis on 2017/2/10.
 * auther website:http://zhouxianbao.cn
 */
export default class Common {
    formatCreate(timestamp,type){
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
    }
    formatTimeLine(timestamps,type){
        let str ='',nowTime = new Date().getTime(), interval, year, day, dateStr, timeStr;
        timestamps *= 1000;
        interval = Math.round(Math.abs((timestamps - nowTime) / 86400000));
        year = parseInt(interval / 365);
        day = parseInt(interval % 365);
        let timS = timestamps ;
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
    }
}