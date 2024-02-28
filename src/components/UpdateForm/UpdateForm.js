import React from 'react';
import styles from './UpdateForm.module.scss'; // Adjust the path according to your file structure

export default function UpdateForm(props) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await props.updateBookmark(props.updatedBookmarkData, props.id);
            props.setShowUpdate(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        props.setUpdatedBookmarkData({...props.updatedBookmarkData, [e.target.name]: e.target.value });
    };

    return (
        <form className={styles.updateForm} onSubmit={handleSubmit}>
            <h2 className={styles.heading}>Update Bookmark Below</h2>
            <input placeholder='Title' type="text" name="title" value={props.updatedBookmarkData.title} onChange={handleChange} className={styles.input}/>
            <input placeholder='URL' type="text" name="url" value={props.updatedBookmarkData.url} onChange={handleChange} className={styles.input}/>
            <input type="submit" value="Submit Update" className={styles.submitButton}/>
        </form>
    );
}