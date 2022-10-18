import {
    envService
} from '../env/env';
import { GenService } from '../gen/GenService';

export const AnalisaService = {
    PostData,
    getHistory,
    getDetails
}

const ApiUrl = envService.envUrl();



function PostData(data: any,uid:any) {
    let formData = new FormData;
    data.forEach((element: { id: string; bobot: any; }) => {
        formData.append('bobot[' + element.id + ']', element.bobot);
    });
    formData.append('uid', uid);
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(ApiUrl + '/add-analisa', requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}

function getHistory(id:any) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(ApiUrl + '/get-list-hasil?user_id='+id, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}
function getDetails(id:any) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(ApiUrl + '/hasil/'+id, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            GenService.alertErr('Network error please try again')
            console.error(error);
        });
}
