import {
    envService
} from '../env/env';
import { GenService } from '../gen/GenService';

export const GejalaService = {
    GetAll,
    GetBobot
}

const ApiUrl = envService.envUrl();



function GetAll() {
    const requestOptions = {
        method: 'GET',
        // headers: {
        //     'Authorization': 'Bearer ' + token
        // },
    };
    return fetch(ApiUrl + '/get-list-gejala', requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}
function GetBobot() {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(ApiUrl + '/list_bobot', requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}
