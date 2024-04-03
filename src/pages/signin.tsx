import Input from '../components/Input';
import Logo from '../components/Logo';
import styles from './sign.module.css';
import Button from '../components/Button';
import SocialSign from '@/components/SocialSign';
import { useState } from 'react';

const SignIn = () => {
  const [inputValues, setInputValues] = useState({ email: '', password: '', passwordCheck: '' });
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Logo signIn />
        <Input inputValues={inputValues} setInputValues={setInputValues} />
        <Button text='로그인' inputValues={inputValues} />
        <SocialSign text='소셜 로그인' />
      </div>
    </main>
  );
};

export default SignIn;
