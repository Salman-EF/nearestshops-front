class Auth {
    constructor() {
        this.authenticated = false;
        if(localStorage.getItem('ACCESS_TOKEN')) {
            this.authenticated = true;
        }
    }

    login() {
        this.authenticated = true
    }
    logout() {
        this.authenticated = false
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();