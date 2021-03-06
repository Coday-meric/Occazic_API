const mongoose = require('mongoose');

var catSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        function: {type: String, required: true},
        marge: Number,
        picture: String,
        sub_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sub_category'
        },
    }, {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

catSchema.virtual("val_func", {
    ref: "Val_func",
    foreignField: "category",
    localField: "_id"
})

const category = mongoose.model('Category', catSchema);

module.exports = category;