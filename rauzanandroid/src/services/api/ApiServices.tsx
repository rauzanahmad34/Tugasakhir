import {
    envService
} from '../env/env';
import { GenService } from '../gen/GenService';

export const ApiServices = {
    GetData,
    postData,
    DelData,
}

const ApiUrl = envService.envUrl();



function postData(body: any,endpoint : any) {
    let formData = new FormData;
    for (var key in body) {
        formData.append(key, body[key])
    }
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(ApiUrl + endpoint, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}


function GetData(endpoint:any) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(ApiUrl + endpoint, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}

function DelData(endpoint:any) {
    const requestOptions = {
        method: 'DELETE',
    };
    return fetch(ApiUrl + endpoint, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}


