const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    nomi: String,
    muallif: String,
    sahifasi: Number,
    janr: String,
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    }
})

module.exports = mongoose.model("Book", BookSchema)