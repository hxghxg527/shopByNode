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
            default: "m"
        },
        isAdult: {
            type: Boolean,
            default: true
        }
    }
};