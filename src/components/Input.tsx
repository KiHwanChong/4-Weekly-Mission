import { useState } from 'react';
import styles from './Input.module.css';
import eye from 'assets/eye.svg';
import eyeOff from 'assets/eyeOff.svg';
import Image from 'next/image';

const Input = () => {
  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [inputErrors, setInputErrors] = useState({ email: false, password: false });
  const [eyeIcon, setEyeIcon] = useState<string>(eye);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

    setInputValues((prevState) => ({ ...prevState, [id]: value }));
    setInputErrors((prevState) => ({ ...prevState, [id]: value.length === 0 }));

    if (id === 'email') {
      setInputErrors((prevState) => ({ ...prevState, email: !emailPattern.test(value) }));
    } else if (id === 'password') {
      setInputErrors((prevState) => ({ ...prevState, password: !passwordPattern.test(value) }));
    }
  };

  const handlePasswordReveal = () => {
    const password = document.getElementById('password') as HTMLInputElement;

    if (password.type === 'password') {
      password.type = 'text';
      setEyeIcon(eyeOff);
    } else {
      password.type = 'password';
      setEyeIcon(eye);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label htmlFor='email'>이메일</label>
        <input type='text' id='email' placeholder='codeit@codeit.com' onBlur={handleInput} className={` ${inputErrors.email && styles.errorInput} ${styles.input}`} />
      </form>
      {inputErrors.email && <p className={` ${inputErrors.email && styles.errorText}`}>이메일을 확인해주세요.</p>}
      <form className={styles.form}>
        <label htmlFor='password'>비밀번호</label>
        <input type='password' id='password' placeholder='********' onBlur={handleInput} className={` ${inputErrors.password && styles.errorInput} ${styles.input}`} />
        <Image width={16} height={16} src={eyeIcon} alt='eye' className={styles.eye} onClick={handlePasswordReveal} />
      </form>
      {inputErrors.password && <p className={` ${inputErrors.password && styles.errorText}`}>비밀번호를 확인해주세요.</p>}
    </div>
  );
};

export default Input;
