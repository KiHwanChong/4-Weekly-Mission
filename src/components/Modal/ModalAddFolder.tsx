import ModalContainer from './ModalContainer';
import styles from './ModalContainer.module.css';

interface ModalAddFolderProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddFolderContent = () => (
  <>
    <h2>폴더 추가</h2>
    <input placeholder='내용 입력' className={styles.modalInput}></input>
    <button className={styles.blueButton}>추가하기</button>
  </>
);

const ModalAddFolder = ({ isOpen, onClose }: ModalAddFolderProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <ModalAddFolderContent />
    </ModalContainer>
  );
};

export default ModalAddFolder;
