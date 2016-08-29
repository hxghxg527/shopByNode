module.exports = {
    users: {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        isAdult: {
            type: Boolean,
            default: true
        }
    }
};