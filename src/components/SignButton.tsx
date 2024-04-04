import { useRouter } from 'next/router';
import styles from './Button.module.css';

interface ButtonProps {
  inputValues: { email: string; password: string; passwordCheck: string };
  signup?: boolean;
  inputErrors: { email: { error: boolean; message: string }; password: { error: boolean; message: string }; passwordCheck: { error: boolean; message: string } };
  setInputErrors: React.Dispatch<
    React.SetStateAction<{ email: { error: boolean; message: string }; password: { error: boolean; message: string }; passwordCheck: { error: boolean; message: string } }>
  >;
}

const SignButton = ({ inputValues, signup, inputErrors, setInputErrors }: ButtonProps) => {
  const router = useRouter();

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>, inputValues: { email: string; password: string }) => {
    try {
      const response = await fetch('https://bootcamp-api.codeit.kr/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: inputValues.email }),
      });

      if (response.status === 409) setInputErrors((prevState) => ({ ...prevState, email: { error: true, message: '이미 사용중인 이메일입니다.' } }));
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await fetch('https://bootcamp-api.codeit.kr/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputValues.email,
          password: inputValues.password,
        }),
      });
      if (response.status === 201) {
        const responseData = await response.json();
        console.log(responseData);
        localStorage.setItem('token', responseData.data.accessToken);
        router.push('/folder');
      } else {
        setInputErrors((prevState) => ({ ...prevState, email: { error: true, message: '이메일을 확인해주세요.' }, password: { error: true, message: '비밀번호를 확인해주세요.' } }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignin = async (e: React.MouseEvent<HTMLButtonElement>, inputValues: { email: string; password: string }) => {
    // e.preventDefault();

    try {
      const response = await fetch('https://bootcamp-api.codeit.kr/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          email: inputValues.email,
          password: inputValues.password,
        }),
      });

      response.status === 200
        ? router.push('/folder')
        : setInputErrors((prevState) => ({ ...prevState, email: { error: true, message: '이메일을 확인해주세요.' }, password: { error: true, message: '비밀번호를 확인해주세요.' } }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type='submit'
      className={styles.button}
      disabled={inputErrors.email.error || inputErrors.password.error || inputErrors.passwordCheck.error}
      onClick={(e) => {
        signup ? handleSignup(e, inputValues) : handleSignin(e, inputValues);
      }}>
      {signup ? '회원가입' : '로그인'}
    </button>
  );
};

export default SignButton;
