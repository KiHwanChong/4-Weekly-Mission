import SignForm from '../components/SignForm';
import Logo from '../components/Logo';
import styles from './sign.module.css';

const SignUp = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Logo signUp />
        <SignForm signup />
      </div>
    </main>
  );
};

export default SignUp;
