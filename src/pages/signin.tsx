import SignForm from '../components/SignForm';
import Logo from '../components/Logo';
import styles from './sign.module.css';

const SignIn = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Logo signIn />
        <SignForm />
      </div>
    </main>
  );
};

export default SignIn;
