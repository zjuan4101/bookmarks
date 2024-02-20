import { useState, useEffect } from 'react'
import BookmarkList from './components/BookmarkList/BookmarkList'
import styles from './App.module.scss'

export default function App() {
    const [bookmarks, setBookmarks] = useState([])
    const [newBookmark, setNewBookmark] = useState({
        title: '',
        url: ''
    })

    const createBookmark = async () => {
        const body = { ...newBookmark }
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const createdBookmark = await response.json()
            const bookmarksCopy = [createdBookmark, ...bookmarks]
            setBookmarks(bookmarksCopy)
            setNewBookmark({
                title: '',
                url: ''
            })
        } catch (error) {
            console.error(error)
        }
    }

    const deleteBookmark = async (id) => {
        try {
            await fetch(`/api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const updatedBookmarks = bookmarks.filter(bookmark => bookmark._id !== id)
            setBookmarks(updatedBookmarks)
        } catch (error) {
            console.error(error)
        }
    }

    const updateBookmark = async (id, updatedBookmark) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBookmark)
            })
            const updatedData = await response.json();
            setBookmarks(bookmarks.map(bookmark => (bookmark._id === id ? updatedData : bookmark)));
        } catch (error) {
            console.error(error);
        }
    }
    
    const getBookmarks = async () => {
        try{
            const response = await fetch('/api/bookmarks')
            const foundBookmarks = await response.json()
            setBookmarks(foundBookmarks.reverse())
            const responseTwo = await fetch('/api/bookmarks/completed')
            const foundCompletedBookmarks = await responseTwo.json()
            setCompletedBookmarks(foundCompletedBookmarks.reverse())
        } catch(error){
            console.error(error)
        }
    }
    useEffect(() => {
        getBookmarks()
    }, [])
    return (
        <>
            <div className={styles.banner}>
                <h1>Bookmark Manager</h1>
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
    )
}
