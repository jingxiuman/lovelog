/**
 * Created by knowthis on 2017/2/9.
 * auther website:http://zhouxianbao.cn
 */
import React,{Component} from 'react';
import { Link,IndexLink } from 'react-router';

export default class Footer extends Component{
    render(){
        return <div className="common-footer">
            <div className="nav-item clearfix">
                <IndexLink to={`/`}>
                    <div className="iconfont icon">&#xe613;</div>
                    <div className="title">时光机</div>
                </IndexLink>
            </div>
            <div className="nav-item">
                <div className="iconfont icon">&#xe607;</div>
                <div className="title">新建</div>
            </div>

            <div className="nav-item">
                <Link to={`/profile`}>
                    <div className="iconfont icon">&#xe66b;</div>
                    <div className="title">我的</div>
                </Link>
            </div>

        </div>
    }
}