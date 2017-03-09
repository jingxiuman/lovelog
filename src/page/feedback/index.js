/**
 * Created by knowthis on 2017/2/13.
 * auther website:http://zhouxianbao.cn
 */
import React,{Component} from 'react';
import Header,{Container} from '../../components/common';
import common from './../../common/common';
import './index.css';
class LogItem extends Component{
    render(){
        return  <div className="item">
            <div className="title"> 版本:{this.props.version} 更新日志</div>
            <div className="version">{this.props.time}</div>
            <div className="content">
                {this.props.content}
            </div>
        </div>
    }
}
export default class Detail extends Component{
    constructor(props){
        super(props);
        this.tools = common;
        this.state = {
            list :[],
            advance:''
        };
        this.addAdvance = this.addAdvance.bind(this);
        this.advanceValue = this.advanceValue.bind(this);
    }
    componentDidMount() {
        let that =this;
        common.getUpdateInfo({}).then(function (res) {
            console.log(res);
            that.setState({
                list :res
            })
        })
    }
    addAdvance(e){
        let that = this;
        console.log(e.target.value);
        common.addAdvance({
            title:'用户反馈',
            content: that.state.advance
        }).then(function (res) {
            if(!res){
                alert('感谢你的用户反馈，我会继续改进')
            }
        })

    }
    advanceValue(e){
        console.log(e.target.value);
        this.setState({advance:e.target.value})
    }
    render(){
        return <div className="common">
            <Header type="detail" />
            <Container classAdd={{'feedbackContainer':true}}>
                <div className="feedback-input">
                    <textarea name="" id="" rows="5" value={this.state.advance} onChange={this.advanceValue}>

                    </textarea>
                    <button className="feedback-btn" type="button" onClick={this.addAdvance}>提交意见</button>
                </div>
                <div className="updateLog">
                    {this.state.list.map((item)=><LogItem key={item.id} time={item.time} version={item.version} content={item.content}/>)}
                </div>

            </Container>

        </div>;
    }
}