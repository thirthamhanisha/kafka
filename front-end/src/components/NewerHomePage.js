import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import Signup from "./Signup";
import ImageGridList from "./ImageGridList";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        files: []
    };

    /*handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };*/
    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    /*API.doGetList(userdata)
                        .then((res) => this.setState({
                            files: res.file
                        }))*/
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };
    handleSignUp = (userdata) => {
        API.doSignup(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Registration successful!! please login",
                        username: userdata.username
                    });
                    this.props.history.push("/login");

                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Enter valid information. Try again..!!"
                    });
                }
            });
    };
    handleLogout = () => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if(status === 200){
                    this.setState({
                        isLoggedIn: false,
                        message: "logged out successfully"
                    });
                    this.props.history.push("/");
                }
            });
    };


    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                        <Message message="Welcome!! New users please signup"/>
                        <button className="btn btn-success" onClick={() => {
                            this.props.history.push("/signup");
                        }}>
                            SignUp
                        </button>
                    </div>
                )}/>

                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/signup" render={() => (
                    <div>
                        <Signup handleSignUp={this.handleSignUp}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/welcome" render={() => (
                    <div>
                    <Welcome handleLogout={this.handleLogout} username={this.state.username}
                    />

                    </div>
                )}/>
                <Route exact path="/imagegridlist" render={() => (
                    <div>
                        <ImageGridList username = {this.state.username}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/userprofile" render={() => (
                    <div>
                        <UserProfile username = {this.state.username}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);