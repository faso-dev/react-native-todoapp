/**
 *
 */
export default class Todo {
    /**
     * @property {String}
     */
    uid;

    /**
     * @property {String}
     */
    name;

    /**
     * @property {Boolean}
     */
    status;

    /**
     * @property {Date}
     */
    createdAt;

    /**
     *
     * @param uid
     * @param {String} name
     * @param {Boolean} status
     * @param {number} createdAt
     */
    constructor(uid, name, status, createdAt) {
        this.name = name;
        this.status = status;
        this.createdAt = createdAt
        this.uid = uid
    }

    toObject() {
        return {
            uid: this.uid,
            name: this.name,
            status: this.status,
            createdAt: this.createdAt
        }
    }

    toFirebaseObject() {
        return {
            name: this.name,
            status: this.status,
            createdAt: this.createdAt
        }
    }

    withId(id) {
        this.uid = id
        return this
    }
}