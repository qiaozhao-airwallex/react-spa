export const authentication = {
    isAuthenticated() {
        let is = (localStorage.getItem("session") != null && localStorage.getItem("session_valid") === "true");
        return is
    },
    authenticate(authData) {
        localStorage.setItem("session", authData);
        localStorage.setItem("session_valid", "true");
    },
    signOut(cb) {
        localStorage.setItem("session_valid", "false");
        if (cb) {
            cb();
        }
        setTimeout(() => {
            localStorage.removeItem('session')
        }, 2000);
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
