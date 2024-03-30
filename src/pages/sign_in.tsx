import Input from '../components/Input';
import Logo from '../components/Logo';
import styles from './sign.module.css';

const signIn = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Logo signIn />
        <Input />
      </div>
    </main>
  );
};

export default signIn;
