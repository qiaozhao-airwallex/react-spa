export const backendURL =
    (process.env.REACT_APP_BACK_END_URL != null) ?
        process.env.REACT_APP_BACK_END_URL :
        "http://localhost:8080/"
export const imageUploadURL = backendURL + "image/"
export const imageServeURL = backendURL + "uploaded/"
export const productBackendURL = backendURL + "product"
export const userBackendURL = backendURL + "user"
export const meBackendURL = userBackendURL + "/me"
export const meFriendsBackendURL = meBackendURL + "/friends/"
export const oauthTokenBackendURL = backendURL + "oauth/token"
