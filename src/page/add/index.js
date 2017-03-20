/**
 * Created by knowthis on 2017/2/13.
 * auther website:http://zhouxianbao.cn
 */
import React, {Component} from 'react';
import Header, {Footer, Container,LoadingFunc} from '../../components/common';
import DatePicker from 'react-mobile-datepicker';
import { browserHistory } from 'react-router';
import common from './../../common/common';
import moment from 'moment';
import './index.css';

moment.locale('zh-cn');

export default class AddBox extends Component {
    constructor(props) {
        super(props);
        common.checkLogin();
        let that = this;
        let timeStr = moment().format('YYYY-MM-DD');
        this.state = {
            time: new Date(),
            timeStr: timeStr,
            showSelect: true,
            isOpen: false,
            address: '',
            eventName: '',
            type: 0,
            eventContent: '',
            imgList: []
        };

        if ("geolocation" in navigator) {
            console.log('yu', navigator.geolocation);
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position);
                common.getAddress({
                    location: position.coords.latitude + "," + position.coords.longitude,
                    output: "json",
                    pois: 1,
                    ak: "uP5lhQRSjdMpOpK4nd4EGh32XvZzXjjI"
                }).then(function (res) {
                    if(res) {
                        that.setState({address: res.data.result.formatted_address})
                    }
                })
            });
        } else {
            /* 地理位置服务不可用 */
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        //this.changeType = this.changeType.bind(this);
        //this.addPic = this.addPic.bind(this);
    }

    handleClick = () => {
        this.setState({isOpen: true});
    };
    handleCancel = () => {
        this.setState({isOpen: false});
    };
    handleSelect = (time) => {
        let timeStr = moment(time).format('YYYY-MM-DD');
        this.setState({time: time, isOpen: false, timeStr: timeStr});
        console.log(this.state);
    };
    changeType = (e) => {
        let current = e.target.value;
        console.log(e.target.value);
        if (current == 0) {
            let timeStr = moment().format('YYYY-MM-DD');
            this.setState({
                time: new Date(),
                isOpen: false,
                showSelect: true,
                timeStr: timeStr,
                type: 0
            })
        } else if (current == 1) {
            let timeStr = moment().format('YYYY-MM-DD H:m:s');
            this.setState({
                time: new Date(),
                showSelect: false,
                timeStr: timeStr,
                type: 1
            })
        }
    };
    addPic = (e) => {
        let that = this;
        let loadTag = new LoadingFunc();
        let file_obj = e.target.files[0], arr = this.state.imgList;
        if(file_obj) {
            if (arr.length <= 9) {
                common.addPic(file_obj).then(function (res) {
                    console.log(res);
                    arr.push(res);
                    that.setState({imgList: arr});
                    loadTag.close();
                });
            } else {
                common.msgShow("最多上传9张")
            }
        }

    };
    changeName = (e) => {
        this.setState({eventName: e.target.value})
    };
    changeContent = (e) => {
        this.setState({eventContent: e.target.value})
    };
    submitForm = (e) => {
        let data = this.state;
        let loadTag = new LoadingFunc();
        common.addBox({
            eventName: data.eventName,
            eventTime: Math.floor(data.time.getTime()/1000),
            eventImg: data.imgList.join('-'),
            eventContent: data.eventContent,
            eventType: data.type,
            eventAddress: data.address
        }).then(function (res) {
            console.log(res);
            loadTag.close();
            if(res.length == 0) {
                browserHistory.push('/')
            }
        })
    };

    render() {
        return <div className="common">
            <Header type="index"/>
            <Container classAdd={{'add-container': true}}>
                <div className="input-group">
                    <label htmlFor="">事件标题</label>
                    <input type="text" className="input-control" value={this.state.eventName} onChange={this.changeName}/>
                </div>
                <div className="input-group">
                    <label htmlFor="">事件时间</label>
                    {this.state.showSelect == true ? <div className="btn-time" onClick={this.handleClick}>点击选择</div> : ''}


                    <div className="time-value">{this.state.timeStr}</div>
                    <DatePicker value={this.state.time}
                                isOpen={this.state.isOpen}
                                onSelect={this.handleSelect}
                                onCancel={this.handleCancel}/>
                </div>
                <div className="input-group">
                    <label htmlFor="">事件类型</label>
                    <select name="" id="" className="input-control" value={this.state.type} onChange={this.changeType}>
                        <option value="0">纪念日</option>
                        <option value="1">日记</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="">事件内容</label>
                    <textarea name="" id="" onChange={this.changeContent} value={this.state.eventContent} rows="5" className="textarea-control">

                    </textarea>
                </div>
                <div className="input-group">
                    <label htmlFor="">当前坐标</label>
                    <div className="address"><i className="iconfont">&#xe615;</i>{this.state.address}</div>
                </div>
                <div className="imgList">
                    {this.state.imgList.map((item, index) => <div key={index} className="item">
                        <img src={common.imgUrl() +item+'?imageView2/2/w/100/h/100'} alt=""/>
                    </div>)}

                    <div className="item item-add">
                        <label htmlFor="file_input"><i className="iconfont">&#xe69a;</i></label>
                        <input type="file" multiple={false} id="file_input" onChange={this.addPic} className="input-file"/>

                    </div>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn-submit " onClick={this.submitForm}>提交</button>
                </div>
            </Container>
            <Footer/>
        </div>;
    }
}