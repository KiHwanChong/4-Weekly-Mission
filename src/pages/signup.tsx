import Button from '@/components/Button';
import Input from '../components/Input';
import Logo from '../components/Logo';
import styles from './sign.module.css';
import SocialSign from '@/components/SocialSign';
import { useState } from 'react';

const SignUp = () => {
  const [inputValues, setInputValues] = useState({ email: '', password: '', passwordCheck: '' });
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Logo signUp />
        <Input passwordCheck inputValues={inputValues} setInputValues={setInputValues} />
        <Button inputValues={inputValues} signup={true} />
        <SocialSign text='다른 방식으로 가입하기' />
      </div>
    </main>
  );
};

export default SignUp;
