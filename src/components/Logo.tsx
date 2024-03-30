import Link from 'next/link';
import styles from './Logo.module.css';
import Image from 'next/image';
import logo from 'assets/logo.svg';

interface LogoProps {
  signUp?: boolean;
  signIn?: boolean;
}

const Logo = ({ signUp, signIn }: LogoProps) => {
  return (
    <div className={styles.logo}>
      <Link href='/'>
        <Image src={logo} alt='logo' />
      </Link>
      {signIn && (
        <p>
          회원이 아니신가요? <Link href='/sign_up'>회원 가입하기</Link>
        </p>
      )}
      {signUp && (
        <p>
          이미 회원이신가요? <Link href='/sign_in'>로그인 하기</Link>
        </p>
      )}
    </div>
  );
};

export default Logo;
