import { useState, useEffect } from 'react';
import CreateForm from '../../components/CreateForm/CreateForm';
import BookmarkList from '../../components/BookmarkList/BookmarkList';
import styles from './HomePage.module.scss';

export default function HomePage(props) {
    const [bookmarks, setBookmarks] = useState([]);

    // Fetch bookmarks
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const data = await props.getAllBookmarks();
                setBookmarks(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookmarks();
    }, []);

    // Check for token & user in localStorage
    useEffect(() => {
        if (localStorage.token && !props.token) {
            props.setToken(localStorage.getItem('token'));
        }
        if (localStorage.token && localStorage.user && !props.user) {
            props.setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Welcome to the Liberty Bookmark App</h1>
            {props.token && <CreateForm user={props.user} createBookmark={props.createBookmark} token={props.token} />}
            {bookmarks.length ? (
                <BookmarkList
                    bookmarks={bookmarks}
                    deleteBookmark={props.deleteBookmark}
                    updateBookmark={props.updateBookmark}
                />
            ) : (
                <p className={styles.message}>Sorry, there are no bookmarks available.</p>
            )}
        </div>
    );
}
