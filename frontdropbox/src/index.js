import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import wholeReducer from './reducers/reducer';
import { compose, createStore } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import {Route,BrowserRouter,Switch} from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import MainPage from './components/MainPage';
import FilePage from './components/FilePage';
import GroupPage from './components/GroupPage';
import Account from './components/Account';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


const theme = createMuiTheme();
let store = compose(
        autoRehydrate()
    )(createStore)(wholeReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log(store);
ReactDOM.render(
    <Provider store={store}>

        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoginRegister}/>
                    <Route exact path="/login" component={LoginRegister}/>
                    <Route exact path="/home" component={MainPage}/>
                    <Route exact path="/files" component={FilePage}/>
                    <Route exact path="/groups" component={GroupPage}/>
                    <Route exact path="/account" component={Account}/>
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
        
    </Provider>, document.getElementById('root')
);
registerServiceWorker();

store.subscribe(()=>{
    //console.log();
});

persistStore(store);

export default store;