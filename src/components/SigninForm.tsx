import { useEffect, useState } from 'react';
import styles from './SignForm.module.css';
import eye from 'assets/eye.svg';
import eyeOff from 'assets/eyeOff.svg';
import Image from 'next/image';
import SocialSign from './SocialSign';
import { useRouter } from 'next/router';

interface InputErrors {
  email: { error: boolean; message: string };
  password: { error: boolean; message: string };
}

const SigninForm = () => {
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    email: { error: false, message: '' },
    password: { error: false, message: '' },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      router.push('/folder');
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    setInputValues((prevState) => ({ ...prevState, [id]: value }));

    if (id === 'email') {
      if (value.length === 0) {
        setInputErrors((prevState) => ({
          ...prevState,
          email: {
            error: true,
            message: '이메일을 입력해주세요.',
          },
        }));
      } else
        setInputErrors((prevState) => ({
          ...prevState,
          email: {
            error: !emailPattern.test(value),
            message: '올바른 이메일을 입력해주세요',
          },
        }));
    } else if (id === 'password') {
      if (value.length === 0) {
        setInputErrors((prevState) => ({
          ...prevState,
          password: {
            error: true,
            message: '비밀번호를 입력해주세요.',
          },
        }));
      }
    }
  };

  const handlePasswordReveal = () => {
    const password = document.getElementById('password') as HTMLInputElement;

    setIsPasswordShown((prevState) => !prevState);

    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  };

  const handleSignin = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>, inputValues: { email: string; password: string }) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bootcamp-api.codeit.kr/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputValues.email,
          password: inputValues.password,
        }),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        localStorage.setItem('token', responseData.data.accessToken);
        router.push('/folder');
      } else {
        setInputErrors((prevState) => ({ ...prevState, email: { error: true, message: '이메일을 확인해주세요.' }, password: { error: true, message: '비밀번호를 확인해주세요.' } }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSignin(e, inputValues)}>
        <div className={styles.inputBox}>
          <label htmlFor='email'>이메일</label>
          <input type='text' id='email' placeholder='codeit@codeit.com' onBlur={handleInput} className={` ${inputErrors.email.error && styles.errorInput} ${styles.input}`} />
          {inputErrors.email.error && <p className={` ${inputErrors.email.error && styles.errorText}`}>{inputErrors.email.message}</p>}
        </div>
        <div className={styles.inputBox}>
          <label htmlFor='password'>비밀번호</label>
          <input type='password' id='password' placeholder='********' onBlur={handleInput} className={` ${inputErrors.password.error && styles.errorInput} ${styles.input}`} />
          <Image width={16} height={16} src={isPasswordShown ? eyeOff : eye} alt='reveal password' className={styles.eye} onClick={handlePasswordReveal} />
          {inputErrors.password.error && <p className={` ${inputErrors.password.error && styles.errorText}`}>{inputErrors.password.message}</p>}
        </div>
        <button
          className={styles.button}
          disabled={inputErrors.email.error || inputErrors.password.error}
          onClick={(e) => {
            handleSignin(e, inputValues);
          }}
          type='submit'
        >
          로그인
        </button>
      </form>
      <SocialSign />
    </div>
  );
};

export default SigninForm;
