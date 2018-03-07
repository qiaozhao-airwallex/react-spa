export const backendURL =
    (process.env.NODE_ENV === 'production' && process.env.REACT_APP_BACK_END_URL != null) ?
        process.env.REACT_APP_BACK_END_URL :
        "http://localhost:8080/"
export const imageUploadURL = backendURL + "image/"
export const imageServeURL = backendURL + "uploaded/"
export const productBackendURL = backendURL + "product"
export const userBackendURL = backendURL + "user/"
export const oauthTokenBackendURL = backendURL + "oauth/token"
