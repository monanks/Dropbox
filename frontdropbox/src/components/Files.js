import React, {Component} from'react';
import {addFileList} from '../actions/action.js';
import {connect} from 'react-redux';
import * as API from '../api/api';
import FileIcon from 'material-ui-icons/InsertDriveFile';
import FolderIcon from 'material-ui-icons/Folder';
import ListIcon from 'material-ui-icons/FormatListBulleted';
import List, { ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui-icons/Delete';
import DLIcon from 'material-ui-icons/GetApp';
//import IconButton from 'material-ui/IconButton';
class Files extends Component{

    componentDidMount(){
        this.getFiles();
    }

    getFiles = () => {
        console.log(this.props.afterAuth);
        API.getFiles(this.props.afterAuth)
            .then((data) => {
                //console.log(data);
                if(data.success==="1"){
                    this.props.addFileList(data.files);
                    this.state=data.files;
                }
                else{

                }
            });
    };

    addFiles = () =>{
        if(this.props.file.list!==undefined){
            const var1 = this.props.file.list;
            console.log(var1);
            return var1.map(item=>(
                <div>
                    <ListItem >
                        <div className="row" style={lstyle}>
                            <div className="col-md-1">
                                {item.filetype?<FileIcon/>:<FolderIcon/>}
                            </div>
                            <div className="col-md-4" style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>
                                {item.filename}
                            </div>
                            
                            <div className="col-md-3">
                                {item.datetime.substring(0,10)}
                            </div>
                            <div className="col-md-2">
                                
                            </div>
                            <div className="col-md-1">
                                <DLIcon onClick={()=>{
                                    console.log(item.fileid);
                                    API.dlFile({fileid: item.fileid})
                                    .then((data)=>{

                                    })
                                }
                                }/>
                            </div>
                            <div className="col-md-1">
                                {/* <IconButton id={item.fileid} onclick={()=>{console.log('click')}}><DeleteIcon/></IconButton> */}
                                <DeleteIcon onClick={()=>{
                                    console.log(item.fileid);
                                    API.deleteFile({fileid: item.fileid})
                                    .then((data)=>{
                                        this.getFiles();
                                    })
                                }
                                }/>
                            </div>
                        </div>
                    </ListItem>
                </div>
            ))
        } 
    }

    
    render(){
        return(
            <div className="row" >
                <List>
                    <ListItem >
                        <div className="row" style={lstyle}>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-4">
                                Name
                            </div>
                            
                            <div className="col-md-3">
                                Upload Date
                            </div>
                            <div className="col-md-2">
                                
                            </div>
                            <div className="col-md-1">
                                
                            </div>
                            <div className="col-md-1">
                                <ListIcon/>
                            </div>
                        </div>
                    </ListItem>
                    {this.addFiles()}
                </List>
                
            </div>
        )
    }
}

const lstyle = {
    width: "100%",
    marginLeft: "0px"
}

const mapStateToProps= state =>{
    console.log(state.afterAuth);
    return{
        afterAuth: state.afterAuth,
        file: state.file 
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        addFileList: (filelist) =>dispatch(addFileList(filelist))
    }
}
//export default withStyles(styles)(NavBar);
export default (connect(mapStateToProps,mapDispatchToProps)(Files));