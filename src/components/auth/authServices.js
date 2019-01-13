class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(cb) {
        if(localStorage.getItem('ACCESS_TOKEN')) {
            this.authenticated = true;
        }
        cb();
    }

    logout(cb) {
        if(localStorage.getItem('ACCESS_TOKEN')) {
            localStorage.removeItem('ACCESS_TOKEN');
        }
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();