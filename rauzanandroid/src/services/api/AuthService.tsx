import {
    envService
} from '../env/env';
import { GenService } from '../gen/GenService';

export const AuthService = {
    Login,
    Signup,
    Logout,
    listPertanyaan
}

const ApiUrl = envService.envUrl();

function Login(body :any) {
    let formData = new FormData;
    for (var key in body) {
        formData.append(key, body[key])
    }
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(ApiUrl + '/login', requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}
function Signup(data :any) {
    let formData = new FormData;
    for (var key in data) {
        formData.append(key, data[key])
    }
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(ApiUrl + '/register', requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}
function Logout(token :any) {
    // let formData = new FormData;
    // formData.append('email', email)
    const requestOptions = {
        method: 'POST',
        // body: formData,
        headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    return fetch(ApiUrl + '/logout', requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}


function listPertanyaan() {
    const requestOptions = {
        method: 'GET',
        // headers: {
        //     'Authorization': 'Bearer ' + token
        // },
    };
    return fetch(ApiUrl + '/pertanyaan_keamanan_list', requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}
