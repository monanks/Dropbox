import React, {Component} from'react';
import Header from './Header';
import FileContent from './FileContent';
import NavigationFile from './NavigationFile';
class FilePage extends Component{
    render(){
        return(
            <div className="row ">
                <div className="col-md-2" style={navstyle}>
                    <NavigationFile/>
                </div>
                <div className="col-md-10">
                        <div className="row">
                            <Header title="Dropbox"/>
                        </div>
                        <div className="row">
                            <FileContent/>
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

export default FilePage;