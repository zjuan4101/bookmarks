import { useState } from 'react';
import Bookmark from '../Bookmark/Bookmark';
import styles from './BookmarkList.module.scss';

export default function BookmarkList({ newBookmark, createBookmark, setNewBookmark, bookmarks, deleteBookmark, updateBookmark }) {
    return (
        <div className={styles.bookmarkList}>
            <div className={styles.addBookmark}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Add New Bookmark URL"
                    value={newBookmark.url}
                    onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                />
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Add New Bookmark Title"
                    value={newBookmark.title}
                    onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && createBookmark()}
                />
                <button onClick={createBookmark}>Add Bookmark</button>
            </div>
            <h3>Bookmarks</h3>
            {bookmarks.map(bookmark => (
                <Bookmark
                    key={bookmark._id}
                    bookmark={bookmark}
                    deleteBookmark={deleteBookmark}
                    updateBookmark={updateBookmark}
                />
            ))}
        </div>
    );
}
