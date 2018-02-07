import {imageServeURL} from '../Config/Config'

export const getImageURL = (fileName) => {
    return imageServeURL + fileName;
}

export const populateImagePreviewUrl = (image) => {
    return {
        originalFileName: image.originalFileName,
        targetFileName: image.targetFileName,
        imagePreviewUrl: image.imagePreviewUrl != null? image.imagePreviewUrl : getImageURL(image.targetFileName),
    }
}