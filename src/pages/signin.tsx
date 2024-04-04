import Input from '../components/Input';
import Logo from '../components/Logo';
import styles from './sign.module.css';
import SignButton from '../components/SignButton';
import SocialSign from '@/components/SocialSign';
import { useState } from 'react';

const SignIn = () => {
  const [inputValues, setInputValues] = useState({ email: '', password: '', passwordCheck: '' });
  const [inputErrors, setInputErrors] = useState({ email: false, password: false, passwordCheck: false });

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Logo signIn />
        <Input inputValues={inputValues} setInputValues={setInputValues} inputErrors={inputErrors} setInputErrors={setInputErrors} />
        <SignButton inputValues={inputValues} inputErrors={inputErrors} setInputErrors={setInputErrors} />
        <SocialSign text='소셜 로그인' />
      </div>
    </main>
  );
};

export default SignIn;
