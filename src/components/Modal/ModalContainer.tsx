import Modal from 'react-modal';
import closeIcon from 'assets/close.svg';
import styles from './ModalContainer.module.css';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalContainer = ({ isOpen, onClose, children }: ModalProps) => {
  const defaultStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={defaultStyles}>
      <div className={styles.modalBox}>
        <Image
          src={closeIcon}
          alt='close'
          className={styles.closeIcon}
          onClick={onClose}
        />
        {children}
      </div>
    </Modal>
  );
};

export default ModalContainer;
