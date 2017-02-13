/**
 * Created by knowthis on 2017/2/9.
 * auther website:http://zhouxianbao.cn
 */
import React,{Component} from 'react';
import {browserHistory} from'react-router';
export default class Header  extends Component{
    constructor(props){
        super(props);
        this.state = this.props;
       // console.log(browserHistory);
        if(this.props && this.props.type == 'detail'){
            this.backIcon =  <i onClick={this.backFunc} className="iconfont icon-back">&#xe6c2;</i>;
            this.refreshIcon =  <i onClick={this.refreshFunc} className="iconfont icon-refresh">&#xe624;</i>
        }else if(this.props && this.props.type == 'index'){
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