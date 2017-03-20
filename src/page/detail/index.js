/**
 * Created by knowthis on 2017/2/9.
 * auther website:http://zhouxianbao.cn
 */
import React, {Component} from 'react';
import Header, {Footer, Container, LoadingFunc} from '../../components/common';
import common from './../../common/common';
import './index.css';

class DetailImgItem  extends Component{
    constructor(props){
        super(props);
        let pic ;
        if(common.checkImgByOld(props.imgUrl)){
            pic = props.imgUrl
        }else{
            pic = common.imgUrl() + props.imgUrl +'?imageView2/2/w/320/h/180'
        }
        this.state = {
            imgUrl:pic
        }
    }
    render(){
        return <div className="detail_img" style={{backgroundImage:'url('+this.state.imgUrl+')'}} >
        </div>
    }
}
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
                bg: '',
                content: ''
            },
            imgList:[]
        }
    }

    componentDidMount() {
        let that = this;
        let loadTag = new LoadingFunc();
        common.getBoxOne({
            id: that.state.id
        }).then(function (res) {

            let temp = res[0], imgArr = [];
            if (common.checkImgByOld(temp.img)) {
                imgArr = common.getImgByOld(temp.img)
            } else {
                imgArr = (temp.img && temp.img.split("-")) || [];
            }
            let imgArr1=[],imgUrl;
            common.tools.extend(imgArr1,imgArr);
            imgArr1.shift();
            if(imgArr[0]){
                imgUrl = common.imgUrl() + imgArr[0]
            }else {
                imgUrl = common.imgDefault;
            }
            that.setState({
                data: {
                    id: temp.id,
                    create: '1486626102',
                    title: temp.eventName,
                    time: temp.eventTime,
                    address: temp.address,
                    bg: imgUrl ,
                    content: temp.eventContent
                },
                imgList:imgArr1
            });

            loadTag.close();
        })
    }

    render() {
        return <div className="common">
            <Header type="detail" name={this.state.data.title}/>
            <Container>
                <div className="head-img"
                     style={{'backgroundImage': 'url(' + ( this.state.data.bg + '?imageView2/2/w/375/h/211') + ')'}}>
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
                    <div className="content">
                        <div  dangerouslySetInnerHTML={{__html: this.state.data.content}}></div>
                        {this.state.imgList.map((item,index)=><DetailImgItem key={index} imgUrl={item}/>)}
                    </div>


                </div>
            </Container>

            <Footer/>
        </div>;
    }
}