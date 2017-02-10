/**
 * Created by knowthis on 2017/2/10.
 * auther website:http://zhouxianbao.cn
 */
export default class Common {
    formatCreate(timestamp,type){
        let time = new Date(timestamp*1000),str;
        if(type === 'time'){
            str = time.getHours()+':'+time.getMinutes();
        }else if(type === 'date'){
            str = time.getFullYear() +'/'+(time.getMonth()+1)+'/'+time.getDay();
            // str = time.getDate();
        }

        return str;
    }
}