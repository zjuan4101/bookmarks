const {Schema, model} = require('mongoose')

const bookmarkSchema = new Schema({
    title: String,
    url: String,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Bookmark', bookmarkSchema)