import Input from '../components/Input';
import Logo from '../components/Logo';
import styles from './sign.module.css';

const signUp = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Logo signUp />
        <Input />
      </div>
    </main>
  );
};

export default signUp;
