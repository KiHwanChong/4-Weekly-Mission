import { useRouter } from 'next/router';
import styles from './Button.module.css';

interface ButtonProps {
  inputValues: { email: string; password: string; passwordCheck: string };
  signup?: boolean;
  inputErrors: { email: boolean; password: boolean; passwordCheck: boolean };
}

const Button = ({ inputValues, signup, inputErrors }: ButtonProps) => {
  const router = useRouter();

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>, inputValues: { email: string; password: string }) => {
    e.preventDefault();

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

      const responseData = await response.json();
      console.log(responseData);
      localStorage.setItem('token', responseData.data.accessToken);
      router.push('/folder');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignin = async (e: React.MouseEvent<HTMLButtonElement>, inputValues: { email: string; password: string }) => {
    e.preventDefault();

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

      const responseData = await response.json();
      console.log(responseData);
      router.push('/folder');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={styles.button}
      disabled={inputErrors.email || inputErrors.password || inputErrors.passwordCheck}
      onClick={(e) => {
        signup ? handleSignup(e, inputValues) : handleSignin(e, inputValues);
      }}>
      {signup ? '회원가입' : '로그인'}
    </button>
  );
};

export default Button;
