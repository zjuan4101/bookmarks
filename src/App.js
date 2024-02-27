import { useState, useEffect } from 'react';
import BookmarkList from './components/BookmarkList/BookmarkList';
import AuthPage from './pages/AuthPage/AuthPage';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';

export default function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const [bookmarks, setBookmarks] = useState([]);
    const [newBookmark, setNewBookmark] = useState({
        title: '',
        url: ''
    });

    const signUp = async (credentials) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
            console.error(error);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            const tokenData = data.token;
            localStorage.setItem('token', tokenData);
            setToken(tokenData);
            const userData = data.user;
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error(error);
        }
    };

    const createBookmark = async () => {
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newBookmark)
            });
            const data = await response.json();
            setBookmarks([...bookmarks, data]);
            setNewBookmark({ title: '', url: '' });
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

    const deleteBookmark = async (id) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
            } else {
                console.error('Failed to delete bookmark');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateBookmark = async (id, updatedBookmarkData) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedBookmarkData)
            });
            const updatedBookmark = await response.json();
            setBookmarks(bookmarks.map(bookmark =>
                bookmark._id === id ? updatedBookmark : bookmark
            ));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.App}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <BookmarkList
                            newBookmark={newBookmark}
                            createBookmark={createBookmark}
                            setNewBookmark={setNewBookmark}
                            bookmarks={bookmarks}
                            deleteBookmark={deleteBookmark}
                            updateBookmark={updateBookmark}
                        />
                    }
                ></Route>
                <Route
                    path="/register"
                    element={<AuthPage setUser={setUser} setToken={setToken} signUp={signUp} login={login} />}
                ></Route>
            </Routes>
        </div>
    );
}
