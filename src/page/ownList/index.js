import React, { Component } from 'react';
import TimeLine from '../../components/timelineItem';
import { browserHistory } from 'react-router'
import Header,{Footer,Container} from '../../components/common';
import common from '../../common/common';
import './index.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: [{
                id:1,
                type: 'thing',
                create: '1486626102',
                title: '第一次使用旧时光',
                time: 1486626102,
                address: '北京路',
                bg: 'http://cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png',
                content: '先说说他打击我的路数: 你没能力 我觉得你没有优点 你有什么优点你应该自己知道 你认为的优点只是你认为的自己而已 你都是缺点 你觉得我不尊重你更说'
            }, {
                id:2,
                type: 'time',
                create: 1486626102,
                title: '第一次使用旧时光',
                time: 1389512010,
                address: '北京路',
                bg: 'http://cdn.xbpig.cn/bb476573ec70fc2de3ac18cb82e127e2.png',
                content: '你说啥呢，啊实打实大师东北部吧你说啥呢，啊实打实大师东北部吧你说啥呢，啊实打实大师东北部吧'
            }]
        }
    }
    componentDidMount(){
        if(!common.checkLogin()){
            browserHistory.push('/login')
        }
    }
  render() {
    return (
      <div className="common">
          <Header type="index"/>
          <Container>
              {this.state.list.map((item)=> <TimeLine key={item.id} type={item.type} data={item} /> )}
          </Container>
          <Footer/>
      </div>
    );
  }
}

export default App;
