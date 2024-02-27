import React, { useState } from 'react';
import styles from './Bookmark.module.scss';

export default function Bookmark({ bookmark, deleteBookmark, updateBookmark }) {
    const [editMode, setEditMode] = useState(false);
    const [editedBookmark, setEditedBookmark] = useState({ title: bookmark.title, url: bookmark.url });

    const handleUpdate = async () => {
        await updateBookmark(bookmark._id, editedBookmark);
        setEditMode(false);
    };

    return (
        <div className={styles.bookmark}>
            {editMode ? (
                <div className={styles.editMode}>
                    <input
                        type="text"
                        value={editedBookmark.title}
                        onChange={(e) => setEditedBookmark({ ...editedBookmark, title: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editedBookmark.url}
                        onChange={(e) => setEditedBookmark({ ...editedBookmark, url: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Save</button>
                </div>
            ) : (
                <>
                    <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                        <h4>{bookmark.title}</h4>
                    </a>
                    <div className={styles.actions}>
                        <button onClick={() => setEditMode(true)}>Edit</button>
                        <button onClick={() => deleteBookmark(bookmark._id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
}
