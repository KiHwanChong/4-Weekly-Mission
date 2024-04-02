import Input from '../components/Input';
import Logo from '../components/Logo';
import styles from './sign.module.css';
import Button from '../components/Button';
import SocialSign from '@/components/SocialSign';

const signIn = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Logo signIn />
        <Input />
        <Button text='로그인' />
        <SocialSign text='소셜 로그인' />
      </div>
    </main>
  );
};

export default signIn;
