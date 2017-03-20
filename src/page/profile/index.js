/**
 * Created by knowthis on 2017/2/11.
 * auther website:http://zhouxianbao.cn
 */
import React, {Component} from 'react';
import Header, {Footer, Container,LoadingFunc} from '../../components/common';
import {Link} from 'react-router';
import common from './../../common/common';
import './index.css'
class DoorItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: props.icon,
            name: props.name,
            url: props.url,
            img: props.img
        }
    }

    render() {
        return <div className="doorItem">
            <Link to={this.state.url}>
                <div className="doorIcon">
                    <i className="iconfont" dangerouslySetInnerHTML={ {__html: this.state.icon}}></i>
                </div>
                <div className="doorName">{this.state.name}</div>
                {this.state.img !== '' ?
                    <div className="doorSee">
                        <img src={this.state.img} alt=""/>
                    </div> : ''}
            </Link>
        </div>
    }
}
export default class profile extends Component {
    constructor(props) {
        common.checkLogin();
        super(props);
        this.state = {
            info: {
                pic: '',
                name: 'xb是个pig？'
            },
            doorList: [
                //     {
                //     icon:'&#xe808;',
                //     url:'',
                //     name:'社交圈',
                //     img:'//cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png'
                // },
                {
                    icon: '&#xe601;',
                    url: '/feedback',
                    name: '意见反馈',
                    img: ''
                }]
        }
    }

    componentDidMount() {
        let that = this;
        common.getUserInfo({}).then(function (res) {
            let pic;
            if(common.checkImgByOld(res.userPic)){
                pic = res.userPic
            }else if(res.userPic){
                pic = common.imgUrl() + res.userPic;
            }else{
                pic = 'http://cdn.xbpig.cn/common/icon-512.png'
            }
            that.setState({
                info: {
                    pic: pic+ '?imageView2/2/w/128/h/128',
                    name: res.username
                }
            })
        })
    }

    changePic = (e) => {
        let that = this;
        let loadTag = new LoadingFunc();
        let file_obj = e.target.files[0];
        console.log(file_obj);
        if(file_obj) {
            common.updatePic(file_obj).then(function (res) {
                console.log(res);
                that.setState({info:{pic:common.imgUrl()+res}});

            });
        }
        loadTag.close();
    };

    render() {
        return <div className="common">
            <Header type="index"/>
            <Container>
                <div className="profile_img">
                    <img src={this.state.info.pic} alt=""/>
                    <input type="file" className="changePic" onChange={this.changePic}/>
                </div>
                <div className="profile_name">{ this.state.info.name}</div>
                <div className="doorList">
                    {this.state.doorList.map((item, index) =>
                        <DoorItem key={index}
                                  url={item.url}
                                  icon={item.icon}
                                  name={item.name}
                                  img={item.img}/>)}
                </div>
            </Container>

            <Footer/>
        </div>;

    }
}