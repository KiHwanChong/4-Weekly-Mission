import Button from '@/components/Button';
import Input from '../components/Input';
import Logo from '../components/Logo';
import styles from './sign.module.css';
import SocialSign from '@/components/SocialSign';

const signUp = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Logo signUp />
        <Input passwordCheck />
        <Button text='회원가입' />
        <SocialSign text='다른 방식으로 가입하기' />
      </div>
    </main>
  );
};

export default signUp;
