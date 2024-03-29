import Image from 'next/image';
import styles from './Profile.module.css';

interface ProfileProps {
  profile: {
    name: string;
    profileImageSource: string;
  };
  folderName: string;
}

const Profile = ({ profile, folderName }: ProfileProps) => {
  return (
    <div>
      <div className={styles.profile}>
        <div className={styles['profile-image']}>
          <Image
            width={128}
            height={128}
            src={profile.profileImageSource}
            alt='프로필 이미지'
          />
        </div>
        <div className={styles['profile-info']}>
          <h1>@{profile.name || 'No Name'}</h1>
          <h2>{folderName || 'No Folder Name'}</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
