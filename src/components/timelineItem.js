/**
 * Created by knowthis on 2017/2/9.
 * auther website:http://zhouxianbao.cn
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import Common from '../common/common';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.tools = new Common();
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
        if(type === 'time'){
            str = dateStr;
        }else{
            str = timeStr;
        }
        return str;
    }

    render( ) {
        if(this.state.type === 'thing') {
            return (
                <div className="time clearfix">
                    <div className="time-time">
                        <div className="clock">{this.tools.formatCreate(this.state.data.create,'time')}</div>
                        <div className="date">{this.tools.formatCreate(this.state.data.create,'date')}</div>
                    </div>
                    <div className="time-type">
                        <span className="iconfont">&#xe615;</span>
                    </div>
                    <Link  to={`/detail/${this.state.data.id}`} >
                        <div className="time-content">
                            <div className="title">{this.state.data.title}</div>
                            <div className="content">{this.state.data.content}</div>
                            <div className="address"><i className="iconfont">&#xe615;</i>{this.state.data.address}</div>
                        </div>
                    </Link>
                </div>
            )
        }else if(this.state.type === 'time'){
            return (
                <div className="time clearfix">
                    <div className="time-time">
                        <div className="clock">{this.tools.formatCreate(this.state.data.create,'time')}</div>
                        <div className="date">{this.tools.formatCreate(this.state.data.create,'date')}</div>
                    </div>
                    <div className="time-type">
                        <span className="iconfont">&#xe615;</span>
                    </div>
                    {/*<Link to={{pathname:'/detail',query:{id:this.state.data.id}}}*/}
                    {/*>*/}
                    <Link  to={`/detail/${this.state.data.id}`} >
                        <div className="time-content time-thing" style={{'backgroundImage':'url('+this.state.data.bg+')'}}>
                            <div className="bg" >
                                <div className="title">{this.formatTimeLine(this.state.data.time)}</div>
                                <div className="info">距离{this.formatTimeLine(this.state.data.time,'time')}</div>
                                <div className="intro">{this.state.data.title}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        }
    }
}