import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

class NavigationFile extends Component{
    render(){
        return(
        <div style={nav}>
            <div className="col-md-2">
            </div>

            <div className="col-md-9">
                <div className="row" style={istyle}>
                    <NavLink to="/home" style={hlstyle} activeStyle={{ color: '#0070E0' }}>
                    <img id="icon" style={logoStyle} alt="logo.svg" src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg"/>
                    </NavLink>
                    
                </div>

                <div className="row" style ={hlinkStyle}>
                    <NavLink to="/files" style={hlstyle} activeStyle={{ color: '#0070E0' }}>Files</NavLink>
                </div>

                <div className="row" style ={linkStyle}>
                    <NavLink to="/files" style={lstyle} activeStyle={{ color: '#0070E0', fontWeight: 'bold' }}>My Files</NavLink>
                </div>

                <div className="row" style ={linkStyle}>
                    <NavLink to="/files/shared" style={lstyle} activeStyle={{ color: '#0070E0' }}>Sharing</NavLink>
                </div>

                <div className="row" style ={linkStyle}>
                    <NavLink to="/files/deleted" style={lstyle} activeStyle={{ color: '#0070E0' }}>Deleted Files</NavLink>
                </div>
            </div>
        </div>
        )
    }
}

const istyle={
    marginTop: "30px",
    marginBottom: "30px"
}

const hlstyle={
    fontSize: '13px',
    lineHeight: '16px',
    color: 'blue',
    display: 'block',
    msFlex: '1',
    textDecoration: 'none'
}
const hlinkStyle={
    marginTop: "17px",
    marginBottom: "30px"
}


const lstyle={
    fontSize: '13px',
    lineHeight: '16px',
    color: '#637282',
    display: 'block',
    msFlex: '1',
    textDecoration: 'none'
}
const linkStyle={
    marginTop: "13px",
    marginBottom: "13px"
}

const logoStyle={
    height: "26px",
    width: "26px"
}

const nav={
    backgroundColor: '#f7f9fa'
}
export default NavigationFile;