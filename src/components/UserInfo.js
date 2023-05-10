export default class UserInfo {
    constructor({ profileNameSelector, profileAboutSelector }) {
        this._titleForm = document.querySelector(profileNameSelector);
        this._linkForm = document.querySelector(profileAboutSelector);
    }

    getUserInfo() {
        return {
            name: this._titleForm.textContent,
            job: this._linkForm.textContent,
        };
    };

    setUserInfo({ name, job }) {
        this._titleForm.textContent = name;
        this._linkForm.textContent = job;
    };
}