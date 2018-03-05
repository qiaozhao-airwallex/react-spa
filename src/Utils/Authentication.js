export const authentication = {
    isAuthenticated() {
        return this.getAuthSession() != null
    },
    authenticate(authData) {
        alert("log in")
        localStorage.setItem("session", authData);
    },
    signout(cb) {
        alert("log out")
        localStorage.removeItem('session');
        setTimeout(cb, 100)
    },
    getAuthSession() {
        return JSON.parse(localStorage.getItem("session"));
    },
    getAuthUserName() {
        return this.getAuthSession().email;
    },
    getAuthUserID() {
        return this.getAuthSession().userID;
    },
    getToken() {
        return this.getAuthSession().access_token;
    }
}
