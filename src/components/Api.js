export default class Api {
    constructor({ url, headers }) {
        this._baseUrl = url;
        this._headers = headers;
    }

    _isResultOk(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    };

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(this._isResultOk)
    };

    patchProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._isResultOk)
    };

    setUserAvatar({ link }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then(this._isResultOk)
    };

    getCard() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then(this._isResultOk)
    };


    postCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._isResultOk)
    };

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._isResultOk)
    }

    like(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then(this._isResultOk)
    }

    dislike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._isResultOk)
    }

};