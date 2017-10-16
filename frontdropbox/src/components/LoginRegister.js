import React ,{Component} from 'react';
import Signin from './Signin';
import Signup from './Signup';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    }
});
class LoginRegister extends Component{
    constructor(props) {
        super(props);
        this.state = {
          signin: true
        }
    }
    render(){
        return(
            <div>
                <div className="col-md-8">
                    <img src="db.png" alt="db.png" style={style}/>
                </div>
                <div className="col-md-4" style={{backgroundColor:'#017de4',height:'100vh'}}>
                        <div className="row" style={{marginLeft:'32%',marginBottom:'30%'}}>
                            {
                                this.state.signin
                                ? <Button raised className={styles.button} onClick={() => this.onClick()}>Go To Sign Up</Button>
                                : <Button raised className={styles.button} onClick={() => this.onClick()}>Go To Sign In</Button>
                            }
                        </div>
                        <div className="row">
                            {
                                this.state.signin
                                ? <Signin />
                                : <Signup />
                            }
                        </div>
                </div>    
            </div>
        );
    }

    onClick(){
        this.setState({signin: !this.state.signin});
    }
}

const style ={
        marginTop: '20%',
        marginLeft: '20%',
        maxWidth: '50%',
        maxHeight: '50%',
        display: 'block'
    }

export default LoginRegister;


