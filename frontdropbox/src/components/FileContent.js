import React, {Component} from'react';
import Sidebar from './Sidebar';
import Files from './Files';

class FileContent extends Component{
    render(){
        return(
            <div>
                <div className="col-md-9">
                    <Files/>                    
                </div>
                <div className="col-md-3">
                    <Sidebar/>
                </div>
            </div>
        )
    }
}



export default FileContent;