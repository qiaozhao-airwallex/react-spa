import {imageServeURL} from '../Config/Config'

export const getImageURL = (fileName) => {
    return imageServeURL + fileName;
}

export const populateImagePreviewUrl = (image) => {
    return {
        id: image.id,
        originalFileName: image.originalFileName,
        targetFileName: image.targetFileName,
        displayOrder: image.displayOrder,
        imagePreviewUrl: image.imagePreviewUrl != null? image.imagePreviewUrl : getImageURL(image.targetFileName),
    }
}