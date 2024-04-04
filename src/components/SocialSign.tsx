import Image from 'next/image';
import Link from 'next/link';
import styles from './SocialSign.module.css';
import googleIcon from 'assets/googleicon.svg';
import kakaoIcon from 'assets/kakaoIcon.svg';

interface SocialSignProps {
  signup?: boolean;
}

const SocialSign = ({ signup }: SocialSignProps) => {
  return (
    <div className={styles.container}>
      {signup ? <p>다른 방식으로 가입하기</p> : <p>소셜 로그인</p>}
      <div className={styles.iconContainer}>
        <Link href='https://www.google.com'>
          <Image width={42} height={42} className={styles.google} src={googleIcon} alt='google sign' />
        </Link>
        <Link href='https://www.kakaocorp.com/page/'>
          <Image width={42} height={42} className={styles.kakao} src={kakaoIcon} alt='kakao sign' />
        </Link>
      </div>
    </div>
  );
};

export default SocialSign;
