/**
 * Created by knowthis on 2017/2/13.
 * auther website:http://zhouxianbao.cn
 */
import React, {Component} from 'react';
import Header, {Container} from '../../components/common';
import common from '../../common/common';
import './index.css';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        }
        this.loginFunc = this.loginFunc.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    changeUsername(e){
        console.log(e.target.value);
        this.setState({username:e.target.value})

    }
    changePassword(e){
        console.log(e.target.value);
        this.setState({password:e.target.value})
    }
    loginFunc(e) {
        console.log('yes',this.state);
        common.userLogin(this.state).then(function (res) {
            //Toast.info('登录成功', 1000);
            //Message.toast('登录成功');
            console.log(res)
        });
        e.preventDefault();
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
                        <button type="submit" className="btn-submit " >提交</button>
                    </div>
                </form>
            </Container>
        </div>;
    }
}