/**
 * Created by knowthis on 2017/2/7.
 * auther website:http://zhouxianbao.cn
 */
import React,{ Component} from 'react';

export default class Root extends Component{
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}