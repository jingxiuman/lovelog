/**
 * Created by knowthis on 2017/2/9.
 * auther website:http://zhouxianbao.cn
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import common from '../common/common';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.tools = common;
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
                                <div className="title">{this.tools.formatTimeLine(this.state.data.time,'time')}</div>
                                <div className="info">距离{this.tools.formatTimeLine(this.state.data.time,'date')}</div>
                                <div className="intro">{this.state.data.title}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        }
    }
}