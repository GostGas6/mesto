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
        })
            .then(this._isResultOk)
    };

    patchProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._isResultOk)
    };

    setUserAvatar({ data }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link
            })
        })
            .then(res => this._isResultOk(res))
    };

    getCard() {
        return fetch(`${this._baseUrl}cards`, {
            headers: this._headers
        }).then(this._isResultOk)
    };

    postCard(data) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
              })
        })
            .then(this._isResultOk)
    };

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._isResultOk(res))
    }

    like(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
            .then((res) => this._isResultOk(res))
    }

};