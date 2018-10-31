export default class CommonDataManager {

    static myInstance = null;

    _show = false;


    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }

        return this.myInstance;
    }

    getUserID() {
        return this._show;
    }

    setUserID(bool) {
        this._show = bool;
    }
}
