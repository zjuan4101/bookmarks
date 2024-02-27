import { useState } from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import styles from './AuthPage.module.scss';

export default function AuthPage(props) {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className={styles.authPage}>
            <button className={styles.toggleButton} onClick={() => setShowLogin(!showLogin)}>
                {!showLogin ? 'Already Have An Account? Click Here To Sign In' : 'New Here? Click Here To Sign Up'}
            </button>
            {showLogin ? <LoginForm login={props.login} /> : <SignUpForm signUp={props.signUp} />}
        </div>
    );
}
