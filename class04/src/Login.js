import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name : '', isLog : false};

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleLogin() {
        this.setState({isLog : true});
    }

    handleLogout() {
        this.setState({isLog : false});
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        if(!this.state.isLog) {
            alert('로그인 해주세요')
        }
        else {
            alert('환영합니다 ' + this.state.name + '님');
            this.setState({isLog : true});
        }
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>로그인</h2>
                    <label>아이디 : <input type="text" value={this.state.name} onChange={this.handleChange}/></label>
                    <input type="submit" value="submit"/>
                </form>
                {this.state.isLog ? (
                    <button onClick={this.handleLogout}>로그아웃</button>
                ) : (
                    <button onClick={this.handleLogin}>로그인</button>
                )
                }
            </div>
        );
    }
}

export default Login;