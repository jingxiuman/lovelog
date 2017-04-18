/**
 * Created by knowthis on 2017/2/13.
 * auther website:http://zhouxianbao.cn
 */
import React, {Component} from 'react';
import Header, {Container} from '../../components/common';
import { browserHistory } from 'react-router';
import common from '../../common/common';
import './index.css';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        };
        this.loginFunc = this.loginFunc.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    changeUsername(e){

        this.setState({username:e.target.value})

    }
    changePassword(e){
        this.setState({password:e.target.value})
    }
    loginFunc(e) {
        common.userLogin(this.state).then(function (res) {
            console.log(common.tools.isUndefined(res));
            if(!common.tools.isUndefined(res)){
                common.setLocalStorage({key:'info',value:res.info});
                common.setLocalStorage({key:'token',value:res.token});
                browserHistory.push('/')
            }
            console.log(res)
        });
        e.preventDefault();
    }
    componentDidMount() {
        if(common.checkLogin()){
            browserHistory.push('/')
        }
    }
    render() {
        return <div className="common">
            <Header type="index"/>
            <Container classAdd={{'add-container': true}}>
                <form onSubmit={this.loginFunc}>
                    <div className="input-group">
                        <label htmlFor="">用户名</label>
                        <input type="text" value={this.state.username} onChange={this.changeUsername} className="input-control"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">密&nbsp;&nbsp;&nbsp;码</label>
                        <input type="password" value={this.state.password} onChange={this.changePassword} className="input-control"/>
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn-submit " >注册并登录</button>
                    </div>
                </form>
            </Container>
        </div>;
    }
}