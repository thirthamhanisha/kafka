import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import ImageGridList from "./ImageGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

class Welcome extends Component {
    handleFileUpload = (event) => {

        const payload = new FormData();
          var username = this.props.username;
        payload.append( 'mypic',event.target.files[0]);
        payload.append( 'username', username);


        API.uploadFile(payload)
            .then((data) => {
             //   if (status === 201) {
                    API.doGetList(data)
                        .then((res) => this.setState({
                            images: res.file
                        }))
                    /*API.doGetUser(status.username)
                    // .then((status) => {
                    //    if (status === 201) {
                    // 	API.getFiles()
                        .then((data) => {
                            this.setState({
                                images: data,
                                username: status.username
                            });
                        })*/
                    /*API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data
                            });
                        });*/
             //   }
            });

    };

    handleFileUser = (userdata) => {
        API.doGetList(userdata)
        // .then((status) => {
        //    if (status === 201) {
        // 	API.getFiles()
            .then((data1) => {
                this.setState({
                    images: data1.file
                });
            })
    };
    static propTypes = {
        username: PropTypes.string.isRequired,
        files: PropTypes.string.isRequired,

        /*password: PropTypes.string.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,*/
        handleLogout: PropTypes.func.isRequired
    };
    constructor(props)
    {
        super(props);
        this.handleFileUser = this.handleFileUser.bind(this);


        this.state = {
            username : '',
            images: [],
           files: []
        };
    }
    state = {
        username : '',
        images: [],
        files: []

      /*  password: '',
        firstname: '',
        lastname: ''*/
    };

    componentWillMount(){
        this.setState({
            username : this.props.username,
            files: this.props.files
            /*password: this.props.password,
            firstname: this.props.firstname,
            lastname: this.props.lastname,*/
        });
        //document.title = `Welcome, ${this.state.username} !!`;
        this.handleFileUser(this.props);
       /* API.doGetList(this.state)
            .then((data) => {
                console.log(data);
                this.setState({
                    images: data
                });
            });*/
    }

    componentDidMount(){
        document.title = `Welcome, ${this.state.username} !!`;
     //   this.handleFileUser(this.state);
      /*  API.doGetList(this.state)
            .then((data) => {
                console.log(data);
                this.setState({
                    images: data
                });
            });*/

    }

    render(){
        return(
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <div className="alert alert-warning" role="alert">
                        {this.state.username}, welcome to my App..!!

                    </div>
                    <Typography
                        align={'center'}
                        type="display3"
                    >
                        DropBox
                    </Typography>
                    <TextField
                        className={'fileupload'}
                        type="file"
                        name="mypic"
                        onChange={this.handleFileUpload}
                    />

                    <ImageGridList items={this.state.images} route={this.props.route} username={this.state.username}/>
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => this.props.handleLogout(this.state)}>
                        Logout
                    </button>
                </div>
            </div>
        )
    }
}

export default Welcome;