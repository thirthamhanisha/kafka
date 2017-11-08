const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';


const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
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
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
/*export const getImages = (payload) =>
    fetch(`${api}/getlist/`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });*/
export const getImages = () =>
    fetch(`${api}/files/`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const getFiles = (payload) =>
    fetch(`${api}/files/doGetUser`, {
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });
export const logout = () =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
        res.data;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
export const uploadFile = (payload) =>
    fetch(`${api}/upload`, {
        method: 'POST',
        body: payload
    }).then(res => res.json()/*{
        return res.status;
    }*/).catch(error => {
        console.log("This is error");
        return error;
    });
export const doGetUser = (payload) =>
    fetch(`${api}/doGetUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())


        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doGetList = (payload) =>
    fetch(`${api}/doGetList`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())


        .catch(error => {
            console.log("This is error");
            return error;
        });
export const doShare = (payload) =>
    fetch(`${api}/users/doShare`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
