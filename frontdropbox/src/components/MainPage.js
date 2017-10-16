import React, {Component} from'react';
import Header from './Header';
import PageContent from './PageContent';
import NavigationHome from './NavigationHome';

class MainPage extends Component{
    render(){
        return(
            <div className="row ">
                <div className="col-md-2" style={navstyle}>
                    <NavigationHome/>
                </div>
                <div className="col-md-10">
                    
                        <div className="row">
                            <Header title="Home"/>
                        </div>
                        <div className="row">
                            <PageContent/>
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

export default MainPage;