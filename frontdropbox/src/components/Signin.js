import React,{Component} from 'react';
import Button from 'material-ui/Button';
import {addLoginInfo,addUserInfo,removeLoginInfo} from '../actions/action.js';
import {connect} from 'react-redux';
import * as API from '../api/api';
import { withRouter } from 'react-router-dom';
import CryptoJS from 'crypto-js';

class Signin extends Component{

    render(){
        return(
                <div style={{margin:'10px'}}>
                    <form className="form-horizontal" action="">
                        <input 
                            type="email" 
                            className="form-control" 
                            name="inputEmail" 
                            id="inputEmail" 
                            placeholder="Email Id" 
                            required="required" 
                            style={{marginBottom:'10px'}}
                            //value={this.props.login.email} 
                            onChange={(event) => {
                                // this.setState({
                                //     email: event.target.value
                                // });
                                this.props.login.email= event.target.value;
                            }}>
                        </input>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="inputPassword" 
                            id="inputPassword" 
                            placeholder="Password"  
                            required="required"
                            style={{marginBottom:'10px'}}
                            //value={this.props.login.password}
                            onChange={(event) =>{
                                // this.setState({
                                //     password: event.target.value
                                // });
                                this.props.login.password= event.target.value;
                            }}>
                        </input>
                        <Button 
                            raised 
                            className="btn btn-primary"
                            style={{marginBottom:'10px', width:'100%'}}
                            onClick={()=>{
                                this.props.addLoginInfo(
                                    this.props.login.email,
                                    this.props.login.password);
                                console.log(this.props.login);
                                API.doLogin(this.props.login)
                                .then((data) => {
                                    //console.log(data);
                                    if(data.success==="1"){
                                        this.props.addUserInfo(data.email,data.firstname,data.userid,data.curdir);
                                        this.props.history.push('/home');
                                        console.log(this.props);
                                    }
                                    else{

                                    }
                                });
                                //this.props.removeLoginInfo();
                            }}
                            >Sign in</Button> 
                    </form>
                </div>  
        )
    }
   
}

function mapDispatchToProps(dispatch){
    return{
        addLoginInfo: (email,password)=>dispatch(addLoginInfo(email,password)),
        addUserInfo: (email,firstname,userid,curdir)=>dispatch(addUserInfo(email,firstname,userid,curdir)),
        removeLoginInfo: ()=>dispatch(removeLoginInfo())
    };
}

const mapStateToProps= state =>{
    console.log(state.login);
    return{
        login: state.login 
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (Signin));
