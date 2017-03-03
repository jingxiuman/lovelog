/**
 * Created by knowthis on 2017/2/13.
 * auther website:http://zhouxianbao.cn
 */
import React,{Component} from 'react';
import Header,{Container} from '../../components/common';
import Common from './../../common/common';
import './index.css';
class LogItem extends Component{
    render(){
        return  <div className="item">
            <div className="title">{this.props.time} 更新日志</div>
            <div className="content">
                {this.props.content}
            </div>
        </div>
    }
}
export default class Detail extends Component{
    constructor(props){
        super(props);
        this.tools = new Common();
        this.state = {
            list :[{
                time:'2017-12-12',
                content:'修改了某某某哦修改了某某某哦修改了某某某哦修改了某某某哦修改了某某某哦'
            },{
                time:'2017-12-12',
                content:'修改了某某某哦修改了某某某哦修改了某某某哦修改了某某某哦修改了某某某哦'
            },{
                time:'2017-12-12',
                content:'修改了某某某哦修改了某某某哦修改了某某某哦修改了某某某哦修改了某某某哦'
            }]
        }
    }
    render(){
        return <div className="common">
            <Header type="detail" />
            <Container classAdd={{'feedbackContainer':true}}>
                <div className="feedback-input">
                    <textarea name="" id="" rows="5">

                    </textarea>
                    <button className="feedback-btn" type="button">提交意见</button>
                </div>
                <div className="updateLog">
                    {this.state.list.map((item)=><LogItem time={item.time} content={item.content}/>)}
                </div>

            </Container>

        </div>;
    }
}