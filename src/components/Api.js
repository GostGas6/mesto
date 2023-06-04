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

    async getProfile() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        });
        return this._isResultOk(res);
    };

    async patchProfile(data) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        });
        return this._isResultOk(res);
    };

    async setUserAvatar({ link }) {
        const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        });
        return this._isResultOk(res);
    };

    async getCard() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        });
        return this._isResultOk(res);
    };

    
    async postCard(data) {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        return this._isResultOk(res)
    };

    async deleteCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        });
        return this._isResultOk(res);
    }

    async like(cardId, isLiked) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        });
        return this._isResultOk(res);
    }

};