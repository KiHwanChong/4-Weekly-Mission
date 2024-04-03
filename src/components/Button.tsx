import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  inputValues: { email: string; password: string; passwordCheck: string };
}

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
  } catch (error) {
    console.error(error);
  }
};

const Button = ({ text, inputValues }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={(e) => handleSignup(e, inputValues)}>
      {text}
    </button>
  );
};

export default Button;
