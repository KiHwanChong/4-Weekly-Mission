import logo from 'assets/logo.svg';
import styles from './Header.module.css';
import useUser from '../hooks/useUser';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  email: string;
  imageSource: string;
}

const UserInformation = ({ user }: { user: User }) => {
  if (!user) return null;
  const { email, imageSource } = user;
  return (
    <div className={styles.profileContainer}>
      <Image
        width={32}
        height={32}
        className={styles.logo}
        src={imageSource}
        alt='프로필 이미지'
      />
      <span>{email}</span>
    </div>
  );
};

const Header = () => {
  const user = useUser();
  return (
    <header className={`${styles['nav-space']} ${styles.header}`}>
      <nav className={styles.nav}>
        <Link href='/'>
          <Image src={logo} alt='logo' />
        </Link>
        {user ? (
          <UserInformation user={user} />
        ) : (
          <button className={styles.headerButton}>Login</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
