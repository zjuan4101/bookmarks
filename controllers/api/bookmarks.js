const Bookmark = require('../../models/bookmark')

module.exports = {
    jsonBookmark,
    jsonBookmarks,
    create,
    index,
    update,
    destroy
};

function jsonBookmark (_, res) {
    res.json(res.locals.data.bookmark)
}

function jsonBookmarks (_, res) {
    res.json(res.locals.data.bookmarks)
}

// Create a new bookmark
async function create(req, res, next) {
    try {
        const bookmark = await Bookmark.create(req.body)
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


async function index(req, res) {
    try {
        const bookmarks = await Bookmark.find({})
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// Update a bookmark by ID
// Update a bookmark by ID
async function update(req, res, next) {
    try {
        const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
        
        if (!bookmark) {
            return res.status(404).json({ msg: "Bookmark not found" });
        }
        
        res.locals.data.bookmark = bookmark;
        next();
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


// Delete a bookmark by ID
async function destroy(req, res, next) {
    try {
        const bookmark = await Bookmark.findByIdAndDelete(req.params.id)
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
