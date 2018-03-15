export const authentication = {
    isAuthenticated() {
        return (this.getAuthSession() != null && localStorage.getItem("session_valid") === "true")
    },
    authenticate(authData) {
        localStorage.setItem("session", authData);
        localStorage.setItem("session_valid", "true");
    },
    signOut(cb) {
        localStorage.setItem("session_valid", "false");
        cb();
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
