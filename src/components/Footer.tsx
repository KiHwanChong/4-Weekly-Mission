import fbicon from 'assets/fbicon.svg';
import twicon from 'assets/twicon.svg';
import yticon from 'assets/yticon.svg';
import insticon from 'assets/insticon.svg';
import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

const SocialMediaLink = ({ url, icon }: { url: string; icon: string }) => {
  return (
    <Link href={url} target='_blank' rel='noopener noreferrer'>
      <Image src={icon} alt={icon} />
    </Link>
  );
};

function Footer() {
  const socialMedias = [
    { url: 'https://www.facebook.com/', icon: fbicon },
    { url: 'https://twitter.com/', icon: twicon },
    { url: 'https://www.youtube.com/', icon: yticon },
    { url: 'https://www.instagram.com/', icon: insticon },
  ];

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>&copy;codeit - 2023</p>
      <div className={styles['footer-text']}>
        <p>Privacy Policy</p>
        <p className={styles['faq-text']}>FAQ</p>
      </div>
      <div className={styles['footer-icons']}>
        {socialMedias.map(({ url, icon }) => (
          <SocialMediaLink key={url} url={url} icon={icon} />
        ))}
      </div>
    </footer>
  );
}

export default Footer;
