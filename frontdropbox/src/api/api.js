const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/signin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(error => {
            console.log("This is error");
            return error;
});

export const doSignup = (payload) =>
fetch(`${api}/signup`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res.json();
}).catch(error => {
        console.log("This is error");
        return error;
});

export const uploadFile = (payload) =>
    fetch(`${api}/upload/doUpload`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res;
    }).catch(error => {
            console.log("This is error");
            return error;
    }
);

export const getFiles = (payload) =>
fetch(`${api}/getFiles`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res.json();
}).catch(error => {
        console.log("This is error");
        return error;
});

export const dlFile = (payload) =>
fetch(`${api}/dlFile`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    console.log(res);
    //window.open(res.body);
    return res;
}).catch(error => {
        console.log(error);
        return error;
});

export const deleteFile = (payload) =>
fetch(`${api}/deleteFile`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    console.log(res);
    return res;
}).catch(error => {
        console.log(error);
        return error;
});