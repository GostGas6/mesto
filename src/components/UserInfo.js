export default class UserInfo {
    constructor({ profileNameSelector, profileAboutSelector, profileAvatarSelector }) {
        this._titleForm = document.querySelector(profileNameSelector);
        this._linkForm = document.querySelector(profileAboutSelector);
        this._profileAvatar = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._titleForm.textContent,
            about: this._linkForm.textContent,
            avatar: this._profileAvatar.src
        };
    };

    setUserInfo({ name, about, avatar, _id }) {
        this._titleForm.textContent = name;
        this._linkForm.textContent = about;
        this._profileAvatar.src = avatar;
        this._profileID = _id;
    };
}