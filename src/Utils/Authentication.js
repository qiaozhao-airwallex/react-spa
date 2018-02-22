export const authentication = {
    isAuthenticated() {
        return this.getAuthSession() != null
    },
    authenticate(authData) {
        localStorage.setItem("session", authData);
    },
    signout(cb) {
        localStorage.removeItem('session');
        setTimeout(cb, 100)
    },
    getAuthSession() {
        return JSON.parse(localStorage.getItem("session"));
    },
    getAuthUser() {
        return this.getAuthSession().user;
    },
    getAuthData() {
        return this.getAuthSession().data;
    },
    getToken() {
        return this.getAuthData().access_token;
    }
}
