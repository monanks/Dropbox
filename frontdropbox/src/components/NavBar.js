import React, {Component} from'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import FileIcon from 'material-ui-icons/Folder';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';
import {connect} from 'react-redux';
import * as API from '../api/api';
import {addFileList} from '../actions/action.js';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      background: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    },
});

//@withStyles(styles),
//@connect(mapStateToProps,mapDispatchToProps)
class NavBar extends Component{
    state = { open: true };

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    onMyFilesClick = () => {
        console.log(this.props.afterAuth);
        API.getFiles(this.props.afterAuth)
            .then((data) => {
                console.log(data);
                if(data.success==="1"){
                    this.props.addFileList(data.files);
                }
                else{

                }
            });
    };

    onGroupClick = () => {
        console.log("go to next page");
        
    }

    render(){
        const { classes } = this.props;
        return(
            <div className="row ">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-5">
                        <img id="icon" alt="logo.svg" src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg"/>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row">
                    {/* <div className="col-md-2"></div> */}
                    <div className="col-md-12">
                        <List className={classes.root} subheader={<ListSubheader></ListSubheader>}>
                            <ListItem button onClick={this.handleHomeClick}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Home" />
                            </ListItem>
                            <ListItem button onClick={this.handleClick}>
                                <ListItemIcon>
                                    <FileIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Files" />
                                {this.state.open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
                            <ListItem button className={classes.nested} onClick={this.onMyFilesClick}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText inset primary="My Files" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={this.onSharedClick}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText inset primary="Shared" />
                            </ListItem>
                            </Collapse>
                            <ListItem button onClick={this.onGroupClick}>
                                <ListItemIcon>
                                    <FileIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Groups" />
                            </ListItem>
                        </List>
                    </div>
                      
                    </div>
            </div>
        )
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps= state =>{
    console.log(state.afterAuth);
    return{
        afterAuth: state.afterAuth 
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        addFileList: (filelist) =>dispatch(addFileList(filelist))
    }
}
//export default withStyles(styles)(NavBar);
export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(NavBar));