
export class AuthApi {

    constructor(baseUrl) {
        this._baseURL = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(new Error(res.status))
    }

    registrateNewUser({password, email}) {
        return fetch(`${this._baseURL}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, email})
        }).then(this._checkResponse)
    }

    logInCurrentUser({password, email}) {
        return fetch(`${this._baseURL}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        }).then(this._checkResponse)
    }

    checkToken (token) {
        return fetch(`${this._baseURL}/users/me`, {

            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        })
            .then(this._checkResponse)
    }
}

export const registerApi = new AuthApi('https://api.morgenmuffel.study.nomoredomains.work');