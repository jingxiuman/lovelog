import React, { Component } from 'react';
import TimeLine from '../../components/timelineItem';
import { browserHistory } from 'react-router';
import Header,{Footer,Container} from '../../components/common';
import common from '../../common/common';
import './index.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    convertData(arr){
        let temp =[];
        arr.forEach(function (item) {
            temp.push({
                id:item.id,
                type: item.eventType == 0 ?'time':'thing',
                create: item.created_at,
                title: item.eventName,
                time: item.eventTime,
                address: item.address,
                bg: item.img,
                content:item.eventContent
            })
        });
        console.log(temp);
        return temp;

    }
    componentDidMount(){
        let that =this;
        if(!common.checkLogin()){
            browserHistory.push('/login');
            return
        }
        common.getOwn().then(function (res) {
            console.log(that.convertData(res));
            if(res.length >0) {
                that.setState({list: that.convertData(res)});
            }
            console.log('state',that.state.list)
        })
    }
  render() {
      if(this.state.list.length>0) {
          return (
              <div className="common">
                  <Header type="index"/>
                  <Container>
                      {this.state.list.map((item) => <TimeLine key={item.id} type={item.type} data={item}/>)}

                  </Container>
                  <Footer/>
              </div>
          );
      }else{
          return (
              <div className="common">
                  <Header type="index"/>
                  <Container>
                     none
                  </Container>
                  <Footer/>
              </div>
          );
      }
  }
}

export default App;
