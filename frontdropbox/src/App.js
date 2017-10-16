import React, { Component } from 'react';
import LoginRegister from './components/LoginRegister';
import MainPage from './components/MainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>

          </div>

          <div>
          {
            this.props.afterAuth.isLoggedin
            ? <MainPage/>
            : <LoginRegister/>
          }
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps= state =>{
  //console.log(state.afterAuth);
  return{
      afterAuth:state.afterAuth
  };
}

export default connect(mapStateToProps) (App);
