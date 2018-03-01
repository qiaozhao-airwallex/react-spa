import {imageUploadURL} from '../Config/Config'
import {getImageURL} from './ImageHelper'
import {httpRequestWithToken} from "../Utils/HttpWrapper";

export const postImageToServer = (file, resultCallback) => {
    let formData = new FormData();
    formData.append('file', file);

    httpRequestWithToken({
        method: 'post',
        url: imageUploadURL,
        data: formData
    }, (response) => {
        resultCallback(response.data.id, getImageURL(response.data.targetFileName));
    })
}

export const removeImageFromServer = (serverFileId, callback) => {
    httpRequestWithToken({
        method: 'delete',
        url: imageUploadURL + serverFileId,
    }, (response) => {
        if (response.status === 200) {
            if (callback != null) {
                callback();
            }
        } else {
            throw new Error('Something went wrong on api server!');
        }
    })
}
