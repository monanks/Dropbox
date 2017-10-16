import React,{Component} from 'react';
//import Button from 'material-ui/Button';
//import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
//import SharedFolderIcon from 'material-ui-icons/FolderShared';
//import FolderIcon from 'material-ui-icons/Folder';
import * as API from '../api/api.js';
import {connect} from 'react-redux';

class Sidebar extends Component{

    render(){
        return(
            <div>
                <div className="row">
                    <label htmlFor="file-upload" style={cfu}>
                        <i className="fa fa-cloud-upload" style={{backgroundColor:"#0070e0"}}></i> Upload File
                    </label>
                    <input id="file-upload" type="file" style={{display:'none'}} onChange={(event)=>{
                        const payload = new FormData();
                        //console.log(this.props.afterAuth.userid);
                        payload.append("file", event.target.files[0]);
                        payload.append("curdir", this.props.afterAuth.curdir);
                        payload.append("ownerid", this.props.afterAuth.userid);
                        console.log(payload);
                        API.uploadFile(payload)
                            .then((data) => {
                                console.log(data);
                                        if (data.success === '0') {
                                            
                                        }
                                }
                            );
                        }
                    } />
                </div>
                <div className="row">
                    
                </div>
            </div>
        )
    }
}
const cfu={
    border: '1px',
    display: 'inlineBlock',
    paddingTop: '6px',
    paddingBottom: '6px', 
    paddingLeft: '12px',
    paddingRight: '12px',
    cursor: 'pointer',
    backgroundColor: '#0070e0',
    marginLeft:"50px"
}

const mapStateToProps= state =>{
    console.log(state.afterAuth);
    return{
        afterAuth: state.afterAuth 
    };
}

export default connect(mapStateToProps) (Sidebar);