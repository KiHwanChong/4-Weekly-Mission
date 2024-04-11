import SignupForm from '../components/SignupForm';
import Logo from '../components/Logo';
import styles from './sign.module.css';

const SignUp = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Logo signUp />
        <SignupForm />
      </div>
    </main>
  );
};

export default SignUp;
