export const authentication = {
    isAuthenticated() {
        return this.getAuthSession() != null
    },
    authenticate(authData) {
        localStorage.setItem("session", authData);
    },
    signOut(cb) {
        localStorage.removeItem('session');
        setTimeout(cb, 100)
    },
    getAuthSession() {
        return JSON.parse(localStorage.getItem("session"));
    },
    getAuthName() {
        return this.getAuthSession().name;
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
