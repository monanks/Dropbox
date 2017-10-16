import React,{Component} from 'react';
import Header from './Header';
import AccountContent from './AccountContent';
import NavigationHome from './NavigationHome';

class Account extends Component{
    render(){
        return(
            <div className="row ">
                <div className="col-md-2" style={navstyle}>
                    <NavigationHome/>
                </div>
                <div className="col-md-10">
                    
                        <div className="row" >
                            <Header title="Account"/>
                        </div>
                        <div className="row">
                            <AccountContent/>
                        </div>
                    
                </div>
            </div>
        )
    }
}

const navstyle={
    backgroundColor:'#f7f9fa',
    height:'100vh'
}

export default Account;