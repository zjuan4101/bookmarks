import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import UpdateForm from '../../components/UpdateForm/UpdateForm';
import styles from './ShowPage.module.scss';

export default function ShowPage(props) {
    const [showUpdate, setShowUpdate] = useState(false);
    const [allowChanges, setAllowChanges] = useState(false);
    const [bookmark, setBookmark] = useState({
        title: '',
        url: '',
    });
    const navigateTo = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchBookmark = async () => {
            try {
                const data = await props.getBookmark(id);
                setBookmark(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookmark();
    }, []);

    useEffect(() => {
        if (localStorage.token && !props.token) {
            props.setToken(localStorage.getItem('token'));
        }
        if (localStorage.token && localStorage.user && !props.user) {
            props.setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);

    useEffect(() => {
        if (bookmark && props.user._id === bookmark.user) {
            setAllowChanges(true);
        }
    }, [props.user, bookmark]);

    const handleDelete = async () => {
        try {
            await props.deleteBookmark(id, props.token);
            navigateTo('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.showPageContainer}>
            <Link to={'/'} className={styles.link}>
                Go to Homepage
            </Link>
            <h1 className={styles.title}>{bookmark?.title || 'Loading....'}</h1>
            <p className={styles.body}>{bookmark?.url || ''}</p>
            {allowChanges && (
                <div className={styles.buttonContainer}>
                    <button className={styles.updateButton} onClick={() => setShowUpdate(!showUpdate)}>
                        Reveal Update Form
                    </button>
                    <button className={styles.deleteButton} onClick={handleDelete}>
                        Delete Bookmark
                    </button>
                </div>
            )}
            {allowChanges && showUpdate && (
                <UpdateForm
                    id={id}
                    updateBookmark={props.updateBookmark}
                    setShowUpdate={setShowUpdate}
                    setBookmark={setBookmark}
                    bookmark={bookmark}
                    token={props.token}
                />
            )}
        </div>
    );
}
