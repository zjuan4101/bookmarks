const express = require('express')
const router = express.Router()
const bookmarkCtrl = require('../../controllers/api/bookmarks')

// index
router.get('/', bookmarkCtrl.index, bookmarkCtrl.jsonBookmarks)

// create
router.post('/', bookmarkCtrl.create, bookmarkCtrl.jsonBookmark)

// delete
router.delete('/:id', bookmarkCtrl.destroy, bookmarkCtrl.jsonBookmark)

// update
router.put('/:id', bookmarkCtrl.update, bookmarkCtrl.jsonBookmark)

module.exports = router