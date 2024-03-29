import styles from './AddLinkBar.module.css';
import linkIcon from 'assets/linkIcon.svg';
import ModalAddFolder from '../Modal/ModalAddFolder';
import useModal from '../../hooks/useModal';
import Image from 'next/image';

const AddLink = () => {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();

  return (
    <div className={styles.addLinkContainer}>
      <form className={styles.addLinkForm}>
        <label htmlFor='linkInput' className={styles.hiddenLabel}>
          링크를 추가해보세요.
        </label>
        <Image src={linkIcon} alt='link icon' />
        <input
          type='text'
          id='linkInput'
          placeholder='링크를 추가해 보세요.'
          className={styles.addLinkInput}
        />
        <button onClick={handleOpenModal}>추가하기</button>
        <ModalAddFolder isOpen={showModal} onClose={handleCloseModal} />
      </form>
    </div>
  );
};

export default AddLink;
