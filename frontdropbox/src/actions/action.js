import CryptoJS from 'crypto-js';
export const ADD_LOGIN_INFO = 'ADD_LOGIN_INFO';
export const ADD_SIGNUP_INFO = 'ADD_SIGNUP_INFO';
export const REMOVE_LOGIN_INFO = 'REMOVE_LOGIN_INFO';
export const REMOVE_SIGNUP_INFO = 'REMOVE_SIGNUP_INFO';
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const REMOVE_USER_INFO = 'REMOVE_USER_INFO';
export const ADD_FILE_LIST = "ADD_FILE_LIST";
export const RESET_STATE = 'RESET_STATE';
export function addLoginInfo(email,password){
    var h=CryptoJS.AES.encrypt(password,"key");
    //console.log(CryptoJS.AES.decrypt(h.toString()),"key");
    return {
        type : ADD_LOGIN_INFO,
        email,
        password
    }
}

export function addSignupInfo(email,password,first,last){
    return {
        type : ADD_SIGNUP_INFO,
        email,
        password,
        first,
        last
    }
}

export function removeLoginInfo(){
    return {
        type : REMOVE_LOGIN_INFO
    }
}

export function removeSignupInfo(){
    return {
        type : REMOVE_SIGNUP_INFO
    }
}

export function addUserInfo(email,first,user_id,curdir){
    return {
        type : ADD_USER_INFO,
        email,
        first,
        user_id,
        curdir
    }
}

export function removeUserInfo(){
    return{
        type : REMOVE_USER_INFO
    }
}

export function addFileList(filelist){
    return{
        type: ADD_FILE_LIST,
        filelist
    }
}

export function resetState(){
    return{
        type: RESET_STATE
    }
}

