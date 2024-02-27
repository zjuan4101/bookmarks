import { useState, useEffect } from 'react';
import BookmarkList from './components/BookmarkList/BookmarkList';
import styles from './App.module.scss';

export default function App() {
    const [bookmarks, setBookmarks] = useState([]);
    const [newBookmark, setNewBookmark] = useState({
        title: '',
        url: ''
    });

    const updateBookmark = async (updatedBookmarkData, id) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBookmarkData)
            });
    
            // Parse the response here
            const updatedBookmark = await response.json();
    
            // Update the state with the updated bookmark
            const updatedBookmarks = bookmarks.map(bookmark => {
                if (bookmark._id === id) {
                    return updatedBookmark;
                } else {
                    return bookmark;
                }
            });
            setBookmarks(updatedBookmarks);
        } catch (error) {
            console.error(error);
        }
    };
    
    

    const createBookmark = async () => {
        const body = { ...newBookmark };
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const createdBookmark = await response.json();
            const bookmarksCopy = [createdBookmark, ...bookmarks];
            setBookmarks(bookmarksCopy);
            setNewBookmark({
                title: '',
                url: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteBookmark = async (id) => {
        try {
            const index = bookmarks.findIndex((bookmark) => bookmark._id === id);
            const bookmarksCopy = [...bookmarks];
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await response.json();
            bookmarksCopy.splice(index, 1);
            setBookmarks(bookmarksCopy);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchBookmarks = async () => {
        try {
            const response = await fetch('/api/bookmarks');
            const data = await response.json();
            setBookmarks(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    return (
        <>
            <div className={styles.banner}>
                <h1>The World Famous Big Poppa Code React Starter Kit</h1>
            </div>
            <BookmarkList
                newBookmark={newBookmark}
                setNewBookmark={setNewBookmark}
                createBookmark={createBookmark}
                bookmarks={bookmarks}
                deleteBookmark={deleteBookmark}
                updateBookmark={updateBookmark}
            />
        </>
    );
}
