const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    ism: String,
    familiya: String,
    yosh: Number,
    email: String,
    parol: String,
    role: {
        type: String,
        default: "user"
    }
}
)

module.exports = mongoose.model("User", UserSchema)