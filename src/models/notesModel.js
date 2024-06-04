const { default: mongoose } = require("mongoose")

const notesSchema = new mongoose.Schema(
    {
        name: String,
        cost: String,
        title: String,
        coverLocation: String,
        language: String,
        topics: Array,
        pdfLocation: String
    },
    {timestamps: true}
)

const notesModel = new mongoose.model('Notes',notesSchema)

module.exports = notesModel