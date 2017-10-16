import React,{Component} from 'react';
import Button from 'material-ui/Button';
import {addSignupInfo,addUserInfo,removeSignupInfo} from '../actions/action.js';
import {connect} from 'react-redux';
import * as API from '../api/api';
import { withRouter } from 'react-router-dom';
class Signup extends Component{

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
                        //value={this.props.email}
                        onChange={(event)=>{
                            // this.setState({
                            //     email:event.target.value
                            // });
                            this.props.register.email=event.target.value;
                        }}
                        ></input>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="inputFirstname" 
                        id="inputFirstname" 
                        placeholder="First Name" 
                        required="required"
                        style={{marginBottom:'10px'}}
                        //value={this.props.first}
                        onChange={(event)=>{
                            // this.setState({
                            //     first:event.target.value
                            // });
                            this.props.register.firstname=event.target.value;
                        }}
                        ></input>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="inputLastname" 
                        id="inputLastname" 
                        placeholder="Last Name" 
                        required="required"
                        style={{marginBottom:'10px'}}
                        //value={this.props.last}
                        onChange={(event)=>{
                            // this.setState({
                            //     last:event.target.value
                            // });
                            this.props.register.lastname=event.target.value;
                        }}
                        ></input>
                    <input 
                        type="password" 
                        className="form-control" 
                        name="inputPassword" 
                        id="inputPassword" 
                        placeholder="Password"
                        required="required"
                        style={{marginBottom:'10px'}}
                        //value={this.props.password}
                        onChange={(event)=>{
                            // this.setState({
                            //     password:event.target.value
                            // });
                            this.props.register.password=event.target.value;
                        }}
                        ></input>
                    <Button 
                    raised 
                    className="btn btn-primary"
                    style={{marginBottom:'10px', width:'100%'}}
                    onClick={() => {
                        this.props.addSignupInfo(
                            this.props.register.email,
                            this.props.register.password,
                            this.props.register.first,
                            this.props.register.last);
                        //console.log(this.props.register);
                        API.doSignup(this.props.register)
                        .then((data) => {
                            console.log(data);
                            if(data.success==="1"){
                                this.props.addUserInfo(data.email,data.first,data.userid,data.curdir);
                                this.props.history.push('/home');
                            }
                            else{

                            }
                        });
                    }}
                    >Sign Up</Button>
                </form>
            </div>
        )
    }
    
}

function mapDispatchToProps(dispatch){
    return{
        addSignupInfo : (email,password,first,last) => dispatch(addSignupInfo(email,password,first,last)),
        addUserInfo: (email,firstname,userid,curdir)=>dispatch(addUserInfo(email,firstname,userid,curdir)),
        removeSignupInfo: ()=>dispatch(removeSignupInfo())
    };
}

const mapStateToProps= state =>{
    console.log(state.register);
    return{
        register:state.register 
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (Signup));

