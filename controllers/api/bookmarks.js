const Bookmark = require('../../models/bookmark')

// get all bookmarks
exports.index = async (_, res, next) => {
    try {
        const bookmarks = await Bookmark.find({})
        res.locals.data.bookmark = bookmarks
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// create a bookmark
exports.create = async (req, res, next) => {
    try {
        const bookmark = await Bookmark.create(req.body)
        next()
        console.log(bookmark)
        res.status(201).json(bookmark)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// delete a bookmark
exports.destroy = async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findByIdAndDelete(req.params.id)
        if (!bookmark) {
            return res.status(404).json({ msg: "Bookmark not found" })
        }
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// update a bookmark
exports.update = async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!bookmark) {
            return res.status(404).json({ msg: "Bookmark not found" })
        }
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.respondWithBookmarks = (_, res) => {
    res.json(res.locals.data.bookmarks)
}

exports.respondWithBookmark = (req, res) => {
    res.json(res.locals.data.bookmark)
}