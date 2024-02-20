const express = require('express')
const router = express.Router()
const bookmarkCtrl = require('../../controllers/api/bookmarks')

// index
router.get('/', bookmarkCtrl.index, bookmarkCtrl.respondWithBookmarks)

// create
router.post('/', bookmarkCtrl.create, bookmarkCtrl.respondWithBookmark)

// delete
router.delete('/:id', bookmarkCtrl.destroy, bookmarkCtrl.respondWithBookmark)

// update
router.put('/:id', bookmarkCtrl.update, bookmarkCtrl.respondWithBookmark)

module.exports = router