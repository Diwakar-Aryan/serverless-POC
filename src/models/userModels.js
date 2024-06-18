const { default: mongoose } = require("mongoose")

const userRecordsSchema = new mongoose.Schema(
    {
        userId: String,
        email: String,
        stripeProductIds: Array
    },
    { typeKey: '$type' },
    {timestamps: true}
)

module.exports.userRecordsModel = new mongoose.model('UserRecords',userRecordsSchema,'userRecords');



