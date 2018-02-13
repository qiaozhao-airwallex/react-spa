import {imageUploadURL} from '../Config/Config'
import {getImageURL} from './ImageHelper'

export const postImageToServer = (file, resultCallback) => {
    let formData = new FormData();
    formData.append('file', file);
    fetch(imageUploadURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: formData
    })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(data => {
            console.log(data);
            resultCallback(data.targetFileName, getImageURL(data.targetFileName));
        })
        .catch((error) => {
            console.log(error)
        });
}

export const removeImageFromServer = (serverFileName, callback) => {
     fetch(imageUploadURL + serverFileName, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => {
            if (response.status === 200) {
                callback();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })
        .catch((error) => {
            console.log(error)
        });
}
