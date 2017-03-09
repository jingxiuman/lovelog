/**
 * Created by knowthis on 2017/2/9.
 * auther website:http://zhouxianbao.cn
 */
import React, {Component} from 'react';
import Header, {Footer, Container} from '../../components/common';
import common from './../../common/common';
import './index.css';

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.tools = common;
        this.state = {
            id: this.props.params.id,
            data: {
                id: 1,
                type: '',
                create: '1486626102',
                title: '第一次使用旧时光',
                time: 1486626102,
                address: '北京路',
                bg: 'http://cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png',
                content: ''
            }
        }
    }
    componentDidMount() {
        let that =this;
        common.getBoxOne({
            id:that.state.id
        }).then(function (res) {
            console.log(res);
            let temp = res[0];
            that.setState({
                data:{
                    id: temp.id,
                    create: '1486626102',
                    title: temp.eventName,
                    time: temp.eventTime,
                    address: temp.address,
                    bg: temp.img,
                    content: temp.eventContent
                }
            })
        })
    }
    render() {
        return <div className="common">
            <Header type="detail" name={this.state.data.title}/>
            <Container>
                <div className="head-img" style={{'backgroundImage': 'url(http://cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png)'}}>
                    <div className="head-info">
                        <div className="main">{this.tools.formatTimeLine(this.state.data.time, 'time')}</div>
                        <div className="other">{this.tools.formatTimeLine(this.state.data.time, 'date')}</div>
                    </div>
                </div>
                <div className="container">
                    <div className="title">{this.state.data.title}</div>
                    <div className="other">
                        <div className="address"><i className="iconfont">&#xe615;</i> {this.state.data.address}</div>
                        <div className="createTime">{this.tools.formatCreate(this.state.data.create, 'all')}</div>
                    </div>
                    <div className="content" dangerouslySetInnerHTML={{__html: this.state.data.content}}>
                    </div>
                </div>
            </Container>

            <Footer/>
        </div>;
    }
}