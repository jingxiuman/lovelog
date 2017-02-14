/**
 * Created by knowthis on 2017/2/9.
 * auther website:http://zhouxianbao.cn
 */
import React,{Component} from 'react';
import { Link,IndexLink } from 'react-router';
import cs from 'classnames';
export default class Header  extends Component{
    constructor(props){
        super(props);
        this.state = this.props;
       // console.log(browserHistory);
        if(this.props && this.props.type === 'detail'){
            this.backIcon =  <i onClick={this.backFunc} className="iconfont icon-back">&#xe6c2;</i>;
            this.refreshIcon =  <i onClick={this.refreshFunc} className="iconfont icon-refresh">&#xe624;</i>
        }else if(this.props && this.props.type === 'index'){
            this.refreshIcon =  <i onClick={this.refreshFunc} className="iconfont icon-refresh">&#xe624;</i>
        }
    }
    backFunc = () =>{
        window.history.back();
    };
    /**
     * 刷新点击事件
     */
    refreshFunc = () =>{
       window.location.reload(true);


    };
    render(){

        return <div className="common-head">
            {this.backIcon}
            {this.props.name || '旧时光'}
            {this.refreshIcon}

        </div>
    }

}
export class Footer extends Component{
    render(){
        return <div className="common-footer">
            <div className="nav-item clearfix">
                <IndexLink to={`/`}>
                    <div className="iconfont icon">&#xe613;</div>
                    <div className="title">时光机</div>
                </IndexLink>
            </div>
            <div className="nav-item">
                <Link  to="/add" >
                    <div className="iconfont icon">&#xe607;</div>
                    <div className="title">新建</div>
                </Link>
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
export class Container extends Component{
    constructor(props){
        super(props);
        let arr = this.props.classAdd;

        this.state = {
            data :arr
        }
    }
    render(){


        return <div className={cs('common-content',this.state.data)} >
            {this.props.children}
        </div>
    }
}