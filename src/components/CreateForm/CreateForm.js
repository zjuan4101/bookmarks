import {useState} from 'react'
import styles from './CreateForm.module.scss'


export default function CreateForm(props) {
    const [ formData, setFormData ] = useState({
        title: '',
        body: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await props.createBlog(formData, props.token)
            // cool thing to do once there is a showpage done
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.heading}>Create A New BlogPost {props.user.name} </h2>
            <input placeholder='Title' type="text" name="title" value={formData.title} onChange={handleChange}/>
            <input placeholder='BODY' type="text" name="url" value={formData.url} onChange={handleChange}/>
            <input type="submit" value="Create Bookmark"/>
        </form>
    )


}