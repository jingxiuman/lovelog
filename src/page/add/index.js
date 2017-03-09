/**
 * Created by knowthis on 2017/2/13.
 * auther website:http://zhouxianbao.cn
 */
import React,{Component} from 'react';
import Header,{Footer,Container} from '../../components/common';
import DatePicker from 'react-mobile-datepicker';
import common from './../../common/common';
import moment from 'moment';
import './index.css';

moment.locale('zh-cn');

export default class AddBox extends Component{
    constructor(props){
        super(props);
        let that = this;
        let timeStr = moment().format('YYYY-MM-DD');
        this.state ={
            time: new Date(),
            timeStr:timeStr,
            showSelect:true,
            isOpen: false,
            address:'',
            imgList:['//cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png','//cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png']
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                common.getAddress({
                    location:position.coords.latitude +","+position.coords.longitude,
                    output:"json",
                    pois:1,
                    ak:"uP5lhQRSjdMpOpK4nd4EGh32XvZzXjjI"
                }).then(function (res) {
                    that.setState({address:res.data.result.formatted_address})
                })
            });
        } else {
            /* 地理位置服务不可用 */
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.changeType = this.changeType.bind(this);
    }
    handleClick = () => {
        this.setState({ isOpen: true });
    };
    handleCancel = () => {
        this.setState({ isOpen: false });
    };
    handleSelect = (time) => {
        let timeStr = moment(time).format('YYYY-MM-DD');
        this.setState({ time:time, isOpen: false,timeStr: timeStr});
        console.log(this.state);
    };
    covert = (time) => {
        let timeStr = moment(time).format('YYYY-MM-DD');
        this.setState({ time:time, isOpen: false,timeStr: timeStr});
    }
    changeType = (e) =>{
        let current = e.target.value;
        console.log(e.target.value);
        if(current == 1){
            let timeStr = moment().format('YYYY-MM-DD');
            this.setState({
                time:new Date(),
                isOpen: false,
                showSelect:true,
                timeStr:timeStr
            })
        }else{
            let timeStr = moment().format('YYYY-MM-DD H:m:s');
            this.setState({
                time:new Date(),
                showSelect:false,
                timeStr:timeStr
            })
        }
    };

    render(){
        return <div className="common">
            <Header type="index" />
            <Container classAdd={{'add-container':true}}>
                <div className="input-group">
                    <label htmlFor="">事件标题</label>
                    <input type="text" className="input-control"/>
                </div>
                <div className="input-group">
                    <label htmlFor="" >事件时间</label>
                    {this.state.showSelect == true?<div className="btn-time" onClick={this.handleClick}>点击选择</div>:''}


                    <div className="time-value">{this.state.timeStr}</div>
                    <DatePicker value={this.state.time}
                        isOpen={this.state.isOpen}
                        onSelect={this.handleSelect}
                        onCancel={this.handleCancel} />
                </div>
                <div className="input-group">
                    <label htmlFor="">事件类型</label>
                    <select name="" id="" className="input-control" onChange={this.changeType}>
                        <option value="1">纪念日</option>
                        <option value="2">日记</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="">事件内容</label>
                    <textarea name="" id=""  rows="5" className="textarea-control">

                    </textarea>
                </div>
                <div className="input-group">
                    <label htmlFor="">当前坐标</label>
                    <div className="address"><i className="iconfont">&#xe615;</i>{this.state.address}</div>
                </div>
                <div className="imgList">
                    {this.state.imgList.map((item,index)=> <div key={index} className="item">
                        <img src={item} alt=""/>
                    </div>)}

                    <div className="item item-add">
                        <input type="file"/>
                        <i className="iconfont">&#xe69a;</i>
                    </div>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn-submit " >提交</button>
                </div>
            </Container>
            <Footer/>
        </div>;
    }
}