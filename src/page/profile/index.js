/**
 * Created by knowthis on 2017/2/11.
 * auther website:http://zhouxianbao.cn
 */
import React,{Component} from 'react';
import Header from './../../components/header';
import Footer from './../../components/footer';
import Common from './../../common/common';
import './index.css'
class DoorItem extends Component{
    constructor( props){
        super(props);
        console.log(props);
        this.state = {
            icon:props.icon,
            name:props.name,
            img:props.img
        }
    }

    render(){
        return <div className="doorItem" >
            <div className="doorIcon">
                <i className="iconfont"dangerouslySetInnerHTML={ {__html: this.state.icon}} ></i>
            </div>
            <div className="doorName">{this.state.name}</div>
            {this.state.img !=''?
            <div className="doorSee">
                <img src={this.state.img} alt=""/>
            </div>:''}
        </div>
    }
}
export default class profile extends Component{
    constructor(props){
        super(props);
        this.state ={
            info :{
                pic:'http://cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png',
                name:'xb是个pig？'
            },
            doorList:[{
                icon:'&#xe808;',
                name:'社交圈',
                img:'//cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png'
            },{
                icon:'&#xe601;',
                name:'意见反馈',
                img:''
            }]
        }
    }
    render(){
        return<div className="common">
            <Header type="index" />
            <div className="common-content">
                <div className="profile_img">
                    <img src="http://cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png" alt=""/>
                </div>
                <div className="profile_name">xb是个pig？</div>
                <div className="doorList">
                    {this.state.doorList.map((item,index)=>
                        <DoorItem key={index}
                                  icon={item.icon}
                                  name={item.name}
                                  img={item.img}/>)}
                </div>
            </div>

            <Footer/>
        </div>;

    }
}