/**
 * Created by knowthis on 2017/2/13.
 * auther website:http://zhouxianbao.cn
 */
import React,{Component} from 'react';
import Header,{Footer,Container} from '../../components/common';
import DatePicker from 'react-mobile-datepicker';
import moment from 'moment';
import './index.css';

moment.locale('zh-cn');

export default class AddBox extends Component{
    render(){
        return <div className="common">
            <Header type="index" />
            <Container classAdd={{'add-container':true}}>
                <div className="input-group">
                    <label htmlFor="">事件标题</label>
                    <input type="text" className="input-control"/>
                </div>
                <div className="input-group">
                    <label htmlFor="">事件时间</label>
                    <DatePicker  value={moment('2015-01-01', 'YYYY-MM-DD')} />
                </div>
                <div className="input-group">
                    <label htmlFor="">事件类型</label>
                    <select name="" id="" className="input-control">
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
                    <div className="address"><i className="iconfont">&#xe615;</i>上海文青大街</div>
                </div>
                <div className="imgList">
                    <div className="item">
                        <img src="//cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png" alt=""/>
                    </div>
                    <div className="item">
                        <img src="//cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png" alt=""/>
                    </div>
                    <div className="item">
                        <img src="//cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png" alt=""/>
                    </div>
                    <div className="item">
                        <img src="//cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png" alt=""/>
                    </div>
                    <div className="item item-add">
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