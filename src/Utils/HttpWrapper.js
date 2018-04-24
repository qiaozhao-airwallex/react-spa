import axios from 'axios'
import {authentication} from "./Authentication";

export const httpRequest = (requestConfig, responseCallback, errorCallback) => {
    axios(requestConfig)
        .then(response => {
            console.log(response);
            responseCallback(response);
        })
        .catch(error => {
            console.error(error);
            if (errorCallback != null) {
                errorCallback(error)
            }
        })

}

export const httpRequestWithToken = (requestConfig, responseCallback, errorCallback) => {
    httpRequestWithTokenAndPathVar(requestConfig, {}, responseCallback, errorCallback)
}


export const httpRequestWithTokenAndPathVar = (requestConfig, pathVar, responseCallback, errorCallback) => {
    for (var key in pathVar) {
        if (pathVar.hasOwnProperty(key)) {
            var val = pathVar[key];
            requestConfig.url = requestConfig.url.replace('{' + key + '}', val);
        }
    }
    const token = authentication.getToken();

    var headers = {Authorization: 'Bearer ' + token};
    Object.assign(headers, requestConfig.headers)
    requestConfig.headers = headers;

    httpRequest(requestConfig, responseCallback, (error) => {
        if (!error.response
            || (error.response.status === 401 && error.response.data.error === 'invalid_token')) {
            authentication.signOut(() => history.push('/'));
        }
        if (errorCallback != null) {
            errorCallback(error)
        }
    })
}
